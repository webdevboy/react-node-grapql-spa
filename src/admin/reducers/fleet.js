import { combineReducers } from "redux";

import aircrafts from "./fleetAircrafts";
import models from "./fleetAircraftModels";
import categories from "./fleetAircraftCategories";
import manufacturers from "./fleetAircraftManufacturers";

const visibilityFilter = (state = [], action) => {
  let index;

  switch (action.type) {
    // case SET_ARTICLES_POSTS_VISIBILITY_FILTER:
    //   index = _.findIndex(state, { field: action.filter.field });

    //   if (index === -1) {
    //     return state.concat(action.filter);
    //   }
    //   state[index] = action.filter;
    //   return state

    // case REMOVE_ARTICLES_POSTS_VISIBILITY_FILTER:
    // case RESET_ARTICLES_POSTS_VISIBILITY_FILTER:
    //   index = _.findIndex(state, { field: action.field });

    //   if (index === -1) {
    //     return state
    //   }

    //   return [
    //     ...state.splice(0, index),
    //     ...state.splice(index, state.length -1)
    //   ];

    default:
      return state;
  }
};

export default combineReducers({
  aircrafts,
  models,
  categories,
  manufacturers,
  visibilityFilter,
});
