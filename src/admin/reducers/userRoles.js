import { combineReducers } from "redux";
import { reduce } from "lodash";
import {
  START_FETCHING_ROLES,
  FETCHING_ROLES_SUCCESS,
  FETCHING_ROLES_ERROR,
  ADD_ROLE,
  ADD_ROLE_SUCCESS,
  ADD_ROLE_ERROR,
  REMOVE_ROLES,
  REMOVE_ROLES_SUCCESS,
  REMOVE_ROLES_ERROR,
  EDIT_ROLE,
  EDIT_ROLE_SUCCESS,
  EDIT_ROLE_ERROR,
  START_FETCHING_ROLE,
  FETCHING_ROLE_SUCCESS,
  FETCHING_ROLE_ERROR,
} from "../constants/userRoles";

import {
  START_FETCHING_PERMISSIONS,
  FETCHING_PERMISSIONS_SUCCESS,
  FETCHING_PERMISSIONS_ERROR,
} from "../constants/userPermissions";

const byId = (state = {}, action) => {
  switch (action.type) {
    case FETCHING_ROLES_SUCCESS:
      return {
        ...state,
        ...action.response.entities.roles,
      };

    case FETCHING_ROLE_SUCCESS:
      return {
        ...state,
        [action.response.role.id]: action.response.role,
      };

    case ADD_ROLE_SUCCESS:
    case EDIT_ROLE_SUCCESS:

      return {
        ...state,
        [action.response.role.id]: action.response.role,
      };

    case REMOVE_ROLES_SUCCESS:

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
    case FETCHING_ROLES_SUCCESS:
      return action.response.result.roles;

    case FETCHING_ROLE_SUCCESS:
      if (!state.includes(action.response.role.id)) {
        return [
          ...state,
          action.response.role.id,
        ];
      }

    case ADD_ROLE_SUCCESS:
      return [
        ...state,
        action.response.role.id,
      ];

    case REMOVE_ROLES_SUCCESS:
      return state.filter(id => !action.response.ids.includes(id));

    default:
      return state;
  }
};

const isFetching = (state = false, action) => {
  switch (action.type) {
    case START_FETCHING_ROLE:
    case START_FETCHING_ROLES:
      return true;
    case FETCHING_ROLES_SUCCESS:
    case FETCHING_ROLES_ERROR:
    case FETCHING_ROLE_ERROR:
    case FETCHING_ROLE_SUCCESS:
      return false;
    default:
      return state;
  }
};

const isLoading = (state = false, action) => {
  switch (action.type) {
    case ADD_ROLE:
    case EDIT_ROLE:
    case REMOVE_ROLES:
      return true;

    case ADD_ROLE_SUCCESS:
    case ADD_ROLE_ERROR:
    case EDIT_ROLE_ERROR:
    case EDIT_ROLE_SUCCESS:
    case REMOVE_ROLES_ERROR:
    case REMOVE_ROLES_SUCCESS:
      return false;
    default:
      return state;
  }
};

const errors = (state = null, action) => {
  switch (action.type) {
    case ADD_ROLE_SUCCESS:
    case FETCHING_ROLES_SUCCESS:
    case EDIT_ROLE_SUCCESS:
    case REMOVE_ROLES_SUCCESS:
    case FETCHING_ROLE_SUCCESS:
      return null;

    case ADD_ROLE_ERROR:
    case FETCHING_ROLES_ERROR:
    case EDIT_ROLE_ERROR:
    case REMOVE_ROLES_ERROR:
    case FETCHING_ROLE_ERROR:
      return action.errors;

    default:
      return state;
  }
};

const permissions = combineReducers({
  byId(state = {}, action) {
    switch (action.type) {
      case FETCHING_PERMISSIONS_SUCCESS:
        return action.response.entities.permissions;
      default:
        return state;
    }
  },
  ids(state = [], action) {
    switch (action.type) {
      case FETCHING_PERMISSIONS_SUCCESS:
        return action.response.result.permissions;
      default:
        return state;
    }
  },
});

export default combineReducers({
  byId,
  ids,
  isFetching,
  isLoading,
  errors,
  permissions,
});
