import { combineReducers } from "redux";
import {
  START_FETCHING_FILES,
  START_FETCHING_FILES_SUCCESS,
  START_FETCHING_FILES_ERROR,
  START_UPLOAD,
  START_UPLOAD_SUCCESS,
  START_UPLOAD_ERROR,
  CREATE_FOLDER,
  CREATE_FOLDER_SUCCESS,
  CREATE_FOLDER_ERROR,
  CHANGE_FOLDER,
  // CHANGE_FOLDER_SUCCESS,
  // CHANGE_FOLDER_ERROR,
  UPDATE_OR_CREATE_TRANSLATION,
  UPDATE_OR_CREATE_TRANSLATION_SUCCESS,
  UPDATE_OR_CREATE_TRANSLATION_ERROR,
  START_FETCHING_MEDIA,
  START_FETCHING_MEDIA_SUCCESS,
  START_FETCHING_MEDIA_ERROR,
  DELETE_FILE,
  DELETE_FILE_SUCCESS,
  DELETE_FILE_ERROR,
  SET_RICH_MEDIA_LIST_SUCCESS,
  UPDATE_OR_CREATE_MEDIA_REFERENCE_SUCCESS,
  UPDATE_OR_CREATE_LIST_MEDIA_REFERENCE_SUCCESS,
} from "../constants/media";

const media = (state = {}, action) => {
  switch (action.type) {
    case START_FETCHING_MEDIA_SUCCESS:
      return {
        ...state,
        media: action.response.media,
      };
    case UPDATE_OR_CREATE_TRANSLATION_SUCCESS: {
      const currentTranslationsIds = state.media.translations.map(translation => translation.id);
      let newTranslationsArray;
      if (currentTranslationsIds.includes(action.response.id)) {
        newTranslationsArray = state.media.translations.map(translation => {
          if (translation.id === action.response.id) {
            return action.response;
          }
          return translation;
        });
      } else {
        newTranslationsArray = [...state.media.translations, action.response];
      }

      return {
        ...state,
        media: {
          ...state.media,
          translations: newTranslationsArray,
        },
      };
    }
    default:
      return state;
  }
};

const currentFolder = (state = null, action) => {
  switch (action.type) {
    case CHANGE_FOLDER:
      return action.folder;
    default:
      return state;
  }
};

const FOLDER_INITIAL_STATE = [];
const folders = (state = FOLDER_INITIAL_STATE, action) => {
  switch (action.type) {
    case CREATE_FOLDER_SUCCESS:
      return [
        ...state,
        action.response,
      ];
    case START_FETCHING_FILES_SUCCESS:
      return action.response.result.folders;
    case CHANGE_FOLDER:
      return FOLDER_INITIAL_STATE;
    default:
      return state;
  }
};

const FILES_BYID_INITIAL_STATE = {};
const byId = (state = FILES_BYID_INITIAL_STATE, action) => {
  // console.log(state, action)
  switch (action.type) {
    case START_FETCHING_MEDIA_SUCCESS:
      return {
        ...state,
        [action.response.media.key]: media(state[action.response.media.key], action),
      }
    case UPDATE_OR_CREATE_TRANSLATION_SUCCESS:
      return {
        ...state,
        [action.key]: media(state[action.key], action),
      };
    case START_UPLOAD_SUCCESS:
      action.response.media.forEach(mediaFile => {
        state[mediaFile.Key] = mediaFile.media;
      });
      return state;
    case START_FETCHING_FILES_SUCCESS:
      return action.response.entities.medias || FILES_BYID_INITIAL_STATE;
    case CHANGE_FOLDER:
      return FILES_BYID_INITIAL_STATE;
    case DELETE_FILE_SUCCESS:
      action.response.map(key => {
        delete state[key];
      });
      return state;
    default:
      return state;
  }
};

const FILES_IDS_INITIAL_STATE = [];
const ids = (state = FILES_IDS_INITIAL_STATE, action) => {
  switch (action.type) {
    case START_UPLOAD_SUCCESS:
      return state.concat(action.response.media.map(media => media.Key));
    case START_FETCHING_FILES_SUCCESS:
      return action.response.result.medias;
    case CHANGE_FOLDER:
      return FILES_IDS_INITIAL_STATE;
    case DELETE_FILE_SUCCESS:
      action.response.map(key => {
        state.splice(state.indexOf(key), 1);
      });
      return state;
    default:
      return state;
  }
};

const richMedia = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_OR_CREATE_MEDIA_REFERENCE_SUCCESS:
      return {
        ...state,
        [action.response.media_id]: [action.response.media.src],
      }
    case UPDATE_OR_CREATE_LIST_MEDIA_REFERENCE_SUCCESS:
      return {
        ...state,
        ...action.payload.medias,
      }
    case SET_RICH_MEDIA_LIST_SUCCESS:
      return {
        ...state,
        ...action.payload.medias
      }
    default:
      return state;
  }
};

const isLoading = (state = false, action) => {
  switch (action.type) {
    case START_UPLOAD:
    case CREATE_FOLDER:
      return true;
    case START_UPLOAD_SUCCESS:
    case START_UPLOAD_ERROR:
    case CREATE_FOLDER_SUCCESS:
    case CREATE_FOLDER_ERROR:
      return false;
    default:
      return state;
  }
};

const isFetching = (state = false, action) => {
  switch (action.type) {
    case START_FETCHING_FILES:
    case START_FETCHING_MEDIA:
      return true;
    case START_FETCHING_FILES_SUCCESS:
    case START_FETCHING_FILES_ERROR:
    case START_FETCHING_MEDIA_SUCCESS:
    case START_FETCHING_MEDIA_ERROR:
      return false;
    default:
      return state;
  }
};

const errors = (state = null, action) => {
  switch (action.type) {
    case START_UPLOAD_ERROR:
    case CREATE_FOLDER_ERROR:
    case START_FETCHING_MEDIA_ERROR:
      return action.errors;
    case START_UPLOAD_SUCCESS:
    case CREATE_FOLDER_SUCCESS:
    case START_FETCHING_MEDIA_SUCCESS:
      return null;
    default:
      return state;
  }
};

export default combineReducers({
  currentFolder,
  byId,
  ids,
  folders,
  isFetching,
  isLoading,
  errors,
  media,
  richMedia
});
