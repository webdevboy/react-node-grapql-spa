import React, { Component } from "react";
import cx from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import normalizeCss from "normalize.css";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import loaders from "loaders.css/loaders.css";
import reactSelect from "react-select/dist/react-select.css";
import datepicker from "react-datepicker/dist/react-datepicker.css";
import bootstrap from "!isomorphic-style-loader!css-loader!sass-loader!styles/custom.scss";
import famfamfam from "famfamfam-flags/dist/sprite/famfamfam-flags.css";
import s from "./theme.css";
import ErrorBoundary from "utils/ErrorBoundary";

class Theme extends Component {
  static contextTypes = {
    intl: PropTypes.object,
    isMobile: PropTypes.bool,
  };

  static propTypes = {
    children: PropTypes.element.isRequired,
  };

  static childContextTypes = {
    query: PropTypes.object,
    params: PropTypes.object,
    intl: PropTypes.object,
    editor: PropTypes.any,
    hreflangs: PropTypes.any,
    hostname: PropTypes.any,
    isMobile: PropTypes.bool,
  };

  getChildContext() {
    return {
      ...this.props.context,
      editor: this.props.editor,
    };
  }

  render() {
    const { children, editor, footer } = this.props;

    return (
      <ErrorBoundary>
        <div className={cx("theme-lunajets", s.root)}>
          <div className={s.content}>{children}</div>
        </div>
      </ErrorBoundary>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(
  withStyles(normalizeCss, bootstrap, famfamfam, reactSelect, datepicker, loaders, s)(Theme),
);
