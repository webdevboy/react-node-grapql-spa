import {
  START_FETCHING_LANGUAGES,
  FETCHING_LANGUAGES_SUCCESS,
  FETCHING_LANGUAGES_ERROR,
  START_FETCHING_LANGUAGE,
  FETCHING_LANGUAGE_SUCCESS,
  FETCHING_LANGUAGE_ERROR,
  START_FETCHING_STRINGS,
  FETCHING_STRINGS_SUCCESS,
  FETCHING_STRINGS_ERROR,
  ENABLE_LANGUAGE,
  ENABLE_LANGUAGE_SUCCESS,
  ENABLE_LANGUAGE_ERROR,
  DISABLE_LANGUAGE,
  DISABLE_LANGUAGE_SUCCESS,
  DISABLE_LANGUAGE_ERROR,
  UPDATE_LANGUAGE,
  UPDATE_LANGUAGE_SUCCESS,
  UPDATE_LANGUAGE_ERROR,
  REMOVE_LANGUAGE,
  REMOVE_LANGUAGE_SUCCESS,
  REMOVE_LANGUAGE_ERROR,
  UPDATE_STRING,
  UPDATE_STRING_SUCCESS,
  UPDATE_STRING_ERROR,
} from "../constants/translations";

import gql from "graphql-tag";
import { normalize, schema } from "normalizr";

const string = new schema.Entity("string");

import { languageSchema, stringSchema, singleLanguage, language } from "./_schema";
import queryAllLanguages from "../queries/fetchAllLanguages.gql";
import queryLanguage from "../queries/fetchLanguage.gql";
import queryFetchStringsTranslations from "../queries/getStringsTranslations.graphql";
import mutationEnableLanguage from "../mutations/enableLanguage.gql";
import mutationDisableLanguage from "../mutations/disableLanguage.gql";
import editTranslationMutation from "../mutations/editTranslation.graphql";

const fetchLanguages = function () {
  return async (dispatch, getState, { client }) => {
    dispatch({ type: START_FETCHING_LANGUAGES });

    try {
      const { data, errors } = await client.query({
        query: queryAllLanguages,
        fetchPolicy: (process.env.BROWSER) ? "network-only" : "cache-first",
      });

      if (typeof errors !== "undefined") {
        return dispatch({
          type: FETCHING_LANGUAGES_ERROR,
          errors,
        });
      }

      console.log("NORMALIZED", normalize(data, languageSchema));

      return dispatch({
        type: FETCHING_LANGUAGES_SUCCESS,
        response: normalize(data, languageSchema),
      });
    } catch (e) {
      return dispatch({
        type: FETCHING_LANGUAGES_ERROR,
        errors: e,
      });
    }
  };
};

// const fetchLanguage = function (locale) {
//   return async (dispatch, getState, { client }) => {
//     dispatch({ type: START_FETCHING_LANGUAGE });

//     try {
//       const { data, errors } = await client.query({
//         query: queryLanguage,
//         variables: {
//           locale,
//         },
//         fetchPolicy: (process.env.BROWSER) ? "network-only" : "cache-first",
//       });


//       console.log('FETCHING LANG : ', locale);
//       console.log(data);
//       if (typeof errors !== "undefined") {
//         return dispatch({
//           type: FETCHING_LANGUAGE_ERROR,
//           errors,
//         });
//       }

//       console.log("NORMALIZED", normalize(data, language));

//       return dispatch({
//         type: FETCHING_LANGUAGE_SUCCESS,
//         response: normalize(data, language),
//       });
//     } catch (e) {
//       return dispatch({
//         type: FETCHING_LANGUAGE_ERROR,
//         errors: e,
//       });
//     }
//   };
// };

const fetchStrings = function (locale) {
  return async (dispatch, getState, { client }) => {
    dispatch({ type: START_FETCHING_STRINGS });

    try {
      const { data, errors } = await client.query({
        query: queryFetchStringsTranslations,
        variables: {
          locale,
        },
        fetchPolicy: (process.env.BROWSER) ? "network-only" : "cache-first",
      });

      if (typeof errors !== "undefined") {
        return dispatch({
          type: FETCHING_STRINGS_ERROR,
          errors,
        });
      }

      return dispatch({
        type: FETCHING_STRINGS_SUCCESS,
        response: {
          locale: locale,
          ...normalize(data, stringSchema),
        },
      });
    } catch (e) {
      console.error(e);
      return dispatch({
        type: FETCHING_STRINGS_ERROR,
        errors: e,
      });
    }
  };
};

const enableLanguage = function (locale) {
  return async (dispatch, getState, { client }) => {
    try {
      dispatch({ type: ENABLE_LANGUAGE });

      const { data, errors } = await client.mutate({
        mutation: mutationEnableLanguage,
        variables: {
          locale,
        },
      });

      if (typeof errors !== "undefined") {
        return dispatch({
          type: ENABLE_LANGUAGE_ERROR,
          errors,
        });
      }

      console.log(data);
      console.log('DEBUG ENALBE LANG => ',normalize(data, singleLanguage));

      return dispatch({
        type: ENABLE_LANGUAGE_SUCCESS,
        response: data,
      });
    } catch (e) {
      console.error(e);
      return dispatch({
        type: ENABLE_LANGUAGE_ERROR,
        errors: e,
      });
    }
  };
};

const disableLanguage = (locale) => {
  return async (dispatch, getState, { client }) => {
    try {
      dispatch({ type: DISABLE_LANGUAGE });

      const { data, errors } = await client.mutate({
        mutation: mutationDisableLanguage,
        variables: {
          locale,
        },
      });

      if (typeof errors !== "undefined") {
        return dispatch({
          type: DISABLE_LANGUAGE_ERROR,
          errors,
        });
      }

      return dispatch({
        type: DISABLE_LANGUAGE_SUCCESS,
        response: data,
      });
    } catch (e) {
      console.error(e);
      return dispatch({
        type: DISABLE_LANGUAGE_ERROR,
        errors: e,
      });
    }
  };
};

const editTranslation = function (message_id, defaultMessage, locale, translation) {
  return async (dispatch, getState, { client }) => {
    dispatch({
      type: UPDATE_STRING,
      response: {
        message_id,
        defaultMessage,
        locale,
        translation
      },
    });

    try {
      const { data, errors } = await client.mutate({
        mutation: editTranslationMutation,
        variables: {
          message_id,
          defaultMessage,
          locale,
          translation
        },
      });

      if (typeof errors !== "undefined") {
        return dispatch({
          type: UPDATE_STRING_ERROR,
          errors,
        });
      }

      return dispatch({
        type: UPDATE_STRING_SUCCESS,
        response: {
          locale,
          ...normalize(data, { string }),
        },
      });
    } catch (e) {
      return dispatch({
        type: UPDATE_STRING_ERROR,
        errors: e,
      });
    }
  };
};

// const getEnabledLanguages = function () {
//   return (dispatch, getState) => {
//     const state = getState();
//     const { ids = [], byId } = state.languanges;
//     return ids.map(id => byId[id]).filter(({enabled}) => (enabled === true));
//   }
// }

// const getDisabledLanguages = function () {
//   return (dispatch, getState) => {
//     const state = getState();
//     const { ids = [], byId } = state.languanges;
//     return ids.map(id => byId[id]).filter(({enabled}) => (enabled === false));
//   }
// }

export {
  // getEnabledLanguages,
  // getDisabledLanguages,
  fetchLanguages,
  // fetchLanguage,
  fetchStrings,
  enableLanguage,
  disableLanguage,
  editTranslation,
};
