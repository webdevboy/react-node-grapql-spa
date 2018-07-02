import { TOGGLE_NAV, SHOW_NAV, HIDE_NAV } from '../constants';




export default function navigation(state = false, action) {
	
  switch (action.type) {
    case TOGGLE_NAV:
      return !state;

    case SHOW_NAV: {
      return true;
    }
    case HIDE_NAV: {
      return false;
    }
    default:
      return state;
  }
}

