import {
  SET_ALL_RATES,
  UPDATE_RATE,
} from '../constants/rates';
import queryFetchRates from '../queries/fetchRates.gql';
import mutationUpdateRate from '../mutations/mutationUpdateRate.gql';

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

export const updateRate = function(id, rate) {
  return async (dispatch, getState, { client }) => {
    const { data: { updateRate: rateUpdated } } = await client.mutate({
      mutation: mutationUpdateRate,
      variables: {
        id,
        rate,
      }
    });

    if (rateUpdated.id) {
      return dispatch({
        type: UPDATE_RATE,
        payload:{
          id,
          rate,
        }
      })
    }
  }
}
