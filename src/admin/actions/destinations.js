import {
  START_FETCHING_DESTINATIONS,
  FETCHING_DESTINATIONS_SUCCESS,
  FETCHING_DESTINATIONS_ERRORS,
  ADD_DESTINATION,
  ADD_DESTINATION_SUCCESS,
  ADD_DESTINATION_ERROR,

  DESTINATIONS_SET_VISIBILITY_FILTER,
  DESTINATIONS_REMOVE_VISIBILITY_FILTER,
  EDIT_DESTINATION,
  EDIT_DESTINATION_SUCCESS,
  EDIT_DESTINATION_ERROR,

  REMOVE_DESTINATION,
  REMOVE_DESTINATION_SUCCESS,
  REMOVE_DESTINATION_ERROR,
  REMOVE_DESTINATION_TRANSLATION,
  REMOVE_DESTINATION_TRANSLATION_SUCCESS,
  REMOVE_DESTINATION_TRANSLATION_ERROR,
} from "admin/constants/destinations";

import fetchDestinationsQuery from "admin/queries/fetchDestinations.graphql";
import addDestinationMutation from "admin/mutations/addDestination.graphql";
import editDestinationMutation from "admin/mutations/editDestination.graphql";
import removeDestinationMutation from "admin/mutations/removeDestination.graphql";
import removeDestinationTranslationMutation from "admin/mutations/removeDestinationTranslation.graphql";

import { destinationsSchema, singleDestinationSchema } from "admin/actions/_schema";
import { normalize } from "normalizr";

export const fetchDestinations = () => async (dispatch, getState, { client }) => {
  dispatch({ type: START_FETCHING_DESTINATIONS });

  try {
    const { data, errors } = await client.query({
      query: fetchDestinationsQuery,
      fetchPolicy: (process.env.BROWSER) ? "network-only" : "cache-first",
    });


    if (typeof errors !== "undefined") {
      return dispatch({
        type: FETCHING_DESTINATIONS_ERRORS,
        errors,
      });
    }
    console.log("CUSTOMER DATA => ", data);
    console.log("NORMALIZED =>", normalize(data, destinationsSchema));

    return dispatch({
      type: FETCHING_DESTINATIONS_SUCCESS,
      response: normalize(data, destinationsSchema),
    });
  } catch (e) {
    return dispatch({
      type: FETCHING_DESTINATIONS_ERRORS,
      errors: e,
    });
  }
};

export const addDestination = (destination, duplicate) => async (dispatch, getState, { client }) => {
  dispatch({ type: ADD_DESTINATION });

  try {
    // something
    const { data, errors } = await client.mutate({
      mutation: addDestinationMutation,
      variables: {
        ...destination,
        duplicate,
      },
    });

    if (typeof errors !== "undefined") {
      return dispatch({
        type: ADD_DESTINATION_ERROR,
        errors,
      });
    }

    console.log("NOT DUPLICATE debug");
    console.log(normalize(data, destinationsSchema));
    return dispatch({
      type: ADD_DESTINATION_SUCCESS,
      response: normalize(data, destinationsSchema),
    });
  } catch (e) {
    return dispatch({
      type: ADD_DESTINATION_ERROR,
      errors: e,
    });
  }
};

export const editDestination = (id, destination) => async (dispatch, getState, { client }) => {
  dispatch({ type: EDIT_DESTINATION });

  console.log("DEBUG EDIT DESTINATION => ", id, destination);

  try {
    const { data, errors } = await client.mutate({
      mutation: editDestinationMutation,
      variables: {
        id,
        ...destination,
      },
    });

    if (typeof errors !== "undefined") {
      return dispatch({
        type: EDIT_DESTINATION_ERROR,
        errors,
      });
    }

    console.log("DEBUG  NORMALIZE => ", normalize(data, singleDestinationSchema));

    return dispatch({
      type: EDIT_DESTINATION_SUCCESS,
      response: normalize(data, singleDestinationSchema),
      id,
    });
  } catch (e) {
    return dispatch({
      type: EDIT_DESTINATION_ERROR,
      errors: e,
    });
  }
};

export const setFilter = ({ filter }) => ({
  type: DESTINATIONS_SET_VISIBILITY_FILTER,
  filter,
});

export const removeFilter = () => ({ type: DESTINATIONS_REMOVE_VISIBILITY_FILTER });


export const removeDestination = (destination_id) => {
  console.log("REMOVE => ", destination_id);
  return async (dispatch, getState, { client }) => {
    try {
      dispatch({ type: REMOVE_DESTINATION });

      const { data, errors } = await client.mutate({
        mutation: removeDestinationMutation,
        variables: {
          destination_id,
        },
      });


      if (typeof errors !== "undefined") {
        return dispatch({
          type: REMOVE_DESTINATION_ERROR,
          errors,
        });
      }

      return dispatch({
        type: REMOVE_DESTINATION_SUCCESS,
        ids: data.remove.ids,
      });
    } catch (e) {
      return dispatch({
        type: REMOVE_DESTINATION_ERROR,
        errors: e,
      });
    }
  };
};

export const removeDestinationTranslation = id => async (dispatch, getState, { client }) => {
  try {
    dispatch({ type: REMOVE_DESTINATION_TRANSLATION });

    const { data, errors } = await client.mutate({
      mutation: removeDestinationTranslationMutation,
      variables: {
        id,
      },
    });


    if (typeof errors !== "undefined") {
      return dispatch({
        type: REMOVE_DESTINATION_TRANSLATION_ERROR,
        errors,
      });
    }

    return dispatch({
      type: REMOVE_DESTINATION_TRANSLATION_SUCCESS,
      id: data.remove.id,
    });
  } catch (e) {
    return dispatch({
      type: REMOVE_DESTINATION_TRANSLATION_ERROR,
      errors: e,
    });
  }
};
