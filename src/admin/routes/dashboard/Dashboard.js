import React from "react";
import PropTypes from "prop-types";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from "./Dashboard.css";
import QuickBanner from "../../components/Widgets/QuickNotificationBanner";
import Breadcrumbs from "../../components/Breadcrumbs";

class Dashboard extends React.Component {
  static propTypes = {
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { currentRoute } = this.props;
    return (
      <div className="wrapper">

        <div className="actions">
          <Breadcrumbs route={currentRoute} />
        </div>

        <div className="body">
          <div className={s.widgets}>
            <QuickBanner />
          </div>
        </div>

      </div>
    );
  }
}

export default withStyles(s)(Dashboard);
