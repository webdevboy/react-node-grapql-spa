import { normalize } from "normalizr";
import {
  START_FETCHING_FILES,
  START_FETCHING_FILES_SUCCESS,
  START_FETCHING_FILES_ERROR,
  START_FETCHING_MEDIA,
  START_FETCHING_MEDIA_SUCCESS,
  START_FETCHING_MEDIA_ERROR,
  START_UPLOAD,
  START_UPLOAD_SUCCESS,
  START_UPLOAD_ERROR,
  CREATE_FOLDER,
  CREATE_FOLDER_SUCCESS,
  CREATE_FOLDER_ERROR,
  CHANGE_FOLDER,
  CHANGE_FOLDER_SUCCESS,
  CHANGE_FOLDER_ERROR,
  UPDATE_OR_CREATE_TRANSLATION,
  UPDATE_OR_CREATE_TRANSLATION_SUCCESS,
  UPDATE_OR_CREATE_TRANSLATION_ERROR,
  DELETE_FILE,
  DELETE_FILE_SUCCESS,
  DELETE_FILE_ERROR,
} from "../constants/media";
import { filesSchema } from './_schema';

import mutationS3CreateFolder from "../mutations/createS3Folder.gql";
import mutationNewMedia from "../mutations/newMedia.graphql";
import mutationUpdateOrCreateMediaTranslation from '../mutations/updateOrCreateMediaTranslation.graphql';
import mutationUpdateFile from '../mutations/updateFileName.graphql';
import mutationRemoveMedia from '../mutations/removeMedia.gql';

import queryFetchS3Files from "../queries/fetchS3Files.gql";
import queryFetchMediaFile from '../queries/fetchMediaFile.gql';
import queryFetchMedia from '../queries/fetchMedia.graphql';
import queryFetchMediaFromFolder from '../queries/fetchMediaFromFolder.graphql';

export const newMedia = ({ files }) => async (dispatch, getState, { client }) => {
  try {
    const { data, errors } = await client.mutate({
      mutation: mutationNewMedia,
      variables: { files },
    });

    if (typeof errors !== "undefined") {
      return dispatch({
        type: START_UPLOAD_ERROR,
        errors,
      });
    }

    // waiting for creating thumbnails
    await new Promise(resolve => setTimeout(resolve, 2000));

    return dispatch({
      type: START_UPLOAD_SUCCESS,
      response: data,
    });
    
  } catch (e) {
    return dispatch({
      type: START_UPLOAD_ERROR,
      errors: e,
    });
  }
};

export const updateFileName = ({ id, name, oldKey, file }) => async (dispatch, getState, { client }) => {
  try {
    const { data, errors } = await client.mutate({
      mutation: mutationUpdateFile,
      variables: { id, name, file },
    });

    if (typeof errors !== "undefined") {
      return dispatch({
        type: START_UPLOAD_ERROR,
        errors,
      });
    }

    dispatch({
      type: DELETE_FILE_SUCCESS,
      response: [oldKey]
    })

    return dispatch({
      type: START_UPLOAD_SUCCESS,
      response: data,
    });

  } catch (e) {
    return dispatch({
      type: START_UPLOAD_ERROR,
      errors: e,
    });
  }
};

export const fetchFiles = (path) => async (dispatch, getState, { client }) => {
  try {
    dispatch({
      type: CHANGE_FOLDER,
      folder: path || null,
    });

    const { data, errors } = await client.query({
      query: queryFetchMedia,
      variables: {
        path,
      },
    });

    if (typeof errors !== "undefined") {
      return dispatch({
        type: START_FETCHING_FILES_ERROR,
        errors,
      });
    }

    return dispatch({
      type: START_FETCHING_FILES_SUCCESS,
      response: normalize(data.files, filesSchema),
    });
  } catch (e) {
    return dispatch({
      type: START_FETCHING_FILES_ERROR,
      errors: e,
    });
  }
};

export const createFolder = (folderName) => async (dispatch, getState, { client }) => {
  try {
    const { data, errors } = await client.mutate({
      mutation: mutationS3CreateFolder,
      variables: {
        folderName: `${folderName}/`,
        currentFolder: getState().media.currentFolder,
      },
    });

    if (typeof errors !== "undefined") {
      return dispatch({
        type: CREATE_FOLDER_ERROR,
        errors,
      });
    }

    return dispatch({
      type: CREATE_FOLDER_SUCCESS,
      response: data.newFolder,
    });
  } catch (e) {
    console.error(e);
    return dispatch({
      type: CREATE_FOLDER_ERROR,
      errors: e,
    });
  }
};

export const updateOrCreateMediaTranslation = (key, args) => 
async (dispatch, getState, { client }) => {
  try {
    const { data, errors } = await client.mutate({
      mutation: mutationUpdateOrCreateMediaTranslation,
      variables: {
        ...args,
      },
    });
    if (typeof errors !== "undefined") {
      return dispatch({
        type: UPDATE_OR_CREATE_TRANSLATION_ERROR,
        errors,
      });
    }
    return dispatch({
      type: UPDATE_OR_CREATE_TRANSLATION_SUCCESS,
      response: data.mediaTranslation,
      key,
    });
  } catch (e) {
    console.error(e);
    return dispatch({
      type: UPDATE_OR_CREATE_TRANSLATION_ERROR,
      errors: e,
    });
  }
};

export const getMedia = (key) => async (dispatch, getState, { client }) => {
  try {
    const { data, errors } = await client.query({
      query: queryFetchMediaFile,
      variables: {
        key,
      },
    });
    if (typeof errors !== "undefined") {
      return dispatch({
        type: START_FETCHING_MEDIA_ERROR,
        errors,
      });
    }

    return dispatch({
      type: START_FETCHING_MEDIA_SUCCESS,
      response: data,
    });
  } catch (e) {
    return dispatch({
      type: START_FETCHING_MEDIA_ERROR,
      errors: e,
    });
  }
};

export const fetchMedia = ({ order, mimetype, get_all }) => async (dispatch, getState, { client }) => {  
  try {    
    const { data, errors } = await client.query({
      query: queryFetchMedia,
      fetchPolicy: "network-only",
      variables: {
        order,
        mimetype,
        get_all
      },
    });
    if (typeof errors !== "undefined") {
      throw new Error(errors);
    }
    return data;
  } catch (e) {
    console.error(e);
  }
};

export const fetchMediaFromFolder = ({ order, mimetype, path }) => async (dispatch, getState, { client }) => {
  try {
    const { data, errors } = await client.query({
      query: queryFetchMediaFromFolder,
      variables: {
        order,
        mimetype,
		    path,
      },
    });
    if (typeof errors !== "undefined") {
      throw new Error(errors);
    }
    return data;
  } catch (e) {
    console.error(e);
  }
};

export const removeFile = ({ keys }) => async (dispatch, getState, { client }) => {
  try {
    const { data, errors } = await client.mutate({
      mutation: mutationRemoveMedia,
      variables: {
        keys
      },
    });

    if (typeof errors !== "undefined") {
      throw new Error(errors);
    }

    return dispatch({
      type: DELETE_FILE_SUCCESS,
      response: keys,
    });
  } catch (e) {
    console.error(e);
    return dispatch({
      type: DELETE_FILE_ERROR,
      response: keys,
    });
  }
};
