import {
  UPLOAD_SUCCESS,
  UPLOAD_ERROR,
  START_UPLOAD,
  SET_MEDIA
} from '../constants';

const INITIAL_STATE = {
  media: {},
  isLoading: false,
  filesLength: null,
  selectedMedia: null
}

export default function files(state = INITIAL_STATE, action) {


  switch (action.type) {

    case START_UPLOAD:
      return {
        ...state,
        isLoading: true,
        filesLength: action.payload.filesLength,
      }
    case UPLOAD_SUCCESS:
      return {
        ...state,
        filesLength: null,
        isLoading: false,
        media: Object.assign({}, action.payload, state.media)
      }
    case UPLOAD_ERROR:
      return {
        ...state,
        filesLength: null,
        isLoading: false,
        
      }
    case SET_MEDIA:
      return {
        ...state,
        media: Object.assign({}, state.media, action.payload)
      }
    // case ADD_FILE:
    //   if (action.payload instanceof Array) {
    //     return {
    //       ...state,
    //       files: action.payload.map(item => media(null, { type: action.type, payload: item })).concat([...state.files])
    //     };
    //   }
    default:
      return state;
  }
  
}