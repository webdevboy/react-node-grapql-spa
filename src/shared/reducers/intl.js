import {
  SET_LOCALE_START,
  SET_LOCALE_SUCCESS,
  SET_LOCALE_ERROR,
  SET_DEFAULT_LOCALE,
  SET_BASE_CURRENCY,
  SET_CURRENCY,
  ADD_TRANSLATION_SUCCESS,
  ADD_TRANSLATION_ERROR,
  ADD_RICHTEXT_TRANSLATION_SUCCESS,
} from "../constants/intl";

export default function intl(state = null, action) {
  if (state === null) {
    return {
      initialNow: Date.now(),
    };
  }

  switch (action.type) {
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

    case SET_LOCALE_SUCCESS: {
            
      return {
        ...state,
        locale: action.payload.locale,
        newLocale: null,
        messages: {
          ...state.messages,
          [action.payload.locale]: action.payload.messages,
        },
        links: {
          ...state.links,
          [action.payload.locale]: action.payload.links,
        },
		    richMessages: {
          ...state.richMessages,
          [action.payload.locale]: action.payload.richMessages,
        },
      };
    }

    case SET_LOCALE_ERROR: {
      return {
        ...state,
        newLocale: null,
      };
    }

    case SET_DEFAULT_LOCALE: {
      return {
        ...state,
        defaultLocale: action.locale,
      };
    }

    case SET_BASE_CURRENCY: {
      return {
        ...state,
        baseCurrency: action.currency,
      };
    }

    case SET_CURRENCY: {
      return {
        ...state,
        currency: action.currency,
      };
    }
	
	case ADD_TRANSLATION_SUCCESS: {
		return {
        ...state,
        locale: action.payload.locale,
        newLocale: null,
        messages: {
          ...state.messages,
          [action.payload.locale]: action.payload.messages,
        },
        links: {
          ...state.links,
          [action.payload.locale]: action.payload.links,
        }
      };
	}
	
	case ADD_RICHTEXT_TRANSLATION_SUCCESS: {
		return {
        ...state,
        richMessages: {
          [action.payload.locale]: action.payload.richMessages,
        },
      };
	}
	
	case ADD_TRANSLATION_ERROR: {
		console.log(action.payload);
	}

    default: {
      return state;
    }
  }
}
