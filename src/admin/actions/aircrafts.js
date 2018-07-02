import {
  START_FETCHING_DATA,
  FETCHING_DATA_ERROR,
  FETCHING_DATA_SUCCESS,
} from '../constants/aircrafts';
import fetchDataAircraftPostEditor from "admin/queries/fetchDataAircraftPostEditor.graphql";
import * as _ from 'lodash';

export const fetchDataForEditor = (args) => {
  return async (dispatch, getState, { client }) => {
    try {
      dispatch({ type: START_FETCHING_DATA });

      const { data, errors } = await client.query({
        query: fetchDataAircraftPostEditor,
        fetchPolicy: "cache-first",
        variables: { ...args }
      });

      if (typeof errors !== "undefined") {
        return dispatch({
          type: FETCHING_DATA_ERROR,
          errors: errors,
        });
      }

      return dispatch({
        type: FETCHING_DATA_SUCCESS,
        dataList: data,
      });
    } catch (e) {
      return dispatch({
        type: FETCHING_DATA_ERROR,
        errors: e,
      });
    }
  };
};