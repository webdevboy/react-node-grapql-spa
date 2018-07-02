import {  
    CREATE_OFFICE,
    UPDATE_OFFICE,
    SET_OFFICES,
    REMOVE_OFFICE,
    REORDER_OFFICE,
} from '../constants';

import queryGetOffice from './queries/offices.graphql';
import mutationCreateOffice from './mutations/createOffice.graphql';
import mutationRemoveOffice from './mutations/removeOffice.graphql';
import mutationUpdateOffice from './mutations/updateOffice.graphql';

export const setOffices = function(data) {

  return async (dispatch, getState, { client }) => {

    const { data } = await client.query({
      query: queryGetOffice,
    });

    const { getOffices } = data;

    if(getOffices){ 
      dispatch({
        type: SET_OFFICES,
        payload: getOffices
      });
    }
  }; 

}


export const createOffice = function( args ) {

  return async (dispatch, getState, { client, history }) => {

    try {
      const { data } = await client.networkInterface.query({
        query: mutationCreateOffice,
        variables: {...args},
      });

      const { createOffice } = data;

      dispatch({
        type: CREATE_OFFICE,
        payload: createOffice
      });

    } catch(e) {

      const errors = [{
        key: 'general',
        message: 'Unexpected server error'
      }];

    }

  };
}

export const removeOffice = function({ id }) {
  return async (dispatch, getState, { client, history }) => {

    try {
      const { data } = await client.networkInterface.query({
        query: mutationRemoveOffice,
        variables: { id },
      });
      if(data){
        dispatch({
          type: REMOVE_OFFICE,
          payload: {
            id
          },
        });
      }
    } catch(e) {
      console.log('error removing user', e);
    }

  };
}

export const updateOffice = function(args) {
  return async (dispatch, getState, { client, history }) => {

    try {

      const { data } = await client.networkInterface.query({
        query: mutationUpdateOffice,
        variables: {...args},
      });

      const updateOffice = data.updateOffice;

        dispatch({
          type: UPDATE_OFFICE,
          payload: updateOffice,
        });
        
    } catch(e) {

      const errors = [{
        key: 'general',
        message: 'Unexpected server error'
      }];

    }

  };
}


export const reorderOffices = function(args) {
  return async (dispatch, getState, { client, history }) => {

    try {

      await client.networkInterface.query({
        query: mutationUpdateOffice,
        variables: {id: args.id_old, order: args.newIndex},
      });

      await client.networkInterface.query({
        query: mutationUpdateOffice,
        variables: {id: args.id_new, order: args.oldIndex},
      });

      dispatch({
        type: REORDER_OFFICE,
        payload: args,
      });
        
    } catch(e) {

      const errors = [{
        key: 'general',
        message: 'Unexpected server error'
      }];

    }

  };
}

