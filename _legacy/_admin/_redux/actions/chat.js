import { 
	GET_CHAT_ROOMS,
	GET_CHAT_ROOMS_SUCCESS,
	GET_CHAT_ROOMS_ERROR,
	GET_SINGLE_CHAT_ROOM,
	GET_SINGLE_CHAT_ROOM_ERROR,
	GET_SINGLE_CHAT_ROOM_SUCCESS,
	SHOW_BACKDROP,
	SHOW_SIDEBAR,
	SELECT_ROOM,
	ADD_CHAT_ROOM,
	UPDATE_CHAT_ROOM,
	ADD_MESSAGE_TO_CHAT_ROOM
} from '../constants';

import gql from 'graphql-tag';

export function selectRoom(id) {

	return (dispatch) => {

		dispatch({
		   type: SHOW_BACKDROP,
		});

		dispatch({
		    type: SELECT_ROOM,
		    payload: {
		    	id: id
		    }
		});

		dispatch({
		    type: SHOW_SIDEBAR
		});

	};
}

export function addRoom(room) {
	return (dispatch) => {
		dispatch({
	        type: ADD_CHAT_ROOM,
	        payload: {
	        	room
	        }
	    });
	};
}

export function getChatRooms(offset, limit) {

	return async (dispatch, getState, { client }) => {

		dispatch({
	        type: GET_CHAT_ROOMS,
	    });

	    try {
	      const { data } = await client.query({
	        query: gql`{
						getChatRooms {
						    id
						    blocked
						    archived
						    color
						    total_messages
						    created_at
						    last_message {
						    	body
						    	created_at
						    }
						    customer {
						      sfid
						      email
						      first_name
						      last_name
						      phone
						      type__c
						      account_id
						    }
						}
	        }`,
	      });

	      const { getChatRooms } = data;

	      dispatch({
	        type: GET_CHAT_ROOMS_SUCCESS,
	        payload: {
	        	rooms: getChatRooms
	        }
	      });

	    } catch(e) {

	    	console.error(e);

	    	dispatch({
		        type: GET_CHAT_ROOMS_ERROR,
		        payload: {
			        e
			    }
		    });

	    }

	};

}

export function getSingleChatRoom(id) {

	return async (dispatch, getState, { client, history }) => {

		dispatch({
	        type: GET_SINGLE_CHAT_ROOM,
	    });

	    try {
	      const { data } = await client.query({
	        query: gql`query getSingleChatRoom($id: ID!) {
		 				getSingleChatRoom(id: $id) {
					    id
					    blocked
					    archived
					    color
					    total_messages
					    last_message {
					    	body
					    	created_at
					    }
					    customer {
					      sfid
					      email
					      first_name
					      last_name
					      phone
					      type__c
					      account_id
					    }
					    messages {
					    	id
						    body
						    created_at
								automated
								cli_read
								adv_read
						    user {
						    	id
						    	avatar_path
						    }
					    }
				  	}
  				}`,
	        variables: {
	        	id: id
	        },
	      });

	      const { getSingleChatRoom } = data;

	      dispatch({
	        type: ADD_CHAT_ROOM,
	        payload: {
	        	room: getSingleChatRoom
	        }
	      });

	    } catch(e) {

	    	console.error(e);
	    	
	    	dispatch({
		        type: GET_SINGLE_CHAT_ROOM_ERROR,
		        payload: {
			        e
			    }
		    });


	    }

	};

}

export function getAllMessagesFromRoom(id, pagination) {

	return async (dispatch, getState, { client, history }) => {

	    try {
	      const { data } = await client.query({
	        query: gql`query getMessagesFromChatRoom($id: ID!, $pagination: Pagination) {
		 				getMessagesFromChatRoom(id: $id, pagination: $pagination) {
					    id
					    body
					    created_at
							automated
							cli_read
							adv_read
						  user {
						    id
						    avatar_path
						  }
					  }
	  			}`,
        	variables: {
	        	id: id,
	        	pagination: pagination
	        },
	      });

	      const { getMessagesFromChatRoom } = data;

	      const room = {
	        id: id,
	        messages: getMessagesFromChatRoom
	      };

	      dispatch({
	        type: UPDATE_CHAT_ROOM,
	        payload: {
	        	room
	        }
	      });

	    } catch(e) {

	    	console.error(e);
	    	
	    	dispatch({
		        type: GET_SINGLE_CHAT_ROOM_ERROR,
		        payload: {
			        e
			    }
		    });


	    }

	};

}

export function addMessage({roomId, message}) {

	return async (dispatch) => {
	      
	      dispatch({
          type: ADD_MESSAGE_TO_CHAT_ROOM,
          payload: {
            roomId,
            message
          }
        });

	};

}