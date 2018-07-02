import React from "react";

import Text from "../Text";

class SimpleLink extends React.Component {
  render() {
    return (
      <a className={this.props.className} href={this.props.href}>
        <Text id={this.props.textId} />
      </a>
    );
  }
}

export default SimpleLink;
