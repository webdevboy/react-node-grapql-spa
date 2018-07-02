import { normalize } from "normalizr";
import {
  START_UPDATE_PAGE,
  START_UPDATE_PAGE_SUCCESS,
  START_UPDATE_PAGE_ERROR,
} from "../constants/post";
import mutationUpdatePageMeta from '../mutations/updatePageMeta.graphql';

export const updatePageMeta = (args) => async (dispatch, getState, { client }) => {
  try {
    const { data, errors } = await client.mutate({
      mutation: mutationUpdatePageMeta,
      variables: {
        ...args
      },
    });
    if (typeof errors !== "undefined") {
      return dispatch({
        type: START_UPDATE_PAGE_ERROR,
        errors,
      });
    }
    return dispatch({
      type: START_UPDATE_PAGE_SUCCESS,
      response: data,
    });
  } catch (e) {
    console.error(e);
    return dispatch({
      type: START_UPDATE_PAGE_ERROR,
      errors: e,
    });
  }
};
