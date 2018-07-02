import {
  SET_ALL_USERS,
  SET_ALL_ROLES,
  SET_ALL_REDIRECTIONS,
  SET_ALL_RATES,
  UPDATE_RATE,
  SET_LOCALES,
  SET_TRANSLATIONS,
  ADD_LANGUAGE,
  REMOVE_LANGUAGE,
  SET_LANGUAGE_ENABLED,
  UPDATE_TRANSLATION,
} from '../constants';

import queryRoles from './queries/roles.graphql';
import queryUsers from './queries/users.graphql';
import queryRedirections from './queries/redirections.graphql';
import queryRates from './queries/rates.graphql';
import queryUpdateRate from './mutations/updateRate.graphql';
import queryLanguages from './queries/languages.graphql';
import queryLocales from './queries/locales.graphql';
import queryTranslations from './queries/translations.graphql';
import queryUpdateTranslation from './mutations/updateTranslation.graphql';
import queryUpdateTranslationTable from './mutations/updateTranslationTable.graphql';
import queryAddLanguage from './mutations/addLanguage.graphql';
import queryRemoveLanguage from './mutations/removeLanguage.graphql';
import querySetLanguageEnabled from './mutations/setLanguageEnabled.graphql';
import queryRemoveRedirection from './mutations/removeRedirection.graphql';

export const setUsers = function() {

  return async (dispatch, getState, { client }) => {
    const { data } = await client.query({
      query: queryUsers,
    });
    const { users } = data;
    // if has errors
    if (users) {

      return dispatch({
        type: SET_ALL_USERS,
        payload: {
          users
        },
      });

    }

  }; 

}

export const setRoles = function() {

  return async (dispatch, getState, { client }) => {
    const { data } = await client.query({
      query: queryRoles,
    });

    const { roles } = data;
    // if has errors
    if (roles) {

      return dispatch({
        type: SET_ALL_ROLES,
        payload: {
          roles
        },
      });

    }

  }; 

}

export const setRates = function(){

  return async (dispatch, getState, {client}) =>{
    const { data } = await client.query({
      query: queryRates,
    });
    const { rates } = data;
    if( rates ){
      return dispatch({
        type: SET_ALL_RATES,
        payload:{
          rates
        }
      });
    }
  }
}

export const updateRate = function(id, rate){
  return async (dispatch, getState, {client}) =>{
    const { data } = await client.networkInterface.query({
      query: queryUpdateRate,
      variables: { id, rate}
    });
    const { updateRate } = data;
    if(updateRate.id){
      return dispatch({
        type: UPDATE_RATE,
        payload:{
          id,
          rate,
        }
      })
    }
  }
}

export const setLanguages = function(){
  return async (dispatch, getState, {client}) =>{
    const { data } = await client.query({
      query: queryLanguages,
    });

    const { getLanguages } = data;
    if( getLanguages ){
      return dispatch({
        type: SET_LOCALES,
        payload:{
          locales: getLanguages
        }
      })
    }
  }
}

export const getLocales = function(locale){
  return async (dispatch, getState, {client}) =>{
    const { data } = await client.query({
      query: queryLocales,
      variables: { locale }
    });
    const { getLocales } = data;
    return getLocales;
  }
}


export const addLanguage = function(id){
  return async (dispatch, getState, {client}) =>{
    const { data } = await client.networkInterface.query({
      query: queryAddLanguage,
      variables: { locale_id: id, enabled: false }
    });
    const {addLanguage} = data;
    if(addLanguage){
      return dispatch({
        type: ADD_LANGUAGE,
        payload:{
          locale: addLanguage
        }
      })
    }
  }
}

export const removeLanguage = function({id}){
  return async (dispatch, getState, {client}) =>{
    const { data } = await client.networkInterface.query({
      query: queryRemoveLanguage,
      variables: { id }
    });
    if(data){
      return dispatch({
        type: REMOVE_LANGUAGE,
        payload:{
          id
        }
      })
    }
  }
}


export const removeRedirection = function({id}){
  return async (dispatch, getState, {client}) =>{
    const { data } = await client.networkInterface.query({
      query: queryRemoveRedirection,
      variables: { id }
    });
    if(data){
      return dispatch({
        type: REMOVE_REDIRECTION,
        payload:{
          id
        }
      })
    }
  }
}


export const setLanguageEnabled = function(id){
  // console.log(id);
  return async (dispatch, getState, {client}) =>{
    const { data } = await client.networkInterface.query({
      query: querySetLanguageEnabled,
      variables: { id }
    });
    const {updateSetEnabled} = data;
    if(updateSetEnabled){
      return dispatch({
        type: SET_LANGUAGE_ENABLED,
        payload:{
          id: id, enabled: updateSetEnabled.enabled
        }
      })
    }
  }
}

export const setTranslations = function(locale){
  return async (dispatch, getState, {client}) =>{
    const { data } = await client.query({
      query: queryTranslations,
      variables: { locale: locale }
    });

    const { getTranslations } = data;
    if( getTranslations ){
      return dispatch({
        type: SET_TRANSLATIONS,
        payload:{
          translations: getTranslations
        }
      })
    }
  }
}


export const updateTranslation = function({id, message_id, translation, locale, defaultMessage}){
  return async (dispatch, getState, {client}) =>{
    const { data } = await client.networkInterface.query({
      query: queryUpdateTranslation,
      variables: { id, message_id, translation, locale, defaultMessage }
    });
  }

   const  updateTranslation  = data;
  if( updateTranslation ){
    return dispatch({
      type: UPDATE_TRANSLATION,
      payload:{
        locale: updateTranslationTable.language.locale.locale,
        translation: updateTranslation.translation,
        message_id: updateTranslation.message_id,
        defaultMessage: updateTranslationTable.defaultMessage
      }
    })
  }
}



export const updateTranslationTable = function({id, translation, defaultMessage, description}){
  return async (dispatch, getState, {client}) =>{
    const { data } = await client.networkInterface.query({
      query: queryUpdateTranslationTable,
      variables: { id, translation, defaultMessage, description }
    });

    const { updateTranslationTable } = data;
    if( updateTranslationTable ){
      return dispatch({
        type: UPDATE_TRANSLATION,
        payload:{
          locale: updateTranslationTable.language.locale.locale,
          translation: updateTranslationTable.translation,
          message_id: updateTranslationTable.message_id,
          defaultMessage: updateTranslationTable.defaultMessage,
          description: updateTranslationTable.description
        }
      })
    }
  }
}


