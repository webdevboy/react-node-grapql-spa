import React, { Component } from "react";
import cx from "classnames";
import withStyles from "isomorphic-style-loader/lib/withStyles";

import s from "./LoadingSpinner.scss";

class LoadingSpinner extends Component {
  render() {
    return (
      <div className={cx(this.props.className, s["lds-ring"])}>
        <div />
        <div />
        <div />
        <div />
      </div>
    );
  }
}

export default withStyles(s)(LoadingSpinner);

export const component = {
  defaultProps: LoadingSpinner.defaultProps,
  propTypes: LoadingSpinner.propTypes,
  propSchema: LoadingSpinner.propSchema,
  category: "widget",
  tags: ["loading", "spinner"],
};
