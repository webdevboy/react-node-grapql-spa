import { combineReducers } from "redux";
import {
  FETCH_TERM_TAXONOMY,
  FETCH_TERM_TAXONOMY_SUCCESS,
  FETCH_TERM_TAXONOMY_ERROR,
  ADD_TERM_TAXONOMY,
  ADD_TERM_TAXONOMY_SUCCESS,
  ADD_TERM_TAXONOMY_ERROR,
} from "../constants/termTaxonomy";

const ids = (state = [], action) => {
  switch (action.type) {
    case FETCH_TERM_TAXONOMY_SUCCESS:
      return action.response.taxonomies;

    default:
      return state;
  }
};

export default combineReducers({
  ids,
});
