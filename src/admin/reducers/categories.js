import { combineReducers } from "redux";
import {
  START_FETCHING_CATEGORIES,
  FETCHING_CATEGORIES_SUCCESS,
  FETCHING_CATEGORIES_ERRORS,
} from "../constants/categories";

const byId = (state = {}, action) => {
  switch (action.type) {
    case FETCHING_CATEGORIES_SUCCESS:
      return {
        ...state,
        ...action.response.entities.categories,
      };
    default:
      return state;
  }
};

const ids = (state = [], action) => {
  switch (action.type) {
    case FETCHING_CATEGORIES_SUCCESS:
      return action.response.result.categories;
    default:
      return state;
  }
};

const errors = (state = null, action) => {
  switch (action.type) {
    case FETCHING_CATEGORIES_ERRORS:
      return action.errors;
    case FETCHING_CATEGORIES_SUCCESS:
      return null;
    default:
      return state;
  }
};

const isFetching = (state = false, action) => {
  switch (action.type) {
    case START_FETCHING_CATEGORIES:
      return true;
    case FETCHING_CATEGORIES_SUCCESS:
    case FETCHING_CATEGORIES_ERRORS:
      return false;
    default:
      return state;
  }
};

export default combineReducers({
  byId,
  ids,
  errors,
  isFetching,
});
