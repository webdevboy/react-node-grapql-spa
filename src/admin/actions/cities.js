import {
  START_FETCHING_CITIES,
  FETCHING_CITIES_SUCCESS,
  FETCHING_CITIES_EDITOR_SUCCESS,
  FETCHING_CITIES_SELECTED_SUCCESS,
  FETCHING_CITIES_ERRORS,
} from "admin/constants/cities";
import fetchCitiesQuery from "admin/queries/fetchCities.graphql";
import fetchCitiesEditorQuery from "admin/queries/fetchCitiesEditor.graphql";
import fetchSelectedCitiesQuery from "admin/queries/fetchSelectedCities.graphql";
import { citiesSchema } from "admin/actions/_schema";
import { normalize } from "normalizr";

const fetchCities = function () {
  return async (dispatch, getState, { client }) => {
    dispatch({ type: START_FETCHING_CITIES });

    try {
      const { data, errors } = await client.query({
        query: fetchCitiesQuery,
        fetchPolicy: (process.env.BROWSER) ? "network-only" : "cache-first",
      });


      if (typeof errors !== "undefined") {
        return dispatch({
          type: FETCHING_CITIES_ERRORS,
          errors,
        });
      }
      console.log("CUSTOMER DATA => ", data);
      console.log("NORMALIZED =>", normalize(data, citiesSchema));

      return dispatch({
        type: FETCHING_CITIES_SUCCESS,
        response: normalize(data, citiesSchema),
      });
    } catch (e) {
      return dispatch({
        type: FETCHING_CITIES_ERRORS,
        errors: e,
      });
    }
  };
};

const fetchCitiesForEditor = function () {
  return async (dispatch, getState, { client }) => {
    dispatch({ type: START_FETCHING_CITIES });

    try {
      const { data, errors } = await client.query({
        query: fetchCitiesEditorQuery,
        fetchPolicy: "cache-first",
      });


      if (typeof errors !== "undefined") {
        return dispatch({
          type: FETCHING_CITIES_ERRORS,
          errors,
        });
      }

      return dispatch({
        type: FETCHING_CITIES_SELECTED_SUCCESS,
        dataList: data,
      });
    } catch (e) {
      return dispatch({
        type: FETCHING_CITIES_ERRORS,
        errors: e,
      });
    }
  };
};

const fetchSelectedCities = function (ids) {
  return async (dispatch, getState, { client }) => {
    dispatch({ type: START_FETCHING_CITIES });
    try {
      const { data, errors } = await client.query({
        query: fetchSelectedCitiesQuery,
        variables: {
          ids,
        },
        fetchPolicy: "cache-first",
      });


      if (typeof errors !== "undefined") {
        return dispatch({
          type: FETCHING_CITIES_ERRORS,
          errors,
        });
      }

      return dispatch({
        type: FETCHING_CITIES_SELECTED_SUCCESS,
        dataList: data,
      });
    } catch (e) {
      return dispatch({
        type: FETCHING_CITIES_ERRORS,
        errors: e,
      });
    }
  };
};


export { fetchCities, fetchCitiesForEditor, fetchSelectedCities };
