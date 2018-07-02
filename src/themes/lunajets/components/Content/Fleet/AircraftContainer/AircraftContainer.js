import React from "react";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import cx from "classnames";

import s from "./AircraftContainer.scss";

class AircraftContainer extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <div className={cx("my-5", s.aircraftContainer)}>
        <div className={s.airportBig} />
        <div className={s.airportSmall} />
        {children}
      </div>
    );
  }
}

export default withStyles(s)(AircraftContainer);
