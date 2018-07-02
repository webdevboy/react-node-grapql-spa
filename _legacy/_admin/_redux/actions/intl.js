  /* eslint-disable import/prefer-default-export */
import { IntlProvider } from 'react-intl';
import Cookies from 'js-cookie';
import _ from 'lodash';

import {
  SET_LOCALE_START,
  SET_LOCALE_SUCCESS,
  SET_LOCALE_ERROR,
  SET_CURRENCY_START,
  SET_CURRENCY_SUCCESS,
  SET_CURRENCY_ERROR,
  SET_EDITOR_LOCALE,
  SET_EDITOR_LOCALE_ERROR,
  SET_AVAILABLE_LOCALES
} from '../constants';

import queryIntl from './queries/translations.graphql';
import queryRate from './queries/getRate.graphql';

const defaultLocale = (process.env.BROWSER) ? window.App.defaultLocale : require('../../config.js').defaultLocale;

function getIntlFromState(state) {
  const intl = (state && state.intl) || {};
  const { initialNow, locale, messages } = intl;
  const localeMessages = (messages && messages[locale]) || {};
  const provider = new IntlProvider({
    initialNow,
    locale,
    messages: localeMessages,
    defaultLocale: defaultLocale,
  });
  return provider.getChildContext().intl;
}

export function getIntl() {
  return (dispatch, getState) => getIntlFromState(getState());
}

export function setEditorLocale({ locale }) {
  return async (dispatch, getState, { client, history }) => {

    try {

      const { data } = await client.query({
        query: queryIntl,
        variables: { locale },
      });

      const messages = data.getTranslations.reduce((msgs, msg) => {
        msgs[msg.message_id] = msg.translation; // eslint-disable-line no-param-reassign
        return msgs;
      }, {});

      dispatch({
        type: SET_EDITOR_LOCALE,
        payload: {
          editorLocale: locale,
          messages,
        },
      });

    } catch (error) {

      console.error(error);

      dispatch({
        type: SET_EDITOR_LOCALE_ERROR,
        payload: {
          locale,
          error,
        },
      });

      return null;

    }
  };
}

export function setAvailableLocales({ locales }) {

  return async (dispatch, getState, { client, history }) => {
    
    dispatch({
      type: SET_AVAILABLE_LOCALES,
      payload: { locales },
    });

    return locales;

  }
}

export function setLocale({ locale }) {

  return async (dispatch, getState, { client, history }) => {
    dispatch({
      type: SET_LOCALE_START,
      payload: {
        locale,
      },
    });

    try {

      const { data } = await client.query({
        query: queryIntl,
        variables: { locale },
      });

      const messages = data.getTranslations.reduce((msgs, msg) => {
        msgs[msg.message_id] = msg.translation; // eslint-disable-line no-param-reassign
        return msgs;
      }, {});

      dispatch({
        type: SET_LOCALE_SUCCESS,
        payload: {
          locale,
          messages,
        },
      });



      // remember locale for every new request
      if (process.env.BROWSER) {
        const maxAge = 3650 * 24 * 3600; // 10 years in seconds
        Cookies.set('lang', locale, { path: '/', maxAge: maxAge });

        // if (locale !== getState().intl.defaultLocale) {

          let currentPath = location.pathname.split('/').reverse();
          // console.log('PREV PATH => ', currentPath);

          currentPath = currentPath.splice(0, currentPath.length-2).reverse().join('/');

          // console.log('PREV PATH => ', currentPath);

          // console.log('NEXT PATH => ', `/${locale.split('-')[0]}/${currentPath}`);
          history.push(`/${locale.split('-')[0]}/${currentPath}`);

        // } else {
        //   console.log('LOCATION => ',history, location);

        //   history.replace(`/`);
        // }

      }

      // return bound intl instance at the end
      return getIntlFromState(getState());
    } catch (error) {

      console.error(error);

      dispatch({
        type: SET_LOCALE_ERROR,
        payload: {
          locale,
          error,
        },
      });

      return null;

    }
  };
}

function getRateFromState(state) {
  const intl = (state && state.intl) || {};
  const { initialNow, currency, rate } = intl;
  // const localeMessages = (messages && messages[locale]) || {};
  // const provider = new IntlProvider({
  //   initialNow,
  //   locale,
  //   messages: localeMessages,
  //   defaultLocale: defaultLocale,
  // });
  // return provider.getChildContext().intl;
}

export function getRate() {
  return (dispatch, getState) => getRateFromState(getState());
}

export function setCurrency({ currency }) {
  return async (dispatch, getState, { client, history }) => {

    const {baseCurrency} = getState().runtime;
    const { availableCurrencies } = getState().runtime;

    dispatch({
      type: SET_CURRENCY_START,
      payload: {
        currency
      },
    });

    const currency_from_id = _.find(availableCurrencies, (c) => c.currency === baseCurrency ).id;
    const currency_to_id = _.find(availableCurrencies, (c) => c.currency === currency ).id;  

    try {

      const { data } = await client.query({
        query: queryRate,
        variables: { currency_from_id, currency_to_id }
      });

      const rate = data.getRate ? data.getRate.rate : 1;

      dispatch({
        type: SET_CURRENCY_SUCCESS,
        payload: {
          currency,
          rate: rate
        }
      });

      // remember locale for every new request
      if (process.env.BROWSER) {
        const maxAge = 3650 * 24 * 3600; // 10 years in seconds
        Cookies.set('currency', currency, { path: '/', maxAge: maxAge });
        history.push(`?currency=${currency}`);
      }

      // return bound intl instance at the end
      return getIntlFromState(getState());
    } catch (error) {

      console.error(error);

      dispatch({
        type: SET_CURRENCY_ERROR,
        payload: {
          currency,
          error,
        },
      });

      return null;

    }
  };
}