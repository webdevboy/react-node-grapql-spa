/* eslint-disable import/prefer-default-export */
import { IntlProvider } from "react-intl";
import Cookies from "js-cookie";
import _ from "lodash";

import {
  SET_LOCALE_START,
  SET_LOCALE_SUCCESS,
  SET_LOCALE_ERROR,
  SET_CURRENCY_START,
  SET_CURRENCY_SUCCESS,
  SET_CURRENCY_ERROR,
  SET_EDITOR_LOCALE,
  SET_EDITOR_LOCALE_ERROR,
  SET_AVAILABLE_LOCALES,
  SET_CURRENCY,
  SET_BASE_CURRENCY,
  SET_DEFAULT_LOCALE,
  ADD_TRANSLATION_START,
  ADD_TRANSLATION_SUCCESS,
  ADD_TRANSLATION_ERROR,
  ADD_RICHTEXT_TRANSLATION_START,
  ADD_RICHTEXT_TRANSLATION_SUCCESS,
  ADD_RICHTEXT_TRANSLATION_ERROR,
} from "../constants/intl";
const MAX_AGE = 3650 * 24 * 3600; // 10 years in seconds
import queryIntl from "../queries/getIntl.graphql";
import getRichTextTranslations from "../queries/getRichTextTranslations.graphql";
import queryAddTranslation from "../queries/queryAddTranslation.graphql";
import queryAddRichTextTranslation from "../queries/queryAddRichTextTranslation.graphql";

function getIntlFromState(state) {
  const intl = (state && state.intl) || {};
  const { initialNow, locale, messages, links, richMessages, defaultLocale = "en", baseCurrency = "EUR", currency } = intl;
  const localeMessages = (messages && messages[locale]) || {};
  const localRichMessages = (richMessages && richMessages[locale]) || {};
  const provider = new IntlProvider({
    initialNow,
    locale,
    messages: localeMessages,
    links,
	  richMessages: localRichMessages,
    defaultLocale,
    baseCurrency,
    currency,
  });

  return provider.getChildContext().intl;
}

export function getIntl() {
  return (dispatch, getState) => getIntlFromState(getState());
}

export function setLocale({ locale }) {
  return async (dispatch, getState, { client }) => {

    // console.log('HELPERS => ', context);
    dispatch({
      type: SET_LOCALE_START,
      payload: {
        locale,
      },
    });
    try {
      // WARNING !!
      // do not use client.networkInterface except you want skip Apollo store
      // use client.query if you want benefit from Apollo caching mechanisms
      const { data } = await client.query({
        query: queryIntl,
        variables: { locale },
      });
      const messages = data.intl.reduce((msgs, msg) => {
        msgs[msg.id] = msg.translation || msg.defaultMessage; // eslint-disable-line no-param-reassign
        return msgs;
      }, {});

      const links = data.intl.reduce((links, link) => {
        links[link.id] = {
            text: link.translation || link.defaultMessage,
            url: link.url 
          }; // eslint-disable-line no-param-reassign
            return links;
          }, {});

	    const { data: richText } = await client.query({
        query: getRichTextTranslations,
        variables: { locale },
      });
	  
      const richMessages = richText.intl.reduce((msgs, msg) => {
        msgs[msg.id] = msg.translation || {}; // eslint-disable-line no-param-reassign
        return msgs;
      }, {});
      
      dispatch({
        type: SET_LOCALE_SUCCESS,
        payload: {
          locale,
          messages,
          richMessages,
          links,
        },
      });

      // remember locale for every new request
      if (process.env.BROWSER) {
        Cookies.set("lang", locale, { path: "/", maxAge: MAX_AGE });
        document.documentElement.setAttribute('lang', locale);
      }

      // return bound intl instance at the end
      return getIntlFromState(getState());
    } catch (error) {
      dispatch({
        type: SET_LOCALE_ERROR,
        payload: {
          locale,
          error,
        },
      });
      console.error(error);
    }
  };
}

export function setBaseCurrency({ currency }) {
  return async dispatch => {
    dispatch({
      type: SET_BASE_CURRENCY,
      currency,
    });
  };
}

export function setCurrency({ currency }) {
  return async dispatch => {
    dispatch({
      type: SET_CURRENCY,
      currency,
    });

    // remember currency for every new request
    if (process.env.BROWSER) {
      Cookies.set("currency", currency, { path: "/", maxAge: MAX_AGE });
    }
  };
}

export function setDefaultLocale({ locale }) {
  return async dispatch => {
    dispatch({
      type: SET_DEFAULT_LOCALE,
      locale,
    });
  };
}

export function addTranslation({ message_id, locale, content, defaultMessage, pathUrl }) {
  return async (dispatch, getState, { client }) => {
    dispatch({
      type: ADD_TRANSLATION_START,
      payload: {
		    message_id,
        locale,
        content,
        pathUrl
      },
    });
    try {
      // WARNING !!
      // do not use client.networkInterface except you want skip Apollo store
      // use client.query if you want benefit from Apollo caching mechanisms
      const { data } = await client.query({
        query: queryAddTranslation,
        variables: { 
              message_id : message_id,
	            locale : locale,
              translation : content,
              defaultMessage : defaultMessage,
              url: pathUrl,
            },
      });
      const translation = data.translation;
      const url = data.url;
      if (translation) {
        const { data } = await client.query({
            query: queryIntl,
            variables: { locale },
          });
        const messages = data.intl.reduce((msgs, msg) => {
          msgs[msg.id] = msg.translation || msg.defaultMessage; // eslint-disable-line no-param-reassign
            return msgs;
          }, {});
        const links = data.intl.reduce((msgs, msg) => {
          msgs[msg.id] = {
              text: msg.translation || msg.defaultMessage,
              url: msg.url 
            }; // eslint-disable-line no-param-reassign
              return msgs;
            }, {});
        messages[message_id] = content;
        links[message_id] = {text: content,url: pathUrl};
        dispatch({
          type: ADD_TRANSLATION_SUCCESS,
          payload: {
            locale,
            messages,
            links
          },
        });
      }
      return getIntlFromState(getState());
    } catch (error) {
      dispatch({
        type: ADD_TRANSLATION_ERROR,
        payload: {
          message_id,
          locale,
		      content,
          error,
        },
      });
      return null;
    }
  };
}

export function addRichTextTranslation({ message_id, locale, content }) {
  return async (dispatch, getState, { client }) => {
    dispatch({
      type: ADD_RICHTEXT_TRANSLATION_START,
      payload: {
        message_id,
        locale,
        content,
      },
    });
    try {
      // WARNING !!
      // do not use client.networkInterface except you want skip Apollo store
      // use client.query if you want benefit from Apollo caching mechanisms
      const { data } = await client.query({
        query: queryAddRichTextTranslation,
        variables: { message_id : message_id,
		             locale : locale,
                     translation : content},
      });
      const translation = data.translation;
      
	    if (translation) {
		    const { data } = await client.query({
          query: getRichTextTranslations,
          variables: { locale },
        });
        const richMessages = data.intl.reduce((msgs, msg) => {
        msgs[msg.id] = msg.translation || msg.defaultMessage; // eslint-disable-line no-param-reassign
          return msgs;
        }, {});
        richMessages[message_id] = content;
        dispatch({
          type: ADD_RICHTEXT_TRANSLATION_SUCCESS,
          payload: {
            locale,
            richMessages,
          },
        });
	    }

      return getIntlFromState(getState());
    } catch (error) {
      dispatch({
        type: ADD_RICHTEXT_TRANSLATION_ERROR,
        payload: {
          message_id,
          locale,
		  content,
          error,
        },
      });
      return null;
    }
  };
}
