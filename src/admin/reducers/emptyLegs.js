import { combineReducers } from "redux";
import {
  FETCH_EMPTY_LEGS,
  FETCH_EMPTY_LEGS_SUCCESS,
  FETCH_EMPTY_LEGS_ERRORS,
} from "../constants/emptylegs";
import { unionBy } from "lodash";

const byId = (state = {}, action) => {
  switch (action.type) {
    case FETCH_EMPTY_LEGS_SUCCESS:
      const newState = unionBy(Object.values(state), action.response, 'id');
      return newState;
    default:
      return state;
  }
};

const errors = (state = null, action) => {
  switch (action.type) {
    case FETCH_EMPTY_LEGS_ERRORS:
      return action.response;
    case FETCH_EMPTY_LEGS_ERRORS:
      return null;
    default:
      return state;
  }
};

const isFetching = (state = false, action) => {
  switch (action.type) {
    case FETCH_EMPTY_LEGS:
      return true;
    case FETCH_EMPTY_LEGS_SUCCESS:
    case FETCH_EMPTY_LEGS_ERRORS:
      return false;
    default:
      return state;
  }
};

export default combineReducers({
  byId,
  errors,
  isFetching,
});
