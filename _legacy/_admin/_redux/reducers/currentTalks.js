import { SET_CURRENTTALK, TOGGLE_CURRENTTALK } from '../constants';

export default function currenttalks(state = false, action) {
	
  switch (action.type) {
    case TOGGLE_CURRENTTALK:
    	return !state;
    case SET_CURRENTTALK:
      return action.payload;

    default:
      return false;
  }
}
