import {
  GET_REVIEWS_START,
  GET_REVIEWS_SUCCESS,
  GET_REVIEWS_ERROR,
  GET_AIRCRAFT_TAXONOMIES_START,
  GET_AIRCRAFT_TAXONOMIES_SUCCESS,
  GET_AIRCRAFT_TAXONOMIES_ERROR,
} from "../constants/data";
import * as _ from 'lodash';

import queryGetPosts from "../queries/getPosts.graphql";
import queryAircraftTaxonomies from "../queries/getAircraftTaxonomies.gql";

export const getReviews = ( params ) => (dispatch, getState, { client, history }) => {
  dispatch({
    type: GET_REVIEWS_START,
  });
  
  client.query({
    query: queryGetPosts,
    variables: {
      type: params.type,
      pagination: params.pagination,
    },
  })
    .then(({ data }) => {
      const { posts } = data;

      dispatch({
        type: GET_REVIEWS_SUCCESS,
        payload: {
          reviews: posts,
        },
      });
      
    })
    .catch((e) => {
      dispatch({
        type: GET_REVIEWS_ERROR,
        payload: {
          errors: e.graphQLErrors,
        },
      });
    });
};

export const getAircraftTaxonomies = () => (dispatch, getState, { client, history }) => {
  dispatch({
    type: GET_AIRCRAFT_TAXONOMIES_START,
  });
  
  client.query({
    query: queryAircraftTaxonomies,
    variables: {},
  })
    .then(({ data }) => {
      const { categories, manufactureres } = data;

      dispatch({
        type: GET_AIRCRAFT_TAXONOMIES_SUCCESS,
        payload: {
          categories,
          manufactureres
        },
      });
      
    })
    .catch((e) => {
      dispatch({
        type: GET_AIRCRAFT_TAXONOMIES_ERROR,
        payload: {
          errors: e.graphQLErrors,
        },
      });
    });
};