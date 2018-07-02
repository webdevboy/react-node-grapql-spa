import React from 'react';
import ReactDOM from 'react-dom';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from 'Draggable.css';
import { connect } from 'react-redux';
import * as actions from '../../../redux/actions/editor';
import { DragSource } from 'react-dnd';

const Types = {
  COMPONENT: 'component'
};

const dragSource = {
  beginDrag(props) {
    return props
  }
};

class Draggable extends React.Component {

  moveComponent() {

  }

  constructor() {
    super();
  }

  render() {
    const { isDragging, connectDragSource, children } = this.props;
    const opacity = isDragging ? 0 : 1;
    return connectDragSource(
      <div className={cx(s.draggable)} style={{ opacity }}>
        { children }
      </div>,
    );
  }
}

export default DragSource(Types.COMPONENT, dragSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
}))(Draggable);










