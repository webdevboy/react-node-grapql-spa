import { combineReducers } from 'redux'
import undoable, { excludeAction } from 'redux-undo'
import builder, { devices, selected, hover } from './reducer'
import {
  CHANGE_DEVICE,
  COLLAPSE_NODE,
  EXPAND_NODE,
  SELECT_NODE,
  UNSELECT_NODE,
  SET_HOVER,
  CLEAR_HOVER
} from './actions';

export const rootReducer = combineReducers({
  builder: undoable(builder, {
    filter: excludeAction([
      CHANGE_DEVICE,
      COLLAPSE_NODE,
      EXPAND_NODE,
      SELECT_NODE,
      UNSELECT_NODE,
      SET_HOVER,
      CLEAR_HOVER
    ])
  }),
  devices,
  selected,
  hover
})