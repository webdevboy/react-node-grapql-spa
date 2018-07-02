import React from "react";
import cx from "classnames";
import s from "./EventRecommended.css";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import Text from "../../../../Primitives/Text";
import MapRecommendedAirports from "../../../Map/MapRecommendedAirports";
import _ from "lodash";
import ArrowRight from "react-feather/dist/icons/arrow-right";
import getSFAirports from "./getSFAirports.graphql";

class EventRecommended extends React.Component {
  static contextTypes = {
    fetch: true,
    client: true,
  };

  constructor(props) {
    super(props);
    this.state = {
      isFetching: true,
    };
    this.fetchSFAirports = this.fetchSFAirports.bind(this);
  }

  componentDidMount() {
    this.fetchSFAirports();
  }

  fetchSFAirports = async () => {
    const {
      data: { event },
    } = this.props;
    if (event.meta.recommended_airports) {
      var list_sfid = [];
      var list_post_ids = [];
      let newAirports = [];

      event.meta.recommended_airports.map(airport => {
        airport.airport_coordinates && 
        newAirports.push({
          "coordinates": airport.airport_coordinates,
          "name":airport.airport_name,
          "url":airport.airport_url
        });
      });
      const newState = this.state;
      newState.data = newAirports;
      newState.isFetching = false;
      this.setState(newState);
    }
  };

  searchAirports = list_sfid => {
    const { client } = this.context;
    if (list_sfid) {
      return new Promise((resolve, reject) => {
        client
          .query({
            query: getSFAirports,
            variables: {
              list_sfid: list_sfid,
            },
          })
          .then(({ data }) => {
            resolve(data.sfAirports);
          });
      });
    }
  };

  render() {
    if (!this.state.data) {
      return null;
    }

    return (
      <div className={s["event-recommended"]}>
        <MapRecommendedAirports
          isFetching={this.state.isFetching}
          data={this.state.data}
          defaultTitle={"Recommended Airports"}
          titleId={"event.recommended.airports"}
        />
      </div>
    );
  }
}

export default withStyles(s)(EventRecommended);
