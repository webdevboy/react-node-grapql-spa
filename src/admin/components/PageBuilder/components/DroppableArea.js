import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import cx from 'classnames'
import { connect } from 'react-redux'
import { DropTarget, DragSource } from 'react-dnd'
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { 
  createNode,
  addChild,
  selectNode,
  unselectNode,
  setHover,
  clearHover
} from '../actions'
import _ from 'lodash'
import Types from '../types'
import { ROOT } from '../reducer'
import s from '../style.css'

const dropTarget = {
  drop(props, monitor, component) {
    const item = monitor.getItem();
    const itemType = monitor.getItemType();
    const { id } = props;
    const isOver = monitor.isOver({ shallow: true });
  
    if (itemType === Types.COMPONENT && isOver) {
      const { nodeId } = props.createNode({
        prefix: (id === ROOT) ? 'ROOT' : false,
        component: {
          key: item.name,
          allowChildren: _.has(item.propTypes, 'children'),
          props: {
            ...item.defaultProps
          },
        },
      });
      props.addChild(id, nodeId);
    }
  
  },
  canDrop(props, monitor) {
    const item = monitor.getItem();
    const itemType = monitor.getItemType();

    if (itemType !== Types.COMPONENT) {
      return false
    }

    if (props.id === ROOT) {
      return true
    }

    if (props[props.id].component.allowChildren) {
      return true
    }

    const isOver = monitor.isOver({ shallow: true });
    const locked = props[props.id].component.props.locked;

    if ( !locked ) {
      return true
    }

    return false
  }
}

function collectFromTarget(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({ shallow: true }),
    itemType: monitor.getItemType(),
  }
}

class Droppable extends Component {

  static contextTypes = {
    components: PropTypes.object.isRequired,
  }

  refHandlers = {
    droppable: (ref) => this.droppable = ref,
  }

  constructor(props, context) {
    super(props, context);
  }

  renderChild = childId => {
    const { id } = this.props;
    return <DroppableArea key={childId} id={childId} parentId={id} />
  }

  selectNode = (e, nodeId) => {
    e.stopPropagation();

    if (this.props.selected === nodeId) {
      this.props.unselectNode();
      return
    }
    this.props.selectNode(nodeId)

  }

  onMouseEnter = (e, nodeId) => {
    e.stopPropagation();
    this.props.setHover(nodeId)
  }

  render() {
    const { templates, components } = this.context;
    const { connectDropTarget, isOverCurrent, canDrop, parentId, children, hover, selected } = this.props;
    const { id: nodeId, childIds, component } = this.props[this.props.id];
    const editor = true;

    const className = cx(
      (this.props.id === ROOT) ? s.rootDroppable : s.droppable,
      (isOverCurrent) ? s.isOver : '',
      (canDrop) ? s.canDrop : '',
      s.comp
    );

    const Tooltip = <div className={s.hoverTitle}>
      <span>{ (this.props.id === ROOT) ? 'ROOT' : component.key }</span>
    </div>

    const droppable = connectDropTarget(
      <div
      key={`droppable-for-component-${this.props.id}`}
      onClick={(e) => this.selectNode(e, nodeId)}
      droppable="yes"
      onMouseEnter={(e) => this.onMouseEnter(e, nodeId)}
      className={className} ref={this.refHandlers.droppable}>
        { (selected === nodeId) ? Tooltip : null }
        { childIds && childIds.map(this.renderChild) }
      </div>
    )

    if (this.props.id === ROOT) {
      return droppable;
    }

    if (component) {
      const ComponentItem = components[component.key].default;
      const defaultProps = components[component.key].component.defaultProps;
      
      const props = Object.assign(defaultProps, component.props, {
        key: `component-${nodeId}`,
        editor: true.toString(),
        onMouseEnter: (e) => this.onMouseEnter(e, nodeId),
        onClick: (e) => this.selectNode(e, nodeId),
        className: (hover === nodeId || selected === nodeId) ? s.isOver : null,
        // children: (hover !== null && hover === nodeId) ? [Tooltip] : null
      });
      
      if (_.has(components[component.key].component.propTypes, 'children')) {
        return React.createElement(ComponentItem, props, [droppable])
      }
      return React.createElement(ComponentItem, props)
    }
      
    return null
    
  }
}

const mapStateToProps = ({ pageBuilder }) => ({
  ...pageBuilder.builder.present,
  hover: pageBuilder.hover || false,
  selected: pageBuilder.selected || false
})

const mapDispatchToProps = {
  createNode,
  addChild,
  selectNode,
  unselectNode,
  setHover,
  clearHover
}

const DroppableArea = connect(mapStateToProps, mapDispatchToProps)(
  DropTarget(Types.COMPONENT, dropTarget, collectFromTarget)(
    Droppable
  )
)

export default withStyles(s)(DroppableArea)
