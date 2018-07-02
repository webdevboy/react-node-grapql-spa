import { SET_CURRENTTALK, TOGGLE_CURRENTTALK } from '../constants';
import Cookies from 'js-cookie';

export function toggleCurrentTalk() {

  const current = (Cookies.get('chattalks-expanded') == 'true');
  Cookies.set('chattalks-expanded', !current);

  return {
    type: TOGGLE_CURRENTTALK,
  };

}

export function setCurrentTalk(val) {

  return {
    type: SET_CURRENTTALK,
    payload: val
  };

}