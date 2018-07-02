import { combineReducers } from "redux";
import { reduce } from "lodash";
import {
  START_FETCHING_OFFICES,
  FETCHING_OFFICES_SUCCESS,
  FETCHING_OFFICES_ERROR,
  START_FETCHING_OFFICE,
  FETCHING_OFFICE_SUCCESS,
  FETCHING_OFFICE_ERROR,
  ADD_OFFICE,
  ADD_OFFICE_SUCCESS,
  ADD_OFFICE_ERROR,
  EDIT_OFFICE,
  EDIT_OFFICE_SUCCESS,
  EDIT_OFFICE_ERROR,
  REMOVE_OFFICES,
  REMOVE_OFFICES_SUCCESS,
  REMOVE_OFFICES_ERROR,
} from "../constants/offices";

const byId = (state = {}, action) => {
  switch (action.type) {
    case FETCHING_OFFICES_SUCCESS:
      return {
        ...state,
        ...action.response.entities.offices,
      };

    case FETCHING_OFFICE_SUCCESS:
      return {
        ...state,
        [action.response.office.id]: action.response.office,
      };

    case ADD_OFFICE_SUCCESS:
    case EDIT_OFFICE_SUCCESS:

      return {
        ...state,
        [action.response.office.id]: action.response.office,
      };

    default:
      return state;
  }
};

const ids = (state = [], action) => {
  switch (action.type) {
    case FETCHING_OFFICES_SUCCESS:
      return action.response.result.offices;

    case FETCHING_OFFICE_SUCCESS:
      if (!state.includes(action.response.office.id)) {
        return [
          ...state,
          action.response.office.id,
        ];
      }

    case ADD_OFFICE_SUCCESS:
      return [
        ...state,
        action.response.office.id,
      ];

    case REMOVE_OFFICES_SUCCESS:
      return state.filter(id => !action.response.ids.includes(id));
    default:
      return state;
  }
};

const isFetching = (state = false, action) => {
  switch (action.type) {
    case START_FETCHING_OFFICES:
    case START_FETCHING_OFFICE:
      return true;
    case FETCHING_OFFICE_SUCCESS:
    case FETCHING_OFFICE_ERROR:
    case FETCHING_OFFICES_SUCCESS:
    case FETCHING_OFFICES_ERROR:

      return false;
    default:
      return state;
  }
};

const errors = (state = null, action) => {
  switch (action.type) {
    case FETCHING_OFFICE_SUCCESS:
    case FETCHING_OFFICES_SUCCESS:
      return null;

    case FETCHING_OFFICE_ERROR:
    case FETCHING_OFFICES_ERROR:
      return action.errors;

    default:
      return state;
  }
};

const isLoading = (state = false, action) => {
  switch (action.type) {
    case ADD_OFFICE:
    case EDIT_OFFICE:
    case REMOVE_OFFICES:
      return true;
    case ADD_OFFICE_SUCCESS:
    case ADD_OFFICE_ERROR:
    case EDIT_OFFICE_ERROR:
    case EDIT_OFFICE_SUCCESS:
    case REMOVE_OFFICES_SUCCESS:
    case REMOVE_OFFICES_ERROR:
      return false;
    default:
      return state;
  }
};

export default combineReducers({
  byId,
  ids,
  isFetching,
  isLoading,
  errors,
});
