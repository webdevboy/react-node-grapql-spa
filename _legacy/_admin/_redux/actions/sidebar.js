
import { 
	SHOW_SIDEBAR, HIDE_SIDEBAR,
	SHOW_BACKDROP, HIDE_BACKDROP
} from '../constants';

export function showSidebar() {

	return (dispatch) => {

		dispatch({
		   type: SHOW_BACKDROP,
		});

		dispatch({
	    	type: SHOW_SIDEBAR,
	  	});

	}

}

export function hideSidebar() {

	return (dispatch) => {

		dispatch({
	    type: HIDE_SIDEBAR,
	  });

		dispatch({
	    type: HIDE_BACKDROP,
	  });

	}

}