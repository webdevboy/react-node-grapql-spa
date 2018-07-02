import "whatwg-fetch";
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Promise from "bluebird";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import cx from 'classnames';
import { Crosshair, X } from "react-feather";
import { Loader } from 'react-loaders';
import getAllAirports from "./queries/getAllAirports.graphql";
import getNearestAirport from "./queries/getNearestAirport.graphql";
import getNearbyAirports from "./queries/getNearbyAirports.graphql";
import s from './css/requestFlight.css';
import{ injectIntl } from 'react-intl';
import _ from 'lodash';

const GOOGLE_API_KEY = "AIzaSyDH7XYmx1EiTYlM7GSkqS4FsDetFjr5328";

const NearbyAirports = ({ label, location, airports, handleChange }) => {
  
  return <div>
    <h6 className="dropdown-header">{location} {label}</h6>
    { airports.map(airport => <a
      key={airport.sfid}
      className="dropdown-item"
      onMouseDown={e => handleChange(e, airport)}
      onTouchEnd={e => handleChange(e, airport)}>
      <span className={cx(`famfamfam-flags ${airport.city.country.countryCode}`, s.dropdownIcon)} />
      <span>
        { `${airport.iata || airport.icao} ${airport.city.name},` } {airport.name}, {airport.city.country.name}
      </span>
    </a>) }
  </div>
}

const Locations = ({ label, locations, ocations, handleChange }) => {

  if (!locations.length) {
    return null
  }
  return <div>
    <h6 className="dropdown-header">{label}</h6>
    { locations.map(location => <a key={location.place_id} className={cx("dropdown-item", (location.disabled) ? s.disabled : null)} onMouseDown={e => handleChange(e, location)} onTouchEnd={e => handleChange(e, location)}><span className={cx(`famfamfam-flags ${location.countryCode}`, s.dropdownIcon)}></span><span>{location.label}</span></a>) }
    <div className="dropdown-divider"></div>
  </div>
}

export class InputLocation extends Component {
  
  static contextTypes = {
    fetch: PropTypes.func.isRequired,
    client: PropTypes.object.isRequired,
  };


  refHandlers = {
    input: (ref) => this.inputValue = ref,
  }

  constructor(props) {
    super(props);

    this.state = {
      value: props.defaultValue || '',
      airports: [],
      location: null,
      open: false,
      selection: props.defaultSelection || null,
      isFocused: false,
      isLoading: false,
    }
  }

  // search for airports against the database using postGIS to calc distance
  searchAiports = (search) => {
    const loc = this.props.ipInfo.loc.split(',');

    return new Promise((resolve, reject) => {
      return this.context.client.query({
        query: getAllAirports,
        variables: {
          search,
          lat: loc[0],
          long: loc[1],
        },
      }).then(({data}) => resolve(data.airports));
    });
  }

  // search for airports against the database using postGIS to calc distance
  getNearbyAirports = ({ lat, long }) => {
    
    return new Promise((resolve, reject) => {
      return this.context.client.query({
        query: getNearbyAirports,
        variables: {
          lat,
          long
        },
      }).then(({data}) => resolve(data.getNearbyAirports));
    })
  }

  forwardGeoCode = (input) => {
    const location = encodeURI(input);
    const { fetch } = this.context;
    const { loc, country } = this.props.ipInfo;
    // const bounds = loc.split(',');
    
    return new Promise(((resolve, reject) => {
      fetch(`https://maps.googleapis.com/maps/api/geocode/json?result_type=administrative_area_level_1&address=${location}&key=${GOOGLE_API_KEY}&language=${this.props.locale}&bounds=${loc}&region=${country.toLowerCase()}`, { timeout: 10000 })
        .then(async response => response.json())
        .then(({ results }) => {
          console.log(results);
          if (results.length) {
            resolve(results[0]);
          } else {
            reject();
          }
        });
    }));
  }

  reverseGeoCode = ({ lat, long }) => {
    const { fetch } = this.context;
    const { loc, country } = this.props.ipInfo;

    return new Promise(((resolve, reject) => {
      fetch(`https://maps.googleapis.com/maps/api/geocode/json?result_type=administrative_area_level_2&latlng=${lat},${long}&key=${GOOGLE_API_KEY}&language=${this.props.locale}&bounds=${loc}&region=${country.toLowerCase()}`)
      .then(async response => response.json())
      .then(({ results }) => {
        console.log(results);
        if (results.length) {
          resolve(results[0]);
        } else {
          reject();
        }
      });
    }));
  }

  getGeoLocation = () => new Promise(((resolve, reject) => {
    // const coords = this.props.ipInfo.loc.split(',');
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        resolve(coords);
      }, (e) => {
        console.log(e);
      }, {
        enableHighAccuracy: true,
        maximumAge: 100000,
      });
    }
  }))

  handleChange = async (e, selection) => {
    
    if (selection === 'geolocation') {
      const coords = this.props.ipInfo.loc.split(',');
      const geo = await this.reverseGeoCode({ lat: parseFloat(coords[0]), long: parseFloat(coords[1]) });
      
      if (geo) {
        this.setState({
          selection: { 
            __typename: 'GeoType',
            value: geo.formatted_address,
            label: geo.formatted_address,
            geometry: geo.geometry,
            countryCode: _.find(geo.address_components, { types: ["country", "political"] }).short_name.toLowerCase(),
            place_id: geo.place_id,
          },
          open: false,
          isLoading: false
        }, () => {
          this.props.onSelect(this.state.selection)
        });
      }

    } else {
      this.setState({
        selection: selection,
        open: false,
      }, () => {
        console.log(this.state);
        this.props.onSelect(this.state.selection)
      });
    }    
  }

  showSuggester = (e) => {
    e.preventDefault();

    if (this.inputValue) this.inputValue.focus();
    if (this.props.geolocation || this.state.location || this.state.airports.length) {
      this.setState({ open: true });
    }
    
  }

  hideSuggester = () => {
    this.setState({ open: false });
  }

  getGoogleLocation = async ({ lat = false , long = false, input = false }) => {

    if (input) {
      // if search term present, resolve the lat long
      const searchByInput = await this.forwardGeoCode(input);
      return searchByInput
    } else {
      // if lat long provided resolve the address
      const searchByLatLng = await this.reverseGeoCode({ lat, long });
      return searchByLatLng
    }

  }

  transformLocation = (geo) => {
    var isCountry = _.includes(geo.types, "country");
      
    // LIST LOCATIONS
    return (!isCountry) ? {
      __typename: 'LocationType',
      value: geo.formatted_address || null,
      label: geo.formatted_address || null,
      geometry: geo.geometry,
      place_id: geo.place_id,
      countryCode: _.find(geo.address_components, { types: ["country", "political"] }).short_name.toLowerCase(),
    } : undefined;
  }

  fetchOptions = async (input) => {

    let nearby = [];
    let dbLookup = [];
    let geo;
    let location;

    // console.log('SEARCH TERM => ', input);
    await this.setState({ isLoading: true });
    
    dbLookup = await this.searchAiports(input);
    // console.log('found in our DB => ', dbLookup);

    if (dbLookup && dbLookup.length) {

      if (dbLookup[0].coordinates) {
        const coords = dbLookup[0].coordinates.split(',');
        const latLng = { 
          lat: parseFloat(coords[0]),
          long: parseFloat(coords[1])
        }
        geo = await this.getGoogleLocation(latLng); // get location
        nearby = await this.getNearbyAirports(latLng); // sarch nearby
        location = (geo) ? this.transformLocation(geo) : null;

        // console.log('geo => ',geo);
        // console.log('nearby with length => ',nearby);
      }

    } else {
      geo = await this.getGoogleLocation({ input }); // get location
      // console.log('aqui geo 2', geo);

      if (geo) {
        nearby = await this.getNearbyAirports({
          lat: geo.geometry.location.lat,
          long: geo.geometry.location.lng
        });
        // console.log('aqui nearby 2',nearby);
      }
      location = (geo) ? this.transformLocation(geo) : null;
      // nearby = await this.getNearbyAirports();
      // console.log('nearby geo no length => ',nearby);
    }
    
    await this.setState({
      airports: nearby,
      location: location,
      open: true,
      isLoading: false,
    });

    return false

  }

  componentWillMount = () => {
    this.handleSearchDebounced = _.debounce(async () => {
      if (this.state.value.length >= 3) {
        await this.fetchOptions(this.state.value.trim());
      }
    }, 500);
  }

  onChange = (e) => {
    this.setState({ value: e.target.value });
    this.handleSearchDebounced();
  }

  clearSelection = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      selection: undefined,
      value: '',
    })
    this.props.clear();
    if (this.inputValue) this.inputValue.focus();
  }

  componentDidUpdate = (prevProp, prevState) => {
    if (this.props.defaultSelection !== this.state.selection) {
      this.setState({ selection: this.props.defaultSelection });
    }
  }

  toggleFocused = (e) => {
    e.preventDefault();
    this.setState({isFocused: true}, () => {
      if (this.inputValue) this.inputValue.focus();
    })
  }
  toggleBlured = (e) => {
    e.preventDefault();
    this.setState({ isFocused: false, open: false }, () => this.inputValue.blur());
  }

  render() {
    const { ipInfo, icon, hasErrors, errorIcon, loading, className, geolocation, intl } = this.props;
    const { open, isLoading, airports, location, selection, value, isFocused } = this.state;

    const from = intl.formatMessage({id: `request-flight.form.input.placeholder-from`, defaultMessage: "From" });
    const to = intl.formatMessage({id: `request-flight.form.input.placeholder-to`, defaultMessage: "To" })
    const placeholder = (this.props.direction === 'FROM') ? from : to;
    
    const placeholderFocusFrom = intl.formatMessage({id: 'request-flight.form.input.placeholder-focus.from', defaultMessage: "Eg: Paris Le Bourget" });
    const placeholderFocusTo = intl.formatMessage({id: 'request-flight.form.input.placeholder-focus.to', defaultMessage: "Eg: London City" });
    const placeholderFocus = (this.props.direction === 'FROM') ? placeholderFocusFrom : placeholderFocusTo;

    const inputLocationLocation = intl.formatMessage({id: 'request-flight.form.input.location', defaultMessage: "Locations" });
    const inputLocationNearby = intl.formatMessage({id: 'request-flight.form.input.nearby', defaultMessage: "Nearby Airports" });
    const inputGetCurrentLocation = intl.formatMessage({id: 'request-flight.form.input.current-location', defaultMessage: "Get Current Location" });

    return (
      <div className={cx(className, (open) ? s.open : '')} onClick={this.showSuggester} onBlur={this.hideSuggester}>
        <div className={s.wrapperInner}>
          { (this.props.hasErrors && !this.state.isFocused && !selection) ? errorIcon : icon }
          {
            (selection && !open) ?
              <div className={s.selectedOption}>
                { (selection.__typename === 'SFAirport') ? <div><span className={`famfamfam-flags ${selection.city.country.countryCode}`}></span><span>{ `${selection.iata || selection.icao} ${selection.city.name},` } {selection.name}, {selection.city.country.name}</span></div> : null }
                { (selection.__typename === 'LocationType') ? <div><span className={`famfamfam-flags ${selection.countryCode}`}></span><span>{selection.label}</span></div> : null }
                { (selection.__typename === 'GeoType') ? <div><span className={`famfamfam-flags ${selection.countryCode}`}></span><span>{selection.label}</span></div> : null }
              </div>
            : <input
                ref={this.refHandlers.input}
                onChange={this.onChange}
                onFocus={e => this.toggleFocused}
                onBlur={e => this.toggleBlured}
                placeholder={isFocused ? placeholderFocus : placeholder}
                value={value}
                type="text"
                className={s.inputLocation}
              />
          }

          <div className={s.loader}>
            { isLoading
              ? <Loader type="ball-scale-ripple" active={isLoading} />
              : (selection) ? <button type="button" style={{cursor: 'pointer'}} onClick={(e) => this.clearSelection(e)} className={s.clearLocation}><X size="14" color="#666666" /></button> : null }
          </div>
        </div>
        
        <div className={cx('dropdown-menu', s.suggester)}>
          { geolocation ? <div>
            <a className={cx("dropdown-item", s.item)}
            onMouseDown={e => this.handleChange(e, 'geolocation')}
            onTouchEnd={e => this.handleChange(e, 'geolocation')}>
            <span className={s.dropdownIcon}>
              <Crosshair color="blue" size="18" />
            </span>
            <span>
              {inputGetCurrentLocation}
            </span>
            </a>
            { ((location) || (airports && airports.length)) ? <div className="dropdown-divider"></div> : null }
          </div>

          : null }
          
          {
            (location) ?
              <Locations label={inputLocationLocation} locations={[location]} handleChange={this.handleChange} />
            : null
          }
          
          {
            (airports && airports.length) ?
              <NearbyAirports label={inputLocationNearby} location={this.state.location.formatted_address} airports={airports} handleChange={this.handleChange} />
            : null
          }

        </div>

      </div>
    )
  }
}


// 
const mapStateToProps = (state) => ({
  ipInfo: state.ipInfo,
  locale: state.intl.locale,
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(withStyles(s)(InputLocation)));