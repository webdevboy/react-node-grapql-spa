import {
  START_FETCHING_EVENTS,
  FETCHING_EVENTS_ERRORS,
  FETCHING_EVENTS_SUCCESS,
} from "../constants/events";
import _ from "lodash";
import { combineReducers } from "redux";

const initialState = {
  fetching: false,
  dataList: null,
  errors: null
}

const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    case START_FETCHING_EVENTS:
      return {
        ...state,
        fetching: true,
        errors: null
      };
    
    case FETCHING_EVENTS_ERRORS:
      return {
        ...state,
        fetching: false,
        errors: action.errors
      };

    case FETCHING_EVENTS_SUCCESS:
      return {
        ...state,
        fetching: false,
        dataList: action.dataList
      }
  }

  return state;
};

export default eventReducer;