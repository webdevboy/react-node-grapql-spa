import React from "react";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import { FormattedDate } from "react-intl";
import { connect } from "react-redux";
import Loading from "react-loading-animation";
import FixedRatioImage from "../../../Primitives/FixedRatioImage";
import Text from "../../../Primitives/Text";
import Image from "../../../Primitives/Image";
import Map from "../../../Widgets/MapBox";
import FormattedCurrency from "../../../i18n/FormattedCurrency";
import MdAirplanemodeActive from "react-icons/lib/md/airplanemode-active";
import FaPlane from "react-icons/lib/fa/plane";
import cx from "classnames";
import s from "./EmptyLegsDetailBanner.css";
import plane from "./gfx/plane.svg";
import seat from "./gfx/seat.svg";
import time from "./gfx/time.svg";
import MapEmptyLegDisplay from "../../Map/MapEmptyLegDisplay";
import { setEmptyleg } from "themes/lunajets/actions/requestFlight"


const calcDistance = (lat1, lon1, lat2, lon2, unit) => {
  var radlat1 = Math.PI * lat1 / 180;
  var radlat2 = Math.PI * lat2 / 180;
  var theta = lon1 - lon2;
  var radtheta = Math.PI * theta / 180;
  var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  dist = Math.acos(dist);
  dist = dist * 180 / Math.PI;
  dist = dist * 60 * 1.1515;
  if (unit === 'm') {
    dist = dist * 1609.344;
  }
  if (unit === 'K') {
    dist = dist * 1.609344;
  }
  if (unit === 'N') {
    dist = dist * 0.8684;
  }
  return dist;
};

const BASE_SPEED = 900000;
const calcTime = (distance, speed = BASE_SPEED) => Math.ceil(distance / speed)

class EmptyLegsDetailBanner extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() { }

  requestFlight= (e) => {
    e.preventDefault();
    const { emptyLeg: emptyleg, setEmptyleg } = this.props;

    setEmptyleg({
      emptyleg,
    });

  }
  render() {
    const emptyLeg = this.props.emptyLeg;

    const media = (emptyLeg && emptyLeg.details && emptyLeg.details.aircraftPost_image) ? emptyLeg.details.aircraftPost_image : "https://s3-eu-west-1.amazonaws.com/upgrade-it-lab/AIRCR.png";
    const fromAirport = emptyLeg.from_airport;
    const toAirport = emptyLeg.to_airport;
    const from_Long = fromAirport.coordinates.split(",")[0];
    const from_Lat = fromAirport.coordinates.split(",")[1];
    const to_Long = toAirport.coordinates.split(",")[0];
    const to_Lat = toAirport.coordinates.split(",")[1];
    const distance = calcDistance(from_Lat, from_Long, to_Lat, to_Long, 'm');
    const flightTime = calcTime(distance);
    var legs = [
      [from_Lat, from_Long],
      [to_Lat, to_Long],
    ];

    return (
      <div className={s["emptylegs-detail-banner"]}>
        <div className={s["map-banner"]}>
          {/* Desktop banner */}
          <div className="d-none d-md-block">
            <MapEmptyLegDisplay isFetching={false} data={legs} />
          </div>
          {/* Mobile banner */}
          <div className="d-md-none">
            <MapEmptyLegDisplay isFetching={false} data={legs} />
          </div>
        </div>

        <div className={cx("container", s["flight-details-bar"])}>
          <table className={cx("w-100")}>
            <tbody className={cx(s["line"], s["leg-v-2"])}>
              <tr className={cx("row", s["table-row"])}>
                {/* origin */}
                <td className={cx(s["origin"], s["country"], "col align-self-center")}>
                  <span className={cx(s["airport-iata"])}>
                    <span className="iata mono">{fromAirport.iata}</span>
                  </span>
                  <span className={cx(s["country-info"])}>
                    <span className={cx("famfamfam-flags", fromAirport.city.country.countryCode)} />
                    <span className="d-inline">
                      <span className={s["city-name"]}>{fromAirport.city.name}, </span>
                      <span className={s["country-code"]}>{fromAirport.city.country.countryCode}</span>
                    </span>
                  </span>
                </td>

                {/* airplane arrow */}
                <td className={cx(s["airplane-arrow"], "col align-self-center")}>
                  <MdAirplanemodeActive size={28} color="#fff" style={{ transform: "rotate(90deg)" }} />
                </td>

                {/* destination */}
                <td className={cx(s["destination"], s["country"], "col align-self-center")}>
                  <span className={cx(s["airport-iata"])}>
                    <span className="iata mono">{toAirport.iata}</span>
                  </span>
                  <span className={cx(s["country-info"])}>
                    <span className={cx("famfamfam-flags", toAirport.city.country.countryCode)} />
                    <span className="d-inline">
                      <span className={s["city-name"]}>{toAirport.city.name}, </span>
                      <span className={s["country-code"]}>{toAirport.city.country.countryCode}</span>
                    </span>
                  </span>
                </td>

                {/* leg price */}
                <td className={cx(s["leg-price"], "d-none d-md-block col align-self-center")}>
                  <span className={s["empty-legs-price-tag"]}>
                    <FormattedCurrency value={emptyLeg.price} currency={emptyLeg.currency.currency} />
                  </span>
                </td>

                {/* button request flight */}
                <td className={cx("d-none d-md-block col align-self-center")}>
                  <form name="request_el_form" onSubmit={this.requestFlight}>
                    <input className={cx("btn lt-red", s["btn-request"])} type="submit" value="Request this flight" name="request_el_form" />
                  </form>
                </td>
              </tr>
            </tbody>
          </table>

          <table className={cx("w-100")}>
            <tbody className={cx(s["line-second"], s["leg-v-2"])}>
              <tr className={cx("row", s["table-row"])}>
                {/* from date */}
                <td className={cx(s["from-date"], "order-1 col-6 col-md-3 align-self-center")}>
                  <span className={cx("prefix", s["prefix"])}>
                    <Text defaultMessage="from" id="client.emptyLeg.detail.from" />
                  </span>
                  <span className={cx(s["info"])}>
                    <FormattedDate value={emptyLeg.from_date} weekday="short" day="numeric" month="short" year="numeric" />
                  </span>
                </td>

                {/* until date */}
                <td className={cx(s["until-date"], "order-2 col-6 col-md-3 align-self-center")}>
                  <span className={cx("prefix", s["prefix"])}>
                    <Text defaultMessage="until" id="client.emptyLeg.detail.until" />
                  </span>
                  <span className={cx(s["info"])}>
                    <FormattedDate
                      value={emptyLeg.until_date}
                      weekday="short"
                      day="numeric"
                      month="short"
                      year="numeric"
                    />
                  </span>
                </td>

                {/* plane */}
                <td className={cx(s["plane"], "order-3 col-6 col-md-3 align-self-center")}>
                  <span className={cx(s.icon)}>
                    <Image source={plane} />
                  </span>
                  <span className={cx(s["info"])}>{emptyLeg.aircraft.name}</span>
                </td>

                {/* empty cell [mobile] */}
                <td height="40" className={cx("order-4 col-6 d-md-none align-self-center")} />

                {/* time */}
                <td className={cx(s["time"], "order-5 col-6 col-md-2 align-self-center")}>
                  <span className={cx(s.icon)}>
                    <Image source={time} />
                  </span>
                  <span className={cx(s["info"])}>{flightTime}h</span>
                </td>

                {/* seat */}
                <td className={cx(s["seat"], "order-7 col-6 col-md-1 align-self-center")}>
                  <span className={cx(s.icon)}>
                    <Image source={seat} />
                  </span>
                  <span className={cx(s["info"])}>{emptyLeg.details.available_seats}</span>
                </td>
              </tr>
            </tbody>
          </table>

          {/* [mobile] */}
          <table className={cx("w-100 d-md-none")}>
            <tbody className={cx(s["mobile-only"])}>
              <tr className={cx("row")}>
                <td className={cx(s["leg-price"], "col align-self-center")}>
                  <span className={s["empty-legs-price-tag"]}>
                    <FormattedCurrency value={emptyLeg.price} currency={emptyLeg.currency.currency} />
                  </span>
                </td>
              </tr>
              <tr className={cx("row")}>
                <td className={cx("col align-self-center")}>
                  <form name="request_el_form" onSubmit={this.requestFlight} >
                    <input
                      className={cx("btn lt-red m-0", s["btn-request"])}
                      type="submit"
                      value="Request this flight"
                    />
                  </form>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  index: state.requestFlight.legs.length - 1,
});

export default connect(mapStateToProps, { setEmptyleg })(withStyles(s)(EmptyLegsDetailBanner));
