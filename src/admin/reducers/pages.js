import { combineReducers } from "redux";
import {
  FETCH_PAGES,
  FETCH_PAGES_SUCCESS,
  FETCH_PAGES_ERROR,
  CREATE_PAGE,
  CREATE_PAGE_SUCCESS,
  CREATE_PAGE_ERROR,
  UPDATE_PAGE,
  UPDATE_PAGE_SUCCESS,
  UPDATE_PAGE_ERROR,
  REMOVE_PAGE,
  REMOVE_PAGE_SUCCESS,
  REMOVE_PAGE_ERROR,
} from "../constants/pages";

const byId = (state = {}, action) => {
  switch (action.type) {
    case FETCH_PAGES_SUCCESS:
    case CREATE_PAGE_SUCCESS:
    case UPDATE_PAGE_SUCCESS:
      return {
        ...state,
        ...action.response.entities.pages,
      };

    case REMOVE_PAGE_SUCCESS:

      if (action.ids.length) {
        action.ids.forEach(id => delete state[id]); // eslint-disable-line no-param-reassign
      }
      return state;

    default:
      return state;
  }
};

const ids = (state = [], action) => {
  switch (action.type) {
    case FETCH_PAGES_SUCCESS:
      return action.response.result.pages;

    case CREATE_PAGE_SUCCESS:
      return state.concat(action.response.result.pages);

    case REMOVE_PAGE_SUCCESS:
      return state.filter(id => (id !== action.id));

    default:
      return state;
  }
};

const isLoading = (state = false, action) => {
  switch (action.type) {
    case CREATE_PAGE:
    case UPDATE_PAGE:
    case REMOVE_PAGE:
      return true;
    case UPDATE_PAGE_SUCCESS:
    case UPDATE_PAGE_ERROR:
    case CREATE_PAGE_SUCCESS:
    case CREATE_PAGE_ERROR:
    case REMOVE_PAGE_SUCCESS:
    case REMOVE_PAGE_ERROR:
      return false;
    default:
      return state;
  }
};

const isFetching = (state = {}, action) => {
  switch (action.type) {
    case FETCH_PAGES:
      return true;
    case FETCH_PAGES_SUCCESS:
    case FETCH_PAGES_ERROR:
      return false;
    default:
      return state;
  }
};

const errors = (state = {}, action) => {
  switch (action.type) {
    case FETCH_PAGES_ERROR:
    case CREATE_PAGE_ERROR:
    case UPDATE_PAGE_ERROR:
    case REMOVE_PAGE_ERROR:
      return action.errors;
    case UPDATE_PAGE_SUCCESS:
    case CREATE_PAGE_SUCCESS:
    case REMOVE_PAGE_SUCCESS:
    case FETCH_PAGES_SUCCESS:
      return null;
    default:
      return state;
  }
};

// const visibilityFilter = (state = [], action) => {
//   let index;

//   switch(action.type) {

//     case SET_ARTICLES_POSTS_VISIBILITY_FILTER:
//       index = _.findIndex(state, { field: action.filter.field });

//       if (index === -1) {
//         return state.concat(action.filter);
//       }
//       state[index] = action.filter;
//       return state

//     case REMOVE_ARTICLES_POSTS_VISIBILITY_FILTER:
//     case RESET_ARTICLES_POSTS_VISIBILITY_FILTER:
//       index = _.findIndex(state, { field: action.field });

//       if (index === -1) {
//         return state
//       }

//       return [
//         ...state.splice(0, index),
//         ...state.splice(index, state.length -1)
//       ];

//     default:
//       return state;
//   }
// }

export default combineReducers({
  byId,
  ids,
  isFetching,
  isLoading,
  // visibilityFilter,
  errors,
});
