import {
  SET_ALL_RATES,
  UPDATE_RATE,
} from '../constants/rates';


const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {

  if (state === null) {
    return INITIAL_STATE;
  }

  switch(action.type) {
    
    case SET_ALL_RATES:
      return action.payload.rates;

    case UPDATE_RATE:
      return state;

    default:
      return state;
  }
};