import { combineReducers } from "redux";
import * as _ from "lodash";
import {
  FETCH_POST,
  FETCH_POSTS,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_ERROR,
  ADD_POSTS_SUCCESS,
  FETCH_POST_SUCCESS,
  REMOVE_POST_SUCCESS,
} from "admin/constants/posts";

const defaultState = {
  byId: {},
  isLoading: false
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case FETCH_POSTS:
      return Object.assign({}, state, {
        isLoading: true
      });
    case FETCH_POST:
      return Object.assign({}, state, {
        isLoading: true
      });
    case FETCH_POSTS_SUCCESS:
      const posts = _.keyBy(action.response, post => post.id);
      const changedPosts = Object.assign({}, state.byId, posts);

      return {
        ...state,
        byId: changedPosts,
        isLoading: false
      };
    case FETCH_POST_SUCCESS:
    case ADD_POSTS_SUCCESS:
      const post = action.response;
      return {
        ...state,
        isLoading: false,
        byId : {
          [post.id]: post,
        }
      };
    case REMOVE_POST_SUCCESS:
      const byId = Object.assign({}, state.byId);
      action.ids.forEach(id => delete byId[id]);
      return {
        ...state,
        isLoading: false,
        byId
      }
    default:
      return state;
  }
};
