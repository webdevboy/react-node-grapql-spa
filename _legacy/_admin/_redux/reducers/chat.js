import {
	GET_CHAT_ROOMS,
	GET_CHAT_ROOMS_SUCCESS,
	GET_CHAT_ROOMS_ERROR,
	GET_SINGLE_CHAT_ROOM,
	GET_SINGLE_CHAT_ROOM_ERROR,
	GET_SINGLE_CHAT_ROOM_SUCCESS,
	ADD_MESSAGE_TO_CHAT_ROOM,
	SELECT_ROOM,
	ADD_CHAT_ROOM,
	UPDATE_CHAT_ROOM
} from '../constants';

const INITIAL_STATE = {
  rooms: [],
  selectedRoom: null
};

const message = (state = {}, action) => {
	switch(action.type) {
		case ADD_MESSAGE_TO_CHAT_ROOM:
			return action.payload.message
			
		default:
			return state
	}
}

const room = (state = {}, action) => {
	switch(action.type) {

		case UPDATE_CHAT_ROOM:

			if (state.id === action.payload.room.id) {
				return Object.assign({}, state, action.payload.room)
			}

			return state
			
		case ADD_CHAT_ROOM:
			return action.payload.room;

		case ADD_MESSAGE_TO_CHAT_ROOM:
			if (state.id === action.payload.roomId) {
				return {
					...state,
					messages: [ message({}, action), ...state.messages ]
				}
			}

			return state

		default:
			return state
	}
}

const chat = (state = INITIAL_STATE, action) => {

	switch(action.type) {
		case GET_CHAT_ROOMS:
			return state

		case SELECT_ROOM:
			return {
				...state,
				selectedRoom: action.payload.id
			}
		case GET_CHAT_ROOMS_SUCCESS:
			return {
				...state,
				rooms: action.payload.rooms
			}
		case GET_CHAT_ROOMS_ERROR:
			return {
				...state,
				errors: action.payload.e
			}
		case UPDATE_CHAT_ROOM:
			return {
				...state,
				rooms: state.rooms.map(chatroom => room(chatroom, action))
			}
		case ADD_CHAT_ROOM:
			return {
				...state,
				rooms: [ room({}, action), ...state.rooms ]
			}

		case ADD_MESSAGE_TO_CHAT_ROOM:
			return {
				...state,
				rooms: state.rooms.map(chatroom => room(chatroom, action))
			}
		default:
			return state
	}

    return state;
}

export default chat