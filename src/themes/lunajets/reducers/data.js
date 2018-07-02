import {
  GET_REVIEWS_START,
  GET_REVIEWS_SUCCESS,
  GET_REVIEWS_ERROR,
  GET_AIRCRAFT_TAXONOMIES_START,
  GET_AIRCRAFT_TAXONOMIES_SUCCESS,
  GET_AIRCRAFT_TAXONOMIES_ERROR,
} from "../constants/data";
import * as _ from 'lodash';

const INITIAL_STATE = {
  loading: false,
  errors: null,
  reviews: [],
  categories: [],
  manufactureres: [],
};

const mergeReviews = (oldArray, newArray) => {
  return _.compact(_.uniqBy(_.concat(oldArray, newArray), 'id'));
}

const data = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_REVIEWS_START:
      return {
        ...state,
        loading: true,
        errors: null,
      };

    case GET_REVIEWS_SUCCESS:
      return {
        ...state,
        loading: false,
        reviews: mergeReviews(state.reviews, action.payload.reviews),
        errors: null,
      };
    case GET_REVIEWS_ERROR:
      return {
        ...state,
        loading: false,
        errors: action.payload.errors,
      };
    case GET_AIRCRAFT_TAXONOMIES_START:
      return {
        ...state,
        loading: true,
        errors: null,
      };

    case GET_AIRCRAFT_TAXONOMIES_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: action.payload.categories,
        manufactureres: action.payload.manufactureres,
        errors: null,
      };
    case GET_AIRCRAFT_TAXONOMIES_ERROR:
      return {
        ...state,
        loading: false,
        errors: action.payload.errors,
      };

    default:
      return state;
  }
}

export default data
