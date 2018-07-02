import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT_USER,
  USER_SET_AVATAR,
  SET_USER,
  GET_USERS,
  SET_USER_ERROR,
  CREATE_USER_START,
  CREATE_USER_ERROR,
  SET_ALL_USERS,
  SET_ALL_ROLES,
  REMOVE_USER,
  REMOVE_USER_SUCCESS,
  ADD_USER_SUCCESS,
  SELECT_USERS,
} from '../constants';

import Cookies from 'js-cookie';

import queryLogin from './queries/login.graphql';
import queryCreateUser from './mutations/createUser.graphql';
import queryRemoveUsers from './mutations/removeUsers.graphql';
import updateLastLogin from './mutations/updateLastLogin.graphql';
import queryGetAvatar from './queries/getAvatar.graphql';
import queryMe from './queries/me.graphql';
import queryUsers from './queries/users.graphql';
import queryEditUser from './mutations/editUser.graphql';

export const selectUsers = ({ selectedUsers }) => {
  return async (dispatch) => {
    dispatch({
      type: SELECT_USERS,
      payload: {
        selectedUsers
      }
    });
  }
}

export const login = ({ email, password }) => {
      
  return async (dispatch, getState, { client, history }) => {

    dispatch({
      type: LOGIN_START,
    });

    const { data, errors } = await client.networkInterface.query({
      query: queryLogin,
      variables: { email, password },
    });
    
    if (typeof errors !== 'undefined') {

      dispatch({
        type: LOGIN_ERROR,
        payload: {
          errors
        },
      });

    } else {

      console.log(data);
      const { user, token } = data.login;
      // if success
      const last_login = new Date().toISOString();
      await client.networkInterface.query({
        query: updateLastLogin,
        variables: { id: user.id, last_login: last_login },
      });

      if (process.env.BROWSER) {
        Cookies.set('id_token', token);
      }

      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          user,
          token
        },
      });

    }

  };

}

export const getAvatar = ({email}) => {
  return async (dispatch, getState, { client }) => {

    const { data } = await client.networkInterface.query({
      query: queryGetAvatar,
      variables: { email },
    });

    const { avatar_path } = data.getAvatar;

    if (avatar_path) {
      dispatch({
        type: USER_SET_AVATAR,
        payload: avatar_path
      });
    }

  };
}


export const createUser = ({ email, role_id, first_name, last_name }) => {
  return async (dispatch, getState, { client, history }) => {
    dispatch({
      type: CREATE_USER_START,
    });

    try {
      const last_login = new Date().toISOString();
      const { data } = await client.networkInterface.query({
        query: queryCreateUser,
        variables: { email, role_id, first_name, last_name, last_login},
      });
      const { createUser } = data;
      if(createUser){
        dispatch({
          type: ADD_USER_SUCCESS,
          payload: {
            user: createUser
          },
        });
      }
    } catch(e) {

      const errors = [{
        key: 'general',
        message: 'Unexpected server error'
      }];

      dispatch({
        type: CREATE_USER_ERROR,
        payload: {
          errors
        }
      })

    }

  };
}


export const editUser = (changes) => {
  return async (dispatch, getState, { client, history }) => {
    dispatch({
      type: EDIT_USER_START,
    });

    try {

      const { data } = await client.networkInterface.query({
        query: queryEditUser,
        variables: { email, role_id, first_name, last_name, last_login },
      });

      const { createUser } = data;

      if(createUser){
        dispatch({
          type: ADD_USER_SUCCESS,
          payload: {
            user: createUser
          },
        });
      }
    } catch(e) {

      const errors = [{
        key: 'general',
        message: 'Unexpected server error'
      }];

      dispatch({
        type: CREATE_USER_ERROR,
        payload: {
          errors
        }
      })

    }

  };
}

export const logout = function() {

  return (dispatch, getState, { fetch }) => {
    
    dispatch({
      type: LOGOUT_USER,
    });

    if (process.env.BROWSER) {
      Cookies.remove('id_token');
      window.location.reload();
    }
    
    return fetch('/logout', { method: 'POST' })
      .then(() => dispatch({ type: LOGOUT_USER, error: false }))
      .catch(error => dispatch({ type: LOGOUT_USER, payload: error, error: true }))
    
  };
        
}

export const me = () => {
  return async (dispatch, getState, { client }) => {


    const { data } = await client.networkInterface.query({
      query: queryMe,
    });
    const { me } = data;
    // console.log('GET ME() ACTION', me);
    // if has errors
    if (me) {

      dispatch({
        type: SET_USER,
        payload: me,
      });

    }

  }; 

}

export const removeUser = ({ id }) => {
  return async (dispatch, getState, { client }) => {
    
    dispatch({
      type: REMOVE_USER,
    });

    try {

      const { data } = await client.networkInterface.query({
        query: queryRemoveUsers,
        variables: { id },
      });

      // console.log(data);
      // if(data.removeUser.ids){
      //   dispatch({
      //     type: REMOVE_USER_SUCCESS,
      //     payload: {
      //       id: data.removeUser.id
      //     },
      //   });
      // }
    } catch(e) {
      console.log('error removing user', e);
    }

  };
}
