import React from "react";
import s from "./Button.scss";
import cx from "classnames";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import Text from "../Text";

class Button extends React.Component {
  render() {
    const { className, defaultMessage, onClick, textId, id, style } = this.props;
    return (
      <button id={id} className={cx(s["root"], className)} onClick={onClick} style={style}>
        <Text defaultMessage={defaultMessage} id={textId} />
      </button>
    );
  }
}

export default withStyles(s)(Button);
