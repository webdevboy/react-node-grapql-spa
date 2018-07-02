import { normalize } from "normalizr";
import {
  FETCH_POSTS,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_ERROR,
  ADD_POSTS,
  ADD_POSTS_SUCCESS,
  ADD_POSTS_ERROR,
  REMOVE_POST,
  REMOVE_POST_SUCCESS,
  REMOVE_POST_ERROR,
  REMOVE_POST_TRANSLATION,
  REMOVE_POST_TRANSLATION_SUCCESS,
  REMOVE_POST_TRANSLATION_ERROR,
} from "admin/constants/posts";

import { postSchema } from "../actions/_schema";
import queryFetchPosts from "../queries/fetchPosts.graphql";
import queryFetchPostsByTaxonomyTerm from "../queries/fetchPostsByTaxonomyTerm.graphql";
import addPostsMutation from "admin/mutations/addPosts.graphql";
import removePostMutation from "admin/mutations/removePost.graphql";
import removePostTranslationMutation from "admin/mutations/removePostTranslation.graphql";

export const fetchPosts = ({ type, taxonomies, terms, term_name, language_id, withTaxonomies = false }) => {
  return async (dispatch, getState, { client }) => {
    try {
      dispatch({ type: FETCH_POSTS });

      let variables = {
        type,
        taxonomies,
        terms,
        term_name,
        language_id,
        withTaxonomies,
      };
      const { data, errors } = await client.query({
        query: queryFetchPosts,
        fetchPolicy: "cache-first",
        variables,
      });

      if (typeof errors !== "undefined") {
        return dispatch({
          type: FETCH_POSTS_ERROR,
          errors,
        });
      }
      return dispatch({
        type: FETCH_POSTS_SUCCESS,
        response: data.posts,
      });
    } catch (e) {
      return dispatch({
        type: FETCH_POSTS_ERROR,
        errors: e,
      });
    }
  };
};

export const fetchPostByTaxonomyTerm = ({postType, taxonomy, term_name}) => {
  return async (dispatch, getState, { client }) => {
    
    try {
      dispatch({ type: FETCH_POSTS });

      let variables = {
        postType,
        taxonomy,
        term_name,
      };
      const { data, errors } = await client.query({
        query: queryFetchPostsByTaxonomyTerm,
        fetchPolicy: "cache-first",
        variables,
      });
      if (typeof errors !== "undefined") {
        return dispatch({
          type: FETCH_POSTS_ERROR,
          errors,
        });
      }
      return dispatch({
        type: FETCH_POSTS_SUCCESS,
        response: data.getPostsByTaxonomyTerm[0].posts,
      });
    } catch (e) {
      return dispatch({
        type: FETCH_POSTS_ERROR,
        errors: e,
      });
    }
  };
};

export const setFilter = ({ filter }) => ({
  type: POSTS_SET_VISIBILITY_FILTER,
  filter,
});

export const removeFilter = () => ({ type: POSTS_REMOVE_VISIBILITY_FILTER });

export const removePost = post_id => {
  console.log("REMOVE => ", post_id);
  return async (dispatch, getState, { client }) => {
    try {
      dispatch({ type: REMOVE_POST });

      const { data, errors } = await client.mutate({
        mutation: removePostMutation,
        variables: {
          post_id,
        },
      });

      if (typeof errors !== "undefined") {
        return dispatch({
          type: REMOVE_POST_ERROR,
          errors,
        });
      }

      return dispatch({
        type: REMOVE_POST_SUCCESS,
        ids: data.remove.ids,
      });
    } catch (e) {
      return dispatch({
        type: REMOVE_POST_ERROR,
        errors: e,
      });
    }
  };
};

export const removePostTranslation = id => async (dispatch, getState, { client }) => {
  try {
    dispatch({ type: REMOVE_POST_TRANSLATION });

    const { data, errors } = await client.mutate({
      mutation: removePostTranslationMutation,
      variables: {
        id,
      },
    });

    if (typeof errors !== "undefined") {
      return dispatch({
        type: REMOVE_POST_TRANSLATION_ERROR,
        errors,
      });
    }

    return dispatch({
      type: REMOVE_POST_TRANSLATION_SUCCESS,
      id: data.remove.id,
    });
  } catch (e) {
    return dispatch({
      type: REMOVE_POST_TRANSLATION_ERROR,
      errors: e,
    });
  }
};
