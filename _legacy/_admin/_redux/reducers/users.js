import { SELECT_USERS } from '../constants';

const INITIAL_STATE = {
	selectedUsers: []
}

export default function toggleSelection(state = INITIAL_STATE, action) {
	
  switch (action.type) {

    case SELECT_USERS:
      return {
      	...state,
      	selectedUsers: action.payload.selectedUsers
      }
   
    default:
      return state;
  }
}
