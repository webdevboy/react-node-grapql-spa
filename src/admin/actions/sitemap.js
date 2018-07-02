/* eslint-disable import/prefer-default-export */
import normalize from 'normalizr';
import {
  FETCH_SITEMAP,
  FETCH_SITEMAP_SUCCESS,
  FETCH_SITEMAP_ERROR,
} from '../constants/sitemap';
import { sitemapSchema } from './_schema';
import fetchSitemapQuery from '../queries/fetchSitemap.gql'; 

export const fetchSitemap = () => async (dispatch, getState, { client }) => {
  dispatch({ type: FETCH_SITEMAP });

  try {
    const { data, errors } = await client.query({
      query: fetchSitemapQuery,
      fetchPolicy: (process.env.BROWSER) ? "network-only" : "cache-first",
    });

    if (typeof errors !== "undefined") {
      return dispatch({
        type: FETCH_SITEMAP_ERROR,
        errors,
      });
    }

    return dispatch({
      type: FETCH_SITEMAP_SUCCESS,
      response: normalize(data, sitemapSchema),
    });
  } catch (e) {
    return dispatch({
      type: FETCH_SITEMAP_ERROR,
      errors: e,
    });
  }
};
