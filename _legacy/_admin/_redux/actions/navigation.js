
import { 
	TOGGLE_NAV, SHOW_NAV, HIDE_NAV ,
	TOGGLE_BACKDROP, SHOW_BACKDROP, HIDE_BACKDROP,
	SELECT_IN_TABLE
} from '../constants';

export function toggleNav() {

	return async (dispatch) => {

		await dispatch({
	        type: TOGGLE_BACKDROP,
	    });

		await dispatch({
	        type: TOGGLE_NAV,
	    });

	}
  
}

export function showNav() {
  return {
    type: SHOW_NAV
  };
}

export function hideNav() {
  return {
    type: HIDE_NAV
  };
}

export const selectInTable = ({ selectedInTable }) => {
  return async (dispatch) => {
    dispatch({
      type: SELECT_IN_TABLE,
      payload: {
        selectedInTable
      }
    });
  }
}