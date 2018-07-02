import {
  SET_ALL_USERS,
  SET_ALL_ROLES,
  REMOVE_USER_SUCCESS,
  ADD_USER_SUCCESS,
  SET_ALL_REDIRECTIONS,
  ADD_REDIRECT_SUCCESS,
  REMOVE_REDIRECT_SUCCESS,
  SET_ALL_RATES,
  UPDATE_RATE,
  SET_LOCALES,
  SET_TRANSLATIONS,
  ADD_LANGUAGE,
  REMOVE_LANGUAGE,
  SET_LANGUAGE_ENABLED,
  SET_EDITOR_LOCALE,
  UPDATE_REDIRECTION,
  UPDATE_TRANSLATION,
} from '../constants';
import _ from 'lodash';

const INITIAL_STATE = {
  loading: false,
  errors: [],
  roles: [],
  users: [],
  redirections: [],
  rates: [],
  locales:[],
  translations: [],
};

function redirection(state, action) {

  switch(action.type) {
    case UPDATE_REDIRECTION:

      if (state.id === action.payload.id) {
        return action.payload
      }

      return state

      break;
    default:
      return state
  }

}

export default function admin(state = {}, action) {
  if (state === null) { // server doesn't suppprt state = {}
    return INITIAL_STATE;
  }

  switch (action.type) {
    case SET_ALL_USERS:
      return {
        ...state,
        users:  action.payload.users
      }
    case SET_ALL_ROLES:
      return {
        ...state,
        roles: action.payload.roles
      };
    case SET_ALL_REDIRECTIONS:
      return {
        ...state,
        redirections:  action.payload
      };
    case REMOVE_USER_SUCCESS:
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.payload.id)
      };
    case ADD_REDIRECT_SUCCESS:
      return {
        ...state,
          redirections: [...state.redirections, action.payload.redirection]
      };
    case REMOVE_REDIRECT_SUCCESS:
      return {
        ...state,
        redirections: state.redirections.filter(redirect => redirect.id !== action.payload.id)
      };
    case UPDATE_REDIRECTION:
      return {
        ...state,
        redirections: state.redirections.map(r => redirection(r, action))
      };
    case SET_ALL_RATES:
      return {
        ...state,
        rates: action.payload.rates
      };
    case UPDATE_RATE:
      return {
        ...state
      };
    case SET_LOCALES:
      return {
        ...state,
        locales: action.payload.locales
      };  
    case ADD_LANGUAGE:
      return {
        ...state,
        locales: [...state.locales,action.payload.locale]
      };
    case SET_EDITOR_LOCALE:
      return {
        ...state,
        editorLocale: action.locale
      }
    case SET_TRANSLATIONS:
      return {
        ...state,
        translations: action.payload.translations
      }
    case UPDATE_TRANSLATION:
      return {
        ...state,
        translations: state.translations.map((translation) => {if(translation.message_id == action.payload.message_id){ return {...translation, translation: action.payload.translation}} return translation})
      }
    case REMOVE_LANGUAGE:
      return{
        ...state,
        locales: state.locales.filter(locale => locale.id !== action.payload.id)
      }
      case SET_LANGUAGE_ENABLED:
        return{
          ...state,
          locales: state.locales.map(locale => {if(locale.id == action.payload.id){let c = Object.assign({},locale); c.enabled=action.payload.enabled; return c} else {return locale} })
        }
    default:
      return state;
  }
}