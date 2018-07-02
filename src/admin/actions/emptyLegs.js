import { normalize } from "normalizr";
import {
  FETCH_EMPTY_LEGS,
  FETCH_EMPTY_LEGS_SUCCESS,
  FETCH_EMPTY_LEGS_ERRORS,
  REMOVE_EMPTY_LEG,
  REMOVE_EMPTY_LEG_SUCCESS,
  REMOVE_EMPTY_LEG_ERROR,
  ADD_EMPTY_LEG,
  ADD_EMPTY_LEG_SUCCESS,
  ADD_EMPTY_LEG_ERROR,
} from "admin/constants/emptylegs";

import { postSchema } from "../actions/_schema";
import fetchEmptyLegsQuery from "../queries/fetchEmptyLegs.graphql";
import addEmptyLegMutation from "admin/mutations/addEmptyLeg.graphql";
import removeEmptyLegMutation from "admin/mutations/removeEmptyLeg.graphql";

export const fetchEmptyLegs = (query = {}) => {
  return async (dispatch, getState, { client }) => {
    dispatch({
      type: FETCH_EMPTY_LEGS,
    });

    const { data, errors } = await client.query({
      query: fetchEmptyLegsQuery,
      variables: query,
      fetchPolicy: "cache-first",
    });
    return errors
      ? dispatch({
          type: FETCH_EMPTY_LEGS_ERRORS,
          response: errors,
        })
      : dispatch({
          type: FETCH_EMPTY_LEGS_SUCCESS,
          response: data.emptylegs,
        });
  };
};

export const fetchEmptyLeg = () => {
  return async (dispatch, getState, { client }) => {
    dispatch({
      type: FETCH_EMPTY_LEGS,
    });

    const { data, errors } = await client.query({
      query: fetchEmptyLegsQuery,
      fetchPolicy: "cache-first",
    });
    return errors
      ? dispatch({
          type: FETCH_EMPTY_LEGS_ERRORS,
          response: errors,
        })
      : dispatch({
          type: FETCH_EMPTY_LEGS_SUCCESS,
          response: data.emptylegs,
        });
  };
};

export const addEmptyLeg = (newEmptyLeg) => {
  return async (dispatch, getState, { client }) => {
    dispatch({
      type: ADD_EMPTY_LEG,
    });

    const { data, errors } = await client.mutate({
      mutation: addEmptyLegMutation,
      variables: {
        ...newEmptyLeg,
      },
    });

    return errors
      ? dispatch({
          type: ADD_EMPTY_LEG_ERROR,
          response: errors,
        })
      : dispatch({
          type: ADD_EMPTY_LEG_SUCCESS,
          response: data.emptyLeg,
        });
  };
};

export const removeEmptyLeg = (id) => {
  console.log("REMOVE => ", id);
  return async (dispatch, getState, { client }) => {
    try {
      dispatch({ type: REMOVE_EMPTY_LEG });

      const { data, errors } = await client.mutate({
        mutation: removeEmptyLegMutation,
        variables: {
          id: id
        },
      });

      if (typeof errors !== "undefined") {
        return dispatch({
          type: REMOVE_EMPTY_LEG_ERROR,
          errors,
        });
      }

      return dispatch({
        type: REMOVE_EMPTY_LEG_SUCCESS,
        id: data.remove.id,
      });
    } catch (e) {
      return dispatch({
        type: REMOVE_EMPTY_LEG_ERROR,
        errors: e,
      });
    }
  };
};