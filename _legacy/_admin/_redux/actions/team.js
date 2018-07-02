import {  
    CREATE_TEAM,
    CREATE_TEAM_MEMBER,
    UPDATE_TEAM,
    SET_TEAMS,
    REMOVE_TEAM,
    REORDER_TEAM,
    REORDER_TEAM_MEMBER,
} from '../constants';

import queryGetOffice from './queries/offices.graphql';
import queryGetTeam from './queries/team.graphql';
import mutationCreateOffice from './mutations/createOffice.graphql';
import mutationRemoveTeam from './mutations/removeTeam.graphql';
import mutationCreateTeam from './mutations/createTeam.graphql';  
import mutationCreateTeamMember from './mutations/createTeamMember.graphql';
import mutationUpdateTeam from './mutations/updateTeam.graphql';
import mutationUpdateTeamMember from './mutations/updateTeamMember.graphql';

export const setTeams = function(data) {

  return async (dispatch, getState, { client }) => {

    const { data } = await client.query({
      query: queryGetTeam,
    });

    const { getTeam } = data;

    if(getTeam){ 
      dispatch({
        type: SET_TEAMS,
        payload: getTeam
      });
    }
  }; 

}


export const createTeam = function( args ) {
  return async (dispatch, getState, { client, history }) => {

    try {
      const { data } = await client.networkInterface.query({
        query: mutationCreateTeam,
        variables: {...args},
      });

      const { createTeam } = data;

      dispatch({
        type: CREATE_TEAM,
        payload: createTeam
      });

    } catch(e) {

      const errors = [{
        key: 'general',
        message: 'Unexpected server error'
      }];

    }

  };
}

export const createTeamMember = function( args ) {
  return async (dispatch, getState, { client, history }) => {

    try {
      const { data } = await client.networkInterface.query({
        query: mutationCreateTeamMember,
        variables: {...args},
      });

      const { createTeamMember } = data;
      dispatch({
        type: CREATE_TEAM_MEMBER,
        payload: createTeamMember
      });

    } catch(e) {

      const errors = [{
        key: 'general',
        message: 'Unexpected server error'
      }];

    }

  };
}


export const removeTeam = function({ id }) {
  return async (dispatch, getState, { client, history }) => {

    try {
      const { data } = await client.networkInterface.query({
        query: mutationRemoveTeam,
        variables: { id },
      });
      if(data){
        dispatch({
          type: REMOVE_TEAM,
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

export const updateTeam = function({id, body}) {

  return async (dispatch, getState, { client, history }) => {

    try {

      const { data } = await client.networkInterface.query({
        query: mutationUpdateTeam,
        variables: { id, body },
      });

      const updateTeam = data.updateTeam;

        dispatch({
          type: UPDATE_TEAM,
          payload: updateTeam,
        });
        
    } catch(e) {

      const errors = [{
        key: 'general',
        message: 'Unexpected server error'
      }];

    }

  };
}


export const reorderTeam = function(args) {
  return async (dispatch, getState, { client, history }) => {

    try {

      await client.networkInterface.query({
        query: mutationUpdateTeam,
        variables: {id: args.id_old, order: args.newIndex},
      });

      await client.networkInterface.query({
        query: mutationUpdateTeam,
        variables: {id: args.id_new, order: args.oldIndex},
      });

      dispatch({
        type: REORDER_TEAM,
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

export const reorderTeamMembers = function(args) {
  return async (dispatch, getState, { client, history }) => {

    try {

      await client.networkInterface.query({
        query: mutationUpdateTeamMember,
        variables: {id: args.id_old, order: args.newIndex},
      });

      await client.networkInterface.query({
        query: mutationUpdateTeamMember,
        variables: {id: args.id_new, order: args.oldIndex},
      });

      dispatch({
        type: REORDER_TEAM_MEMBER,
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