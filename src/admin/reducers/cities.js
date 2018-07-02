import { combineReducers } from "redux";
import {
  START_FETCHING_CITIES,
  FETCHING_CITIES_SUCCESS,
  FETCHING_CITIES_ERRORS,
  FETCHING_CITIES_EDITOR_SUCCESS,
  FETCHING_CITIES_SELECTED_SUCCESS,
} from "../constants/cities";

const byId = (state = {}, action) => {
  switch (action.type) {
    case FETCHING_CITIES_SUCCESS:
      return {
        ...state,
        ...action.response.entities.cities,
      };
    case FETCHING_CITIES_EDITOR_SUCCESS:
    case FETCHING_CITIES_SELECTED_SUCCESS:
      return {
        ...state,
        ...action.dataList,
      }
    default:
      return state;
  }
};

const ids = (state = [], action) => {
  switch (action.type) {
    case FETCHING_CITIES_SUCCESS:
      return action.response.result.cities;
    case FETCHING_CITIES_EDITOR_SUCCESS:
      return action.dataList;
    default:
      return state;
  }
};

const errors = (state = null, action) => {
  switch (action.type) {
    case FETCHING_CITIES_ERRORS:
      return action.errors;
    case FETCHING_CITIES_SUCCESS:
    case FETCHING_CITIES_EDITOR_SUCCESS:
      return null;
    default:
      return state;
  }
};

const isFetching = (state = false, action) => {
  switch (action.type) {
    case START_FETCHING_CITIES:
      return true;
    case FETCHING_CITIES_SUCCESS:
    case FETCHING_CITIES_ERRORS:
    case FETCHING_CITIES_EDITOR_SUCCESS:
      return false;
    default:
      return state;
  }
};

export default combineReducers({
  byId,
  ids,
  errors,
  isFetching,
});
