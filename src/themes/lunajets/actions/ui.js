import history from 'core/history';
import {
  SET_STICKY,
  IS_MOBILE,
  OPEN_FLY_NOW,
  CLOSE_FLY_NOW,
  OPEN_AUTH_MODAL,
  CLOSE_AUTH_MODAL,
} from '../constants/ui';

export const setSticky = (status) => ({
  type: SET_STICKY,
  payload: status
})

export const isMobile = (status) => ({
  type: IS_MOBILE,
  payload: status
})

export const openFlyNow = () => ({
  type: OPEN_FLY_NOW,
  payload: true
})

export const closeFlyNow = () => ({
  type: CLOSE_FLY_NOW,
  payload: false
})

export const openAuthModal = ({ action }) => (dispatch) => {
  history.replace(`/?action=${action}`);

  return dispatch({
    type: OPEN_AUTH_MODAL,
    payload: {
      action,
      open: true,
    }
  });

};

export const closeAuthModal = () => (dispatch) => {
  history.replace('');

  return dispatch({
    type: CLOSE_AUTH_MODAL,
  });
  
};