import {
  START_FETCHING_ACCOUNTS,
  FETCHING_ACCOUNTS_SUCCESS,
  FETCHING_ACCOUNTS_ERROR,
} from "../constants/accounts";

import gql from "graphql-tag";
import { normalize } from "normalizr";
import { accountSchema } from "admin/actions/_schema";

import fetchAccountsQuery from "admin/queries/fetchAccounts.graphql";

const fetchAccounts = function (query = {}, pagination = {}) {
  return async (dispatch, getState, { client }) => {
    dispatch({ type: START_FETCHING_ACCOUNTS });

    try {
      const { data, errors } = await client.query({
        query: fetchAccountsQuery,
        fetchPolicy: (process.env.BROWSER) ? "network-only" : "cache-first",
      });


      if (typeof errors !== "undefined") {
        return dispatch({
          type: FETCHING_ACCOUNTS_ERROR,
          errors,
        });
      }
      console.log("CUSTOMER DATA => ", data);
      console.log("NORMALIZED =>", normalize(data, accountSchema));
      return dispatch({
        type: FETCHING_ACCOUNTS_SUCCESS,
        response: normalize(data, accountSchema),
      });
    } catch (e) {
      return dispatch({
        type: FETCHING_ACCOUNTS_ERROR,
        errors: e,
      });
    }
  };
};


export { fetchAccounts };
