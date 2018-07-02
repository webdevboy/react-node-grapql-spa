import {
  CUSTOMER_LOGIN_START,
  CUSTOMER_LOGIN_SUCCESS,
  CUSTOMER_LOGIN_ERROR,
  LOGOUT_CUSTOMER,
  CREATE_CUSTOMER_START,
  CREATE_CUSTOMER_SUCCESS,
  CREATE_CUSTOMER_ERROR
} from '../constants';

import Cookies from 'js-cookie';
import gql from 'graphql-tag';

export const customerLogin = ({ email, password }) => {
      
  return async (dispatch, getState, { client, history }) => {

    dispatch({
      type: CUSTOMER_LOGIN_START,
    });

    const { data, errors } = await client.networkInterface.query({
      query: gql`
      query loginCustomer($email: String!, $password: String!) {
        loginCustomer(email: $email, password: $password) {
          token
          customer {
            sfid
            email
            first_name
            last_name
            phone
            account_id
          }
        }
      }
      `,
      variables: { email, password },
    });
    
    if (typeof errors !== 'undefined') {

      dispatch({
        type: CUSTOMER_LOGIN_ERROR,
        payload: {
          errors
        },
      });

    } else {

      const { user, token } = data.login;
      // if success
      // const last_login = new Date().toISOString();
      // await client.networkInterface.query({
      //   query: updateLastLogin,
      //   variables: { id: user.id, last_login: last_login },
      // });

      if (process.env.BROWSER) {
        Cookies.set('id_token', token);
      }

      dispatch({
        type: CUSTOMER_LOGIN_SUCCESS,
        payload: {
          user,
          token
        },
      });

      history.push('/');

    }

  };

}

export const createCustomer = ({ title, email, firstName, lastName, password, phone }) => {
  return async (dispatch, getState, { client, history }) => {
    dispatch({
      type: CREATE_CUSTOMER_START,
    });

    try {
      const { data } = await client.networkInterface.query({
        query: gql`
          mutation createCustomer($email: String!, $phone: String!, $password: String!, $firstName: String, $lastName: String!) {
            createCustomer(email: $email, phone: $phone, password: $password, firstName: $firstName, lastName: $lastName) {
                  sfid
                  email
                  first_name
                  last_name
                  type__c
                  account_id
                  phone
                }
            }
        `,
        variables: { email, firstName, lastName, password, phone },
      });

      const { createCustomer } = data;

      if(createCustomer){
        dispatch({
          type: CREATE_CUSTOMER_SUCCESS,
          payload: {
            user: createCustomer
          },
        });
      }
    } catch(e) {

      const errors = [{
        key: 'general',
        message: 'Unexpected server error'
      }];

      dispatch({
        type: CREATE_CUSTOMER_ERROR,
        payload: {
          errors
        }
      })

    }

  };
}


// export const editUser = (changes) => {
//   return async (dispatch, getState, { client, history }) => {
//     dispatch({
//       type: EDIT_USER_START,
//     });

//     try {

//       const { data } = await client.networkInterface.query({
//         query: queryEditUser,
//         variables: { email, role_id, first_name, last_name, last_login },
//       });

//       const { createUser } = data;

//       if(createUser){
//         dispatch({
//           type: ADD_USER_SUCCESS,
//           payload: {
//             user: createUser
//           },
//         });
//       }
//     } catch(e) {

//       const errors = [{
//         key: 'general',
//         message: 'Unexpected server error'
//       }];

//       dispatch({
//         type: CREATE_USER_ERROR,
//         payload: {
//           errors
//         }
//       })

//     }

//   };
// }

// export const logout = function() {

//   return (dispatch, getState, { fetch }) => {
    
//     dispatch({
//       type: LOGOUT_USER,
//     });

//     if (process.env.BROWSER) {
//       Cookies.remove('id_token');
//       window.location.reload();
//     }
    
//     return fetch('/logout', { method: 'POST' })
//       .then(() => dispatch({ type: LOGOUT_USER, error: false }))
//       .catch(error => dispatch({ type: LOGOUT_USER, payload: error, error: true }))
    
//   };
        
// }

// export const me = () => {
//   console.log('AQUI ME');
//   return async (dispatch, getState, { client }) => {

//     const { data } = await client.networkInterface.query({
//       query: queryMe,
//     });
//     const { me } = data;

//     // if has errors
//     if (me) {

//       dispatch({
//         type: SET_USER,
//         payload: me,
//       });

//     }

//   }; 

// }

// export const removeUser = ({ id }) => {
//   return async (dispatch, getState, { client }) => {
    
//     dispatch({
//       type: REMOVE_USER,
//     });

//     try {

//       const { data } = await client.networkInterface.query({
//         query: queryRemoveUsers,
//         variables: { id },
//       });

//       console.log(data);
//       // if(data.removeUser.ids){
//       //   dispatch({
//       //     type: REMOVE_USER_SUCCESS,
//       //     payload: {
//       //       id: data.removeUser.id
//       //     },
//       //   });
//       // }
//     } catch(e) {
//       console.log('error removing user', e);
//     }

//   };
// }
