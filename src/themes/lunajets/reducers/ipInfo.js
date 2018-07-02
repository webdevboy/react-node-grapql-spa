import { 
    FETCH_IP_INFO_SUCCESS,
} from '../constants/ipInfo';

const reqFlight = (state = {}, action) => {
      
    switch (action.type) {
      case FETCH_IP_INFO_SUCCESS:
        return action.payload;
     
      default:
        return state;
    }

}

export default reqFlight