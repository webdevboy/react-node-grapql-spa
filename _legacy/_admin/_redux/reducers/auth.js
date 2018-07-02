import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  SET_USER,
  SET_USER_ERROR,
  LOGOUT_USER,
  USER_SET_AVATAR,
  GET_USERS,
} from '../constants';

const INITIAL_STATE = {
  loading: false,
  errors: null,
  user: null,
  token: null
};

export default function auth(state = {}, action) {
  if (state === null) { // server doesn't suppprt state = {}
    return INITIAL_STATE;
  }

  switch (action.type) {
    case USER_SET_AVATAR:
      return {
        ...state,
        user: {
          avatar_path: action.payload
        }
      }
    case LOGOUT_USER:
      return action.error === false ? INITIAL_STATE : state;
    case LOGIN_START:
      return {
        ...state,
        loading: true,
        user: null,
        token: null,
        errors: null
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload.user,
        token: action.payload.token,
        errors: null
      };
    case LOGIN_ERROR:
      return {
        ...state,
        loading: false,
        errors: action.payload.errors,
        user: null,
        token: null,
      };
    case GET_USERS:
      return {
        ...state,
        users: action.payload.users,
      };
    case SET_USER: {
    	return {
        ...state,
        user: action.payload,
      };
    }
    case SET_USER_ERROR:
      return {
        ...state,
        loading: false,
        errors: action.payload.errors,
      };
    default:
      return state;
  }
}