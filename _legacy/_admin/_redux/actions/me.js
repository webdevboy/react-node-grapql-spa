import {  
    SET_USER,
    SET_USER_ERROR, 
} from '../constants';

import queryGetCurrentUser from './queries/me.graphql';

const me = function() {

  return async (dispatch, getState, { client }) => {

    const { data } = await client.query({
      query: queryGetCurrentUser,
    });

    const { me } = data;

    // if has errors
    if (me) {

      return dispatch({
        type: SET_USER,
        payload: {
          me
        },
      });

    }   
    
  }; 

}

export { me }