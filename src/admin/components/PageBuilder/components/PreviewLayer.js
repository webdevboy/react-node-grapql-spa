import React, { Component } from "react";
import PropTypes from "prop-types";
import { DragLayer } from "react-dnd";
import Types from "../types";

const layerStyles = {
  position: "absolute",
  pointerEvents: "none",
  zIndex: 999,
  left: 0,
  top: 0,
  width: "100%",
  height: "100%",
};

function getItemStyles(props) {
  const { initialOffset, currentOffset } = props;
  if (!initialOffset || !currentOffset) {
    return {
      display: "none",
    };
  }

  const { x, y } = currentOffset;

  const transform = `translate(${x}px, ${y}px)`;
  return {
    transform,
    WebkitTransform: transform,
  };
}

function collect(monitor) {
  return {
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    initialOffset: monitor.getInitialSourceClientOffset(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
  };
}

class PreviewLayer extends Component {
  static propTypes = {
    component: PropTypes.element,
    initialOffset: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    }),
    currentOffset: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    }),
    isDragging: PropTypes.bool.isRequired,
  }

	renderItem = (type, item) => {
	  switch (type) {
	    case Types.COMPONENT:
	      return React.createElement(item.component, { editor: true });
	    case Types.LEAF:
	      console.log("ITEM => preview layer");
	      console.log(item);
	      return React.createElement(item);
	    default:
	      return null;
	  }
	}

	render() {
	  const { item, itemType, isDragging } = this.props;

	  if (!isDragging && !item) {
	    return null;
	  }

	  return (
  <div style={layerStyles}>
    <div style={getItemStyles(this.props)}>
      { this.renderItem(item, itemType) }
    </div>
  </div>
	  );
	}
}

export default DragLayer(collect)(PreviewLayer);
