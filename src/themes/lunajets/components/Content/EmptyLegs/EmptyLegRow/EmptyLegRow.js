import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import s from "./EmptyLegRow.css";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import { FormattedDate } from "react-intl";

import MdAirplanemodeActive from "react-icons/lib/md/airplanemode-active";
import MdAirlineSeatReclineExtra from "react-icons/lib/md/airline-seat-recline-extra";
import MdTimer from "react-icons/lib/md/timer";
import FaPlane from "react-icons/lib/fa/plane";

import FormattedCurrency from "../../../i18n/FormattedCurrency";
import Text from "../../../Primitives/Text";
import Link from "../../../Primitives/Link";


const V1 = ({ editorID, leg, locale }) => (
  <div className={s["detail"]}>
    <div className={s["sub"]}>
      <ol className={s["leg-list"]}>
        <li className={s["country-box"]}>
          <div>
            <span className="iata mono white">{leg.from_airport.iata}</span>
          </div>
          <div className={cx(s["country-detail"])}>
            <div className={cx("famfamfam-flags", leg.from_airport.city.country.countryCode)} />
            <span className="mono">
              {locale ? leg.from_airport.city[`name_${locale}`] : leg.from_airport.city.name}, {leg.from_airport.city.country.name}
            </span>
          </div>
        </li>
        <li>
          <MdAirplanemodeActive className={s["icn"]} size={32} color="#B6CADA" style={{ transform: "rotate(90deg)" }} />
        </li>
        <li className={s["country-box"]}>
          <div>
            <span className="iata mono white">{leg.to_airport.iata}</span>
          </div>
          <div className={cx(s["country-detail"])}>
            <div className={cx("famfamfam-flags", leg.to_airport.city.country.countryCode)} />
            <span className="mono">
              {locale ? leg.to_airport.city[`name_${locale}`] : leg.to_airport.city.name}, {leg.to_airport.city.country.name}
            </span>
          </div>
        </li>
        <li className="hidden-sm-down">
          <span className={cx(s["empty-legs-price-tag"], "white")}>
            <FormattedCurrency value={11030}  />
          </span>
        </li>
        <li className="hidden-sm-down">
          <button className="btn lt-red ">
            <Text defaultMessage="request this flight" id="client.button.requestThisFlight" />
          </button>
        </li>
      </ol>
    </div>
    <div className={cx(s["sub"], s["leg-info"])}>
      <ol className={s["leg-list"]}>
        <li className={s["info"]}>
          <div className={cx(s["date-box"], s["date"])}>
            <span className={cx("prefix", s["prefix"])}>
              <Text defaultMessage="from" id="client.emptyLeg.detail.from" />
            </span>
            <span className={cx("empty-leg-date")}>
              <FormattedDate value={leg.from_date} weekday="short" day="numeric" month="short" year="numeric" />
            </span>
          </div>
          <div className={cx(s["date-box"], s["date"])}>
            <span className={cx("prefix", s["prefix"])}>
              <Text defaultMessage="until" id="client.emptyLeg.detail.until" />
            </span>
            <span className={cx("empty-leg-date")}>
              <FormattedDate value={leg.until_date} weekday="short" day="numeric" month="short" year="numeric" />
            </span>
          </div>
        </li>
        <li className={s["info"]}>
          <div>
            <FaPlane className={s["icn"]} size={28} color="#B6CADA" />
            <span className="conduit">DASSAULT FALCON 8X</span>
          </div>
          <div>
            <MdTimer className={s["icn"]} size={28} color="#B6CADA" />
            <span className="conduit">2h55 min</span>
          </div>
          <div>
            <MdAirlineSeatReclineExtra className={s["icn"]} size={28} color="#B6CADA" />
            <span className="conduit">{leg.details.available_seats}</span>
          </div>
        </li>
      </ol>
    </div>
    <div className={cx("hidden-md-up", s["empty-legs-price-tag"])}>
      <span className="dk-blue">
        <FormattedCurrency value={11030} className="white" />
      </span>
    </div>
    <div className={cx("hidden-md-up")}>
      <button className="btn lt-red ">
        <Text defaultMessage="request this flight" id="client.button.requestThisFlight" />
      </button>
    </div>
  </div>
);

const V2 = ({ editorID, leg, locale }) => (
  // empty leg item
  <tbody className={cx(s["line"], s["leg-v-2"])}>
    <tr className={cx("row", s["body-row"])}>
      {/* origin */}
      <td className={cx(s["origin"], s["country"], "col align-self-center")}>
        <span className={cx(s["airport-iata"])}>
          <span className="iata mono">{leg.from_airport.iata}</span>
        </span>
        <span className={cx(s["country-info"])}>
          <span className={cx("famfamfam-flags", leg.from_airport.city.country.countryCode)} />
          <span className="d-inline">
            <span className={s["city-name"]}>{locale ? leg.from_airport.city[`name_${locale}`] : leg.from_airport.city.name}, </span>
            <span className={s["country-code"]}>{leg.from_airport.city.country.countryCode}</span>
          </span>
        </span>
      </td>

      {/* airplane arrow */}
      <td className={cx(s["airplane-arrow"], "col align-self-center")}>
        <MdAirplanemodeActive size={28} color="#263D50" style={{ transform: "rotate(90deg)" }} />
      </td>

      {/* destination */}
      <td className={cx(s["destination"], s["country"], "col align-self-center")}>
        <span className={cx(s["airport-iata"])}>
          <span className="iata mono">{leg.to_airport.iata}</span>
        </span>
        <span className={cx(s["country-info"])}>
          <span className={cx("famfamfam-flags", leg.to_airport.city.country.countryCode)} />
          <span className="d-inline">
            <span className={s["city-name"]}>{locale ? leg.to_airport.city[`name_${locale}`] : leg.to_airport.city.name}, </span>
            <span className={s["country-code"]}>{leg.to_airport.city.country.countryCode}</span>
          </span>
        </span>
      </td>

      {/* from date */}
      <td className={cx("d-none d-md-block", s["from-date"], "col align-self-center")}>
        <span className={cx("prefix", s["prefix"])}>
          <Text defaultMessage="from" id="client.emptyLeg.detail.from" />
        </span>
        <span className={cx(s["date"])}>
          <FormattedDate value={leg.from_date} weekday="short" day="numeric" month="short" year="numeric" />
        </span>
      </td>

      {/* until date */}
      <td className={cx("d-none d-md-block", s["until-date"], "col align-self-center")}>
        <span className={cx("prefix", s["prefix"])}>
          <Text defaultMessage="until" id="client.emptyLeg.detail.until" />
        </span>
        <span className={cx(s["date"])}>
          <FormattedDate value={leg.until_date} weekday="short" day="numeric" month="short" year="numeric" />
        </span>
      </td>

      {/* number seats */}
      <td className={cx(s["seat-available"], "d-none d-md-block col align-self-center")}>
        <MdAirlineSeatReclineExtra size={28} color="#B6CADA" />
        <span className={s["number-seats"]}>{leg.details ? leg.details.available_seats : "Undefined"}</span>
      </td>

      {/* leg price */}
      <td className={cx(s["leg-price"], "col align-self-center")}>
        <span className={s["empty-legs-price-tag"]}>
          <FormattedCurrency value={leg.price} currency={leg.currency ? leg.currency.currency : ''} />
        </span>
      </td>
    </tr>

    {/* [mobile only] from-to date */}
    <tr className={cx(s["date-mobile-wrap"], "align-self-center d-block d-md-none clearfix")}>
      <td className={s["from-date-mobile"]}>
        <span className={cx(s["prefix"], "prefix")}>
          <Text defaultMessage="from" id="client.emptyLeg.detail.from" />
        </span>
        <span className={s["date"]}>
          <FormattedDate value={leg.from_date} weekday="short" day="numeric" month="short" year="numeric" />
        </span>
      </td>
      <td className={s["until-date-mobile"]}>
        <span className={cx(s["prefix"], "prefix")}>
          <Text defaultMessage="until" id="client.emptyLeg.detail.until" />
        </span>
        <span className={s["date"]}>
          <FormattedDate value={leg.until_date} weekday="short" day="numeric" month="short" year="numeric" />
        </span>
      </td>
    </tr>
  </tbody>
);

const V3 = ({ editorID, leg, showEnquire, locale, onEnquire }) => (
  <tbody className={cx(s["line"], s["leg-v-3"])}>
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
        <img className={s["aircraft-illustration"]} src={svgs[leg.aircraft_type.replace(' ', '_')]} alt="aircraft" />
        <span className={cx(s["aircraft"])}>{leg.aircraft_type}</span>
      </td>

      {/* leg price */}
      <td className={cx(s["leg-price"], "col align-self-center")}>
        <span className={s["empty-legs-price-tag"]}>
          <Text id="client.empty-leg-row.from" defaultMessage="From" className="d-none d-md-inline mr-3" />
          <FormattedCurrency value={leg.price} />
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
  </tbody>

  // <li className={cx(s["detail"], s["leg-v-3"])}>
  //   <ol className={s["leg-list"]}>
  //     <li className={s["country-box"]}>
  //       <div>
  //         <span className={"iata mono"}>{leg.from_airport.iata}</span>
  //       </div>
  //       <div className={cx(s["country-detail"])}>
  //         <div className={cx("famfamfam-flags", leg.from_airport.city.country.countryCode)} />
  //         <span className={"conduit"}>
  //           {leg.from_airport.city.name}, {leg.from_airport.city.country.name}
  //         </span>
  //       </div>
  //     </li>
  //     <li>
  //       <MdAirplanemodeActive size={32} color="#263D50" style={{ transform: "rotate(90deg)" }} />
  //     </li>
  //     <li className={s["country-box"]}>
  //       <div>
  //         <span className={"iata mono"}>{leg.to_airport.iata}</span>
  //       </div>
  //       <div className={cx(s["country-detail"])}>
  //         <div className={cx("famfamfam-flags", leg.to_airport.city.country.countryCode)} />
  //         <span className={"conduit"}>
  //           {leg.to_airport.city.name}, {leg.to_airport.city.country.name}
  //         </span>
  //       </div>
  //     </li>
  //     <li className={cx("hidden-sm-down", s["country-box"])}>
  //       <div>
  //         <span>2h55min</span>
  //       </div>
  //     </li>
  //     <li className={cx("hidden-sm-down")}>
  //       <img src="https://upgrade-it-lab.s3-eu-west-1.amazonaws.com/public/702a312b9fba995450e3a81e1881a15e1508759941198.png" />
  //       <span className={cx("conduit", "dk-blue")}>Gulfstream G550</span>
  //     </li>
  //     <li>
  //       <span className={s["empty-legs-price-tag"]}>
  //         <FormattedCurrency value={leg.price} />
  //       </span>
  //     </li>
  //   </ol>

  //   {/* available date - currently hidden */}
  //   <div className={cx("d-none", s["timing-box"])}>
  //     <div>
  //       <span className={cx(s["prefix"], "conduit")}>
  //         <Text defaultMessage="from" id="client.emptyLeg.detail.from"/>
  //       </span>
  //       <span className={cx("empty-leg-date")}>
  //         <FormattedDate value={leg.availability} weekday="short" day="numeric" month="short" year="numeric" />
  //       </span>
  //     </div>
  //     <div>
  //       <span className={cx(s["prefix"], "conduit")}>
  //         <Text defaultMessage="until" id="client.emptyLeg.detail.until"/>
  //       </span>
  //       <span className={cx("empty-leg-date")}>
  //         <FormattedDate value={leg.availability} weekday="short" day="numeric" month="short" year="numeric" />
  //       </span>
  //     </div>
  //   </div>
  // </li>
);

class EmptyLegRow extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  render() {
    const { editorID, version, emptyleg, showEnquire, onEnquire, locale } = this.props;
    // switch(version){
    //   case 1:
    //     return <V1 editorID={editorID} leg={emptyleg}/>
    //   case 2:
    //     return <V2 editorID={editorID} leg={emptyleg}/>
    //   case 3:
    //     return <V3 editorID={editorID} leg={emptyleg}/>
    //   default:
    //     return null
    // }
    switch (version) {
      case 3:
        return <V3 {...{ editorID, leg: emptyleg, showEnquire, onEnquire, locale }} />;
      default:
        return <V2 {...{ editorID, leg: emptyleg }} />;
    }
  }
}

EmptyLegRow.propTypes = {
  showEnquire: PropTypes.bool,
  editorID: PropTypes.string,
  version: PropTypes.number,
  emptyleg: PropTypes.object,
};

EmptyLegRow.defaultProps = {
  showEnquire: false,
  editorID: "",
  version: 2,
  emptyLeg: {},
};

export default withStyles(s)(EmptyLegRow);
