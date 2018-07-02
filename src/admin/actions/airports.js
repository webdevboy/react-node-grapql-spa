import {
  START_FETCHING_AIRPORTS,
  FETCHING_AIRPORTS_ERROR,
  FETCHING_AIRPORTS_SUCCESS,
  FETCHING_SFAIRPORTS_SUCCESS
} from '../constants/airports';
import queryAirports from '../queries/fetchAirports.graphql';
import querySFAirports from '../queries/fetchSFAirports.graphql';
import * as _ from 'lodash';

export const fetchAirportsByPosts = (post_ids) => {
  return async (dispatch, getState, { client }) => {
    try {
      dispatch({ type: START_FETCHING_AIRPORTS });
      
      const { data, errors } = await client.query({
        query: queryAirports,
        fetchPolicy: "cache-first",
        variables: { post_ids }
      });
      
      if (typeof errors !== "undefined") {
        return dispatch({
          type: FETCHING_AIRPORTS_ERROR,
          errors: errors,
        });
      }

      return dispatch({
        type: FETCHING_AIRPORTS_SUCCESS,
        airports: data.airports,
      });
    } catch (e) {
      return dispatch({
        type: FETCHING_AIRPORTS_ERROR,
        errors: e,
      });
    }
  };
};

export const fetchAllAirports = (search, limit, sfids) => {
  return async (dispatch, getState, { client }) => {
    try {
      dispatch({ type: START_FETCHING_AIRPORTS });

      const { data, errors } = await client.query({
        query: querySFAirports,
        fetchPolicy: "cache-first",
        variables: {
          search,
          limit,
          sfids
        }
      });

      if (typeof errors !== "undefined") {
        return dispatch({
          type: FETCHING_AIRPORTS_ERROR,
          errors: errors,
        });
      }

      return dispatch({
        type: FETCHING_SFAIRPORTS_SUCCESS,
        airports: data.airports,
      });
    } catch (e) {
      return dispatch({
        type: FETCHING_AIRPORTS_ERROR,
        errors: e,
      });
    }
  }
}