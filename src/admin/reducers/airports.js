import {
  START_FETCHING_AIRPORTS,
  FETCHING_AIRPORTS_ERROR,
  FETCHING_AIRPORTS_SUCCESS,
  FETCHING_SFAIRPORTS_SUCCESS,
} from "../constants/airports";
import _ from "lodash";
import { combineReducers } from "redux";

const initialState = {
  fetching: false,
  list: [],
  sflist: [],
  errors: null
}

const airportsReducer = (state = initialState, action) => {
  switch (action.type) {
    case START_FETCHING_AIRPORTS:
      return {
        ...state,
        fetching: true,
        errors: null
      };
    
    case FETCHING_AIRPORTS_ERROR:
      return {
        ...state,
        fetching: false,
        errors: action.errors
      };

    case FETCHING_SFAIRPORTS_SUCCESS:
      return {
        ...state,
        fetching: false,
        sflist: action.airports
      }

    case FETCHING_AIRPORTS_SUCCESS:
      return {
        ...state,
        fetching: false,
        list: action.airports
      }
  }

  return state;
};

export default airportsReducer;