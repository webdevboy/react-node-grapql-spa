import {
  ADD_CHILD,
  REMOVE_CHILD,
  MOVE_CHILD,
  CREATE_NODE,
  DELETE_NODE,
  SET_ROOT_TEMPLATE,
  CHANGE_NODE_PROPS,
  CHANGE_DEVICE,
  COLLAPSE_NODE,
  EXPAND_NODE,
  SELECT_NODE,
  UNSELECT_NODE,
  SET_HOVER,
  CLEAR_HOVER,
  LOCK_NODE,
  UNLOCK_NODE,
  INCREMENT_ARRAY_IN_PROPS,
  DECREMENT_ARRAY_IN_PROPS,
} from "./actions";

export const ROOT = "ROOT";
import { arrayMove } from "react-sortable-hoc";
// import _ from 'lodash';
import deepmerge from "deepmerge";
function overwriteMerge(destinationArray, sourceArray, options) {
	return sourceArray
}

const INITIAL_STATE = {
  [ROOT]: {
    id: ROOT,
    template: "Default",
    childIds: [],
    props: {
      expanded: true,
    },
  },
};

const childIds = (state, action) => {
  switch (action.type) {
    case ADD_CHILD:
      return [...state, action.childId];
    case REMOVE_CHILD:
      return state.filter(id => id !== action.childId);
    case MOVE_CHILD:
      return arrayMove(state, action.old_index, action.new_index);
    default:
      return state;
  }
};

const node = (state, action) => {
  switch (action.type) {
    case CREATE_NODE:
      return {
        id: action.nodeId,
        component: action.component,
        childIds: [],
        props: {
          locked: false,
          expanded: true,
        },
      };

    case SET_ROOT_TEMPLATE:
      return {
        ...state,
        template: action.template,
      };
    case ADD_CHILD:
    case REMOVE_CHILD:
    case MOVE_CHILD:
      return {
        ...state,
        childIds: childIds(state.childIds, action),
      };
    case COLLAPSE_NODE:
      return {
        ...state,
        props: {
          ...state.props,
          expanded: false,
        },
      };
    case EXPAND_NODE:
      return {
        ...state,
        props: {
          ...state.props,
          expanded: true,
        },
      };
    case INCREMENT_ARRAY_IN_PROPS:

      return {
        ...state,
        component: {
          ...state.component,
          props: {
            ...state.component.props,
            [action.key]: [ ...state.component.props[action.key], {} ]
          }
        }
      }

    case DECREMENT_ARRAY_IN_PROPS:

      return {
        ...state,
        component: {
          ...state.component,
          props: {
            ...state.component.props,
            [action.key]: state.component.props[action.key].filter((item, index) => index !== state.component.props[action.key].length - 1)
          }
        }
      }
    case CHANGE_NODE_PROPS:

      return {
        ...state,
        component: {
          ...state.component,
          props: deepmerge(state.component.props, action.props, { arrayMerge: overwriteMerge }),
        },
      };

    default:
      return state;
  }
};

const getAllDescendantIds = (state, nodeId) => (
  state[nodeId].childIds.reduce((acc, childId) => (
    [...acc, childId, ...getAllDescendantIds(state, childId)]
  ), [])
);

const deleteMany = (state, ids) => {
  state = { ...state };
  ids.forEach(id => delete state[id]);
  return state;
};

const lockMany = (state, ids) => {
  state = { ...state };
  const newState = ids.map(id => Object.assign(state[id], { props: { ...state[id].props, locked: true } }));
  return {
    ...state,
    newState,
  };
};

const unlockMany = (state, ids) => {
  state = { ...state };
  const newState = ids.map(id => Object.assign(state[id], { props: { ...state[id].props, locked: false } }));
  return {
    ...state,
    newState,
  };
};

export default (state = INITIAL_STATE, action) => {
  const { nodeId } = action;
  if (typeof nodeId === "undefined") {
    return state;
  }

  switch (action.type) {
    case DELETE_NODE:
      return deleteMany(state, [nodeId, ...getAllDescendantIds(state, nodeId)]);

    case LOCK_NODE:
      return lockMany(state, [nodeId, ...getAllDescendantIds(state, nodeId)]);

    case UNLOCK_NODE:
      return unlockMany(state, [nodeId, ...getAllDescendantIds(state, nodeId)]);

    default:
      return {
        ...state,
        [nodeId]: node(state[nodeId], action),
      };
  }
};

const DEVICES = {
  current: "desktop",
  ids: ["mobile", "tablet", "desktop"],
  byId: {
    mobile: {
      id: "mobile",
      name: "Smarphone",
      toltip: "Resize the viewport to Smarphone resolution",
      maxWidth: "480px",
    },
    tablet: {
      id: "tablet",
      name: "Tablet",
      toltip: "Resize the viewport to Tablet resolution",
      maxWidth: "960px",
    },
    desktop: {
      id: "desktop",
      name: "Desktop",
      toltip: "Resize the viewport to Desktop monitor resolution",
      maxWidth: "100%",
    },
  },
};

export const devices = (state = DEVICES, action) => {
  switch (action.type) {
    case CHANGE_DEVICE:
      return {
        ...state,
        current: action.device_id,
      };
    default:
      return state;
  }
};

export const hover = (state = null, action) => {
  switch (action.type) {
    case SET_HOVER:
      return action.nodeId;
    case CLEAR_HOVER:
      return null;
    default:
      return null;
  }
};

export const selected = (state = null, action) => {
  switch (action.type) {
    case SELECT_NODE:
      return action.nodeId;
    case UNSELECT_NODE:
      return null;
    default:
      return state;
  }
};
