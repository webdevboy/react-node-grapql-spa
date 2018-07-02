import {
  SET_ALL_RATES,
} from '../constants/rates';
import queryFetchRates from '../queries/getRates.gql';

export const fetchRates = function() {
  return async (dispatch, getState, { client }) => {
    const { data: { rates } } = await client.query({
      query: queryFetchRates,
    });
    if (rates) {
      return dispatch({
        type: SET_ALL_RATES,
        payload:{
          rates
        }
      });
    }
  }
}