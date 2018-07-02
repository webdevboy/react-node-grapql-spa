import React from "react";
import { FormattedDate } from "react-intl";
import cx from "classnames";
import s from "./AirportDescription.scss";
import PropTypes from "prop-types";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import Heading from "../../../../Layout/Heading";
import Text from "../../../../Primitives/Text";
import Input from "../../../../Primitives/Input";
import SectionTitle from "../../../../Layout/SectionTitle";
import DraftjsDecoder from "utils/DraftjsDecoder";
import { paragraph } from "mock";
import { changeLocation } from "../../../../../actions/requestFlight";
import { connect } from "react-redux";

class AirportDescription extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  addToRequestFlight = (e, direction) => {
    e.preventDefault();

    this.props.changeLocation({
      index: this.props.index,
      value: this.props.airport,
      direction: direction !== "from" ? "to" : "from",
    });
  };

  render() {
    const { airport, cityName, name, countryCode, iata, icao, description, title, locale } = this.props;

    let jsonBody;
    const body = description.main;
    if (typeof body === "string") {
      jsonBody = body;
    } else {
      jsonBody = JSON.stringify(body);
    }

    var fromCityName = cityName;

    if (airport && airport.city && airport.city["name_" + locale]) {
      fromCityName = airport.city["name_" + locale];
    }

    return (
      <div className={cx(s["wrapper"])}>
        <div className={cx("container")}>
          <div className={cx("row")}>
            <div className={cx("col-md-7", s["column"], s["presentation"])}>
              <div className="row">
                <div className="col">
                  <SectionTitle textId = "client.airportDetails.airportDescription.sectionTitle" defaultMessage="AIRPORT DETAILS" noHeader />
                </div>
              </div>

              <div className="row">
                <div className="col">
                  {/* <Heading text={`${name} airport`} /> */}
                  <Heading text={title} hx={true}/>
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <div className={s["country-box"]}>
                    <div className={cx("famfamfam-flags", countryCode)} />
                    <span className="conduit white">
                      {`${fromCityName}, ${countryCode.toUpperCase()} - ${iata}, ${icao}`}
                    </span>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <p className={cx("section-sub-heading-paragraph white", s.white)}>
                    <DraftjsDecoder contentState={jsonBody} />
                  </p>
                </div>
              </div>
            </div>

            <div className={cx("col-md-5", s["column"], s["actions"])}>
              <div className={cx(s["actions-wrapper"])}>
                <div className="row">
                  <div className={cx("col", s["box"])}>
                    <Text
                      className={cx("conduit bold white section-sub-heading")}
                      id="client.airportDetails.airportDescription.wantToFlyFromTo"
                      defaultMessage="WANT TO FLY TO OR FROM "
                    />
                    <span className={cx("conduit bold white section-sub-heading")}>
                      {fromCityName ? fromCityName.toUpperCase() : "LISBON"}?
                    </span>
                  </div>
                </div>
                <div className="row">
                  <div className={cx("col")}>
                    <div>
                      <form name="book_to_form">
                        <div className={cx("btn btn-outline lt-blue mx-auto", s['submit-button'])}>
                          <Input
                            type="submit"
                            placeholder={'BOOK A FLIGHT TO'}                            
                            placeholderId="client.airportDetails.airportDescription.bookAFlightTo"
                            style={{background: "transparent", border: "none", color: "white", outline: "none", cursor: "inherit"}}
                            pencilStyle={{ position: "relative", padding: "5px", color: "white" }}
                            onClick={e => this.addToRequestFlight(e, "to")}
                          />
                        </div>
                      </form>
                    </div>
                    <div>
                      <Text
                        className="conduit white"
                        defaultMessage="OR"
                        id="client.airportDetails.airportDescriptionor"
                      />
                    </div>
                    <div>
                      <form name="book_from_form">
                        <div className={cx("btn btn-outline lt-blue mx-auto", s['submit-button'])}>
                          <Input
                              type="submit"
                              placeholder="BOOK A FLIGHT FROM"                              
                              placeholderId="client.airportDetails.airportDescription.bookAFlightFrom"                              
                              style={{background: "transparent", border: "none", color: "white", outline: "none", cursor: "inherit"}}
                              pencilStyle={{ position: "relative", padding: "5px", color: "white" }}
                              onClick={e => this.addToRequestFlight(e, "from")}
                            />
                        </div>                        
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AirportDescription.propTypes = {
  name: PropTypes.string,
  cityName: PropTypes.string,
  countryCode: PropTypes.string,
  iata: PropTypes.string,
  icao: PropTypes.string,
  description: PropTypes.object,
};

AirportDescription.defaultProps = {
  name: "Lisbon Portela",
  cityName: "Lisbon",
  countryCode: "PT",
  iata: "LIS",
  icao: "LPPT",
  description: {},
};

const mapStateToProps = state => {

  const currentLocale = state.intl.locale;
  const availableLocales = state.runtime.availableLocales;
  let language_id = false;

  for (var key in availableLocales) {
    if (availableLocales.hasOwnProperty(key)) {
      if (availableLocales[key].locale === currentLocale) {
        language_id = availableLocales[key].id;
      }
    }
  }

  return {
    locale: currentLocale,
    index: state.requestFlight.legs.length - 1,
  }

}

export default connect(mapStateToProps, { changeLocation })(withStyles(s)(AirportDescription));
