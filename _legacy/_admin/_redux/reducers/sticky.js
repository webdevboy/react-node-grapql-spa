import {
    SET_STICKY
} from '../constants';

export default (state = false, action) => {
  switch (action.type) {

  case SET_STICKY:

    if (state !== action.payload) {
        return action.payload
    }
    

  default:
    return state
  }
}
