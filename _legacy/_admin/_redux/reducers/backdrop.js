import { TOGGLE_BACKDROP, SHOW_BACKDROP, HIDE_BACKDROP } from '../constants';

export default function backdrop(state = false, action) {
	
  switch (action.type) {
    case TOGGLE_BACKDROP:
      return !state;

    case SHOW_BACKDROP: {
      return true;
    }
    case HIDE_BACKDROP: {
      return false;
    }
    default:
      return state;
  }
}
