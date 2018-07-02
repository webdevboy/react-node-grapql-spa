import {
    START_FETCHING_IP_INFO,
    FETCH_IP_INFO_FAILED,
    FETCH_IP_INFO_SUCCESS,
    SET_IP_INFO,
} from '../constants/ipInfo';

// we have to change it to maxmind later
export function getIpInfo() {
    
    return async (dispatch, getState, { client, fetch }) => {

        dispatch({ type: START_FETCHING_IP_INFO });

        try {

            const ip = await fetch('https://ipinfo.io/json', {
                method: 'GET',
                credentials: 'same-origin',
                headers: {
                    'Access-Control-Allow-Origin': '*'
                }
            });

            const data = await ip.json();

            if (data) {
                dispatch({
                    type: FETCH_IP_INFO_SUCCESS,
                    payload: data
                });
            }

        } catch(e) {

            console.error(e);

            dispatch({
                type: FETCH_IP_INFO_FAILED,
                payload: {
                    e
                }
            });

        }

    };

}