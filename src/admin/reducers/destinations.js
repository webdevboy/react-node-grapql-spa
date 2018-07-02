import { combineReducers } from "redux";
import {
  START_FETCHING_DESTINATIONS,
  FETCHING_DESTINATIONS_SUCCESS,
  ADD_DESTINATION,
  ADD_DESTINATION_SUCCESS,
  ADD_DESTINATION_ERROR,
  EDIT_DESTINATION,
  EDIT_DESTINATION_SUCCESS,
  EDIT_DESTINATION_ERROR,
  FETCHING_DESTINATIONS_ERRORS,
  DESTINATIONS_REMOVE_VISIBILITY_FILTER,
  DESTINATIONS_SET_VISIBILITY_FILTER,
  REMOVE_DESTINATION,
  REMOVE_DESTINATION_SUCCESS,
  REMOVE_DESTINATION_ERROR,
  REMOVE_DESTINATION_TRANSLATION,
  REMOVE_DESTINATION_TRANSLATION_SUCCESS,
  REMOVE_DESTINATION_TRANSLATION_ERROR,
} from "../constants/destinations";

const byId = (state = {}, action) => {
  switch (action.type) {
    case FETCHING_DESTINATIONS_SUCCESS:
    case ADD_DESTINATION_SUCCESS:
    case EDIT_DESTINATION_SUCCESS:
      return {
        ...state,
        ...action.response.entities.destinations,
      };

    case REMOVE_DESTINATION_TRANSLATION_SUCCESS:
      delete state[action.id];
      return state;

    case REMOVE_DESTINATION_SUCCESS:

      if (action.ids.length) {
        action.ids.forEach((id) => {
          delete state[id];
        });
      }
      return state;
    default:
      return state;
  }
};

const ids = (state = [], action) => {
  switch (action.type) {
    case FETCHING_DESTINATIONS_SUCCESS:
      return action.response.result.destinations;
    case ADD_DESTINATION_SUCCESS:
      return state.concat(action.response.result.destinations);

    case REMOVE_DESTINATION_SUCCESS:
      return state.filter(id => !action.ids.includes(id));

    case REMOVE_DESTINATION_TRANSLATION_SUCCESS:
      return state.filter(id => (id !== action.id));
    default:
      return state;
  }
};

const errors = (state = null, action) => {
  switch (action.type) {
    case ADD_DESTINATION_ERROR:
    case FETCHING_DESTINATIONS_ERRORS:
    case EDIT_DESTINATION_ERROR:
      return action.errors;
    case ADD_DESTINATION_SUCCESS:
    case FETCHING_DESTINATIONS_SUCCESS:
    case EDIT_DESTINATION_SUCCESS:
      return null;
    default:
      return state;
  }
};

const isLoading = (state = false, action) => {
  switch (action.type) {
    case ADD_DESTINATION:
    case EDIT_DESTINATION:
      return true;
    case EDIT_DESTINATION_SUCCESS:
    case EDIT_DESTINATION_ERROR:
    case ADD_DESTINATION_ERROR:
    case ADD_DESTINATION_SUCCESS:
      return false;
    default:
      return state;
  }
};

const isFetching = (state = false, action) => {
  switch (action.type) {
    case START_FETCHING_DESTINATIONS:
      return true;
    case FETCHING_DESTINATIONS_SUCCESS:
    case FETCHING_DESTINATIONS_ERRORS:
      return false;
    default:
      return state;
  }
};


const visibilityFilter = (state = null, action) => {
  switch (action.type) {
    case DESTINATIONS_SET_VISIBILITY_FILTER:
      return action.filter;

    case DESTINATIONS_REMOVE_VISIBILITY_FILTER:
      return null;

    default:
      return state;
  }
};

export default combineReducers({
  byId,
  ids,
  errors,
  isFetching,
  isLoading,
  visibilityFilter,
});
