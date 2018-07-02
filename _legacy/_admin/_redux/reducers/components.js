import {
  ADD_COMPONENT,
  UPDATE_COMPONENT
} from '../constants';


export default function components(state = {}, action) {
  if (state === null) {
    return {};
  }

  switch (action.type) {

    case ADD_COMPONENT:
      return Object.assign({},state,{[action.component.id]:action.component})
    case UPDATE_COMPONENT:
      return {...state, 
        [action.component.id]: action.component
      }

    default:
      return state;
  }
  
}