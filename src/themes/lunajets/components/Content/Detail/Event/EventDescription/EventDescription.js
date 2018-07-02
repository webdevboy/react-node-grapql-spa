import React from "react";
import { FormattedDate } from "react-intl";
import cx from "classnames";
import s from "./EventDescription.css";
import { connect } from "react-redux";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import Text from "../../../../Primitives/Text";
//import EmptyLegRow from '../../EmptyLegRow';
import _ from "lodash";
import MapSingleDisplay from "../../../Map/MapSingleDisplay";
import DraftjsDecoder from "utils/DraftjsDecoder";
import CallToActionLink from "../../../../Primitives/CallToActionLink"; 
import queryGetSFAirportCity from "./queryGetSFAirportCity.graphql";
const GOOGLE_API_KEY = "AIzaSyDH7XYmx1EiTYlM7GSkqS4FsDetFjr5328";

class EventDescription extends React.Component {
  static contextTypes = {
    fetch: true,
    client: true,
  };

  constructor(props) {
    super(props);
    this.state = {
      cityName: false,
      isFetching: true,
      airport: null,
    };

    this.fetchSFAirportCity = this.fetchSFAirportCity.bind(this);
  }

  componentDidMount() {
    this.fetchSFAirportCity();
  }

  fetchSFAirportCity = async () => {
    const {
      data: { event },
    } = this.props;
    const airportCitySfid = event.meta.city_sfid ? event.meta.city_sfid : "Paris";
    const newState = this.state;
    const sfAirportCity = await this.getSFAirportCity(airportCitySfid);
    this.setState({airport: sfAirportCity});
    if (sfAirportCity) {
      const geoCode = await this.forwardGeoCode(sfAirportCity.name);
      if (geoCode) {
        const latlong = geoCode[0].geometry.location;
        if (latlong) {
          let cityCoordinates = latlong.lat + "," + latlong.lng;
          let listAirport = [];
          listAirport.push({
            coordinates: cityCoordinates,
            name: "NoName",
          });
          newState.cityName = sfAirportCity.name;
          newState.data = listAirport;
          newState.isFetching = false;
          newState.airport = sfAirportCity;
        }
      }

      this.setState(newState);
    }
  };

  getSFAirportCity = sfid => {
    const { client } = this.context;

    return new Promise((resolve, reject) => {
      client
        .query({
          query: queryGetSFAirportCity,
          variables: {
            sfid: sfid,
          },
        })
        .then(({ data }) => {
          resolve(data.sfAirportCity);
        });
    });
  };

  forwardGeoCode = cityName => {
    const location = encodeURI(cityName);
    const { fetch } = this.context;

    return new Promise((resolve, reject) => {
      fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?result_type=administrative_area_level_1&address=${location}&key=${GOOGLE_API_KEY}`,
        { timeout: 10000 }
      )
        .then(async response => response.json())
        .then(({ results }) => {
          if (results.length) {
            resolve(results);
          } else {
            reject(new Error("No results"));
          }
        });
    });
  };

  componentDidUpdate(prevProps, prevState) {}

  render() {
    const {
      data: { event },
    } = this.props;
    const { airport } = this.state;
    const cityName = this.state.cityName ? this.state.cityName : "Paris";

    var jsonBody;
    const body = event.body.main;
    if (typeof body === "string") {
      jsonBody = body;
    } else {
      jsonBody = JSON.stringify(body);
    }

    let data = null;

    if (airport && airport.airports && airport.airports.length > 0){
      data = {
        index: this.props.index,
        value: airport.airports[0],
        direction: "to",
      }
    }
    console.log(data);
    return (
      <div className={s["event-description"]}>
        <div className={cx("container py-5")}>
          <div className="row">
            <div className="col">
              <h1 className="section-title lt-blue">{event.title}</h1>
            </div>
          </div>
        </div>
        <div className={cx("container")}>
          <div className={cx("row")}>
            {/* paragraphe */}
            <div className={cx("col-md-7")}>
              <div className={s["description-wrap"]}>
                <DraftjsDecoder contentState={jsonBody} />
              </div>
            </div>

            {/* big map */}
            <div className={cx("col-md-5")}>
              <div className={s["map-container"]}>
                <div className={s["map"]}>
                  <MapSingleDisplay isFetching={this.state.isFetching} data={this.state.data} />
                </div>
                <div className={s["map-caption"]}>
                  {/* location */}
                  <div className={cx(s["map-location"])}>
                    <span className={cx(s["caption-label"])}>
                      <Text defaultMessage="Location" id="client.map.location" />
                    </span>
                    <span className={cx(s["caption-city"], s["info"])}>{cityName}</span>
                  </div>

                  {/* date */}
                  <div className={cx(s["map-date"])}>
                    <span className={cx(s["caption-label"])}>
                      <Text defaultMessage="date" id="client.calendar.date" />
                    </span>

                    <span className={cx(s["caption-from-to"], s["info"])}>
                      <span className={cx(s["caption-from"])}>
                        <Text defaultMessage="from" id="client.calendar.from_date" />
                      </span>
                      <span className={cx(s["caption-from-date"])}>
                        <FormattedDate
                          value={event.meta.from_date}
                          weekday="short"
                          day="numeric"
                          month="short"
                          year="numeric"
                        />
                      </span>
                      <span className={cx(s["separator"])}>|</span>
                      <span className={cx(s["caption-to"])}>
                        <Text defaultMessage="to" id="client.calendar.to_date" />
                      </span>
                      <span className={cx(s["caption-to-date"])}>
                        <FormattedDate
                          value={event.meta.to_date}
                          weekday="short"
                          day="numeric"
                          month="short"
                          year="numeric"
                        />
                      </span>
                    </span>
                  </div>

                  {/* website */}
                  <div className={cx(s["map-website"])}>
                    <span className={cx(s["caption-label"])}>
                      <Text defaultMessage="website" id="client.website" />
                    </span>
                    <span className={cx(s["caption-website-url"], s["info"])}>
                      <a href={event.meta.website} target="_blank">
                        <span>{event.meta.website}</span>
                      </a>
                    </span>
                  </div>
                </div>

                {/* button book now */}
                <div className={s["map-button-book-now"]}>
                  <CallToActionLink data={data} contact={{field:"additionalNotes", value: event.title}} className={"btn lt-red"} style={{ maxWidth: "100%" }}>
                    <Text defaultMessage="Book now" id="client.callToAction.bookNow" elementId={'book_now'}/>
                  </CallToActionLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  index: state.requestFlight.legs.length - 1,
});

export default connect(mapStateToProps, {})(withStyles(s)(EventDescription));