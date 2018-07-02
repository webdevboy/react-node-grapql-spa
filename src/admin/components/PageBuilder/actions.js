export const CREATE_NODE = 'CREATE_NODE'
export const DELETE_NODE = 'DELETE_NODE'
export const ADD_CHILD = 'ADD_CHILD'
export const REMOVE_CHILD = 'REMOVE_CHILD'
export const SET_ROOT_TEMPLATE = 'SET_ROOT_TEMPLATE'
export const CHANGE_NODE_PROPS = 'CHANGE_NODE_PROPS'
export const CHANGE_DEVICE = 'CHANGE_DEVICE'
export const COLLAPSE_NODE = 'COLLAPSE_NODE'
export const EXPAND_NODE = 'EXPAND_NODE'
export const SELECT_NODE = 'SELECT_NODE'
export const UNSELECT_NODE = 'UNSELECT_NODE'
export const SET_HOVER = 'SET_HOVER'
export const CLEAR_HOVER = 'CLEAR_HOVER'
export const MOVE_CHILD = 'MOVE_CHILD'
export const LOCK_NODE = 'LOCK_NODE'
export const UNLOCK_NODE = 'UNLOCK_NODE'
export const INCREMENT_ARRAY_IN_PROPS = 'INCREMENT_ARRAY_IN_PROPS'
export const DECREMENT_ARRAY_IN_PROPS = 'DECREMENT_ARRAY_IN_PROPS'

import { ROOT } from './reducer';
import uuid from 'uuidv4';

export const lockNode = (nodeId) => ({
  type: LOCK_NODE,
  nodeId
})

export const unlockNode = (nodeId) => ({
  type: UNLOCK_NODE,
  nodeId
})

export const nodeCollapse = (nodeId) => ({
  type: COLLAPSE_NODE,
  nodeId: nodeId
})

export const nodeExpand = (nodeId) => ({
  type: EXPAND_NODE,
  nodeId: nodeId
})

export const selectNode = (nodeId) => ({
  type: SELECT_NODE,
  nodeId: nodeId
})

export const unselectNode = () => ({
  type: UNSELECT_NODE,
})

export const createNode = ({prefix = false, component}) => {
  return (dispatch, getState) => {
    
    const nodeID = (prefix) ? `${prefix}_${uuid()}` : uuid()

    return dispatch({
      type: CREATE_NODE,
      nodeId: nodeID,
      component
    });

  }
}

export const moveChild = (nodeId, old_index, new_index) => ({
  type: MOVE_CHILD,
  nodeId,
  old_index,
  new_index
})

export const deleteNode = (nodeId) => ({
  type: DELETE_NODE,
  nodeId,
})

export const addChild = (nodeId, childId) => ({
  type: ADD_CHILD,
  nodeId,
  childId,
})

export const removeChild = (nodeId, childId) => ({
  type: REMOVE_CHILD,
  nodeId,
  childId,
})

export const setRootTemplate = (template) => ({
  type: SET_ROOT_TEMPLATE,
  nodeId: ROOT,
  template,
})

export const changeNodeProps = (nodeId, props) => ({
  type: CHANGE_NODE_PROPS,
  nodeId,
  props,
})

export const changeDevice = (device_id) => ({
  type: CHANGE_DEVICE,
  device_id
})

export const setHover = (nodeId) => ({
  type: SET_HOVER,
  nodeId
})

export const clearHover = (nodeId) => ({
  type: CLEAR_HOVER,
  nodeId
})

export const incrementArrayInProps = (nodeId, key) => ({
  type: INCREMENT_ARRAY_IN_PROPS,
  nodeId,
  key
})

export const decrementArrayInProps = (nodeId, key) => ({
  type: DECREMENT_ARRAY_IN_PROPS,
  nodeId,
  key
})
  
  