import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT_USER,
  SET_USER,
} from "../constants/auth";

const INITIAL_STATE = {
  loading: false,
  errors: undefined,
  user: undefined,
  token: undefined,
};

export default function auth(state = {}, action) {
  switch (action.type) {
    case LOGOUT_USER:
      return action.error === false ? INITIAL_STATE : state;

    case LOGIN_START:
      return {
        ...state,
        loading: true,
        user: null,
        token: null,
        errors: null,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload.user,
        token: action.payload.token,
        errors: null,
      };
    case LOGIN_ERROR:
      return {
        ...state,
        loading: false,
        errors: action.payload.errors,
        user: null,
        token: null,
      };

    case SET_USER: {
    	return {
        ...state,
        user: action.payload,
      };
    }

    default:
      return state;
  }
}
