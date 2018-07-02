import { combineReducers } from 'redux';
import {
  SET_STICKY,
  IS_MOBILE,
  OPEN_FLY_NOW,
  CLOSE_FLY_NOW,
  OPEN_AUTH_MODAL,
  CLOSE_AUTH_MODAL,
} from '../constants/ui';

const sticky = (state = false, action) => {
  if (action.type === SET_STICKY) {
    if (state !== action.payload) {
      return action.payload
    }
  }
  return state
}

const isMobile = (state = false, action) => {
  if (action.type === IS_MOBILE) {
    return action.payload
  }
  return state
}

const flyNow = (state = false, action) => {
  if (action.type === OPEN_FLY_NOW) {
    return action.payload || true
  }
  if (action.type === CLOSE_FLY_NOW) {
    return action.payload || false
  }

  return state
}

const authModal = (state = {}, action) => {

  if (action.type === OPEN_AUTH_MODAL) {
    return {
      action: action.payload.action,
      open: true,
    }
  }
  if (action.type === CLOSE_AUTH_MODAL) {
    return {
      action: null,
      open: false
    }
  }

  return state
}

export default combineReducers({
  sticky,
  isMobile,
  flyNow,
  authModal,
});