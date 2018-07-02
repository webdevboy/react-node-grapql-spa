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
} from "../constants/userRoles";
import gql from "graphql-tag";

import { normalize } from "normalizr";
import { userRoleSchema } from "./_schema";

import getRolesQuery from "../queries/fetchRoles.graphql";
import getRoleQuery from "../queries/fetchRole.graphql";

import createRole from "../mutations/createRole.graphql";
import removeRolesMutation from "../mutations/removeRoles.graphql";
import editRoleMutation from "../mutations/editRole.graphql";

const fetchRoles = function () {
  return async (dispatch, getState, { client }) => {
    dispatch({ type: START_FETCHING_ROLES });

    try {
      const { data, errors } = await client.query({
        query: getRolesQuery,
        fetchPolicy: "cache-first",
      });

      if (typeof errors !== "undefined") {
        return dispatch({
          type: FETCHING_ROLES_ERROR,
          errors,
        });
      }

      console.log("NORMALIZED ROLE =>", normalize(data, userRoleSchema));
      return dispatch({
        type: FETCHING_ROLES_SUCCESS,
        response: normalize(data, userRoleSchema),
      });
    } catch (e) {
      return dispatch({
        type: FETCHING_ROLES_ERROR,
        errors: e,
      });
    }
  };
};

const fetchRole = function (id) {
  return async (dispatch, getState, { client }) => {
    dispatch({ type: START_FETCHING_ROLES });

    try {
      const { data, errors } = await client.query({
        query: fetchRoleQuery,
        variables: {
          id,
        },
        fetchPolicy: "cache-first",
      });

      if (typeof errors !== "undefined") {
        return dispatch({
          type: FETCHING_USER_ERROR,
          errors,
        });
      }

      return dispatch({
        type: FETCHING_USER_SUCCESS,
        response: {
          user: data.role,
        },
      });
    } catch (e) {
      return dispatch({
        type: FETCHING_ROLES_ERROR,
        errors: e,
      });
    }
  };
};

const addRole = function (role) {
  return async (dispatch, getState, { client }) => {
    dispatch({ type: ADD_ROLE });

    try {
      // something

      const { data, errors } = await client.mutate({
        mutation: createRole,
        variables: {
          ...role,
        },
      });

      if (typeof errors !== "undefined") {
        return dispatch({
          type: ADD_ROLE_ERROR,
          errors,
        });
      }

      return dispatch({
        type: ADD_ROLE_SUCCESS,
        response: {
          role: data.role,
        },
      });
    } catch (e) {
      return dispatch({
        type: ADD_ROLE_ERROR,
        errors: e,
      });
    }
  };
};

const editRole = function (id, role) {
  return async (dispatch, getState, { client }) => {
    dispatch({ type: EDIT_ROLE });

    console.log("DEBUG EDIT USER => ", id, role);

    try {
      const { data, errors } = await client.mutate({
        mutation: editRoleMutation,
        variables: {
          id,
          ...role,
        },
      });

      if (typeof errors !== "undefined") {
        return dispatch({
          type: EDIT_ROLE_ERROR,
          errors,
        });
      }

      return dispatch({
        type: EDIT_ROLE_SUCCESS,
        response: {
          role: data.role,
        },
      });
    } catch (e) {
      return dispatch({
        type: EDIT_ROLE_ERROR,
        errors: e,
      });
    }
  };
};

const removeRoles = function (ids) {
  return async (dispatch, getState, { client }) => {
    dispatch({ type: REMOVE_ROLES });

    try {
      const { data, errors } = await client.mutate({
        mutation: removeRolesMutation,
        variables: {
          id: ids,
        },
      });

      if (typeof errors !== "undefined") {
        return dispatch({
          type: REMOVE_ROLES_ERROR,
          errors,
        });
      }
      return dispatch({
        type: REMOVE_ROLES_SUCCESS,
        response: data.removeRoles,
      });
    } catch (e) {
      return dispatch({
        type: REMOVE_ROLES_ERROR,
        errors: e,
      });
    }
  };
};

export { fetchRoles, fetchRole, addRole, editRole, removeRoles };
