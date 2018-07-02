import React from "react";
import ReactDOM from "react-dom";
import cx from "classnames";
import s from "./EmptyLegsFilter.css";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import Select from "react-select";
import PropTypes from "prop-types";
import _ from "lodash";
import Datetime from "react-datetime";
import DatetimeCss from "react-datetime/css/react-datetime.css";
import InputRangeCss from "react-input-range/lib/css/index.css";
import moment from "moment";
import getNearestAirport from "./getNearestAirport.graphql";
import getAllNearbyAirports from "./getAllNearbyAirports.graphql";
import getAllAirports from "./getAllAirports.graphql";
import Promise from "bluebird";
import { PlusSquare, Briefcase, Calendar, Crosshair, User, XCircle } from "react-feather";
import { connect } from "react-redux";
import FormattedCurrency from "../../../i18n/FormattedCurrency";

// gfx
import arrowFrom from "./gfx/arrow-up.svg";
import arrowTo from "./gfx/arrow-down.svg";

import InputRange from "react-input-range";

const GOOGLE_API_KEY = "AIzaSyDH7XYmx1EiTYlM7GSkqS4FsDetFjr5328";

class FlagOption extends React.Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    isDisabled: PropTypes.bool,
    isFocused: PropTypes.bool,
    isSelected: PropTypes.bool,
    onFocus: PropTypes.func,
    onSelect: PropTypes.func,
    option: PropTypes.object.isRequired
  };

  handleMouseDown = event => {
    event.preventDefault();
    event.stopPropagation();
    this.props.onSelect(this.props.option, event);
  };

  handleMouseEnter = event => {
    event.preventDefault();
    this.props.onFocus(this.props.option, event);
  };

  handleMouseMove = event => {
    event.preventDefault();
    if (this.props.isFocused) return;
    this.props.onFocus(this.props.option, event);
  };

  render() {
    if (this.props.option.value === "geo") {
      return (
        <div
          className={cx(s.myOption, s.geoOption)}
          onMouseDown={this.handleMouseDown}
          onMouseEnter={this.handleMouseEnter}
          onMouseMove={this.handleMouseMove}
          title={this.props.option.title}
        >
          <div className={s.geoPrompt}>
            <Crosshair size="18" color="#4A90E2" />
            <span className={s.selectedvalue}>{this.props.option.label}</span>
          </div>
        </div>
      );
    }

    return (
      <div
        className={cx(s.myOption, this.props.option.disabled ? s.disabled : s.option)}
        onMouseDown={this.handleMouseDown}
        onMouseEnter={this.handleMouseEnter}
        onMouseMove={this.handleMouseMove}
        title={this.props.option.title}
      >
        {this.props.option.countryCode ? (
          <span className={cx("famfamfam-flags", this.props.option.countryCode)} />
        ) : null}
        <span className={s.selectedvalue}>{this.props.option.label}</span>
      </div>
    );
  }
}

class FlagValue extends React.Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    children: PropTypes.node,
    // placeholder: PropTypes.string,
    value: PropTypes.object
  };

  render() {
    return (
      <div className="Select-value" title={this.props.value.name}>
        {this.props.value.direction === "from" ? (
          <object data={arrowFrom} type="image/svg+xml" />
        ) : (
          <object data={arrowTo} type="image/svg+xml" />
        )}

        <div className="Select-value-label">
          {this.props.value.countryCode ? (
            <span className={cx("famfamfam-flags", this.props.value.countryCode)} />
          ) : null}
          <span className={s.selectedvalue}>{this.props.value.label}</span>
        </div>
      </div>
    );
  }
}

class EmptyLegsFilter extends React.Component {
  static contextTypes = {
    fetch: PropTypes.func.isRequired,
    client: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.locations = [];
    this.geolocation = false;

    this.today = moment(new Date()).add(2, "hours");

    this.state = {
      from: "",
      to: "",
      date: "",
      dateInterval: false,
      isLoading: false,
      price_range: { min: 1000, max: 100000 }
    };
  }

  forwardGeoCode = input => {
    const location = encodeURI(input);
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

  reverseGeoCode = ({ lat, long }) => {
    const { fetch } = this.context;

    return new Promise((resolve, reject) => {
      fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?result_type=administrative_area_level_2&latlng=${lat},${long}&key=${GOOGLE_API_KEY}`
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

  getGeoLocation = () =>
    new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          ({ coords }) => {
            resolve(coords);
          },
          e => {
            console.log(e);
          },
          {
            enableHighAccuracy: true,
            maximumAge: 100000
          }
        );
      }
    });

  setValue = async (selection, direction) => {
    this.props.setIsFetchingData({ isFetching: true });

    if (selection && selection.value === "geo") {
      let listAirports = "";
      if (!this.location) {
        this.setState({ isLoading: true });
        const geolocation = await this.getGeoLocation();

        if (geolocation) {
          const reverse = await this.reverseGeoCode({ lat: geolocation.latitude, long: geolocation.longitude });
          this.location = reverse;
          const airports = await this.searchAiports({ lat: geolocation.latitude, lng: geolocation.longitude });
          // Create string list of nearest airports
          airports.forEach(airport => {
            listAirports = listAirports.concat(airport.sfid).concat(",");
          });
          listAirports = listAirports.slice(0, listAirports.lastIndexOf(","));
          selection = {
            value: listAirports,
            label: this.location.formatted_address,
            countryCode: _.find(this.location.address_components, {
              types: ["country", "political"]
            }).short_name.toLowerCase(),
            direction
          };
        }
      } else {
        const airports = await this.searchAiports(this.location.geometry.location);
        // Create string list of nearest airports
        airports.forEach(airport => {
          listAirports = listAirports.concat(airport.sfid).concat(",");
        });
        listAirports = listAirports.slice(0, listAirports.lastIndexOf(","));
        selection = {
          value: listAirports,
          label: this.location.formatted_address,
          countryCode: _.find(this.location.address_components, {
            types: ["country", "political"]
          }).short_name.toLowerCase(),
          direction
        };
      }
    }

    // add to state
    let value = "";
    let outputSelection = "";
    if (selection) {
      value = selection.value;
      outputSelection = selection;
    }

    this.setState({ isLoading: false, [direction]: outputSelection });
    if (direction === "from") {
      this.props.handleAirportFromChanged({ from: value });
    } else {
      this.props.handleAirportToChanged({ to: value });
    }
  };

  changeDate = datetime => {
    this.props.setIsFetchingData({ isFetching: true });
    this.setState({ date: datetime });
    this.props.handleDateChanged({ date: datetime._d });
  };

  isValidDate = (currentDate, selectedDate) => {
    const yesterday = Datetime.moment().subtract(1, "day");
    return currentDate.isAfter(yesterday);
  };

  handleIntervalCheckbox = value => {
    this.props.setIsFetchingData({ isFetching: true });
    this.setState({ dateInterval: value });
    this.props.handleDateIntervalChanged({ dateInterval: value });
  };

  searchAiports = ({ lat, lng }, single) => {
    const { client } = this.context;

    return new Promise((resolve, reject) => {
      client
        .query({
          query: !single ? getAllNearbyAirports : getNearestAirport,
          variables: {
            lat,
            long: lng
          }
        })
        .then(({ data }) => {
          resolve(data.airports);
        });
    });
  };

  searchAiportsByName = search => {
    const { client } = this.context;
    return new Promise((resolve, reject) => {
      return client
        .query({
          query: getAllAirports,
          variables: {
            search
          }
        })
        .then(({ data }) => resolve(data.airports));
    });
  };

  fetchOptions = async (input, direction) => {
    const options = [];
    if (input.length < 3) {
      return false;
    }
    this.setState({ isLoading: true });
    //First look up airports in the DB
    const dbLookup = await this.searchAiportsByName(input);
    let geocode;
    if (dbLookup && dbLookup.length) {
      if (dbLookup[0].coordinates) {
        const coords = dbLookup[0].coordinates.split(",");
        const latLng = {
          lat: parseFloat(coords[0]),
          long: parseFloat(coords[1])
        };
        const res = await this.reverseGeoCode(latLng); // get location
        geocode = [res];
      }
    } else {
      geocode = await this.forwardGeoCode(input);
    }

    if (!geocode) {
      options.push({
        label: "No results found",
        value: "No results found",
        disabled: true
      });
    } else {
      const latlong = geocode[0].geometry.location;
      const airports = await this.searchAiports(latlong);
      if (direction === "from") {
        // GEO
        options.push({
          label: "Get Current Location",
          value: "geo"
        });
      }

      // LOCATIONS
      options.push({
        label: "Locations",
        value: "location",
        disabled: true
      });

      // Create string list of nearest airports
      let listAirports = "";
      airports.forEach(airport => {
        listAirports = listAirports.concat(airport.sfid).concat(",");
      });
      listAirports = listAirports.slice(0, listAirports.lastIndexOf(","));
      // LIST LOCATIONS
      geocode.forEach(local => {
        options.push({
          value: listAirports,
          label: local.formatted_address,
          countryCode: _.find(local.address_components, { types: ["country", "political"] }).short_name.toLowerCase(),
          direction
        });
      });

      // NEARBY TO LOCATION
      options.push({
        label: "Nearby Airports",
        value: "nearby",
        disabled: true
      });
      // LIST AIRPORTS
      airports.forEach(airport => {
        options.push({
          value: airport.sfid,
          label: airport.name,
          countryCode: airport.city.country.countryCode.toLowerCase(),
          direction
        });
      });
    }

    this.locations = options;

    return { options };
  };

  placeHolder = label => (
    <div className={s.placeholder}>
      {label === "from" ? (
        <object data={arrowFrom} type="image/svg+xml" />
      ) : (
        <object data={arrowTo} type="image/svg+xml" />
      )}
      <span className={s.label}>{_.capitalize(label)}</span>
    </div>
  );

  renderValue = option => <strong style={{ color: option.color }}>{option.label}</strong>;

  renderOption = option => (
    <span>
      <b>{option.label}</b>
    </span>
  );

  geoPrompt = ({ direction }) => (
    <div className={s.geoPrompt} onClick={el => this.setValue({ value: "geo" }, direction)}>
      <Crosshair size="18" color="#4A90E2" />
      <span>Get Current Location</span>
    </div>
  );

  getFormatedCurrency = value => <FormattedCurrency value={value} />;

  render() {
    const { isLoading, price_range } = this.state;
    const {
      setIsFetchingData,
      handleAirportFromChanged,
      handleAirportToChanged,
      handlePriceRangeChanged,
      handleDateChanged,
      handleDateIntervalChanged,
      handleSortChanged,
      changeView
    } = this.props;

    return (
      <div className={cx("container")}>
        <form className={s["req-flight"]} onSubmit={this.submitReqFlight}>
          <div className={cx("row")}>
            {/* flight info */}
            <div className={cx("col-12", s["flight-info"])}>
              {/* From */}
              <Select.Async
                name="fly-from"
                placeholder={this.placeHolder("from")}
                className={cx(s.select, s.location)}
                autoload={false}
                cache={false}
                // onInputChange={this.onInputChange}
                onChange={value => this.setValue(value, "from")}
                optionComponent={FlagOption}
                options={this.locations}
                value={this.state.from}
                valueComponent={FlagValue}
                clearable
                filterOptions={i => i}
                onCloseResetsInput={false}
                valueRenderer={this.renderValue}
                optionRenderer={this.renderOption}
                searchPromptText={this.geoPrompt({ direction: "from" })}
                loadOptions={input => this.fetchOptions(input, "from")}
                // autoload={false}
                isLoading={isLoading}
              />

              {/* To */}
              <Select.Async
                name="fly-to"
                placeholder={this.placeHolder("to")}
                className={cx(s.select, s.location)}
                cache={false}
                autoload={false}
                // onInputChange={this.onInputChange}
                onChange={value => this.setValue(value, "to")}
                optionComponent={FlagOption}
                loadOptions={input => this.fetchOptions(input, "to")}
                value={this.state.to}
                valueComponent={FlagValue}
                clearable
                filterOptions={i => i}
                onCloseResetsInput={false}
                isLoading={isLoading}
              />

              {/* Date */}
              <div className={s.dtpicker}>
                <Calendar color="#A8AAB7" />
                <Datetime
                  className={s.datetime}
                  dateFormat="ddd, D MMM -"
                  timeFormat="hh:mm A"
                  value={this.state.date}
                  // input={false}
                  defaultValue="DATE"
                  onChange={date => this.changeDate(date)}
                  isValidDate={(currentDate, selectedDate) => this.isValidDate(currentDate, selectedDate)}
                />

                {/* Date option +-interval */}
                <div className={s["date-option"]}>
                  <input
                    id="date-interval"
                    type="checkbox"
                    name="dateInterval"
                    style={{ cursor: "pointer" }}
                    onChange={ev => {
                      this.handleIntervalCheckbox(ev.target.checked);
                    }}
                    defaultChecked={this.state.dateInterval}
                  />
                  <span className={cx("conduit", "lt-blue")}>+/- 3 DAYS</span>
                </div>
              </div>
            </div>
          </div>

          {/* sort */}
          <div className={cx("row")}>
            <div className={cx("col-12", s["flight-sort"])}>
              {/* price range */}
              <div className={cx(s["sort-fields"], "pl-0")}>
                <span className={cx("conduit", "uppercase", s.label, "dk-blue", "bold")}>Price Range</span>
                <InputRange
                  maxValue={100000}
                  minValue={1000}
                  step={500}
                  value={this.state.price_range}
                  onChange={value => {
                    setIsFetchingData({ isFetching: true });
                    handlePriceRangeChanged({ price_range: value });
                    this.setState({ price_range: value });
                  }}
                  slider={s["input-slider"]}
                  formatLabel={value => this.getFormatedCurrency(value)}
                />
              </div>

              {/* sort options */}
              <div className={cx(s["sort-fields"])}>
                <span className={cx("conduit", "uppercase", s.label, "dk-blue", "bold")}>Sort</span>
                <select
                  className={cx("uppercase", "conduit", "lt-blue")}
                  onChange={ev => {
                    setIsFetchingData({ isFetching: true });
                    handleSortChanged({ sort: ev.target.selectedIndex + 1 });
                  }}
                >
                  <option>date ascending</option>
                  <option>date descending</option>
                  <option>lower price</option>
                  <option>higher price</option>
                </select>
              </div>

              {/* view options */}
              <div className={cx(s["sort-fields"], "pr-0")}>
                <span className={cx("conduit", "uppercase", s.label, "dk-blue", "bold")}>View</span>
                <select
                  className={cx("uppercase", "conduit", "lt-blue")}
                  onChange={ev => {
                    changeView({ view: ev.target.options[ev.target.selectedIndex].innerHTML });
                  }}
                >
                  <option>list</option>
                  <option>map</option>
                </select>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  locale: state.intl.locale
});

export default connect(mapStateToProps, {})(withStyles(s, DatetimeCss, InputRangeCss)(EmptyLegsFilter));
