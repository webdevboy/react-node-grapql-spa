import React from "react";
import { FormattedDate } from "react-intl";
import cx from "classnames";
import s from "./SectionDescription.scss";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import Text from "../../../Primitives/Text";
import PropTypes from "prop-types";
import DraftjsDecoder from "utils/DraftjsDecoder";

class SectionDescription extends React.Component {
  static propTypes = {
    section: PropTypes.shape({
      subtitle: PropTypes.object,
      title: PropTypes.object,
      content: PropTypes.object,
    }),
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  render() {
   
    const { section } = this.props;

    return (
      <div className={s["section-description"]}>
        <div className={cx("container")}>
          
          {/* Subtitle */}
          {section.subtitle && (
            <div className={cx("row")}>
              <div className={cx("col")}>
                <div>
                  <span className={`section-title ${section.subtitle.color ? section.subtitle.color : "white"}`}>
                    <Text id={section.subtitle.id} defaultMessage={section.subtitle.defaultMessage} />
                  </span>
                </div>
              </div>
            </div>
          )}
          
          {/* Title */}
          {section.title && (
            <div className={cx("row")}>
              <div className={cx("col", s["paragraph-title"])}>
              <Text isHeader={true} id={section.title.id} defaultMessage={section.title.defaultMessage} />
              </div>
            </div>
          )}

          {/* Content */}
          {section.content && (
            <div className={cx("row")}>
              <div className={cx("col", s["paragraph"])}>
                <p className={cx("mb-0")}>
                  <DraftjsDecoder contentState={section.content.defaultMessage} />
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default withStyles(s)(SectionDescription);
