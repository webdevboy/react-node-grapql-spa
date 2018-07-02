import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT_USER,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_ERROR,
  SET_USER,
  SET_EDIT_MODE,
  LOGIN_ACCOUNT_START,
  LOGIN_ACCOUNT_SUCCESS,
  LOGIN_ACCOUNT_ERROR,
  FORGOT_PASSWORD_START,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_ERROR,
  CREATE_ACCOUNT_START,
  CREATE_ACCOUNT_SUCCESS,
  CREATE_ACCOUNT_ERROR,
} from "../constants/auth";
import history from 'core/history';
import Cookies from "js-cookie";
import queryLogin from "../queries/login.graphql";
import queryMe from "../queries/me.graphql";
import mutationCreateAccount from "../mutations/createAccount.graphql";
import mutationForgotPassword from "../mutations/forgotPassword.gql";
import mutationSetNewPassword from "../mutations/setNewPassword.gql";

export const login = ({ email, password }) => async (dispatch, getState, { client, history }) => {
  dispatch({
    type: LOGIN_START,
  });

  try {
    const { data } = await client.query({
      query: queryLogin,
      variables: {
        login: {
          email,
          password,
        },
        admin: false,
      },
      fetchPolicy: 'no-cache'
    });

    const { contact, token, activate, reset_password, migrated } = data.login;

    if (token && process.env.BROWSER) {
      Cookies.set(
        "id_token",
        token,
        {
          domain: `.${window.App.hostname}`, // prod.loonajets.com
          secure: !__DEV__,
        },
      );
    }

    return dispatch({
      type: LOGIN_SUCCESS,
      payload: {
        user: contact,
        token,
        activate,
        reset_password,
        migrated,
      },
    });

  } catch(e) {
    dispatch({
      type: LOGIN_ERROR,
      errors: e,
    });
  }
}

export const logout = () => async (dispatch, getState, { fetch }) => {
  dispatch({
    type: LOGOUT_USER,
  })
  const { is_admin } = getState().auth;

  if (process.env.BROWSER) {
    Cookies.remove("id_token", {
      domain: `.${window.App.hostname}`,
    });
  }
  
  try {
    const logout = await fetch("/logout", { method: "GET" });
    await history.push('/');
    // await dispatch({ 
    //   type: LOGOUT_USER_SUCCESS,
    //   errors: null,
    // });
  } catch (e) {
    dispatch({
      type: LOGOUT_USER_ERROR,
      errors: e,
    })
  }
};

export const me = () => async (dispatch, getState, { client }) => {
  const { data } = await client.query({
    query: queryMe,
  });

  if (data && data.me) {
    return dispatch({
      type: SET_USER,
      payload: data.me,
    });
  }
};

export const setNewPassword = ({ password, token }) => async (dispatch, getState, { client }) => {
  const { data } = await client.mutate({
    mutation: mutationSetNewPassword,
    variables: {
      password,
      token,
    },
    fetchPolicy: 'no-cache'
  });

  return data.setNewPassword;
};

export const toggleEditMode = () => async (dispatch, getState) => {
  const value = getState().auth.edit_mode;
  Cookies.set("edit_mode", !value);

  return {
    type: SET_EDIT_MODE,
    payload: {
      value: !value
    },
  };
}

export const createAccount = ({ account, options }) => async (dispatch, getState, { client }) => {

  dispatch({
    type: CREATE_ACCOUNT_START,
  });

  try {
    const { data } = await client.mutate({
      mutation: mutationCreateAccount,
      variables: {
        account,
        options,
      },
      fetchPolicy: 'no-cache'
    });

    dispatch({
      type: CREATE_ACCOUNT_SUCCESS,
    });

    return data.createAccount;

  } catch(e) {
    dispatch({
      type: CREATE_ACCOUNT_ERROR,
      errors: e,
    });
  }

}

export const forgotPassword = ({ email }) => async (dispatch, getState, { client }) => {
  dispatch({
    type: FORGOT_PASSWORD_START,
  });

  try {
    const { data } = await client.mutate({
      mutation: mutationForgotPassword,
      variables: {
        email,
      },
      fetchPolicy: 'no-cache'
    });

    dispatch({
      type: FORGOT_PASSWORD_SUCCESS,
    });

    return data.forgotPassword;

  } catch(e) {
    dispatch({
      type: FORGOT_PASSWORD_ERROR,
      errors: e,
    });
  }
}
