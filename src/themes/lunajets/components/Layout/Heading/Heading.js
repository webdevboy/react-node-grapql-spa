import React from "react";
import cx from "classnames";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import PropTypes from "prop-types";

import Text from "../../Primitives/Text";
import s from "./Heading.scss";

class Heading extends React.Component {
  render() {
    const { text, hx, strong } = this.props;

    return hx ? (
      <h1 className={cx("uppercase heading")}>{text}</h1>
    ) : (
      <div className={cx("uppercase")}>
        {strong && 
          <strong>
            <span className={cx(s["heading"])}>{text}</span>
          </strong>
        }
        {
          !strong &&
          <span className={cx(s["heading"])}>{text}</span>
        }        
      </div>
    );
  }
}

Heading.propTypes = {
  text: PropTypes.string.isRequired,
};

export default withStyles(s)(Heading);
