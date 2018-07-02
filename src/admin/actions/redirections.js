import { normalize } from "normalizr";
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

import { redirectionSchema } from "./_schema";

import queryFetchRedirections from '../queries/fetchRedirections.graphql';
import mutationCreateRedirection from '../mutations/createRedirection.graphql';
import mutationRemoveRedirection from '../mutations/removeRedirection.graphql';
import mutationUpdateRedirection from '../mutations/updateRedirection.graphql';

export const fetchRedirections = () => {
  return async (dispatch, getState, { client }) => {
    
    dispatch({
      type: FETCH_REDIRECTIONS,
    });

    try {
      const { data, errors } = await client.query({
        query: queryFetchRedirections,
      });

      if (typeof errors !== "undefined") {
        return dispatch({
          type: FETCH_REDIRECTIONS_ERROR,
          errors,
        });
      }

      console.log('DEBUG REDIRECTION => ',normalize(data, redirectionSchema));
      return dispatch({
        type: FETCH_REDIRECTIONS_SUCCESS,
        response: normalize(data, redirectionSchema),
      });

    } catch (e) {
      return dispatch({
        type: FETCH_REDIRECTIONS_ERROR,
        errors: e,
      });
    }
  }; 
};

export const createRedirection = ({ link, redirect, description, http_code }) => {
  return async (dispatch, getState, { client }) => {
    dispatch({
      type: CREATE_REDIRECTION,
    });
    try {
      const { data, errors } = await client.mutate({
        mutation: mutationCreateRedirection,
        variables: { link, redirect, description, http_code },
      });

      if (typeof errors !== "undefined") {
        return dispatch({
          type: CREATE_REDIRECTION_ERROR,
          errors,
        });
      }

      return dispatch({
        type: CREATE_REDIRECTION_SUCCESS,
        redirection: data.redirection,
      });
    } catch (e) {
      return dispatch({
        type: CREATE_REDIRECTION_ERROR,
        errors: e,
      });
    }
  };
};

export const removeRedirection = ({ id }) => {
  return async (dispatch, getState, { client }) => {
    dispatch({
      type: REMOVE_REDIRECTION,
    });
    try {
      const { data, errors } = await client.mutate({
        mutation: mutationRemoveRedirection,
        variables: { id },
      });
      if (typeof errors !== "undefined") {
        return dispatch({
          type: REMOVE_REDIRECTION_ERROR,
          errors,
        });
      }
      return dispatch({
        type: REMOVE_REDIRECTION_SUCCESS,
        id: data.remove.id,
      });

    } catch (e) {
      return dispatch({
        type: REMOVE_REDIRECTION_ERROR,
        errors: e,
      });
    }
  };
};

export const updateRedirection = ({ id, link, redirect, description, http_code }) => {
  return async (dispatch, getState, { client }) => {
    dispatch({
      type: UPDATE_REDIRECTION,
    });
    try {
      const { data, errors } = await client.mutate({
        mutation: mutationUpdateRedirection,
        variables: {
          id,
          link,
          redirect,
          description,
          http_code,
        },
      });
      if (typeof errors !== "undefined") {
        return dispatch({
          type: UPDATE_REDIRECTION_ERROR,
          errors,
        });
      }
      return dispatch({
        type: UPDATE_REDIRECTION_SUCCESS,
        response: data.redirection,
      });
    } catch (e) {
      return dispatch({
        type: UPDATE_REDIRECTION_ERROR,
        errors: e,
      });
    }
  };
};
