/* eslint-disable import/prefer-default-export */
import { SET_RUNTIME_VARIABLE } from "../constants/runtime";

export function setRuntimeVariable(payload) {
  return {
    type: SET_RUNTIME_VARIABLE,
    payload,
  };
}
