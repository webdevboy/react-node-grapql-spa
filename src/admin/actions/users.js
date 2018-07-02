import {
  START_FETCHING_USERS,
  FETCHING_USERS_SUCCESS,
  FETCHING_USERS_ERROR,
  START_FETCHING_USER,
  FETCHING_USER_SUCCESS,
  FETCHING_USER_ERROR,
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
} from "../constants/users";

import gql from "graphql-tag";
import { normalize } from "normalizr";
import { userSchema } from "./_schema";

import fetchUsersQuery from "../queries/fetchUsers.graphql";
import fetchUserQuery from "../queries/fetchUser.graphql";

import createUser from "../mutations/createUser.graphql";
import removeUsersMutation from "../mutations/removeUsers.graphql";
import editUserMutation from "../mutations/editUser.graphql";

const fetchUsers = function (query = {}, pagination = {}) {
  return async (dispatch, getState, { client }) => {
    dispatch({ type: START_FETCHING_USERS });

    try {
      const { data, errors } = await client.query({
        query: fetchUsersQuery,
        variables: {
          query,
          pagination,
        },
        fetchPolicy: "cache-first",
      });


      if (typeof errors !== "undefined") {
        return dispatch({
          type: FETCHING_USERS_ERROR,
          errors,
        });
      }

      console.log("USER DATA => ", data);
      console.log("NORMALIZED =>", normalize(data, userSchema));
      return dispatch({
        type: FETCHING_USERS_SUCCESS,
        response: normalize(data, userSchema),
      });
    } catch (e) {
      return dispatch({
        type: FETCHING_USERS_ERROR,
        errors: e,
      });
    }
  };
};

const fetchUser = function (id) {
  return async (dispatch, getState, { client }) => {
    dispatch({ type: START_FETCHING_USER });

    try {
      const { data, errors } = await client.query({
        query: fetchUserQuery,
        variables: {
          id,
        },
        fetchPolicy: "cache-first",
      });

      if (typeof errors !== "undefined") {
        return dispatch({
          type: ADD_USER_ERROR,
          errors,
        });
      }
      return dispatch({
        type: FETCHING_USER_SUCCESS,
        response: {
          user: data.user,
        },
      });
    } catch (e) {
      return dispatch({
        type: FETCHING_USER_ERROR,
        errors: e,
      });
    }
  };
};

const addUser = function (user) {
  return async (dispatch, getState, { client }) => {
    dispatch({ type: ADD_USER });

    try {
      // something
      const { data, errors } = await client.mutate({
        mutation: createUser,
        variables: {
          ...user,
        },
      });

      if (typeof errors !== "undefined") {
        return dispatch({
          type: ADD_USER_ERROR,
          errors,
        });
      }

      return dispatch({
        type: ADD_USER_SUCCESS,
        response: {
          user: {
            ...data.user,
            role: data.user.role.id,
          }
        },
      });
    } catch (e) {
      return dispatch({
        type: ADD_USER_ERROR,
        errors: e,
      });
    }
  };
};

const setFilter = function ({ filter }) {
  return {
    type: USERS_SET_VISIBILITY_FILTER,
    filter,
  };
};

const removeFilter = function () {
  return { type: USERS_REMOVE_VISIBILITY_FILTER };
};

const removeUsers = function (ids) {
  return async (dispatch, getState, { client }) => {
    dispatch({ type: REMOVE_USERS });

    try {
      const { data, errors } = await client.mutate({
        mutation: removeUsersMutation,
        variables: {
          id: ids,
        },
      });

      if (typeof errors !== "undefined") {
        return dispatch({
          type: REMOVE_USERS_ERROR,
          errors,
        });
      }
      return dispatch({
        type: REMOVE_USERS_SUCCESS,
        response: data.removeUsers,
      });
    } catch (e) {
      return dispatch({
        type: REMOVE_USERS_ERROR,
        errors: e,
      });
    }
  };
};

const editUser = function (id, user) {
  return async (dispatch, getState, { client }) => {
    dispatch({ type: EDIT_USER });

    console.log("DEBUG EDIT USER => ", id, user);

    try {
      const { data, errors } = await client.mutate({
        mutation: editUserMutation,
        variables: {
          id,
          ...user,
        },
      });

      if (typeof errors !== "undefined") {
        return dispatch({
          type: EDIT_USER_ERROR,
          errors,
        });
      }

      return dispatch({
        type: EDIT_USER_SUCCESS,
        response: {
          user: {
            ...data.user,
            role: data.user.role.id,
          }
        },
      });
    } catch (e) {
      return dispatch({
        type: EDIT_USER_ERROR,
        errors: e,
      });
    }
  };
};

export { fetchUsers, fetchUser, setFilter, removeFilter, addUser, editUser, removeUsers };
