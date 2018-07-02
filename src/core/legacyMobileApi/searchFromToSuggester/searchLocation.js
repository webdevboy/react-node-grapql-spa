import Promise from "bluebird";
import _ from "lodash";
import getNearbyAirports from "./getNearbyAirports.graphql";
import getAllAirports from "./getAllAirports.graphql";

const GOOGLE_API_KEY = "AIzaSyDH7XYmx1EiTYlM7GSkqS4FsDetFjr5328";
const LOCALE = "en";

export default class SearchLocation {
  constructor(fetch, client) {
    this.fetch = fetch;
    this.client = client;
  }

  forwardGeoCode = input => {
    const location = encodeURI(input);

    return new Promise((resolve, reject) => {
      this.fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?result_type=administrative_area_level_1&address=${location}&key=${GOOGLE_API_KEY}&language=${LOCALE}`,
        { timeout: 10000 }
      )
        .then(async response => response.json())
        .then(({ results }) => {
          if (results.length) {
            resolve(results[0]);
          } else {
            reject();
          }
        });
    });
  };

  reverseGeoCode = ({ lat, long }) => {
    return new Promise((resolve, reject) => {
      this.fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?result_type=administrative_area_level_2&latlng=${lat},${long}&key=${GOOGLE_API_KEY}&language=${LOCALE}`
      )
        .then(async response => response.json())
        .then(({ results }) => {
          if (results.length) {
            resolve(results[0]);
          } else {
            reject();
          }
        });
    });
  };

  searchAiports = search => {
    return new Promise((resolve, reject) => {
      return this.client
        .query({
          query: getAllAirports,
          variables: {
            search
          }
        })
        .then(({ data }) => resolve(data.airports));
    });
  };

  getNearbyAirports = ({ lat, long }) => {
    return new Promise((resolve, reject) => {
      return this.client
        .query({
          query: getNearbyAirports,
          variables: {
            lat,
            long
          }
        })
        .then(({ data }) => resolve(data.getNearbyAirports));
    });
  };

  transformLocation = geo => {
    var isCountry = _.includes(geo.types, "country");

    // LIST LOCATIONS
    return !isCountry
      ? {
          __typename: "LocationType",
          value: geo.formatted_address || null,
          label: geo.formatted_address || null,
          geometry: geo.geometry,
          place_id: geo.place_id,
          countryCode: _.find(geo.address_components, { types: ["country", "political"] }).short_name.toLowerCase()
        }
      : undefined;
  };

  getGoogleLocation = async ({ lat = false, long = false, input = false }) => {
    if (input) {
      // if search term present, resolve the lat long
      const searchByInput = await this.forwardGeoCode(input);
      return searchByInput;
    } else {
      // if lat long provided resolve the address
      const searchByLatLng = await this.reverseGeoCode({ lat, long });
      return searchByLatLng;
    }
  };

  search = async input => {
    let nearby = [];
    let dbLookup = [];
    let location;
    let geo;
    if (!input || input === "") {
      return {
        nearby,
        location
      };
    }
    dbLookup = await this.searchAiports(input);

    if (dbLookup && dbLookup.length) {
      if (dbLookup[0].coordinates) {
        const coords = dbLookup[0].coordinates.split(",");
        const latLng = {
          lat: parseFloat(coords[0]),
          long: parseFloat(coords[1])
        };
        geo = await this.getGoogleLocation(latLng); // get location
        nearby = await this.getNearbyAirports(latLng); // sarch nearby
        location = geo ? this.transformLocation(geo) : null;
      }
    } else {
      geo = await this.getGoogleLocation({ input });
      if (geo) {
        nearby = await this.getNearbyAirports({
          lat: geo.geometry.location.lat,
          long: geo.geometry.location.lng
        });
      }
      location = geo ? this.transformLocation(geo) : null;
    }
    return {
      nearby,
      location
    };
  };
}
