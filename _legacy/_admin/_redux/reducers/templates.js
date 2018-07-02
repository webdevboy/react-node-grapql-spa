import {
  ADD_TEMPLATE,
  CREATE_TEMPLATE,
  UPDATE_TEMPLATE,
  SET_TEMPLATES,
} from '../constants';

const template = (state = {}, action) => {
  
  switch (action.type) {

    case ADD_TEMPLATE:
    case CREATE_TEMPLATE:
      return action.payload;

    case UPDATE_TEMPLATE:
      // const updatePage = action.payload.updatePage;
      const updateTemplate = action.payload;

      return {
        ...state, 
        updateTemplate
      }

    default:
      return state

  }
}

export default function templates(state = {}, action) {
  
  if (state === null) {
    return {};
  }

  switch (action.type) {

    case SET_TEMPLATES:
      return Object.assign(state, action.payload);

    case UPDATE_TEMPLATE:

      return {
        ...state,
        [action.payload.id]: action.payload
      }

    case CREATE_TEMPLATE:
    case CREATE_TEMPLATE:
      return {
        ...state,
        [action.payload.id]: template(undefined, action)
      };

    default:
      return state;
  }
  
}