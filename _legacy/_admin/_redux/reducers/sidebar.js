import { SHOW_SIDEBAR, HIDE_SIDEBAR } from '../constants';

export default function sidebar(state = false, action) {
	
  switch (action.type) {

    case SHOW_SIDEBAR:
      return true;

    case HIDE_SIDEBAR: {
      return false;
    }
   
    default:
      return state;
  }
}
