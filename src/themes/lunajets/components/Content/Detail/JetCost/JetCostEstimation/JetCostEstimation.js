import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from "classnames";
import RequestFlight from "themes/lunajets/components/Forms/RequestFlight";
import SectionTitle from "themes/lunajets/components/Layout/SectionTitle";
import Button from "themes/lunajets/components/Primitives/Button";
import Text from "themes/lunajets/components/Primitives/Text";
import JetCostEstimationRow from "../JetCostEstimationRow/JetCostEstimationRow";
import { goToStep, changeLocation, updateContact } from "themes/lunajets/actions/requestFlight"


import s from "./JetCostEstimation.scss";

class JetCostEstimation extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  requestFlight = (estimation) => {
    let { city, goToStep, changeLocation, index} = this.props;

    if (estimation) {
      const fromCityName = estimation.from_airport.city ? estimation.from_airport.city.name : "";
      const fromCountryName = estimation.from_airport.city && estimation.from_airport.city.country ? estimation.from_airport.city.country.name : "";
      const fromCountryCode = estimation.from_airport.city && estimation.from_airport.city.country ? estimation.from_airport.city.country.countryCode : "";
      const toCityName = estimation.to_airport.city ? estimation.to_airport.city.name : "";
      const toCountryName = estimation.to_airport.city && estimation.to_airport.city.country ? estimation.to_airport.city.country.name : "";
      const toCountryCode = estimation.to_airport.city && estimation.to_airport.city.country ? estimation.to_airport.city.country.countryCode : "";
    
      const flyFromValue= {
        __typename: "LocationType",
        label: fromCityName + ", " + fromCountryName,
        value: fromCityName + ", " + fromCountryName,
        countryCode: fromCountryCode,
        geometry: {
          location:{
            lat : estimation.from_airport.coordinates.split(',')[0],
            lng : estimation.from_airport.coordinates.split(',')[0],
          }
        }
      };

      const flyToValue= {
        __typename: "LocationType",
        label: toCityName + ", " + toCountryName,
        value: toCityName + ", " + toCountryName,
        countryCode: toCountryCode,
        geometry: {
          location:{
            lat : estimation.to_airport.coordinates.split(',')[0],
            lng : estimation.to_airport.coordinates.split(',')[0],
          }
        }
      };
      changeLocation({
        direction: "from",
        value: flyFromValue,
        index,
      });
      changeLocation({
        direction: "to",
        value: flyToValue,
        index,
      });
    } else if (city){
      const cityName = city ? city.name : "";
      const countryName = (city && city.country) ? city.country.name : "";
    
      const flyToValue= {
        __typename: "LocationType",
        label: cityName + ", " + countryName,
        value: cityName + ", " + countryName,
        countryCode: city.country ? city.country.countryCode : "",
        geometry: {
          location:{
            lat : city.coordinates.split(',')[0],
            lng : city.coordinates.split(',')[0],
          }
        }
      };
      changeLocation({
        direction: "to",
        value: flyToValue,
        index,
      });
    }
    goToStep({step:1});
  }

  render() {
    const {
      data, showEnquire, showLength, city, locale
    } = this.props;
console.log("es-data:", data);

    let seoJson = "";
    if (data) {
      seoJson += "[";
      data.map((leg, index) => {
        seoJson += "{";
        seoJson += '  "@context": "http://schema.org",';
        seoJson += '  "@type": "FlightReservation",';
        seoJson += '  "reservationId": "' + leg.id + '",';
        seoJson += '  "reservationStatus": "http://schema.org/Confirmed",';
        seoJson += '  "underName": {"@type": "Person", "name": "Eva Green"},';
        seoJson += '  "reservationFor": {';
        seoJson += '      "@type": "Flight",';
        seoJson += '      "flightNumber": "' + leg.id + '",';
        seoJson += '      "airline": { "@type": "Airline", "name": "United", "iataCode": "UA"},';
        seoJson +=
          '      "departureAirport": { "@type": "Airport", "name": "' +
          leg.from_airport.name +
          '", "iataCode": "' +
          leg.from_airport.iata +
          '" },';
        seoJson += '      "departureTime": "' + leg.from_date + '",';
        seoJson +=
          '      "arrivalAirport": { "@type": "Airport", "name": "' +
          leg.to_airport.name +
          '", "iataCode": "' +
          leg.to_airport.iata +
          '" },';
        seoJson += "  }";
        seoJson += "}";

        if (index + 1 < data.length) {
          seoJson += ",";
        }
      });
      seoJson += "]";
    }
    return (
      <div className={cx("container lj-pad-y-50", s.container)}>
        <script type="application/ld+json">{seoJson}</script>
        <div className="row">
          <div className="col-12">
            <h2>
              <Text
                className={cx("text-secondary uppercase", s["section-title1"])}
                id="client.jet-cost-estimation.price-estimation-header"
                defaultMessage="Price Estimations"
              />
            </h2>
          </div>

          <div className={cx("row my-5", s["estimation-table"])}>
            <table className="col">
              <th className={cx("row", s["table-header"])}>
                <tr className={cx(s["origin"])}><Text defaultMessage={"FROM"} id={`jet-cost-estimation-text-from`} /></tr>
                <tr className={cx(s["aircraft"])}></tr>
                <tr className={cx(s["destination"])}><Text defaultMessage={"TO"} id={`jet-cost-estimation-text-to`} /></tr>
                <tr className={cx(s["flight-time"])}><Text defaultMessage={"FLIGHT TIME"} id={`jet-cost-estimation-text-flight-time`} /></tr>
                <tr className={cx(s["aircraft-wrap"])}><Text defaultMessage={"AIRCRAFT"} id={`jet-cost-estimation-text-aircraft`} /></tr>
                <tr className={cx(s["leg-price"], s["desktop-only"])}><Text defaultMessage={"ESTIMATED PRICE"} id={`jet-cost-estimation-text-estimated-price`} /></tr>
                <tr className={cx("d-md-none", s["leg-price"])}><Text defaultMessage={"PRICE"} id={`jet-cost-estimation-text-price`} /></tr>
              </th>
              {data.map((estimation, index) => {
                return showLength === -1 ?
                  <JetCostEstimationRow key={estimation.id} version={3} leg={estimation} locale={locale} showEnquire={showEnquire} onEnquire={(est) => this.requestFlight(est)} />
                  : 
                  index < showLength ? 
                    <JetCostEstimationRow key={estimation.id} version={3} leg={estimation} locale={locale} showEnquire={showEnquire}  onEnquire={(est) => this.requestFlight(est)} />
                    :
                    null;
              })}
            </table>
          </div>
        </div>

        <div className="row">
          <div className="col d-flex justify-content-center">
            <Button
              className="btn-outline-primary w-100"
              defaultMessage="ask us for a quote"
              textId="client.jetCostDestination.askUsForAQuote"
              id="quote_request"
              onClick={() => this.requestFlight()}
            />
          </div>
        </div>
      </div>
    )
  }
}

JetCostEstimation.propTypes = {
  data: PropTypes.array,
  showEnquire: PropTypes.bool,
  showLength: PropTypes.number
}

JetCostEstimation.defaultProps = {
  data: [],
  showEnquire: false,
  showLength: -1
}

const mapStateToProps = state => ({
  index: state.requestFlight.legs.length - 1,
});

export default connect(mapStateToProps, {goToStep, changeLocation, updateContact})(withStyles(s)(JetCostEstimation));

