import {
    SET_STICKY
} from '../constants';

export const setSticky = (status) => ({
  type: SET_STICKY,
  payload: status
})
