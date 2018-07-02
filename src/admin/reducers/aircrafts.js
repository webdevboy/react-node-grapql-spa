import {
  START_FETCHING_DATA,
  FETCHING_DATA_ERROR,
  FETCHING_DATA_SUCCESS,
} from "../constants/aircrafts";
import _ from "lodash";
import { combineReducers } from "redux";

const initialState = {
  fetching: false,
  dataList: null,
  errors: null
}

const aircraftsReducer = (state = initialState, action) => {
  switch (action.type) {
    case START_FETCHING_DATA:
      return {
        ...state,
        fetching: true,
        errors: null
      };
    
    case FETCHING_DATA_ERROR:
      return {
        ...state,
        fetching: false,
        errors: action.errors
      };

    case FETCHING_DATA_SUCCESS:
      return {
        ...state,
        fetching: false,
        dataList: action.dataList
      }
  }

  return state;
};

export default aircraftsReducer;