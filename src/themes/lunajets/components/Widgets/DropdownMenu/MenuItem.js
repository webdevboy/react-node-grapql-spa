import React from "react";

class MenuItem extends React.Component {
  onClick = () => {
    const objectID = this.props.objectID ? this.props.objectID : '';
    const value = this.props.value ? this.props.value : '';
    
    this.props.onChange(objectID, value);
  };
  render() {
    return (
      <li className="dropdown-item" onClick={this.onClick}>
        {this.props.value}
      </li>
    );
  }
}

export default MenuItem;
