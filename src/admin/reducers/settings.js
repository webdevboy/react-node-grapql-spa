import { combineReducers } from "redux";

import {
  FETCH_SETTINGS,
  FETCH_SETTINGS_SUCCESS,
  FETCH_SETTINGS_ERROR,
  FETCH_SENSITIVE_SETTINGS,
  FETCH_SENSITIVE_SETTINGS_SUCCESS,
  FETCH_SENSITIVE_SETTINGS_ERROR,
  UPDATE_SETTINGS_OPTION,
  UPDATE_SETTINGS_OPTION_SUCCESS,
  UPDATE_SETTINGS_OPTION_ERROR,
} from "../constants/settings";

const byId = (state = {}, action) => {
  switch (action.type) {
    case FETCH_SETTINGS_SUCCESS:
    case FETCH_SENSITIVE_SETTINGS_SUCCESS:

      return {
        ...state,
        ...action.response.entities.settings,
      };

    case UPDATE_SETTINGS_OPTION_SUCCESS:
      return {
        ...state,
        [action.response.option]: action.response,
      };

    default:
      return state;
  }
};


const ids = (state = [], action) => {
  switch (action.type) {
    case FETCH_SETTINGS_SUCCESS:
      return action.response.result.settings;

    default:
      return state;
  }
};


const errors = (state = null, action) => {
  switch (action.type) {
    case FETCH_SETTINGS_SUCCESS:
      return null;

    case FETCH_SETTINGS_ERROR:
    case UPDATE_SETTINGS_OPTION_ERROR:
      return action.errors;

    default:
      return state;
  }
};

const isLoading = (state = false, action) => {
  switch (action.type) {
    case UPDATE_SETTINGS_OPTION:
      return true;

    case UPDATE_SETTINGS_OPTION_ERROR:
    case UPDATE_SETTINGS_OPTION_SUCCESS:
      return false;

    default:
      return state;
  }
};

const isFetching = (state = false, action) => {
  switch (action.type) {
    case FETCH_SETTINGS:
      return true;

    case FETCH_SETTINGS_SUCCESS:
    case FETCH_SETTINGS_ERROR:
      return false;
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
