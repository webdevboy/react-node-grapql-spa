import {
  CREATE_OFFICE,
  UPDATE_OFFICE,
  SET_OFFICES,
  REMOVE_OFFICE,
  REORDER_OFFICE,
} from '../constants';


function immutableMove(arr, from, to) {
  return arr.reduce((prev, current, idx, self) => {
    if (from === to) {
      prev.push(current);
    }
    if (idx === from) {
      return prev;
    }
    if (from < to) {
      prev.push(current);
    }
    if (idx === to) {
      prev.push(self[from]);
    }
    if (from > to) {
      prev.push(current);
    }
    return prev;
  }, []);
}

function office(state, action) {
  switch(action.type) {
    case CREATE_OFFICE:
      return action.payload.createOffice
    case UPDATE_OFFICE:
      if (state.id === action.payload.id) {
        return action.payload
      }

      return state
    // case REORDER_OFFICE:
    //    state.splice(action.payload.newIndex, 0, state.splice(action.payload.oldIndex, 1)[0]);
    default:
      return state
  }
}

export default function offices(state = [], action) {

  switch (action.type) {

    case SET_OFFICES:

      return {
        ...state,
        offices: action.payload
      };

    case UPDATE_OFFICE:
      return {
        ...state,
       offices: state.offices.map(r => office(r, action))
      };

    case CREATE_OFFICE:
      return {
        ...state,
        offices: [...state.offices, action.payload ]
      };
      
    case REMOVE_OFFICE:
      return {
        ...state,
        offices: state.offices.filter(office => office.id !== action.payload.id)
      };

    case REORDER_OFFICE:
      return {
        ...state,
        offices: immutableMove(state.offices, action.payload.oldIndex, action.payload.newIndex)
      }

    default:
      return state;
  }
  
}