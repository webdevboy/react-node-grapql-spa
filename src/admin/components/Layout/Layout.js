import React from "react";
import PropTypes from "prop-types";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import cx from "classnames";
import { connect } from "react-redux";
import history from "core/history";

// styles
import normalize from "normalize.css";
import famfamfam from "famfamfam-flags/dist/sprite/famfamfam-flags.css";
import blueprint from "@blueprintjs/core/dist/blueprint.css";
import blueprintlabs from "@blueprintjs/labs/dist/blueprint-labs.css";
import datetimepicker from "@blueprintjs/datetime/dist/blueprint-datetime.css";
import uppyCss from "uppy/dist/uppy.css";
import bootstrap from "bootstrap/dist/css/bootstrap.min.css";

import loaders from "loaders.css/loaders.css";
import g from "./Global.css"; // global
import s from "./Layout.css";

// components
import NavBar from "admin/components/NavBar";

// Layout Component
class Layout extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { hideNav = false, children, currentRoute } = this.props;

    return (
      <div className={cx(s.root)}>
        {!hideNav ? <NavBar currentRoute={currentRoute} /> : null}
        <div className={cx(s.container)}>{children}</div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  // loadingBarReducer: state.loadingBarReducer,
});

export default connect(mapStateToProps, null)(
  withStyles(normalize, famfamfam, uppyCss, bootstrap, blueprint, blueprintlabs, datetimepicker, loaders, g, s)(Layout),
);
