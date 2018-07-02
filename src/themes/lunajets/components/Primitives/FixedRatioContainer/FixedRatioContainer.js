import React from "react";
import cx from "classnames";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import PropTypes from "prop-types";
import s from "./FixedRatioContainer.scss";

class FixedRatioContainer extends React.Component {
  render() {
    const { ratio, style } = this.props;
    return (
      <div style={{ ...style, paddingTop: `${ratio * 100}%` }} className={cx(this.props.className, s["container"])}>
        <div className={cx(s["children"])}>{this.props.children}</div>
      </div>
    );
  }
}

FixedRatioContainer.PropTypes = {
  ratio: PropTypes.number,
};

FixedRatioContainer.defaultProps = {
  ratio: 1,
};

export default withStyles(s)(FixedRatioContainer);
