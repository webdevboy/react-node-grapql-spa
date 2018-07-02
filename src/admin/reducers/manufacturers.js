import { combineReducers } from "redux";
import {
  START_FETCHING_MANU,
  FETCHING_MANU_SUCCESS,
  FETCHING_MANU_ERRORS,
} from "../constants/manufacturers";

const byId = (state = {}, action) => {
  switch (action.type) {
    case FETCHING_MANU_SUCCESS:
      return {
        ...state,
        ...action.response.entities.manufacturers,
      };
    default:
      return state;
  }
};

const ids = (state = [], action) => {
  switch (action.type) {
    case FETCHING_MANU_SUCCESS:
      return action.response.result.manufacturers;
    default:
      return state;
  }
};

const errors = (state = null, action) => {
  switch (action.type) {
    case FETCHING_MANU_ERRORS:
      return action.errors;
    case FETCHING_MANU_SUCCESS:
      return null;
    default:
      return state;
  }
};

const isFetching = (state = false, action) => {
  switch (action.type) {
    case START_FETCHING_MANU:
      return true;
    case FETCHING_MANU_SUCCESS:
    case FETCHING_MANU_ERRORS:
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
