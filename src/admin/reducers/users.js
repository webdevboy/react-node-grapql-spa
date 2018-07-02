import { combineReducers } from "redux";
import { reduce } from "lodash";
import {
  START_FETCHING_USERS,
  FETCHING_USERS_SUCCESS,
  FETCHING_USERS_ERROR,
  ADD_USER,
  ADD_USER_SUCCESS,
  ADD_USER_ERROR,
  REMOVE_USERS,
  REMOVE_USERS_SUCCESS,
  REMOVE_USERS_ERROR,
  EDIT_USER,
  EDIT_USER_SUCCESS,
  EDIT_USER_ERROR,
  USERS_SET_VISIBILITY_FILTER,
  USERS_REMOVE_VISIBILITY_FILTER,
  START_FETCHING_USER,
  FETCHING_USER_SUCCESS,
  FETCHING_USER_ERROR,
} from "../constants/users";

// const user = (state = {}, action) => {
//   switch(action.type) {
//     case ADD_USER_SUCCESS:
//     case EDIT_USER_SUCCESS:
//       return {
//         ...state,
//         ...action.reponse
//       }
//     default:
//       return state
//   }
// }

const byId = (state = {}, action) => {
  switch (action.type) {
    case FETCHING_USERS_SUCCESS:
      return {
        ...state,
        ...action.response.entities.users,
      };

    case FETCHING_USER_SUCCESS:
      return {
        ...state,
        [action.response.user.id]: action.response.user,
      };

    case ADD_USER_SUCCESS:
    case EDIT_USER_SUCCESS:

      return {
        ...state,
        [action.response.user.id]: action.response.user,
      };

    case REMOVE_USERS_SUCCESS:

      if (action.response.rows >= 1) {
        action.response.ids.every(id => delete state[id]);
      }

      return state;

    default:
      return state;
  }
};

const ids = (state = [], action) => {
  switch (action.type) {
    case FETCHING_USERS_SUCCESS:
      return action.response.result.users;

    case FETCHING_USER_SUCCESS:
      if (!state.includes(action.response.user.id)) {
        return [
          ...state,
          action.response.user.id,
        ];
      }

    case ADD_USER_SUCCESS:
      return [
        ...state,
        action.response.user.id,
      ];

    case REMOVE_USERS_SUCCESS:
      return state.filter(id => !action.response.ids.includes(id));

    default:
      return state;
  }
};

const isFetching = (state = false, action) => {
  switch (action.type) {
    case START_FETCHING_USER:
    case START_FETCHING_USERS:
      return true;
    case FETCHING_USERS_SUCCESS:
    case FETCHING_USERS_ERROR:
    case FETCHING_USER_ERROR:
    case FETCHING_USER_SUCCESS:
      return false;
    default:
      return state;
  }
};

const isLoading = (state = false, action) => {
  switch (action.type) {
    case ADD_USER:
    case EDIT_USER:
    case REMOVE_USERS:
      return true;

    case ADD_USER_SUCCESS:
    case ADD_USER_ERROR:
    case EDIT_USER_ERROR:
    case EDIT_USER_SUCCESS:
    case REMOVE_USERS_ERROR:
    case REMOVE_USERS_SUCCESS:
      return false;
    default:
      return state;
  }
};

const visibilityFilter = (state = null, action) => {
  switch (action.type) {
    case USERS_SET_VISIBILITY_FILTER:
      return action.filter;
    case USERS_REMOVE_VISIBILITY_FILTER:
      return null;
    default:
      return state;
  }
};

const errors = (state = null, action) => {
  switch (action.type) {
    case ADD_USER_SUCCESS:
    case FETCHING_USERS_SUCCESS:
    case EDIT_USER_SUCCESS:
    case REMOVE_USERS_SUCCESS:
    case FETCHING_USER_SUCCESS:
      return null;

    case ADD_USER_ERROR:
    case FETCHING_USERS_ERROR:
    case EDIT_USER_ERROR:
    case REMOVE_USERS_ERROR:
    case FETCHING_USER_ERROR:
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
  visibilityFilter,
  errors,
});
