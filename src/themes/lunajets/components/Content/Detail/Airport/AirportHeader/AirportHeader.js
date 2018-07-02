import React, { Component } from 'react';
import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from './AirportHeader.css';
import MapBannerDisplay from "../../../Map/MapBannerDisplay";

export class AirportHeader extends Component {
  render() {
    const { airport, airports, alt } = this.props;
    let listAirport = [];
    if (this.props.airport) {
      listAirport.push({
        coordinates: this.props.airport.coordinates,
        name: this.props.airport.name,
      });
    }
    if (airports) {
      listAirport = airports.map(airport => ({
        coordinates: airport.coordinates,
        name: airport.name,
      }));
    }

    return (
      <div className={s["airport-map"]}>
        <MapBannerDisplay isFetching = {false} data={listAirport} />
      </div>
    );
  }
}

export default withStyles(s)(AirportHeader);
