import { SELECT_IN_TABLE } from '../constants';


const INITIAL_STATE = {
  selectedInTable: []
}

export default  function toggleSelection(state = INITIAL_STATE, action) {
  
  switch (action.type) {

    case SELECT_IN_TABLE:
      return {
        ...state,
        selectedInTable: action.payload.selectedInTable
      }
   
    default:
      return state;
  }
}