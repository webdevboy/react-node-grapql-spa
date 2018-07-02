import { normalize } from "normalizr";
import {
  START_FETCHING_AIRCRAFTS,
  START_FETCHING_AIRCRAFTS_SUCCESS,
  START_FETCHING_AIRCRAFTS_ERROR,
  START_FETCHING_AIRCRAFTS_MODELS,
  START_FETCHING_AIRCRAFTS_MODELS_SUCCESS,
  START_FETCHING_AIRCRAFTS_MODELS_ERROR,
  START_FETCHING_AIRCRAFT,
  START_FETCHING_AIRCRAFT_SUCCESS,
  START_FETCHING_AIRCRAFT_ERROR,
  START_FETCHING_AIRCRAFT_CATEGORIES,
  START_FETCHING_AIRCRAFT_CATEGORIES_SUCCESS,
  START_FETCHING_AIRCRAFT_CATEGORIES_ERROR,
  START_FETCHING_AIRCRAFT_MANUFACTURERS,
  START_FETCHING_AIRCRAFT_MANUFACTURERS_SUCCESS,
  START_FETCHING_AIRCRAFT_MANUFACTURERS_ERROR,
  ADD_AIRCRAFT,
  ADD_AIRCRAFT_SUCCESS,
  ADD_AIRCRAFT_ERROR,
  ADD_AIRCRAFT_CATEGORY,
  ADD_AIRCRAFT_CATEGORY_SUCCESS,
  ADD_AIRCRAFT_CATEGORY_ERROR,
  ADD_AIRCRAFT_MANUFACTURER,
  ADD_AIRCRAFT_MANUFACTURER_SUCCESS,
  ADD_AIRCRAFT_MANUFACTURER_ERROR,
  EDIT_AIRCRAFT,
  EDIT_AIRCRAFT_SUCCESS,
  EDIT_AIRCRAFT_ERROR,
  EDIT_AIRCRAFT_CATEGORY,
  EDIT_AIRCRAFT_CATEGORY_SUCCESS,
  EDIT_AIRCRAFT_CATEGORY_ERROR,
  EDIT_AIRCRAFT_MANUFACTURER,
  EDIT_AIRCRAFT_MANUFACTURER_SUCCESS,
  EDIT_AIRCRAFT_MANUFACTURER_ERROR,
  REMOVE_AIRCRAFT,
  REMOVE_AIRCRAFT_SUCCESS,
  REMOVE_AIRCRAFT_ERROR,
  REMOVE_AIRCRAFT_CATEGORY,
  REMOVE_AIRCRAFT_CATEGORY_SUCCESS,
  REMOVE_AIRCRAFT_CATEGORY_ERROR,
  REMOVE_AIRCRAFT_MANUFACTURER,
  REMOVE_AIRCRAFT_MANUFACTURER_SUCCESS,
  REMOVE_AIRCRAFT_MANUFACTURER_ERROR,
  SET_AIRCRAFT_VISIBILITY_FILTER,
  REMOVE_AIRCRAFT_VISIBILITY_FILTER,
} from "admin/constants/fleet";
import { aircraftsSchema, categoriesSchema, manufacturersSchema } from "admin/actions/_schema";

import getAircraftsModelsQuery from "admin/queries/fetchSF_Aircrafts.graphql";
import getAircraftsCategoriesQuery from "admin/queries/fetchSF_AircraftsCategories.graphql";
import getAircraftsManufacturersQuery from "admin/queries/fetchSF_AircraftsManufacturers.graphql";

export const fetchAircraft = () => async (dispatch, getState, { client }) => {
  try {

  } catch (error) {

  }
};

export const fetchAircrafts = () => async (dispatch, getState, { client }) => {
  try {

  } catch (error) {

  }
};

export const fetchAircraftsModels = search => async (dispatch, getState, { client }) => {
  try {
    dispatch({ type: START_FETCHING_AIRCRAFTS_MODELS });

    const { data, errors } = await client.query({
      query: getAircraftsModelsQuery,
      fetchPolicy: "cache-first",
      variables: {
        search,
      },
    });

    if (typeof errors !== "undefined") {
      return dispatch({
        type: START_FETCHING_AIRCRAFTS_MODELS_ERROR,
        errors,
      });
    }

    console.log("NORMALIZED =>", normalize(data, aircraftsSchema));
    return dispatch({
      type: START_FETCHING_AIRCRAFTS_MODELS_SUCCESS,
      response: normalize(data, aircraftsSchema),
    });
  } catch (error) {
    return dispatch({
      type: START_FETCHING_AIRCRAFTS_MODELS_ERROR,
      errors: error,
    });
  }
};

export const fetchAircraftsCategories = search => async (dispatch, getState, { client }) => {
  try {
    dispatch({ type: START_FETCHING_AIRCRAFT_CATEGORIES });

    const { data, errors } = await client.query({
      query: getAircraftsCategoriesQuery,
      fetchPolicy: "cache-first",
      variables: {
        search,
      },
    });

    if (typeof errors !== "undefined") {
      return dispatch({
        type: START_FETCHING_AIRCRAFT_CATEGORIES_ERROR,
        errors,
      });
    }

    console.log("NORMALIZED =>", normalize(data, categoriesSchema));
    return dispatch({
      type: START_FETCHING_AIRCRAFT_CATEGORIES_SUCCESS,
      response: normalize(data, categoriesSchema),
    });
  } catch (error) {
    return dispatch({
      type: START_FETCHING_AIRCRAFT_CATEGORIES_ERROR,
      errors: error,
    });
  }
};

export const fetchAircraftsManufacturers = search => async (dispatch, getState, { client }) => {
  try {
    dispatch({ type: START_FETCHING_AIRCRAFT_MANUFACTURERS });

    const { data, errors } = await client.query({
      query: getAircraftsManufacturersQuery,
      fetchPolicy: "cache-first",
      variables: {
        search,
      },
    });

    if (typeof errors !== "undefined") {
      return dispatch({
        type: START_FETCHING_AIRCRAFT_MANUFACTURERS_ERROR,
        errors,
      });
    }

    console.log("NORMALIZED =>", normalize(data, manufacturersSchema));
    return dispatch({
      type: START_FETCHING_AIRCRAFT_MANUFACTURERS_SUCCESS,
      response: normalize(data, manufacturersSchema),
    });
  } catch (error) {
    return dispatch({
      type: START_FETCHING_AIRCRAFT_MANUFACTURERS_ERROR,
      errors: error,
    });
  }
};

export const addAircraft = () => async (dispatch, getState, { client }) => {
  try {

  } catch (error) {

  }
};

export const editAircraft = () => async (dispatch, getState, { client }) => {
  try {

  } catch (error) {

  }
};

export const removeAircraft = () => async (dispatch, getState, { client }) => {
  try {

  } catch (error) {

  }
};

export const addAircraftCategory = () => async (dispatch, getState, { client }) => {
  try {

  } catch (error) {

  }
};

export const editAircraftCategory = () => async (dispatch, getState, { client }) => {
  try {

  } catch (error) {

  }
};

export const removeAircraftCategory = () => async (dispatch, getState, { client }) => {
  try {

  } catch (error) {

  }
};


export const addAircraftManufacturer = () => async (dispatch, getState, { client }) => {
  try {

  } catch (error) {

  }
};

export const editAircraftManufacturer = () => async (dispatch, getState, { client }) => {
  try {

  } catch (error) {

  }
};

export const removeAircraftManufacturer = () => async (dispatch, getState, { client }) => {
  try {

  } catch (error) {

  }
};

export const setFilter = ({ filter }) => ({
  type: SET_AIRCRAFT_VISIBILITY_FILTER,
  filter,
});

export const removeFilter = field => ({
  type: REMOVE_AIRCRAFT_VISIBILITY_FILTER,
  field,
});
