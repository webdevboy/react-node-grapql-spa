import { combineReducers } from "redux";
import {
  START_FETCHING_TEAM_MEMBERS,
  FETCHING_TEAM_MEMBERS_SUCCESS,
  FETCHING_TEAM_MEMBERS_ERRORS,
} from "../constants/teamMembers";

const byId = (state = {}, action) => {
  switch (action.type) {
    case FETCHING_TEAM_MEMBERS_SUCCESS:
      return {
        ...state,
        ...action.response.entities.members,
      };
    default:
      return state;
  }
};

const ids = (state = [], action) => {
  switch (action.type) {
    case FETCHING_TEAM_MEMBERS_SUCCESS:
      return action.response.result.members;
    default:
      return state;
  }
};

const errors = (state = null, action) => {
  switch (action.type) {
    case FETCHING_TEAM_MEMBERS_ERRORS:
      return action.errors;
    case FETCHING_TEAM_MEMBERS_SUCCESS:
      return null;
    default:
      return state;
  }
};

const isFetching = (state = false, action) => {
  switch (action.type) {
    case START_FETCHING_TEAM_MEMBERS:
      return true;
    case FETCHING_TEAM_MEMBERS_SUCCESS:
    case FETCHING_TEAM_MEMBERS_ERRORS:
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
