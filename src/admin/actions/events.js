import { normalize } from "normalizr";
import {
  START_FETCHING_EVENTS,
  FETCHING_EVENTS_SUCCESS,
  FETCHING_EVENTS_ERRORS,
} from "admin/constants/events";

import { postSchema } from "../actions/_schema";
import fetchDataEventPostEditor from "admin/queries/fetchDataEventPostEditor.graphql";
import fetchDataEventPostsManage from "admin/queries/fetchDataEventPostsManage.graphql";

export const fetchEvents = (type) => {
  return async (dispatch, getState, { client }) => {
    try {
      dispatch({ type: START_FETCHING_EVENTS });
      let variables = {
        type: type
      };

      const { data, errors } = await client.query({
        query: fetchDataEventPostsManage,
        fetchPolicy: "cache-first",
        variables,
      });
      if (typeof errors !== "undefined") {
        return dispatch({
          type: FETCHING_EVENTS_ERRORS,
          errors: errors,
        });
      }
      return dispatch({
        type: FETCHING_EVENTS_SUCCESS,
        dataList: data,
      });
    } catch (e) {
      return dispatch({
        type: FETCHING_EVENTS_ERRORS,
        errors: e,
      });
    }
  };
};


export const fetchEventPostForEditor = (args) => {
  return async (dispatch, getState, { client }) => {
    try {
      dispatch({ type: START_FETCHING_EVENTS });
      const { data, errors } = await client.query({
        query: fetchDataEventPostEditor,
        fetchPolicy: "cache-first",
        variables: {...args},
      });

      if (typeof errors !== "undefined") {
        return dispatch({
          type: FETCHING_EVENTS_ERRORS,
          errors: errors,
        });
      }
      return dispatch({
        type: FETCHING_EVENTS_SUCCESS,
        dataList: data,
      });
    } catch (e) {
      return dispatch({
        type: FETCHING_EVENTS_ERRORS,
        errors: e,
      });
    }
  };
};

