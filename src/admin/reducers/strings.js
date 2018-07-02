import { combineReducers } from "redux";
import { reduce } from "lodash";
import {
  START_FETCHING_STRINGS,
  FETCHING_STRINGS_SUCCESS,
  FETCHING_STRINGS_ERROR,
  UPDATE_STRING,
  UPDATE_STRING_SUCCESS,
  UPDATE_STRING_ERROR,
  CREATE_STRING,
  CREATE_STRING_SUCCESS,
  CREATE_STRING_ERROR,
} from "../constants/translations";

const byId = (state = {}, action) => {
  switch (action.type) {
    case FETCHING_STRINGS_SUCCESS:
      return {
        ...state,
        ...action.response.entities.strings,
      };
    case UPDATE_STRING_SUCCESS:
      return {
        ...state,
        [action.response.result.string]: {
          ...state[action.response.result.string],
          ...action.response.entities.string[action.response.result.string],
          isLoading: false,
        },
      };

    case UPDATE_STRING:
      return {
        ...state,
        [action.response.id]: {
          ...state[action.response.id],
          isLoading: true,
        },
      };
    default:
      return state;
  }
};

const ids = (state = [], action) => {
  switch (action.type) {
    case FETCHING_STRINGS_SUCCESS:
      return action.response.result.strings;
    default:
      return state;
  }
};

export default combineReducers({
  byId,
  ids,
});
