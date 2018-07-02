
import { 
	TOGGLE_BACKDROP, SHOW_BACKDROP, HIDE_BACKDROP,
	TOGGLE_NAV, SHOW_NAV, HIDE_NAV,
	SHOW_SIDEBAR, HIDE_SIDEBAR
} from '../constants';

export function toggleBackdrop() {

	return (dispatch) => {

		dispatch({
		    type: TOGGLE_NAV
		});

		dispatch({
		    type: TOGGLE_BACKDROP
		});

	};
}

export function showBackdrop() {
  return {
    type: SHOW_BACKDROP
  };
}

export function hideBackdrop() {

  return (dispatch) => {

		dispatch({
		    type: HIDE_NAV
		});

		dispatch({
		    type: HIDE_SIDEBAR
		});

		dispatch({
		    type: HIDE_BACKDROP
		});

	};
}