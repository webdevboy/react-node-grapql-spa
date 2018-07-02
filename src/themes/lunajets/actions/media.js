/* eslint-disable import/prefer-default-export */
import { 
SET_RICH_MEDIA_LIST_START,
SET_RICH_MEDIA_LIST_SUCCESS,
SET_RICH_MEDIA_LIST_ERROR
} from "../constants/media";

import getMediaReferences from "../queries/getMediaReferences.graphql";

export function setRichMediaList() {
  return async (dispatch, getState, { client }) => {
    dispatch({
      type: SET_RICH_MEDIA_LIST_START,
    });
    try {
      // WARNING !!
      // do not use client.networkInterface except you want skip Apollo store
      // use client.query if you want benefit from Apollo caching mechanisms
      const { data } = await client.query({
        query: getMediaReferences,
      });
      const medias = data.medias.reduce((msgs, msg) => {
        msgs[msg.media_id] = msg.media.src;
        return msgs;
      }, {});
      dispatch({
        type: SET_RICH_MEDIA_LIST_SUCCESS,
        payload: {
		  medias,
        },
      });
    } catch (error) {
      dispatch({
        type: SET_RICH_MEDIA_LIST_ERROR,
        payload: {
          error,
        },
      });
      return null;
    }
  };
}
