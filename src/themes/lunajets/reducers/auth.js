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

const INITIAL_STATE = {
  loading: false,
  errors: null,
  user: null,
  token: null,
  edit_mode: false,
  activate: false,
  reset_password: false,
  migrated: false,
};

const auth = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGOUT_USER:
      return state;

    case LOGOUT_USER_SUCCESS:
      return INITIAL_STATE;
    
    case LOGOUT_USER_ERROR:
    case LOGIN_ACCOUNT_ERROR:
    case FORGOT_PASSWORD_ERROR:
    case CREATE_ACCOUNT_ERROR:
      return {
        ...INITIAL_STATE,
        errors: action.errors
      };

    case LOGIN_START:
    case LOGIN_ACCOUNT_START:
      return {
        ...state,
        loading: true,
        user: null,
        token: null,
        errors: null,
      };

    case LOGIN_SUCCESS:
    case LOGIN_ACCOUNT_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload.user,
        token: action.payload.token,
        reset_password: action.payload.reset_password,
        activate: action.payload.activate,
        migrated: action.payload.migrated,
        errors: null,
      };
    case LOGIN_ERROR:
    case LOGIN_ACCOUNT_ERROR:
      return {
        ...state,
        loading: false,
        errors: action.payload.errors,
        user: null,
        token: null,
        reset_password: null,
        activate: null,
        migrated: null,
      };

    case SET_USER: {
    	return {
        ...state,
        user: action.payload,
      };
    }
    case SET_EDIT_MODE: {
      return {
        ...state,
        edit_mode: action.payload.value,
      }
    }

    default:
      return state;
  }
}

export default auth
