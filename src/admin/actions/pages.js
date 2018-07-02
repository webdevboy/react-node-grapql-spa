import { normalize } from "normalizr";
import { capitalize } from "lodash";
import {
  FETCH_PAGES,
  FETCH_PAGES_SUCCESS,
  FETCH_PAGES_ERROR,
  CREATE_PAGE,
  CREATE_PAGE_SUCCESS,
  CREATE_PAGE_ERROR,
  // UPDATE_PAGE,
  // UPDATE_PAGE_SUCCESS,
  // UPDATE_PAGE_ERROR,
  // REMOVE_PAGE,
  // REMOVE_PAGE_SUCCESS,
  // REMOVE_PAGE_ERROR,
} from "../constants/pages";

import { pageSchema } from "../actions/_schema";
import queryFetchPages from "../queries/fetchPages.graphql";
import mutationCreatePage from "../mutations/createPage.graphql";
// import mutationUpdatePage from "admin/mutations/updatePage.graphql";
// import mutationUpdateOrCreateMeta from "admin/mutations/updateOrCreateMeta.graphql";

export const fetchPages = () => {
  return async (dispatch, getState, { client }) => {
    try {
      dispatch({ type: FETCH_PAGES });

      const { data, errors } = await client.query({
        query: queryFetchPages,
        fetchPolicy: "cache-first",
      });

      if (typeof errors !== "undefined") {
        return dispatch({
          type: FETCH_PAGES_ERROR,
          errors,
        });
      }

      return dispatch({
        type: FETCH_PAGES_SUCCESS,
        response: normalize(data, pageSchema),
      });
    } catch (e) {
      return dispatch({
        type: FETCH_PAGES_ERROR,
        errors: e,
      });
    }
  };
};

export const createPage = ({
  title,
  path,
  template,
  owner,
  body,
}) =>
  async (dispatch, getState, { client }) => {
    try {
      const pagePath = path.startsWith("/") ? path : path.replace(/^/, "/");

      const { data, errors } = await client.networkInterface.query({
        query: mutationCreatePage,
        variables: {
          title: capitalize(title),
          path: pagePath,
          template,
          body,
          owner,
        },
      });

      if (typeof errors !== "undefined") {
        return dispatch({
          type: CREATE_PAGE_ERROR,
          errors,
        });
      }

      return dispatch({
        type: CREATE_PAGE_SUCCESS,
        response: normalize(data, pageSchema),
      });
    } catch (e) {
      return dispatch({
        type: CREATE_PAGE_ERROR,
        errors: e,
      });
    }
  };

// export const updatePage = 
// function({id, body, path, title, query, external_scripts, custom_script, state}) {
// console.log(id, body, path, title, query, external_scripts, custom_script, state)
// return async (dispatch, getState, { client, history }) => {

//   try {

//     const { data } = await client.networkInterface.query({
//       query: mutationUpdatePage,
//       variables: { id, body, title, path, query, external_scripts, custom_script, state },
//     });

//     const updatePage = data.updatePage;

//       dispatch({
//         type: UPDATE_PAGE,
//         payload: updatePage,
//       });

//   } catch(e) {

//     const errors = [{
//       key: "general",
//       message: "Unexpected server error"
//     }];

//   }

// };
// }


// export const updateOrCreateMeta = (state) => {
//   return async (dispatch, getState, { client }) => {

//     const { data } = await client.networkInterface.query({
//       query: mutationUpdateOrCreateMeta,
//       variables: state
//     })

