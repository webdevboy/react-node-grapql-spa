import { combineReducers } from "redux";
import {
  FETCH_REDIRECTIONS,
  FETCH_REDIRECTIONS_SUCCESS,
  FETCH_REDIRECTIONS_ERROR,
  UPDATE_REDIRECTION,
  UPDATE_REDIRECTION_SUCCESS,
  UPDATE_REDIRECTION_ERROR,
  CREATE_REDIRECTION,
  CREATE_REDIRECTION_SUCCESS,
  CREATE_REDIRECTION_ERROR,
  REMOVE_REDIRECTION,
  REMOVE_REDIRECTION_SUCCESS,
  REMOVE_REDIRECTION_ERROR,
} from '../constants/redirections';

const byId = (state = {}, action) => {
  switch (action.type) {
    case FETCH_REDIRECTIONS_SUCCESS:
      return action.response.entities.redirections;
    case CREATE_REDIRECTION_SUCCESS:
      return {
        ...state,
        [action.redirection.id]: action.redirection,
      };
    case REMOVE_REDIRECTION_SUCCESS:
      delete state[action.id];
      return state;
    case UPDATE_REDIRECTION_SUCCESS:
      return {
        ...state,
        [action.response.id]: action.response,
      };
    default:
      return state;
  }
};

const ids = (state = [], action) => {
  switch (action.type) {
    case FETCH_REDIRECTIONS_SUCCESS:
      return action.response.result.redirections;
    case CREATE_REDIRECTION_SUCCESS:
      return [...state, action.redirection.id];
    case REMOVE_REDIRECTION_SUCCESS:
      return state.filter(id => (id !== action.id));
    default:
      return state;
  }
};

const isFetching = (state = false, action) => {
  switch (action.type) {
    case FETCH_REDIRECTIONS:
      return true;
    case FETCH_REDIRECTIONS_SUCCESS:
    case FETCH_REDIRECTIONS_ERROR:
      return false;
    default:
      return state;
  }
};

const isLoading = (state = false, action) => {
  switch (action.type) {
    case CREATE_REDIRECTION:
    case REMOVE_REDIRECTION:
    case UPDATE_REDIRECTION:
      return true;
    case CREATE_REDIRECTION_SUCCESS:
    case REMOVE_REDIRECTION_SUCCESS:
    case UPDATE_REDIRECTION_SUCCESS:
    case CREATE_REDIRECTION_ERROR:
    case REMOVE_REDIRECTION_ERROR:
    case UPDATE_REDIRECTION_ERROR:
      return false;
    default:
      return state;
  }
};

const errors = (state = null, action) => {
  switch (action.type) {
    case CREATE_REDIRECTION_ERROR:
    case REMOVE_REDIRECTION_ERROR:
    case UPDATE_REDIRECTION_ERROR:
    case FETCH_REDIRECTIONS_ERROR:
      return action.errors;
    case CREATE_REDIRECTION_SUCCESS:
    case REMOVE_REDIRECTION_SUCCESS:
    case UPDATE_REDIRECTION_SUCCESS:
    case FETCH_REDIRECTIONS_SUCCESS:
      return null;
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
