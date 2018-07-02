import {  
    REORDER_CHILD,
    CREATE_NODE,
    DELETE_NODE,
    ADD_CHILD,
    UPDATE_CHILD,
    SET_BODY,
    UPDATE_ROOT,
    UPDATE_ROOT_CSS,
    ADD_CHILD_CLASS,
    REMOVE_CHILD_CLASS,
    UPDATE_STYLE_SHEET,


} from '../constants';
import uuidv4 from 'uuid/v4';

export const setBody = (body) => ({
  type: SET_BODY,
  body
})

export const moveComponent = (nodeId, oldIndex, newIndex) => ({
  type: REORDER_CHILD,
  nodeId,
  oldIndex,
  newIndex
})

export const createNode = (component) => ({
  type: CREATE_NODE,
  nodeId: uuidv4(),
  component: component
})

export const addChild = (nodeId, childId) => ({
  type: ADD_CHILD,
  nodeId,
  childId
})

export const updateChild = (childId, props, style, proptypes) => ({
  type: UPDATE_CHILD,
  childId,
  props,
  proptypes,
  style
})

export const addChildClass = (childId, className) => ({
  type: ADD_CHILD_CLASS,
  childId,
  className
})

export const removeChildClass = (childId, className) => ({
  type: REMOVE_CHILD_CLASS,
  childId,
  className
})

export const updateRoot = (props) => ({
  type: UPDATE_ROOT,
  props
})

export const updateRootCss = (device,key,rule) =>({
  type: UPDATE_ROOT_CSS,
  device,
  key,
  rule
})

export const updateStyleSheet = (styleSheet) =>({
  type: UPDATE_STYLE_SHEET,
  styleSheet
})

export const deleteNode = (nodeId) => ({
  type: DELETE_NODE,
  nodeId
})

