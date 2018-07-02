import { combineReducers } from 'redux';
import {
  SHOW_SEARCH
} from '../constants/navbar';

const showSearch = (state = false, action) => {
  if (action.type === SHOW_SEARCH) {
      return action.payload;
  }

  return state
}

export default combineReducers({
  showSearch
});