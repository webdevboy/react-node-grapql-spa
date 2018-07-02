import {
  SET_LOCALE_START,
  SET_LOCALE_SUCCESS,
  SET_LOCALE_ERROR,
  SET_CURRENCY_START,
  SET_CURRENCY_SUCCESS,
  SET_CURRENCY_ERROR,
  SET_EDITOR_LOCALE,
  UPDATE_TRANSLATION,
  SET_AVAILABLE_LOCALES,
  SET_EDITOR_LOCALE_ERROR
} from '../constants';

export default function intl(state = null, action) {
  if (state === null) {
    return {
      initialNow: Date.now(),
    };
  }

  switch (action.type) {
    
    case SET_AVAILABLE_LOCALES: {
      return {
        ...state,
        availableLocales: action.payload.locales
      }
    }

    case SET_LOCALE_START: {
      const locale = state[action.payload.locale]
        ? action.payload.locale
        : state.locale;
      return {
        ...state,
        locale,
        newLocale: action.payload.locale,
      };
    }

    case UPDATE_TRANSLATION: {
      return {
        ...state,
        messages: {...state.messages, [action.payload.locale]: Object.assign(state.messages[action.payload.locale], {[action.payload.message_id]: action.payload.translation})}
      };
    }

    case SET_LOCALE_SUCCESS: {
      return {
        ...state,
        locale: action.payload.locale,
        newLocale: null,
        messages: {
          ...state.messages,
          [action.payload.locale]: action.payload.messages,
        },
      };
    }

    case SET_EDITOR_LOCALE: {
      return {
        ...state,
        editorLocale: action.payload.editorLocale,
        newLocale: null,
        messages: {
          ...state.messages,
          [action.payload.editorLocale]: action.payload.messages,
        },
      };
    }

    case SET_LOCALE_ERROR: {
      return {
        ...state,
        newLocale: null,
      };
    }

    case SET_EDITOR_LOCALE_ERROR:{
      return state
    }

    case SET_CURRENCY_START: {
      const currency = state[action.payload.currency]
        ? action.payload.currency
        : state.currency;
      return {
        ...state,
        currency,
        newCurrency: action.payload.currency,
      };
    }

    case SET_CURRENCY_SUCCESS: {
      return {
        ...state,
        currency: action.payload.currency,
        newCurrency: null,
        rate: action.payload.rate
      };
    }

    case SET_CURRENCY_ERROR: {
      return {
        ...state,
        newCurrency: null,
      };
    }
    default: {
      return state;
    }
  }
}
