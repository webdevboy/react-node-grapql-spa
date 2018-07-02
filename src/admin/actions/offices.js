import { normalize } from "normalizr";
import {
  START_FETCHING_OFFICES,
  FETCHING_OFFICES_SUCCESS,
  FETCHING_OFFICES_ERROR,
  START_FETCHING_OFFICE,
  FETCHING_OFFICE_SUCCESS,
  FETCHING_OFFICE_ERROR,
  ADD_OFFICE,
  ADD_OFFICE_SUCCESS,
  ADD_OFFICE_ERROR,
  EDIT_OFFICE,
  EDIT_OFFICE_SUCCESS,
  EDIT_OFFICE_ERROR,
  REMOVE_OFFICES,
  REMOVE_OFFICES_SUCCESS,
  REMOVE_OFFICES_ERROR,
} from "../constants/offices";
import { officeSchema } from "../actions/_schema";

import queryGetOffices from "../queries/fetchOffices.graphql";
import queryGetOffice from "../queries/fetchOffice.graphql";
import createOffice from "../mutations/createOffice.graphql";
import editOfficeMutation from "../mutations/editOffice.graphql";
import removeOfficesMutation from "../mutations/removeOffices.graphql";

export const fetchOffices = () => {
  return async (dispatch, getState, { client }) => {
    dispatch({ type: START_FETCHING_OFFICES });

    try {
      const { data, errors } = await client.query({
        query: queryGetOffices,
        fetchPolicy: "cache-first",
      });

      if (typeof errors !== "undefined") {
        return dispatch({
          type: FETCHING_OFFICES_ERROR,
          errors,
        });
      }

      // console.log('OFFICE DATA => ', data);
      // console.log('NORMALIZED =>', normalize(data, officeSchema));
      return dispatch({
        type: FETCHING_OFFICES_SUCCESS,
        response: normalize(data, officeSchema),
      });
    } catch (e) {
      return dispatch({
        type: FETCHING_OFFICES_ERROR,
        errors: e,
      });
    }
  };
};

export const fetchOffice = (id) => {
  return async (dispatch, getState, { client }) => {
    dispatch({ type: START_FETCHING_OFFICE });

    try {
      const { data, errors } = await client.query({
        query: queryGetOffice,
        variables: {
          id,
        },
        fetchPolicy: "cache-first",
      });

      if (typeof errors !== "undefined") {
        return dispatch({
          type: FETCHING_OFFICE_ERROR,
          errors,
        });
      }

      return dispatch({
        type: FETCHING_OFFICE_SUCCESS,
        response: {
          office: data.office,
        },
      });
    } catch (e) {
      return dispatch({
        type: FETCHING_OFFICE_ERROR,
        errors: e,
      });
    }
  };
};

export const addOffice = (office) => {
  return async (dispatch, getState, { client }) => {
    dispatch({ type: ADD_OFFICE });

    try {
      // something

      const { data, errors } = await client.mutate({
        mutation: createOffice,
        variables: {
          ...office,
        },
      });

      if (typeof errors !== "undefined") {
        return dispatch({
          type: ADD_OFFICE_ERROR,
          errors,
        });
      }

      return dispatch({
        type: ADD_OFFICE_SUCCESS,
        response: {
          office: data.office,
        },
      });
    } catch (e) {
      return dispatch({
        type: ADD_OFFICE_ERROR,
        errors: e,
      });
    }
  };
};

export const editOffice = (id, office) => {
  console.log("OFFICE ID =>", id);

  return async (dispatch, getState, { client }) => {
    dispatch({ type: EDIT_OFFICE });

    console.log("DEBUG EDIT OFFICE => ", id, office);

    try {
      const { data, errors } = await client.mutate({
        mutation: editOfficeMutation,
        variables: {
          id,
          ...office,
        },
      });

      if (typeof errors !== "undefined") {
        return dispatch({
          type: EDIT_OFFICE_ERROR,
          errors,
        });
      }

      return dispatch({
        type: EDIT_OFFICE_SUCCESS,
        response: {
          office: data.office,
        },
      });
    } catch (e) {
      return dispatch({
        type: EDIT_OFFICE_ERROR,
        errors: e,
      });
    }
  };
};

export const removeOffices = (ids) => {
  return async (dispatch, getState, { client }) => {
    dispatch({ type: REMOVE_OFFICES });

    try {
      const { data, errors } = await client.mutate({
        mutation: removeOfficesMutation,
        variables: {
          id: ids,
        },
      });

      if (typeof errors !== "undefined") {
        return dispatch({
          type: REMOVE_OFFICES_ERROR,
          errors,
        });
      }
      return dispatch({
        type: REMOVE_OFFICES_SUCCESS,
        response: data.removeOffices,
      });
    } catch (e) {
      return dispatch({
        type: REMOVE_OFFICES_ERROR,
        errors: e,
      });
    }
  };
};
