import { normalize } from "normalizr";
import {
  REMOVE_EMAIL_TEMPLATE,
  REMOVE_EMAIL_TEMPLATE_SUCCESS,
  REMOVE_EMAIL_TEMPLATE_ERROR,
  REMOVE_EMAIL_TEMPLATE_TRANSLATION,
  REMOVE_EMAIL_TEMPLATE_TRANSLATION_SUCCESS,
  REMOVE_EMAIL_TEMPLATE_TRANSLATION_ERROR,
} from "admin/constants/emailTemplate";

import removeEmailTemplateMutation from "admin/mutations/removeEmailTemplate.graphql";
import removeEmailTemplateTranslationMutation from "admin/mutations/removeEmailTemplateTranslation.graphql";

export const removeEmailTemplate = email_id => {
  return async (dispatch, getState, { client }) => {
    try {
      dispatch({ type: REMOVE_EMAIL_TEMPLATE });

      const { data, errors } = await client.mutate({
        mutation: removeEmailTemplateMutation,
        variables: {
          email_id: email_id,
        },
      });

      if (typeof errors !== "undefined") {
        return dispatch({
          type: REMOVE_EMAIL_TEMPLATE_ERROR,
          errors,
        });
      }

      return dispatch({
        type: REMOVE_EMAIL_TEMPLATE_SUCCESS,
        ids: data.remove.ids,
      });
    } catch (e) {
      return dispatch({
        type: REMOVE_EMAIL_TEMPLATE_ERROR,
        errors: e,
      });
    }
  };
};

export const removeEmailTemplateTranslation = id => async (dispatch, getState, { client }) => {
  try {
    dispatch({ type: REMOVE_EMAIL_TEMPLATE_TRANSLATION });

    const { data, errors } = await client.mutate({
      mutation: removeEmailTemplateTranslationMutation,
      variables: {
        id,
      },
    });

    if (typeof errors !== "undefined") {
      return dispatch({
        type: REMOVE_EMAIL_TEMPLATE_TRANSLATION_ERROR,
        errors,
      });
    }

    return dispatch({
      type: REMOVE_EMAIL_TEMPLATE_TRANSLATION_SUCCESS,
      id: data.remove.id,
    });
  } catch (e) {
    return dispatch({
      type: REMOVE_EMAIL_TEMPLATE_TRANSLATION_ERROR,
      errors: e,
    });
  }
};
