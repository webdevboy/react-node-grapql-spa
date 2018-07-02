import { SET_RUNTIME_VARIABLE } from "../constants/runtime";

export default function runtime(state = {}, action) {
  switch (action.type) {
    case SET_RUNTIME_VARIABLE:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
