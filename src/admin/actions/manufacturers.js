import {
  START_FETCHING_MANU,
  FETCHING_MANU_SUCCESS,
  FETCHING_MANU_ERRORS,
  
} from "admin/constants/manufacturers";
import queryFetchManufacturers from "admin/queries/fetchManufacturers.graphql";
import { manufacturersSchema } from "admin/actions/_schema";
import { normalize } from "normalizr";

const fetchManufacturers = function () {
  return async (dispatch, getState, { client }) => {
    dispatch({ type: START_FETCHING_MANU });

    try {
      const { data, errors } = await client.query({
        query: queryFetchManufacturers,
        fetchPolicy: (process.env.BROWSER) ? "network-only" : "cache-first",
      });


      if (typeof errors !== "undefined") {
        return dispatch({
          type: FETCHING_MANU_ERRORS,
          errors,
        });
      }
      console.log("CUSTOMER DATA => ", data);
      console.log("NORMALIZED =>", normalize(data, manufacturersSchema));

      return dispatch({
        type: FETCHING_MANU_SUCCESS,
        response: normalize(data, manufacturersSchema),
      });
    } catch (e) {
      return dispatch({
        type: FETCHING_MANU_ERRORS,
        errors: e,
      });
    }
  };
};


export { fetchManufacturers };
