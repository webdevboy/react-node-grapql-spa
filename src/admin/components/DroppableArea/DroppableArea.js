import React from 'react';
import ReactDOM from 'react-dom';
import s from './droppable.css';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import { connect } from 'react-redux';
import { createNode, addChild, moveComponent, addChildClass, removeChildClass, updateRootCss, updateChild } from '../../../redux/actions/editor';
import { DropTarget, DragSource } from 'react-dnd';
import { modules, getModules } from '../../../components/index';
import Editable from '../Editable';
import _ from 'lodash';
import mediaPlaceholder from './gfx/media_placeholder.png';
import Zap from 'react-feather/dist/icons/zap';
import Text from '../../../components/Misc/Text';
import { pseudoRandomBytes } from 'crypto';

const Types = {
  COMPONENT: 'component',
};

const transformPropTypeAsDefaultProps = ({ componentName, prop, page, id }) => {

  const transform = ({val, key}) => {
    switch(val) {
      case 'media':
        return mediaPlaceholder
        break;
      case 'text':
        const defaultMessage = 'Insert your text here';
        return {
          defaultMessage: defaultMessage,
          id: `client.${page}.${componentName}.${key}`,
          // editable: true
        }
        break;
      case 'bool':
        return false
        break;
      case 'color':
        return '#FFFFFF'
        break;
      case 'icon':
        return {
          icon: 'Edit'
        }
        break;
      case 'string':
        return 'default placeholder'
        break
      default:
        return null
    }
  }

  if (typeof prop === 'object') {
    return _.reduce(prop, (proptype, val, key) => {
      proptype[key] = transform({val, key})
      return proptype
    }, {});
  } else {
    return transform({val: prop, key: id})
  }
    
}

const dropTarget = {

  drop(props, monitor, component) {
    const item = monitor.getItem();
    const { slug, addChild, createNode, id, parentId, addChildClass, removeChildClass, updateChild, updateRootCss } = props;

    if ( item.component && !item.component.id) { // root element 
      const { component } = props[id];

      const newProps = _.reduce(item.component.proptypes, (proptypes, prop, key) => {
        if (key === 'version') {
          proptypes[key] = prop[0].value
        } else {
          proptypes[key] = transformPropTypeAsDefaultProps({
          componentName: item.component.name,
          prop: prop, 
          page: slug, 
          id: key+Date.now().valueOf()
          })
        } 
        return proptypes

      }, {})

      const newItem = {...item.component, props: newProps}

      const childId = props.createNode(newItem).nodeId;

      if((id !== 0) && (item.component.name.toLowerCase() === component.name.toLowerCase())){
        props.addChild(parentId, childId);
      }

      // if is component inside the same component add to parent node instead
      else{
        props.addChild(id, childId);
      }

      

      // console.log('========================>>>>>>', newProps);

      // props.updateChild(childId, newProps);

      return;

    }

    // if ( item.component && !item.component.dependecies.length && props.id === 0 ) // root element
    // {
    //   const { addChild, createNode, id } = props
    //   const childId = props.createNode(item.component).nodeId
    //   props.addChild(id, childId);
    //   return;
    // }

    // if ( props.component !== null && (item.component.name === props.component.name)) {
    //   console.log('inception');
    //   return
    // }

    // console.log(item.component.dependecies, props.component.name);
    // if (props.component !== null && (!item.component.dependecies.length || item.component.dependecies.indexOf(props.component.name) >= 0)) {
    //   console.log(item.component.dependecies.indexOf(props.component.name));
    //   const { addChild, createNode, id } = props;
    //   const childId = props.createNode(item.component).nodeId;
    //   props.addChild(id, childId);
    //   return;
    // }

    // if ( item.component && !item.component.dependecies.length && props.id === 0 ) // root element
    // {
    //   const { addChild, createNode, id } = props
    //   const childId = props.createNode(item.component).nodeId
    //   props.addChild(id, childId);
    //   return;
    // }

  },

  canDrop(props, monitor) {
    const item = monitor.getItem();
    const locked = props[props.id].component ? props[props.id].component.props.locked : false;
    const name = props[props.id].component ? props[props.id].component.name : 'root';
    const dependencies = item.component.dependencies;
    if ( monitor.isOver({ shallow: true }) && !locked) {

      if(_.find(dependencies, (dependencie) => {return dependencie.toLowerCase().trim() == name.toLowerCase().trim()})){
        return true
      }
      else if(item.component.name.toLowerCase().trim() == name.toLowerCase().trim()){
        return true
      }
    }
    return false
  }

};

function collectFromTarget(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({ shallow: true }),
    itemType: monitor.getItemType(),
  };
}

class Droppable extends React.Component {

  

  constructor(props) {
    super(props);
    this.state = props;
  }

  renderChild = childId => {
    const { id, data, slug } = this.props;
    return <DroppableArea key={childId} id={childId} parentId={id} data={data} slug={slug} />
  }

  componentDidMount() {

    // const el = ReactDOM.findDOMNode(this);
    // const sortable = new Sortable(el, {
    //   group: (this.props.id) ? 'root' : 'component',
    //   sort: true,
    //   scroll: false, // or HTMLElement
    // });

  }

  // transformPropType({componentName, prop, page, id}) {

  //   const transform = ({val, key}) => {
  //     switch(val) {
  //       case 'media':
  //         return mediaPlaceholder
  //         break;
  //       case 'text':
  //         const defaultMessage = 'Insert your text here';
  //         return {
  //           defaultMessage: defaultMessage,
  //           id: `client.${page}.${componentName}.${key}`
  //         }
  //         // <Text defaultMessage={defaultMessage} textID={} id={id} isEditor={true} propTypeKey={key|| 'test'}/>
  //         break;
  //       case 'bool':
  //         return false
  //         break;
  //       case 'color':
  //         return '#FFFFFF'
  //         break;
  //       case 'icon':
  //         return <Zap color='#FFFFFF' />
  //         break;
  //       case 'string':
  //         return 'default placeholder'
  //         break
  //     }
  //   }

  //   if (typeof prop === 'object') {
  //     return _.reduce(prop, (proptype, val, key) => {
  //       proptype[key] = transform({val, key})
  //       return proptype
  //     }, {});
  //   } else {
  //     return transform({val: prop})
  //   }
      
    
  // }

  componentDidUpdate(prevProps, prevState) {
  }

  render() {



    const { slug, connectDropTarget, isOverCurrent, canDrop, children, parentId, data } = this.props;
    const { id, childIds, component } = this.props[this.props.id];

    const style = cx((id === 0) ? s.rootDroppable : s.droppable, (isOverCurrent) ? s.isOver : '', (canDrop) ? s.canDrop : '', s.comp);
    
    const dropArea = connectDropTarget(
      <div className={style} data-type={component ? component.data_type : ''} data-key={id}>
        { childIds ? childIds.map(this.renderChild) : '' }
      </div>
    );

    if (id === 0) { // root component | ID = 0
      return dropArea
    }

    if (component) {

      const module = getModules[component.name];

      let props = Object.assign({}, component.props, {editorID: id}, {'data-type': component.data_type }, { data });
      
      switch (component.type) {

        case 'abstract':
          return React.createElement(module.default, props, dropArea);
        

        case 'strict':
          if(component.data_type.toLowerCase() === 'text' || component.props.data_type === 'text'){
            return React.createElement(Editable, {id, classnames: component.props.classnames}, React.createElement(module.default, props));
          } else {
            return React.createElement(module.default, props, dropArea);
          }
      }
    }
    return null;
  }
}

const mapStateToProps = (state, ownProps) => state.editor.present;

const DroppableArea = connect(mapStateToProps, { createNode, addChild, moveComponent, updateChild, removeChildClass, addChildClass, updateRootCss })
                      (DropTarget(Types.COMPONENT, dropTarget, collectFromTarget)
                      // (DragSource(Types.COMPONENT, dragSource, collectFromSource)
                      (withStyles(s)
                        (Droppable)
                      ));

export default DroppableArea;







