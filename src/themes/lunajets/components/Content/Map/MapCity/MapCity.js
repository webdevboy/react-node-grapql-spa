import React from 'react';
import cx from 'classnames';
import s from './MapCity.css';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Text from '../../../Primitives/Text';
import Map from '../../../Widgets/MapBox';
import PropTypes from "prop-types";
import _ from 'lodash';
import MapSingleDisplay from "../MapSingleDisplay";
import Loading from "react-loading-animation";
const GOOGLE_API_KEY = "AIzaSyDH7XYmx1EiTYlM7GSkqS4FsDetFjr5328";


class MapCity extends React.Component {


  static contextTypes = {
    fetch: true,
    client: true
  };

  constructor(props) {
    super(props);
    this.state={
      city: [],
      isFetching: true
    }
    this.fetchCityCoordinate = this.fetchCityCoordinate.bind(this);
  }

  componentDidMount() {
    this.fetchCityCoordinate();
  }

  fetchCityCoordinate = async () => {
    const {data: {cityName} } = this.props;
    const newState = this.state;
    const geoCode =  await this.forwardGeoCode(cityName);
    if (!geoCode) {
      options.push({
        label: "No results found",
        value: "No results found",
        disabled: true,
      });
    } else {
      const latlong = geoCode[0].geometry.location;

      if (latlong) {
        let cityCoordinates = latlong.lat + ',' + latlong.lng;
        let listAirport = [];
        listAirport.push(
          {
            coordinates:cityCoordinates,
            name:"NoName",
          }
        );

        newState.data = listAirport;
        newState.isFetching = false;
        this.setState(newState);
      }
    }
  }


  forwardGeoCode = (cityName) => {
    const location = encodeURI(cityName);
    const { fetch } = this.context;

    return new Promise((resolve, reject) => {
      fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?result_type=administrative_area_level_1&address=${location}&key=${GOOGLE_API_KEY}`,
        { timeout: 10000 }
      )
        .then(async (response) => response.json())
        .then(({ results }) => {
          if (results.length) {
            resolve(results);
          } else {
            reject(new Error("No results"));
          }
        });
    });
  };

  render() {
    return (
      <Loading isLoading={this.props.isFetching}>
        <MapSingleDisplay isFetching={this.state.isFetching} data={this.state.data}/>
      </Loading>
    );
  }
}

export default (withStyles(s)(MapCity));
