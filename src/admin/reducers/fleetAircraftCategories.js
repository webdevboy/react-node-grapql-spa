import {
  START_FETCHING_AIRCRAFT_CATEGORIES_SUCCESS,
} from "../constants/fleet";

import { combineReducers } from "redux";

const byId = (state = {}, action) => {
  switch (action.type) {
    case START_FETCHING_AIRCRAFT_CATEGORIES_SUCCESS:
      return {
        ...state,
        ...action.response.entities.categories,
      };
    default:
      return state;
  }
};

const ids = (state = [], action) => {
  switch (action.type) {
    case START_FETCHING_AIRCRAFT_CATEGORIES_SUCCESS:
      return action.response.result.categories;
    default:
      return state;
  }
};

const isLoading = (state = false, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const isFetching = (state = false, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const errors = (state = null, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default combineReducers({
  byId,
  ids,
  isLoading,
  isFetching,
  errors,
});
