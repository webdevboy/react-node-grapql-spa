import {
  START_FETCHING_ARTICLES_POSTS,
  START_FETCHING_ARTICLES_POSTS_SUCCESS,
  START_FETCHING_ARTICLES_POSTS_ERROR,

  START_FETCHING_ARTICLES_POST,
  START_FETCHING_ARTICLES_POST_SUCCESS,
  START_FETCHING_ARTICLES_POST_ERROR,

  ADD_ARTICLE_POST,
  ADD_ARTICLE_POST_SUCCESS,
  ADD_ARTICLE_POST_ERROR,

  EDIT_ARTICLE_POST,
  EDIT_ARTICLE_POST_SUCCESS,
  EDIT_ARTICLE_POST_ERROR,

  REMOVE_ARTICLE_POST,
  REMOVE_ARTICLE_POST_SUCCESS,
  REMOVE_ARTICLE_POST_ERROR,

  REMOVE_ARTICLE_POST_TRANSLATION,
  REMOVE_ARTICLE_POST_TRANSLATION_SUCCESS,
  REMOVE_ARTICLE_POST_TRANSLATION_ERROR,

  SET_ARTICLES_POSTS_VISIBILITY_FILTER,
  REMOVE_ARTICLES_POSTS_VISIBILITY_FILTER,
  RESET_ARTICLES_POSTS_VISIBILITY_FILTER,

  EDIT_ARTICLE_CATEGORY,
  EDIT_ARTICLE_CATEGORY_SUCCESS,
  EDIT_ARTICLE_CATEGORY_ERROR,

  EDIT_ARTICLE_FEATURED,
  EDIT_ARTICLE_FEATURED_SUCCESS,
  EDIT_ARTICLE_FEATURED_ERROR,
} from "../constants/articles";
import _ from "lodash";
import { combineReducers } from "redux";

const byId = (state = {}, action) => {
  switch (action.type) {
    case START_FETCHING_ARTICLES_POSTS_SUCCESS:
    case ADD_ARTICLE_POST_SUCCESS:
    case EDIT_ARTICLE_POST_SUCCESS:
      return {
        ...state,
        ...action.response.entities.articles,
      };

    case REMOVE_ARTICLE_POST_TRANSLATION_SUCCESS:
      delete state[action.id];
      return state;


    case REMOVE_ARTICLE_POST_SUCCESS:

      if (action.ids.length) {
        action.ids.forEach((id) => {
          delete state[id];
        });
      }
      return state;
    case EDIT_ARTICLE_CATEGORY_SUCCESS:
    case EDIT_ARTICLE_FEATURED_SUCCESS:
      return {
        ...state,
        ...action.response.entities.articles,
      };

    default:
      return state;
  }
};

const ids = (state = [], action) => {
  switch (action.type) {
    case START_FETCHING_ARTICLES_POSTS_SUCCESS:
      return action.response.result.articles;
    case ADD_ARTICLE_POST_SUCCESS:
      return state.concat(action.response.result.articles);

    case REMOVE_ARTICLE_POST_SUCCESS:
      return state.filter(id => !action.ids.includes(id));

    case REMOVE_ARTICLE_POST_TRANSLATION_SUCCESS:
      return state.filter(id => (id !== action.id));

    default:
      return state;
  }
};

const isLoading = (state = false, action) => {
  switch (action.type) {
    case ADD_ARTICLE_POST:
    case EDIT_ARTICLE_POST:
      return true;
    case ADD_ARTICLE_POST_SUCCESS:
    case ADD_ARTICLE_POST_ERROR:
    case EDIT_ARTICLE_POST_ERROR:
    case EDIT_ARTICLE_POST_SUCCESS:
      return false;
    default:
      return state;
  }
};

const isFetching = (state = {}, action) => {
  switch (action.type) {
    case START_FETCHING_ARTICLES_POSTS:
      return true;
    case START_FETCHING_ARTICLES_POSTS_SUCCESS:
    case START_FETCHING_ARTICLES_POSTS_ERROR:
      return false;
    default:
      return state;
  }
};

const errors = (state = {}, action) => {
  switch (action.type) {
    case ADD_ARTICLE_POST_ERROR:
    case EDIT_ARTICLE_POST_ERROR:
    case START_FETCHING_ARTICLES_POSTS_ERROR:
      return action.errors;
    case ADD_ARTICLE_POST_SUCCESS:
    case EDIT_ARTICLE_POST_SUCCESS:
    case START_FETCHING_ARTICLES_POSTS_SUCCESS:
      return null;
    default:
      return state;
  }
};

const visibilityFilter = (state = [], action) => {
  let index;

  switch (action.type) {
    case SET_ARTICLES_POSTS_VISIBILITY_FILTER:
      index = _.findIndex(state, { field: action.filter.field });

      if (index === -1) {
        return state.concat(action.filter);
      }
      state[index] = action.filter;
      return state;

    case REMOVE_ARTICLES_POSTS_VISIBILITY_FILTER:
    case RESET_ARTICLES_POSTS_VISIBILITY_FILTER:
      index = _.findIndex(state, { field: action.field });

      if (index === -1) {
        return state;
      }

      return [
        ...state.splice(0, index),
        ...state.splice(index, state.length - 1),
      ];

    default:
      return state;
  }
};

export default combineReducers({
  byId,
  ids,
  isFetching,
  isLoading,
  visibilityFilter,
  errors,
});
