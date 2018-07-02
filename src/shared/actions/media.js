import { normalize } from "normalizr";
import {
  UPDATE_OR_CREATE_MEDIA_REFERENCE,
  UPDATE_OR_CREATE_MEDIA_REFERENCE_SUCCESS,
  UPDATE_OR_CREATE_MEDIA_REFERENCE_ERROR,
  UPDATE_OR_CREATE_LIST_MEDIA_REFERENCE,
  UPDATE_OR_CREATE_LIST_MEDIA_REFERENCE_SUCCESS,
  UPDATE_OR_CREATE_LIST_MEDIA_REFERENCE_ERROR,
  SET_RICH_MEDIA_LIST_START,
  SET_RICH_MEDIA_LIST_SUCCESS,
  SET_RICH_MEDIA_LIST_ERROR,
} from "../constants/media";
import mutationUpdateOrCreateMediaReference from '../mutations/updateOrCreateMediaReference.graphql';
import mutationUpdateOrCreateListMediaReference from '../mutations/updateOrCreateListMediaReference.graphql';
import getMediaReferences from "shared/queries/getMediaReferences.graphql";


export const setRichMediaList = () => {
  return async (dispatch, getState, { client }) => {
    dispatch({
      type: SET_RICH_MEDIA_LIST_START,
    });
    try {
      // WARNING !!
      // do not use client.networkInterface except you want skip Apollo store
      // use client.query if you want benefit from Apollo caching mechanisms
      const { data } = await client.query({
        query: getMediaReferences,
      });
      const medias = data.medias.reduce((msgs, msg) => {
        if (msgs[msg.media_id]) {
          msgs[msg.media_id] = [...msgs[msg.media_id],msg.media.src];
        } else {
          msgs[msg.media_id] = [msg.media.src];
        }
        return msgs;
      }, {});
      dispatch({
        type: SET_RICH_MEDIA_LIST_SUCCESS,
        payload: {
		      medias,
        },
      });
    } catch (error) {
      dispatch({
        type: SET_RICH_MEDIA_LIST_ERROR,
        payload: {
          error,
        },
      });
      return null;
    }
  };
}

export const updateOrCreateMediaReference = (media_id, media_library_id) => async (dispatch, getState, { client }) => {
  try {
    const { data, errors } = await client.mutate({
      mutation: mutationUpdateOrCreateMediaReference,
      variables: {
        media_id : media_id,
		    media_library_id: media_library_id
      },
    });
    if (typeof errors !== "undefined") {
      return dispatch({
        type: UPDATE_OR_CREATE_MEDIA_REFERENCE_ERROR,
        errors,
      });
    }
    return dispatch({
      type: UPDATE_OR_CREATE_MEDIA_REFERENCE_SUCCESS,
      response: data.mediaReference,
    });
  } catch (e) {
    console.error(e);
    return dispatch({
      type: UPDATE_OR_CREATE_MEDIA_REFERENCE_ERROR,
      errors: e,
    });
  }
};

export const updateOrCreateListMediaReference = (args) => async (dispatch, getState, { client }) => {
  try {
    const { data, errors } = await client.mutate({
      mutation: mutationUpdateOrCreateListMediaReference,
      variables: {
        ...args
      },
    });
    if (typeof errors !== "undefined") {
      return dispatch({
        type: UPDATE_OR_CREATE_LIST_MEDIA_REFERENCE_ERROR,
        errors,
      });
    }
    const medias = data.mediaReference.reduce((msgs, msg) => {
      if (msgs[msg.media_id]) {
        msgs[msg.media_id] = [...msgs[msg.media_id],msg.media.src];
      } else {
        msgs[msg.media_id] = [msg.media.src];
      }
      return msgs;
    }, {});
    return dispatch({
      type: UPDATE_OR_CREATE_LIST_MEDIA_REFERENCE_SUCCESS,
      payload: {
        medias,
      },
    });
  } catch (e) {
    console.error(e);
    return dispatch({
      type: UPDATE_OR_CREATE_LIST_MEDIA_REFERENCE_ERROR,
      errors: e,
    });
  }
};
