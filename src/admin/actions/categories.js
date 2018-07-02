import {
  START_FETCHING_CATEGORIES,
  FETCHING_CATEGORIES_SUCCESS,
  FETCHING_CATEGORIES_ERRORS,
  
} from "admin/constants/categories";
import queryFetchCategories from "admin/queries/fetchCategories.graphql";
import { categoriesSchema } from "admin/actions/_schema";
import { normalize } from "normalizr";

const fetchCategories = function () {
  return async (dispatch, getState, { client }) => {
    dispatch({ type: START_FETCHING_CATEGORIES });

    try {
      const { data, errors } = await client.query({
        query: queryFetchCategories,
        fetchPolicy: (process.env.BROWSER) ? "network-only" : "cache-first",
      });


      if (typeof errors !== "undefined") {
        return dispatch({
          type: FETCHING_CATEGORIES_ERRORS,
          errors,
        });
      }
      console.log("CUSTOMER DATA => ", data);
      console.log("NORMALIZED =>", normalize(data, categoriesSchema));

      return dispatch({
        type: FETCHING_CATEGORIES_SUCCESS,
        response: normalize(data, categoriesSchema),
      });
    } catch (e) {
      return dispatch({
        type: FETCHING_CATEGORIES_ERRORS,
        errors: e,
      });
    }
  };
};


export { fetchCategories };
