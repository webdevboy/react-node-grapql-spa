import {
  START_FETCHING_PERMISSIONS,
  FETCHING_PERMISSIONS_SUCCESS,
  FETCHING_PERMISSIONS_ERROR,
} from "admin/constants/userPermissions";
import gql from "graphql-tag";

import { normalize } from "normalizr";
import { userPermissionSchema } from "admin/actions/_schema";

import getPermissionsQuery from "admin/queries/fetchPermissions.graphql";

const fetchPermissions = function () {
  return async (dispatch, getState, { client }) => {
    dispatch({ type: START_FETCHING_PERMISSIONS });

    try {
      const { data } = await client.query({
        query: getPermissionsQuery,
        fetchPolicy: "cache-first",
      });

      if (data) {
        console.log("NORMALIZED PERMISSIONS =>", normalize(data, userPermissionSchema));
        return dispatch({
          type: FETCHING_PERMISSIONS_SUCCESS,
          response: normalize(data, userPermissionSchema),
        });
      }
    } catch (e) {
      return dispatch({
        type: FETCHING_ROLES_ERROR,
        payload: {
          e,
        },
      });
    }
  };
};

export { fetchPermissions };
