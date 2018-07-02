import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import withStyles from "isomorphic-style-loader/lib/withStyles";

import Text from "../../Primitives/Text";
import s from "./SectionTitle.scss";

class SectionTitle extends React.Component {
  render() {
    const { suffixMessage, defaultMessage , textId, noHeader, hx } = this.props;

    return !noHeader ? (
      !hx ? (
        <h3>
          <Text className={cx("text-secondary uppercase", s["section-title"])} id={textId} defaultMessage={defaultMessage} suffixMessage={suffixMessage}/>
        </h3>
      ) : (
        <h2>
          <Text className={cx("text-secondary uppercase", s["section-title"])} id={textId} defaultMessage={defaultMessage} suffixMessage={suffixMessage} />
        </h2>
      )
    ) : (
      <div>
        <Text className={cx("text-secondary uppercase", s["section-title"])} id={textId} defaultMessage={defaultMessage} suffixMessage={suffixMessage} />
      </div>
    );
  }
}

SectionTitle.propTypes = {
  textId: PropTypes.string,
  defaultMessage: PropTypes.string,
  noHeader: PropTypes.bool,
};

SectionTitle.defaultProps = {
  textId: "",
  defaultMessage: "",
  noHeader: false,
};

export default withStyles(s)(SectionTitle);
