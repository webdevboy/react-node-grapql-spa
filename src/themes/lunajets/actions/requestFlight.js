import {
  REQ_FLIGHT_ADD_LEG,
  REQ_FLIGHT_RETURN_LEG,
  REQ_FLIGHT_REMOVE_LEG,
  REQ_FLIGHT_SET_LOCATION,
  REQ_FLIGHT_SET_DATETIME,
  REQ_FLIGHT_SET_PAX,
  REQ_FLIGHT_CHANGE_OPTION,
  REQ_FLIGHT_NEXT_STEP,
  REQ_FLIGHT_PREV_STEP,
  REQ_FLIGHT_MOVE_TO_STEP,
  REQ_FLIGHT_RESET,
  REQ_FLIGHT_UPDATE_CONTACT,
  REQ_FLIGHT_VALIDATED_STEP,
  REQ_FLIGHT_REMOVE_VALIDATED_STEP,
  REQ_FLIGHT_CLEAR_LOCATION,
  REQ_FLIGHT_SUBMIT,
  REQ_FLIGHT_SUBMIT_SUCCESS,
  REQ_FLIGHT_SUBMIT_ERROR,
  REQ_FLIGHT_TOGGLE_OPTIONS,
  SET_EMPTY_LEG,
  REMOVE_EMPTY_LEG,
} from "../constants/requestFlight";

export function nextStep() {
  return {
    type: REQ_FLIGHT_NEXT_STEP,
  };
}
export function prevStep() {
  return {
    type: REQ_FLIGHT_PREV_STEP,
  };
}
export function goToStep({ step }) {
  return {
    type: REQ_FLIGHT_MOVE_TO_STEP,
    payload: {
      step,
    },
  };
}

export function addLeg() {
  return {
    type: REQ_FLIGHT_ADD_LEG,
  };
}

export function returnLeg() {
  return {
    type: REQ_FLIGHT_RETURN_LEG,
  };
}

export function removeLeg(index) {
  return {
    type: REQ_FLIGHT_REMOVE_LEG,
    payload: {
      index,
    },
  };
}

export function reset() {
  return {
    type: REQ_FLIGHT_RESET,
  };
}

export function changeLocation({ value, index, direction }) {
  return {
    type: REQ_FLIGHT_SET_LOCATION,
    payload: {
      value,
      index,
      direction,
    },
  };
}

export function changeDate({ date, index }) {
  return {
    type: REQ_FLIGHT_SET_DATETIME,
    payload: {
      date,
      index,
    },
  };
}

export function changePax({ value, index }) {
  return {
    type: REQ_FLIGHT_SET_PAX,
    payload: {
      value,
      index,
    },
  };
}

export function toggleOptions({ index }) {
  return {
    type: REQ_FLIGHT_TOGGLE_OPTIONS,
    payload: {
      index,
    },
  };
}

export function changeOption({ index, field, value }) {
  return {
    type: REQ_FLIGHT_CHANGE_OPTION,
    payload: {
      index,
      field,
      value,
    },
  };
}

export function updateContact({ field, value }) {
  return {
    type: REQ_FLIGHT_UPDATE_CONTACT,
    payload: {
      field,
      value,
    },
  };
}

export function addCompletedStep(index) {
  return {
    type: REQ_FLIGHT_VALIDATED_STEP,
    payload: {
      index,
    },
  };
}

export function removeCompletedStep(index) {
  return {
    type: REQ_FLIGHT_REMOVE_VALIDATED_STEP,
    payload: {
      index,
    },
  };
}

export function clearLocation({ index, direction }) {
  return {
    type: REQ_FLIGHT_CLEAR_LOCATION,
    payload: {
      index,
      direction,
    },
  };
}

export function setEmptyleg({ emptyleg }) {


  return async (dispatch, getState, { client, fetch }) => {
    await dispatch({
      type: REQ_FLIGHT_RESET,
    });

    const { from_airport, to_airport } = emptyleg;

    await dispatch({
      type: REQ_FLIGHT_SET_LOCATION,
      payload: {
        index: 0,
        value: from_airport,
        direction: "from",
      },
    });

    await dispatch({
      type: REQ_FLIGHT_SET_LOCATION,
      payload: {
        index: 0,
        value: to_airport,
        direction: "to",
      },
    });

    await dispatch({
      type: REQ_FLIGHT_SET_DATETIME,
      payload: {
        date: emptyleg.until_date,
        index: 0,
      },
    });

    await dispatch({
      type: SET_EMPTY_LEG,
      payload: {
        emptyleg,
      },
    });

    return dispatch({
      type: REQ_FLIGHT_MOVE_TO_STEP,
      payload: {
        step: 1,
      },
    })
  }
}

export function submitFlight() {
  return async (dispatch, getState, { client, fetch }) => {
    dispatch({ type: REQ_FLIGHT_SUBMIT });

    try {
      const state = getState();
      const reqflight = await fetch("/api/reqflight", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          locale: state.intl.locale,
          contactInfo: state.requestFlight.contactInfo,
          emptyleg: state.requestFlight.emptyleg || null,
          legs: state.requestFlight.legs,
          ipInfo: state.ipInfo,
          browser: {
            locale: window.navigator.language,
          },
          website: {
            locale: state.intl.locale || state.intl.defaultLocale,
          },
        }),
      });

      const data = await reqflight.json();

      if (data.success) {
        dispatch({
          type: REQ_FLIGHT_SUBMIT_SUCCESS,
          payload: {
            data,
          },
        });

        dispatch({
          type: REQ_FLIGHT_NEXT_STEP,
        });
      } else {
        dispatch({
          type: REQ_FLIGHT_SUBMIT_ERROR,
          payload: {
            e: data,
          },
        });
      }
    } catch (e) {
      console.error(e);

      dispatch({
        type: REQ_FLIGHT_SUBMIT_ERROR,
        payload: {
          e,
        },
      });
    }
  };
}
