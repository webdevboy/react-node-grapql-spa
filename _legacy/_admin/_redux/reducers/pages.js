import {
  ADD_PAGE,
  CREATE_PAGE,
  UPDATE_PAGE,
  INJECT_PAGE,
  SET_PAGES
} from '../constants';

const page = (state = {}, action) => {
  
  switch (action.type) {

    case ADD_PAGE:
    case CREATE_PAGE:
      return action.payload;

    case UPDATE_PAGE:
      // const updatePage = action.payload.updatePage;
      const updatePage = action.payload;

      return {
        ...state, 
        updatePage
      }

    default:
      return state

  }
}

export default function pages(state = {}, action) {
  
  if (state === null) {
    return {};
  }

  switch (action.type) {

    case INJECT_PAGE:

      return {
        ...state,
        [action.payload.id]: action.payload
      }

    case SET_PAGES:
      return Object.assign(state, action.payload);

    // case UPDATE_PAGE:

    //   return {
    //     ...state,
    //     [action.payload.id]: action.payload
    //   }

    case ADD_PAGE:
    case CREATE_PAGE:
      return {
        ...state,
        [action.payload.id]: page(undefined, action)
      };

    default:
      return state;
  }
  
}