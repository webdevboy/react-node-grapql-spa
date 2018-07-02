import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT_USER,
  SET_USER,
} from "../constants/auth";
import Cookies from "js-cookie";
import queryLogin from "admin/queries/login.graphql";
import queryMe from "admin/queries/me.graphql";

export const login = ({ login }) => async (dispatch, getState, { client, history }) => {

  dispatch({
    type: LOGIN_START,
  });

  try {
    const { data: { login: { user, token } } } = await client.query({
      query: queryLogin,
      variables: { login },
    })
    
    // console.log('user token => ',user, token);
    if (process.env.BROWSER) {

      Cookies.set(
        "id_token",
        token,
        {
          domain: `.${window.App.hostname}`, // prod.loonajets.com
          secure: !__DEV__,
        },
      );
      
    }
  
    dispatch({
      type: LOGIN_SUCCESS,
      payload: {
        user,
        token,
      },
    });

  } catch (e) {
    dispatch({
      type: LOGIN_ERROR,
      payload: {
        errors: e,
      },
    });
  }
};

export const logout = () => async (dispatch, getState, { fetch }) => {
  dispatch({
    type: LOGOUT_USER,
  });

  if (process.env.BROWSER) {
    Cookies.remove("id_token", {
      domain: `.${window.App.hostname}`,
    });
    Cookies.remove("edit_mode");
  }

  fetch("/logout", { method: "GET" })
    .then(() => {
      dispatch({ type: LOGOUT_USER, error: false });
      window.location.reload();
    })
    .catch(error => dispatch({ type: LOGOUT_USER, payload: error, error: true }));
};

export const me = () => async (dispatch, getState, { client }) => {
  const { data } = await client.query({
    query: queryMe,
  });
  const { me: user } = data;

  if (user) {
    return dispatch({
      type: SET_USER,
      payload: user,
    });
  }
};
