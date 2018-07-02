import { 
  REORDER_CHILD,
  ADD_CHILD,
  REMOVE_CHILD,
  CREATE_NODE,
  DELETE_NODE,
  SET_BODY,
  UPDATE_CHILD,
  ADD_CHILD_CLASS,
  REMOVE_CHILD_CLASS,
  UPDATE_ROOT,
  UPDATE_ROOT_CSS,
  REMOVE_ROOT_CSS,
  UPDATE_STYLE_SHEET,
} from '../constants';
import _, { capitalize } from 'lodash';

const move = (arr, from, to) => {
  const clone = [...arr];
  Array.prototype.splice.call(clone, to, 0,
    Array.prototype.splice.call(clone, from, 1)[0]
  );
  return clone;
};

const childIds = (state, action) => {
  switch (action.type) {
    case ADD_CHILD:
      return [ ...state, action.childId ]
    case REORDER_CHILD:
      return move(state, action.oldIndex, action.newIndex)
    case REMOVE_CHILD:
      return state.filter(id => id !== action.childId)
    default:
      return state
  }
}

const node = (state, action) => {

  switch (action.type) {
    case CREATE_NODE:
      return {
        id: action.nodeId,
        component: action.component,
        childIds: [],
      }
    case REORDER_CHILD:
    case ADD_CHILD:
    case REMOVE_CHILD:
      return {
        ...state,
        childIds: childIds(state.childIds, action)
      }
    default:
      return state
  }
}

const getAllDescendantIds = (state, nodeId) => (
  state[nodeId].childIds.reduce((acc, childId) => (
    [ ...acc, childId, ...getAllDescendantIds(state, childId) ]
  ), [])
)

const deleteMany = (state, ids, nodeId) => {
  state = { ...state }
  ids.forEach(id => delete state[id])
  Object.keys(state).map(key => {
    const childIds = {childIds: state[key].childIds.filter(id => id !== nodeId)};
    state[key] = Object.assign({}, state[key], childIds);
  });

  //Remove css class rules 
  const devices = ['Desktop', 'Tablet', 'Smartphone'];
  devices.forEach(device => {
    if(state[0][`css${device}`]){
      const css = {[`css${device}`]:  _.pickBy(state[0][`css${device}`], (value, key, object) => { return key !== `.s${nodeId}`})};
      Object.assign(state[0], css);
    }
  });
  return state
}

export default (state = {}, action) => {

  if(action.type === UPDATE_ROOT){
    let key = 0;
    let s = Object.assign({},state);
    let sk = Object.assign({},s[key]);
    let props = Object.assign({},sk.props, action.props);
    sk = ({[key]: Object.assign({}, sk, {props: props})});
    return Object.assign({}, state, sk);
  }

  if(action.type === UPDATE_STYLE_SHEET){
    let key = 0;
    let s = Object.assign({},state);
    let sk = Object.assign({},s[key]);
    sk = ({[key]: Object.assign({}, sk, {styleSheet: action.styleSheet})});
    return Object.assign({}, state, sk);
  }

  if(action.type === UPDATE_ROOT_CSS){
    const device = capitalize(action.device);
    let key = 0;
    let s = Object.assign({},state);
    let sk = Object.assign({},s[key]);
    let css = {};
    if(sk[`css${device}`]){
      if(sk[`css${device}`][action.key]){
        let innerCss = Object.assign({}, {...sk[`css${device}`][action.key]} , {...action.rule});
        let k = {[action.key]: innerCss};
        css = Object.assign({}, sk[`css${device}`] , k);
      }
      else{
        css = Object.assign({}, sk[`css${device}`], {[action.key]: action.rule});
      }
    }
    else{
      css = Object.assign({}, sk[`css${device}`], {[action.key]: action.rule});
    }
    sk = ({[key]: Object.assign({}, sk, {[`css${device}`]: css})});
    return Object.assign({}, state, sk);
  }

  if(action.type === UPDATE_CHILD){
    let key = action.childId;
    let s = Object.assign({},state);
    let sk = Object.assign({},s[key]);
    // let style = sk.component && sk.component.props && sk.component.props.style && action.style ? {style: Object.assign({}, sk.component.props.style, action.style)} : {style: action.style};
    // let proptypes = sk.component.props && sk.component.props.proptypes && action.proptypes ? { proptypes: Object.assign({}, sk.component.props.proptypes, action.proptypes)} : {proptypes: action.proptypes};
    let props = Object.assign({},sk.component.props, action.props);
    let component = Object.assign({}, sk.component, {props: props});
    sk = ({[key]: Object.assign({}, sk, {component: component})});
    return Object.assign({}, state, sk);
  }

  if(action.type === ADD_CHILD_CLASS){
    let key = action.childId;
    let s = Object.assign({},state);
    let sk = Object.assign({},s[key]);
    let classnames = undefined;



    if(sk.component.props.classnames){
      if(sk.component.props.classnames.indexOf(action.className) !== -1){
        return state;
      }
      else{
        classnames = [...sk.component.props.classnames, action.className];
      }
    }
    else{
      classnames = [action.className];
    }


    let props = Object.assign({}, sk.component.props, { classnames: classnames });
    let component = Object.assign({}, sk.component, { props: props });
    sk = ({[key]: Object.assign({}, sk, {component: component})});
    return Object.assign({}, state, sk);
  }

  if(action.type === REMOVE_CHILD_CLASS){
    let key = action.childId;
    let s = Object.assign({},state);
    let sk = Object.assign({},s[key]);
    let classnames = [];
    if(sk.component.props.classnames){
      if(sk.component.props.classnames.indexOf(action.className) != -1){
        classnames = sk.component.props.classnames.filter(className => {
          return className != action.className;
        });
      }
    }
    const classes = {classnames: classnames};
    let props = Object.assign({},sk.component.props, [], classes);
    let component = Object.assign({}, sk.component, {props: props});
    sk = ({[key]: Object.assign({}, sk, {component: component})});
     
    return Object.assign({}, state, sk);
  }

  if(action.type === DELETE_NODE){
    const descendantIds = getAllDescendantIds(state, action.nodeId)
    return deleteMany(state, [ action.nodeId, ...descendantIds ], action.nodeId)
  }

  if (action.type === SET_BODY) {
    return action.body;
  }

  const { nodeId } = action
  if (typeof nodeId === 'undefined') {
    return state
  }

  return {
    ...state,
    [nodeId]: node(state[nodeId], action)
  }
}
