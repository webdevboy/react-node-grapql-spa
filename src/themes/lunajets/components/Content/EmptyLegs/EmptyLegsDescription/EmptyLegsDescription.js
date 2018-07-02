import React from "react";
import PropTypes from "prop-types";
import { FormattedDate } from "react-intl";
import cx from "classnames";
import s from "./EmptyLegsDescription.scss";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import Text from "../../../Primitives/Text";

class EmptyLegsDescription extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  render() {
    const { description, sectionTitle, title, descriptionId, sectionTitleId, style, defaultPrefix, prefixId, defaultSuffix, suffixId } = this.props;

    return (
      <div className={s["emptylegs-description"]} style={style}>
        <div className={cx("container")}>
          {sectionTitle && (
            <div className={cx("row")}>
              <div className={cx("col")}>
                <h2 className="section-title lt-blue m-0" style={style && style.sectionTitle}>
                  <Text defaultMessage={sectionTitle} id={sectionTitleId} />
                </h2>
              </div>
            </div>
          )}

          {/* Paragraph */}
          <div className={cx("row")}>
            <div className={cx("col")}>
              <h3>
                <Text className={cx("uppercase", s["heading-title"])} defaultMessage={defaultPrefix} id={prefixId} />
                <span className={cx("uppercase", s["heading-title"])}>{title}</span>                 
                <Text className={cx("uppercase", s["heading-title"])} defaultMessage={defaultSuffix} id={suffixId} />
              </h3>              
            </div>
          </div>

          {description && (
            <div className={cx("row")}>
              <div className={cx("col", s["paragraph"])}>
                <p className={cx("mb-0")}>
                  <Text defaultMessage={description} id={descriptionId} />
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

EmptyLegsDescription.propTypes = {
  fromTo: '',
  title: PropTypes.string,
  description: PropTypes.string,
  sectionTitle: PropTypes.string,
};

EmptyLegsDescription.defaultProps = {
  fromTo: '',
  title: "",
  description: "",
  sectionTitle: "",
};

export default withStyles(s)(EmptyLegsDescription);
