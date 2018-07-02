import {
  GET_ALL_EVENTS,
  GET_ALL_EVENTS_SUCCESS,
  GET_ALL_EVENTS_ERROR,
  GET_SINGLE_EVENT,
  GET_SINGLE_EVENT_ERROR,
  GET_SINGLE_EVENT_SUCCESS,
  CREATE_NEW_EVENT,
  UPDATE_EVENT,
  SELECT_EVENT,
  SHOW_BACKDROP,
  SHOW_SIDEBAR,
} from "../constants";

import gql from "graphql-tag";

export function selectEvent({ selectedEvents }) {
  return (dispatch) => {
    dispatch({
		   type: SHOW_BACKDROP,
    });

    dispatch({
		    type: SELECT_EVENT,
		    payload: {
		    	selectedEvents,
		    },
    });

    dispatch({
		    type: SHOW_SIDEBAR,
    });
  };
}

export function createEvent(event) {
  return (dispatch) => {
    dispatch({
	        type: CREATE_NEW_EVENT,
	        payload: {
	        	event,
	        },
	    });
  };
}

export function getAllEvents(offset, limit) {
  return async (dispatch, getState, { client }) => {
    dispatch({
	        type: GET_ALL_EVENTS,
	    });

	    try {
	      const { data } = await client.query({
	        query: gql`{
						getAllEvents {
						    id
						    title
						    slug
						    body
						    summary
						    date
						    source
						    state
						    category {
						    	name
						    }
						    author {
						    	first_name
						    	last_name
						    }
						}
	        }`,
	      });

	      const { getAllEvents } = data;

	      dispatch({
	        type: GET_ALL_EVENTS_SUCCESS,
	        payload: {
	        	events: getAllEvents,
	        },
	      });
	    } catch (e) {
	    	console.error(e);

	    	dispatch({
		        type: GET_ALL_EVENTS_ERROR,
		        payload: {
			        e,
			    },
		    });
	    }
  };
}
