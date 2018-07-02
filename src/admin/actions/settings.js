import Promise from "bluebird";
import { normalize } from "normalizr";

import {
  FETCH_SENSITIVE_SETTINGS,
  FETCH_SENSITIVE_SETTINGS_SUCCESS,
  FETCH_SENSITIVE_SETTINGS_ERROR,
  FETCH_SETTINGS,
  FETCH_SETTINGS_SUCCESS,
  FETCH_SETTINGS_ERROR,
  UPDATE_SETTINGS_OPTION,
  UPDATE_SETTINGS_OPTION_SUCCESS,
  UPDATE_SETTINGS_OPTION_ERROR,
} from "admin/constants/settings";

import { settingsSchema } from "admin/actions/_schema";
import queryFetchSettings from "admin/queries/fetchSettings.graphql";
import queryFetchSensitiveSettings from "admin/queries/fetchSensitiveSettings.gql";
import mutationUpdateOption from "admin/mutations/updateSettingOption.graphql";
import mutationUpdateSensitiveOption from "admin/mutations/updateSensitiveOption.gql";


const fetchSensitiveSettings = function () {
  return async (dispatch, getState, { client }) => {
    dispatch({ type: FETCH_SENSITIVE_SETTINGS });

    try {
      const { data, errors } = await client.query({
        query: queryFetchSensitiveSettings,
      });

      if (typeof errors !== "undefined") {
        return dispatch({
          type: FETCH_SENSITIVE_SETTINGS_ERROR,
          errors,
        });
      }

      const sensitive = {
        settings: [
          ...data.aws,
          ...data.smtp,
        ]
      };

      return dispatch({
        type: FETCH_SENSITIVE_SETTINGS_SUCCESS,
        response: normalize(sensitive, settingsSchema),
      });
    } catch (e) {
      return dispatch({
        type: FETCH_SENSITIVE_SETTINGS_ERROR,
        errors: e,
      });
    }
  };
};

const fetchSettings = function () {
  return async (dispatch, getState, { client }) => {
    dispatch({ type: FETCH_SETTINGS });

    try {
      const { data, errors } = await client.query({
        query: queryFetchSettings,
      });

      console.log(data, errors);

      if (typeof errors !== "undefined") {
        return dispatch({
          type: FETCH_SETTINGS_ERROR,
          errors,
        });
      }

      return dispatch({
        type: FETCH_SETTINGS_SUCCESS,
        response: normalize(data, settingsSchema),
      });
    } catch (e) {
      return dispatch({
        type: FETCH_SETTINGS_ERROR,
        errors: e,
      });
    }
  };
};

const updateOptions = function (options) {
  return async (dispatch, getState, { client }) => {
    try {
      Object.keys(options).map(async (key) => {
        const { data } = await client.mutate({
          mutation: (options[key].hidden) ? mutationUpdateSensitiveOption : mutationUpdateOption,
          variables: {
            option: key,
            value: options[key].value,
          },
        });

        if (options[key].hidden) {
          data.option = {
            ...data.option,
            value: options[key].value,
          };
        }

        return dispatch({
          type: UPDATE_SETTINGS_OPTION_SUCCESS,
          response: data.option,
        })
        
      });

    } catch (e) {
      const errors = [{
        key: "general",
        message: "Unexpected server error",
      }];

      return dispatch({
        type: UPDATE_SETTINGS_OPTION_ERROR,
        payload: {
          errors,
        },
      });
    }
  };
};

const updateOption = function (option) {
  return async (dispatch, getState, { client }) => {
    try {
      
      const { data } = await client.mutate({
        mutation: (option.hidden) ? mutationUpdateSensitiveOption : mutationUpdateOption,
        variables: {
          option: option.option,
          value: option.value,
        },
      });

      console.log(data);

    } catch (e) {
      const errors = [{
        key: "general",
        message: "Unexpected server error",
      }];

      return dispatch({
        type: UPDATE_SETTINGS_OPTION_ERROR,
        payload: {
          errors,
        },
      });
    }
  };
};

export {
  fetchSensitiveSettings,
  fetchSettings,
  updateOptions,
  updateOption,
};
