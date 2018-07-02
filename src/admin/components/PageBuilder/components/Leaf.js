import React, { Component} from 'react';
import { connect }  from 'react-redux';
import s from '../style.css';
import { DragSource, DropTarget } from 'react-dnd';
import Types from '../types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Collapse, Menu, MenuItem, ContextMenu, ContextMenuTarget, Intent, MenuDivider } from '@blueprintjs/core'; 
import { ROOT } from '../reducer';
import { createNode, nodeCollapse, nodeExpand, selectNode, unselectNode, deleteNode, removeChild, addChild, moveChild, setHover, lockNode, unlockNode } from '../actions';
import cx from 'classnames';
import { getEmptyImage } from 'react-dnd-html5-backend'
import ReactDOM from 'react-dom';
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';

/** 
 * DRAG SOURCE
 */
const dragSource = {
  beginDrag(props, monitor, component) {
    if (props.props.locked) {
      return
    }
    return props;
  },
  canDrag(props, monitor) {
    // const item = monitor.getItem();

    if (!props.props.locked) {
      return true
    }

    if (props.id !== ROOT) {
      return true
    }

    return false
  },
}
function collectFromSource(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
    itemType: monitor.getItemType(),
    connectDragPreview: connect.dragPreview(),
  }
}

/**
 * DROP TARGET
 */
const dropTarget = {
  drop(props, monitor, component) {

    const item = monitor.getItem();
    const itemType = monitor.getItemType();
    const { id } = props;
    const isOver = monitor.isOver({ shallow: true });

    if (itemType === Types.LEAF && isOver) {
        
      // dropped  
      props.removeChild(item.parentId, item.id) // removes the child from parent node
      props.addChild(props.id, item.id)         // add the dragged Node to the dropped node childs
      
    }

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
    const isOver = monitor.isOver({ shallow: true });

    if (item.id === props.id) {
      return false
    }
    
    if (
      itemType === Types.LEAF ||
      itemType === Types.COMPONENT ||
      props.component.allowChildren ||
      !props.props.locked
    ) {
      return true;
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
    canDrop: monitor.canDrop()
  }
}

const TreeviewContextMenu = ({ removeNode, editNode, nodeId, isRoot, isLocked, lockNode, unlockNode }) => {
  
  return (
    <Menu>
      <MenuItem
        iconName="pt-icon-edit"
        onClick={() => editNode(nodeId)}
        intent={Intent.PRIMARY}
        text="Edit Properties"
        className={s.menuItem} />
      <MenuItem
        iconName={(!isLocked) ? "pt-icon-lock" : "pt-icon-unlock"}
        onClick={(!isLocked) ? (e) => lockNode(e, nodeId) : (e) => unlockNode(e, nodeId)}
        intent={Intent.NONE}
        text={(isLocked) ? "Unlock Node" : "Lock Node" }
        className={s.menuItem} />
      <MenuDivider />
      <MenuItem
        iconName="pt-icon-delete"
        onClick={() => removeNode(nodeId)}
        intent={Intent.DANGER}
        text="Remove Node"
        className={s.menuItem}
        disabled={isRoot}
        />
    </Menu>
  )
}

const DragHandler = SortableHandle(() => <span className="pt-tree-node-secondary-label"><span className="pt-icon-drag-handle-horizontal"></span></span>)

const Locked = () => <span className="pt-tree-node-secondary-label"><span className="pt-icon-lock"></span></span>

const SortableList = SortableContainer(({ childIds, nodeId, depth }) => {
  return (
    <ul className="pt-tree-node-list">
      { childIds.map((childId, index) => 
        <SortableLeaf key={`leaf-${childId}`} index={index} id={childId} collection={nodeId} parentId={nodeId} depth={depth} />
      )}
    </ul>
  )
})

class Leaf extends Component {

  onContextMenu = (e, nodeId) => {
    e.preventDefault();
    e.stopPropagation();

    const { props: { locked = false } } = this.props;
  
    ContextMenu.show(
      <TreeviewContextMenu
        removeNode={this.removeNode}
        editNode={this.editNode}
        lockNode={this.lockNode}
        unlockNode={this.unlockNode}
        nodeId={nodeId}
        isRoot={(nodeId === ROOT)}
        isLocked={locked}
      />, 
      { 
        left: e.clientX,
        top: e.clientY,
      }
    );
  }

  lockNode = (e, nodeId) => {
    e.stopPropagation();
    this.props.lockNode(nodeId);
    ContextMenu.hide();
  }

  unlockNode = (e, nodeId) => {
    e.stopPropagation();
    this.props.unlockNode(nodeId)
    ContextMenu.hide();
  } 

  removeNode = (nodeId) => {
    this.props.unselectNode();
    this.props.removeChild(this.props.parentId, nodeId);
    this.props.deleteNode(nodeId);
  }

  editNode = (nodeId) => this.props.selectNode(nodeId)

  collapse = (e, nodeId) => {
    e.stopPropagation();
    this.props.nodeCollapse(nodeId)
  }

  expand = (e, nodeId) => {
    e.stopPropagation();
    this.props.nodeExpand(nodeId)
  }

  select = (e, nodeId) => {
    e.stopPropagation();
    
    if (this.props.selected === nodeId) {
      this.props.unselectNode();
      return
    }
    
    this.props.selectNode(nodeId)
    
  }

  onMouseEnter = (e, nodeId) => {
    if (nodeId !== ROOT) {
      this.props.setHover(nodeId)
    }
    
  }

  componentDidMount() {
		// this.props.connectDragPreview(getEmptyImage(), {
		// 	captureDraggingState: true,
		// })
  }
  
  onSortEnd = ({oldIndex, newIndex, collection}, e) => {
    this.props.moveChild(collection, oldIndex, newIndex);
    console.log('SORT END! old Index => ', oldIndex, ', new index => ', newIndex, ', inside collection id => ',collection);
  }

  render() {
    const nodeId = this.props.id;
    const { parentId, connectDropTarget, connectDragSource, isOverCurrent, canDrop, component, template, props, hover, childIds, selected, depth } = this.props;
    const label = (component) ? component.key : template;

    console.log('can drop => ', canDrop)

    return connectDragSource(
      connectDropTarget(
        <li className={cx("pt-tree-node", (props.expanded) ? 'pt-tree-node-expanded' : null, (selected === nodeId) ? 'pt-tree-node-selected' : null)}>
          <div
          onMouseEnter={e => this.onMouseEnter(e, nodeId)}
          onContextMenu={(e) => this.onContextMenu(e, nodeId)}
          onClick={(e) => this.select(e, nodeId)}
          className={cx(
            "pt-tree-node-content",
            `pt-tree-node-content-${depth}`,
            (isOverCurrent && canDrop) ? s.isOverNode : null,
            (hover === nodeId) ? s.isActive : null)}
          >
          { childIds.length ?
            <span
              onClick={(props.expanded) ? (e) => this.collapse(e, nodeId) : (e) => this.expand(e, nodeId) }
              className={cx("pt-tree-node-caret pt-icon-standard", (props.expanded) ? 'pt-tree-node-caret-open' : '')}>
            </span>
            : null
          }
          <span className="pt-tree-node-icon pt-icon-standard"></span>
          <span className="pt-tree-node-label">
            <span className={s.childName}>{label}</span>
          </span>

          { 
            (nodeId !== ROOT) ? 
              ((props.locked || false)) ? <Locked />
              : <DragHandler />
            : null
          }
        </div>
          { 
            childIds && 
            <Collapse isOpen={props.expanded}>

              <SortableList
                helperClass={s.sortable}
                useDragHandle={true}
                lockToContainerEdges={true}
                onSortEnd={this.onSortEnd}
                childIds={childIds}
                nodeId={nodeId} // ROOT | given id // 1
                depth={depth+1}
                lockToContainerEdges={true}
                axis={'y'}
                lockAxis={'y'}
              />

            </Collapse>
          }
        </li>
      )
    )
  }
}

const mapStateToProps = ({ pageBuilder }, ownProps) => ({
  ...pageBuilder.builder.present[ownProps.id],
  selected: pageBuilder.selected || false,
  hover: pageBuilder.hover || false
})

const mapDispatchToProps = {
  nodeCollapse,
  nodeExpand,
  selectNode,
  createNode,
  unselectNode,
  deleteNode,
  removeChild,
  addChild,
  moveChild,
  setHover,
  lockNode,
  unlockNode
}

const InsideLeaf = DragSource(Types.LEAF, dragSource, collectFromSource)(
  DropTarget([Types.COMPONENT, Types.LEAF], dropTarget, collectFromTarget)(
    Leaf
  )
)

const TreeLeaf = connect(mapStateToProps, mapDispatchToProps)(InsideLeaf)


const SortableLeaf = SortableElement(
  ({id, parentId, depth}) => <TreeLeaf key={`leaf-${id}`} id={id} parentId={parentId} depth={depth} />
);


export default withStyles(s)(TreeLeaf)
