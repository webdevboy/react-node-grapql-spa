import { combineReducers } from "redux";
import { reduce } from "lodash";
import {
  START_FETCHING_LANGUAGES,
  FETCHING_LANGUAGES_SUCCESS,
  FETCHING_LANGUAGES_ERROR,
  START_FETCHING_STRINGS,
  FETCHING_STRINGS_SUCCESS,
  FETCHING_STRINGS_ERROR,
  ADD_LANGUAGE_SUCCESS,
  ADD_LANGUAGE_ERROR,
  ADD_LANGUAGE,
  UPDATE_LANGUAGE,
  UPDATE_LANGUAGE_SUCCESS,
  UPDATE_LANGUAGE_ERROR,
  REMOVE_LANGUAGE,
  REMOVE_LANGUAGE_SUCCESS,
  REMOVE_LANGUAGE_ERROR,
  UPDATE_STRING,
  UPDATE_STRING_SUCCESS,
  UPDATE_STRING_ERROR,
  CREATE_STRING,
  CREATE_STRING_SUCCESS,
  CREATE_STRING_ERROR,
  ENABLE_LANGUAGE,
  ENABLE_LANGUAGE_SUCCESS,
  ENABLE_LANGUAGE_ERROR,
  DISABLE_LANGUAGE,
  DISABLE_LANGUAGE_SUCCESS,
  DISABLE_LANGUAGE_ERROR,
  START_FETCHING_LANGUAGE,
  FETCHING_LANGUAGE_SUCCESS,
  FETCHING_LANGUAGE_ERROR,
} from "../constants/translations";
import strings from "./strings";

const byId = (state = {}, action) => {
  switch (action.type) {
    case FETCHING_LANGUAGES_SUCCESS:
      return {
        ...state,
        ...action.response.entities.languages,
      };

    case ADD_LANGUAGE_SUCCESS:
      return {
        ...state,
        [action.response.result.language]: action.response.entities.languages[action.response.result.language],
      };

    case FETCHING_LANGUAGE_SUCCESS:
      return {
        ...state,
        [action.response.result.language.locale]: action.response.result.language,
      }

    case DISABLE_LANGUAGE_SUCCESS:
      return {
        ...state,
        [action.response.language.locale]: {
          ...state[action.response.language.locale],
          enabled: false,
        },
      }
    case ENABLE_LANGUAGE_SUCCESS:
      return {
        ...state,
        [action.response.language.locale]: {
          ...state[action.response.language.locale],
          enabled: true,
        },
      }
    case UPDATE_LANGUAGE_SUCCESS:
      return {
        ...state,
        [action.response.result.language]: {
          ...state[action.response.result.language],
          ...action.response.entities.languages[action.response.result.language],
        },
      };

    case REMOVE_LANGUAGE_SUCCESS:
      delete state[action.response.result.language];
      return state;

    case UPDATE_STRING:
    case CREATE_STRING:
    case FETCHING_STRINGS_SUCCESS:
    case UPDATE_STRING_SUCCESS:
    case UPDATE_STRING_ERROR:
    case CREATE_STRING_SUCCESS:
    case CREATE_STRING_ERROR:

      return {
        ...state,
        [action.response.locale]: {
          ...state[action.response.locale],
          strings: strings(state[action.response.locale].strings, action),
        },
      };

    default:
      return state;
  }
};

const ids = (state = [], action) => {
  switch (action.type) {
    case FETCHING_LANGUAGE_SUCCESS:
      return [action.response.result.language];

    case FETCHING_LANGUAGES_SUCCESS:
      return action.response.result.languages;

    case ADD_LANGUAGE_SUCCESS:
      return [
        ...state,
        action.response.result.language,
      ];

    case REMOVE_LANGUAGE_SUCCESS:
      return state.filter(id => action.response.result.language !== id);

    default:
      return state;
  }
};

const isFetching = (state = false, action) => {
  switch (action.type) {
    case START_FETCHING_LANGUAGES:
    case START_FETCHING_STRINGS:
      return true;
    case FETCHING_STRINGS_SUCCESS:
    case FETCHING_STRINGS_ERROR:
    case FETCHING_LANGUAGES_SUCCESS:
    case FETCHING_LANGUAGES_ERROR:
      return false;
    default:
      return state;
  }
};

const isLoading = (state = false, action) => {
  switch (action.type) {
    case ADD_LANGUAGE:
    case UPDATE_LANGUAGE:
    case REMOVE_LANGUAGE:
      return true;

    case ADD_LANGUAGE_SUCCESS:
    case ADD_LANGUAGE_ERROR:
    case UPDATE_LANGUAGE_ERROR:
    case UPDATE_LANGUAGE_SUCCESS:
    case REMOVE_LANGUAGE_ERROR:
    case REMOVE_LANGUAGE_SUCCESS:
      return false;
    default:
      return state;
  }
};

const errors = (state = null, action) => {
  switch (action.type) {
    case ADD_LANGUAGE_SUCCESS:
    case FETCHING_LANGUAGES_SUCCESS:
    case UPDATE_LANGUAGE_SUCCESS:
    case REMOVE_LANGUAGE_SUCCESS:
    case FETCHING_STRINGS_SUCCESS:
      return null;

    case ADD_LANGUAGE_ERROR:
    case FETCHING_LANGUAGES_ERROR:
    case UPDATE_LANGUAGE_ERROR:
    case REMOVE_LANGUAGE_ERROR:
    case FETCHING_STRINGS_ERROR:
      return action.errors;

    default:
      return state;
  }
};


export default combineReducers({
  byId,
  ids,
  isFetching,
  isLoading,
  errors,
});
