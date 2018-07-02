import { normalize } from "normalizr";
import { capitalize } from "lodash";
import {
  FETCH_TERM_TAXONOMY,
  FETCH_TERM_TAXONOMY_SUCCESS,
  FETCH_TERM_TAXONOMY_ERROR,
  ADD_TERM_TAXONOMY,
  ADD_TERM_TAXONOMY_SUCCESS,
  ADD_TERM_TAXONOMY_ERROR,
  REMOVE_TERM_TAXONOMY,
  REMOVE_TERM_TAXONOMY_SUCCESS,
  REMOVE_TERM_TAXONOMY_ERROR,
  UPDATE_TERM_TAXONOMY,
  UPDATE_TERM_TAXONOMY_SUCCESS,
  UPDATE_TERM_TAXONOMY_ERROR,
} from "../constants/termTaxonomy";

import { termTaxonomySchema } from "../actions/_schema";
import queryFetchTermTaxonomies from "../queries/fetchTermTaxonomies.graphql";
import addTermTaxonomyMutation from "admin/mutations/addTermTaxonomy.graphql";
import removeTermTaxonomyMutation from "admin/mutations/removeTermTaxonomy.graphql";
import queryUpdateTermDisplayName from "admin/mutations/updateTermDisplayName.graphql";
import queryUpdateTermName from "admin/mutations/updateTermName.graphql";

export const fetchTermTaxonomy = (taxonomy) => {
  return async (dispatch, getState, { client }) => {
    try {
      dispatch({ type: FETCH_TERM_TAXONOMY });

      const { data, errors } = await client.query({
        query: queryFetchTermTaxonomies,
		variables: {
          ...taxonomy,
        },
        fetchPolicy: "cache-first",
      });

      if (typeof errors !== "undefined") {
        return dispatch({
          type: FETCH_TERM_TAXONOMY_ERROR,
          errors,
        });
      }

      return dispatch({
        type: FETCH_TERM_TAXONOMY_SUCCESS,
        response: data,
      });
    } catch (e) {
      return dispatch({
        type: FETCH_TERM_TAXONOMY_ERROR,
        errors: e,
      });
    }
  };
};

export const addTermTaxonomy = (termTaxonomy) => async (dispatch, getState, { client }) => {
  dispatch({ type: ADD_TERM_TAXONOMY });

  try {
    const { data, errors } = await client.mutate({
      mutation: addTermTaxonomyMutation,
      variables: {
        ...termTaxonomy,
      },
    });

    if (typeof errors !== "undefined") {
      return dispatch({
        type: ADD_TERM_TAXONOMY_ERROR,
        errors,
      });
    }

    normalize(data, termTaxonomySchema);
    return dispatch({
      type: ADD_TERM_TAXONOMY_SUCCESS,
      response: normalize(data, termTaxonomySchema),
    });
  } catch (e) {
    return dispatch({
      type: ADD_TERM_TAXONOMY_ERROR,
      errors: e,
    });
  }
};

export const removeTermTaxonomy = (args) => async (dispatch, getState, { client }) => {
  dispatch({ type: REMOVE_TERM_TAXONOMY });
  try {
    const { data, errors } = await client.mutate({
      mutation: removeTermTaxonomyMutation,
      variables: {
        ...args
      },
    });

    if (typeof errors !== "undefined") {
      return dispatch({
        type: REMOVE_TERM_TAXONOMY_ERROR,
        errors,
      });
    }

    return dispatch({
      type: REMOVE_TERM_TAXONOMY_SUCCESS,
      ids: data.remove.ids,
    });
  } catch (e) {
    return dispatch({
      type: REMOVE_TERM_TAXONOMY_ERROR,
      errors: e,
    });
  }
};

export const updateTermDisplayName = (args) => async (dispatch, getState, { client }) => {
  dispatch({ type: UPDATE_TERM_TAXONOMY });

  try {
    const { data, errors } = await client.mutate({
      mutation: queryUpdateTermDisplayName,
      variables: {
        ...args,
      },
    });

    if (typeof errors !== "undefined") {
      return dispatch({
        type: UPDATE_TERM_TAXONOMY_ERROR,
        errors,
      });
    }

    return dispatch({
      type: UPDATE_TERM_TAXONOMY_SUCCESS,
      response: data,
    });
  } catch (e) {
    return dispatch({
      type: UPDATE_TERM_TAXONOMY_ERROR,
      errors: e,
    });
  }
};

export const updateTermName = (args) => async (dispatch, getState, { client }) => {
  dispatch({ type: UPDATE_TERM_TAXONOMY });

  try {
    const { data, errors } = await client.mutate({
      mutation: queryUpdateTermName,
      variables: {
        ...args,
      },
    });

    if (typeof errors !== "undefined") {
      return dispatch({
        type: UPDATE_TERM_TAXONOMY_ERROR,
        errors,
      });
    }

    return dispatch({
      type: UPDATE_TERM_TAXONOMY_SUCCESS,
      response: data,
    });
  } catch (e) {
    return dispatch({
      type: UPDATE_TERM_TAXONOMY_ERROR,
      errors: e,
    });
  }
};

