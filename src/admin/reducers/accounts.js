import { combineReducers } from "redux";
import { reduce } from "lodash";
import {
  START_FETCHING_ACCOUNTS,
  FETCHING_ACCOUNTS_SUCCESS,
  FETCHING_ACCOUNTS_ERROR,
} from "../constants/accounts";

const byId = (state = {}, action) => {
  switch (action.type) {
    case FETCHING_ACCOUNTS_SUCCESS:
      return {
        ...state,
        ...action.response.entities.accounts,
      };

    default:
      return state;
  }
};

const ids = (state = [], action) => {
  switch (action.type) {
    case FETCHING_ACCOUNTS_SUCCESS:
      return action.response.result.accounts;

    default:
      return state;
  }
};

const isFetching = (state = false, action) => {
  switch (action.type) {
    case START_FETCHING_ACCOUNTS:
      return true;
    case FETCHING_ACCOUNTS_SUCCESS:
    case FETCHING_ACCOUNTS_ERROR:
      return false;
    default:
      return state;
  }
};

const errors = (state = null, action) => {
  switch (action.type) {
    case FETCHING_ACCOUNTS_SUCCESS:
      return null;

    case FETCHING_ACCOUNTS_ERROR:
      return action.errors;

    default:
      return state;
  }
};


export default combineReducers({
  byId,
  ids,
  isFetching,
  errors,

});
