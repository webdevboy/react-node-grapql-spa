import { TOGGLE_SELECTION } from '../constants';

export default function toggleSelection(state = false, action) {
	
  switch (action.type) {

    case TOGGLE_SELECTION:
      return !state;
   
    default:
      return state;
  }
}
