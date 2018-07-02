import {
  START_FETCHING_ARTICLES_CATEGORIES,
  START_FETCHING_ARTICLES_CATEGORIES_SUCCESS,
  START_FETCHING_ARTICLES_CATEGORIES_ERROR,
  SET_ARTICLES_CATEGORIES_VISIBILITY_FILTER,
  REMOVE_CATEGORIES_POSTS_VISIBILITY_FILTER,
  RESET_CATEGORIES_POSTS_VISIBILITY_FILTER,
} from "../constants/articles";

import { combineReducers } from "redux";

const byId = (state = {}, action) => {
  switch (action.type) {
    case START_FETCHING_ARTICLES_CATEGORIES_SUCCESS:
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
    case START_FETCHING_ARTICLES_CATEGORIES_SUCCESS:
      return action.response.result.categories;
    default:
      return state;
  }
};

const isFetching = (state = false, action) => {
  switch (action.type) {
    case START_FETCHING_ARTICLES_CATEGORIES:
      return true;

    case START_FETCHING_ARTICLES_CATEGORIES_SUCCESS:
    case START_FETCHING_ARTICLES_CATEGORIES_ERROR:
      return false;
    default:
      return state;
  }
};

const errors = (state = null, action) => {
  switch (action.type) {
    case START_FETCHING_ARTICLES_CATEGORIES_ERROR:
      return action.errors;
    case START_FETCHING_ARTICLES_CATEGORIES_SUCCESS:
      return null;
    default:
      return state;
  }
};

const visibilityFilter = (state = null, action) => {
  switch (action.type) {
    case SET_ARTICLES_CATEGORIES_VISIBILITY_FILTER:
      return action.filter;

    case REMOVE_CATEGORIES_POSTS_VISIBILITY_FILTER:
      return null;

    default:
      return state;
  }
};

export default combineReducers({
  byId,
  ids,
  isFetching,
  visibilityFilter,
  errors,
});
