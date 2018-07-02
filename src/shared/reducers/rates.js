import {
  SET_ALL_RATES,
} from '../constants/rates';

const INITIAL_STATE = [];
export default (state = INITIAL_STATE, action) => {

  if (state === null) {
    return INITIAL_STATE;
  }

  switch(action.type) {
    
    case SET_ALL_RATES:
      return action.payload.rates;

    default:
      return state;
  }
};