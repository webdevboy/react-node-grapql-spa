import React from "react";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import cx from "classnames";
import { connect } from "react-redux";
import s from "./Aircraft.scss";
import * as _ from "lodash";
import FixedRatioContainer from "../../../Primitives/FixedRatioContainer";
import FixedRatioImage from "../../../Primitives/FixedRatioImage";
import Link from "../../../Primitives/Link";
import getUrlFromPost from "utils/getUrlFromPost";

class AircraftModel extends React.Component {
  render() {
    const { aircraft, changeOption, comparedAircrafts, locale } = this.props;

    const aircraftAlt = aircraft.title;
    if (aircraft.meta && aircraft.meta.details) {
      const aircraftAlt =
        aircraft.title +
        "-" +
        aircraft.meta.details.seats +
        "-" +
        aircraft.meta.details.speed +
        "-" +
        aircraft.meta.details.range;
    }

    return (
      <FixedRatioContainer className="border border-primary" ratio={1}>
        <Link to={`${getUrlFromPost(locale, aircraft)}`}>
          {aircraft.media ? <FixedRatioImage image={aircraft.media} alt={aircraftAlt} title={aircraftAlt} ratio={0.6} /> : null}
        </Link>
        <div className="row justify-content-between align-items-center pl-3 pr-4">
          <a
            className={cx("border-bottom border-secondary  text-primary font-weight-bold mx-2 py-2")}
            style={{ width: "100%" }}
          >
            {aircraft.title}
          </a>
        </div>

        <table className={cx("mx-2 my-2 my-sm-3", s.details)}>
          <tbody>
            <tr>
              <td>Seats:</td>
              <td>{aircraft.details && aircraft.details.normal_passenger_seats__c}</td>
            </tr>
            <tr>
              <td>Speed:</td>
              <td>{aircraft.details && aircraft.details.w_speed__c} kts</td>
            </tr>
            <tr>
              <td>Range:</td>
              <td>{aircraft.details && aircraft.details.w_range_nm__c} nm</td>
            </tr>
          </tbody>
        </table>
      </FixedRatioContainer>
    );
  }
}

const mapStateToProps = state => ({
  locale: state.intl.locale,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(AircraftModel));
