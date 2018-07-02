import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import s from "./JetCostEstimationRow.scss";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import { FormattedDate } from "react-intl";

import MdAirplanemodeActive from "react-icons/lib/md/airplanemode-active";
import MdAirlineSeatReclineExtra from "react-icons/lib/md/airline-seat-recline-extra";
import MdTimer from "react-icons/lib/md/timer";
import FaPlane from "react-icons/lib/fa/plane";

import FormattedCurrency from "../../../../i18n/FormattedCurrency";
import Text from "../../../../Primitives/Text";
import Link from "../../../../Primitives/Link";

import Challenger_300_Svg from "./PJCC/Challenger_300.svg";
import Challenger_604_Svg from "./PJCC/Challenger_604.svg";
import Citation_CJ2_Svg from "./PJCC/Citation_CJ2+.svg";
import Citation_Mustang_Svg from "./PJCC/Citation_Mustang.svg";
import Citation_X_Svg from "./PJCC/Citation_X.svg";
import Citation_XLS_Svg from "./PJCC/Citation_XLS.svg";
import Falcon_2000LXS_Svg from "./PJCC/Falcon_2000LXS.svg";
import Falcon7x_Svg from "./PJCC/Falcon7x.svg";
import Global_Express_Svg from "./PJCC/Global_Express.svg";
import Learjet_75_Svg from "./PJCC/Learjet_75.svg";
import Legacy_600_Svg from "./PJCC/Learjet_75.svg";
import Phenom_100_Svg from "./PJCC/Phenom_100.svg";

const svgs = {
  Challenger_300: Challenger_300_Svg,
  Challenger_604: Challenger_604_Svg,
  'Citation_CJ2+': Citation_CJ2_Svg,
  Citation_Mustang: Citation_Mustang_Svg,
  Citation_X: Citation_X_Svg,
  Citation_XLS: Citation_XLS_Svg,
  Falcon_2000: Falcon_2000LXS_Svg,
  Falcon7x: Falcon7x_Svg,
  Global_Express: Global_Express_Svg,
  LearJet_75: Learjet_75_Svg,
  Legacy_600: Legacy_600_Svg,
  Phenom_100: Phenom_100_Svg
}




class JetCostEstimationRow extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  render() {
    const { editorID, leg, showEnquire, locale, onEnquire } = this.props;
    
    return (
      <tbody className={cx(s["line"], s["leg-v-3"])}>
        <a href="#">
          <tr className={cx("row", s["body-row"])}>
            {/* origin */}
            <td className={cx(s["origin"], s["country"], "col align-self-center")}>
              <span className={cx(s["airport-iata"])}>
                <span className="iata mono">{locale ? leg.from_airport.city[`name_${locale}`] : leg.from_airport.city.name}</span>
              </span>
              <span className={cx(s["country-info"])}>
                <span className={cx("famfamfam-flags", leg.from_airport.city.country.countryCode)} />
                <span className={s["country-code"]}>{leg.from_airport.city.country.countryCode}</span>
              </span>
            </td>
      
            {/* airplane arrow */}
            <td className={cx(s["airplane-arrow"], "d-none d-sm-block col align-self-center p-0")}>
              <MdAirplanemodeActive size={28} color="#b6cbda" style={{ transform: "rotate(90deg)" }} />
            </td>
      
            <td className={cx(s["airplane-arrow"], "d-block d-sm-none col align-self-center p-0")}>
              <MdAirplanemodeActive size={20} color="#b6cbda" style={{ transform: "rotate(90deg)" }} />
            </td>
      
            {/* destination */}
            <td className={cx(s["destination"], s["country"], "col align-self-center")}>
              <span className={cx(s["airport-iata"])}>
                <span className="iata mono">{locale ? leg.to_airport.city[`name_${locale}`] : leg.to_airport.city.name}</span>
              </span>
              <span className={cx(s["country-info"])}>
                <i className={cx("famfamfam-flags", leg.to_airport.city.country.countryCode)} />
                  <span className={s["country-code"]}>{leg.to_airport.city.country.countryCode}</span>
                </span>
            </td>
      
            {/* flight time */}
            <td className={cx(s["flight-time"], "col align-self-center")}>
              <span className={s["time"]}>
              {leg.duration.hour}<Text id="client.empty-leg-row.hour" defaultMessage="h" /> {leg.duration.minute}<Text id="client.empty-leg-row.minute" defaultMessage="min" /></span>
            </td>
      
            {/* aircraft */}
            <td className={cx("d-none d-md-block col-auto align-self-center", s["aircraft-wrap"])}>
              <img className={s["aircraft-illustration"]} src={svgs[leg.aircraft_type.replace(' ', '_')]} alt={leg.aircraft_type} title={leg.aircraft_type} />
              <span className={cx(s["aircraft"])}>{leg.aircraft_type}</span>
            </td>
      
            {/* leg price */}
            <td className={cx(s["leg-price"], "col align-self-center")}>
              <span className={s["empty-legs-price-tag"]}>
                <Text id="client.empty-leg-row.from" defaultMessage="From" className="d-none d-md-inline mr-3" />
                <Text id={`jetCost.${leg.from}_${leg.to}`} defaultMessage={`€${leg.price}`} />
              </span>
            </td>
      
            {showEnquire && (
              <td className={cx("d-none d-md-block col align-self-center", s['btn-enquire'])}>
                <span onClick={() => onEnquire(leg)}>
                <Text className={"btn btn-outline-danger"} defaultMessage="ENQUIRE" id="client.button.enquire" />
                </span>
              </td>
            )}
          </tr>
      
          {/* [mobile only] from-to date */}
          <tr className={cx(s["aircraft-mobile-wrap"], "align-self-center d-block d-md-none clearfix")}>
            <td className={cx(s["prefix"], "prefix")}>
              <Text defaultMessage="Aircraft: " id="client.emptyLeg.detail.aircraft" />
              <span className={s["aircraft"]}>{leg.aircraft_type}</span>
            </td>
          </tr>
        </a>
      </tbody>
    );
  }
}

JetCostEstimationRow.propTypes = {
  showEnquire: PropTypes.bool,
  editorID: PropTypes.string,
  leg: PropTypes.object,
};

JetCostEstimationRow.defaultProps = {
  showEnquire: false,
  editorID: "",
  leg: {},
};

export default withStyles(s)(JetCostEstimationRow);