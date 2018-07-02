import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import cx from "classnames";
import { connect } from "react-redux";
import { Toaster, Position, Intent, Switch, MenuItem, Button } from "@blueprintjs/core";
import s from "./Job.css";
import _ from "lodash";

import Sidebar from "admin/components/Sidebar";
import Editor from "admin/components/Editor";
import CitySelect from "admin/components/select/CitySelect";
import { Suggest, MultiSelect } from "@blueprintjs/labs";
import TooltipLabel from "admin/components/TooltipLabel";

class JobSidebar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      city: "",
      duraton: 0,
    };
  }

  componentDidMount() {
    // if (!this.props.cities.length) {
    //   this.props.fetchCities();
    // }
  }

  componentWillReceiveProps(nextProps) {
    const { post } = nextProps;
    if (post && post.meta) {
      const updatedMeta = {};

      if (post.meta.location && post.meta.location.name) {
        updatedMeta.city = post.meta.location;
      }
      if (post.meta.duration) {
        updatedMeta.duration = post.meta.duration;
      }
      this.setState(updatedMeta);
    }
  }

  toggleDuration(e) {
    const duration = e.target.checked ? 1 : 0;
    const { onMetaChange } = this.props;

    this.setState({ duration });
    onMetaChange({
      ...this.props.post.meta,
      duration,
    });
  }

  // updateCity(e) {
  //   const city = e.target.value;
  //   const location = _.find(this.props.cities, { sfid: city })
  //   const { onMetaChange } = this.props;

  //   this.setState({ city });
  //   onMetaChange({
  //     ...this.props.post.meta,
  //     location
  //   });
  // }

  updateUrl(e) {
    const url = e.target.value;
    const { onMetaChange } = this.props;

    this.setState({ duration });
    onMetaChange({
      ...this.props.post.meta,
      url,
    });
  }

  addCity = item => {
    this.props.onMetaChange({
      ...this.props.post.meta,
      location: item,
    });
  };

  selectedRenderer = item => {
    return (
      <MenuItem
        className={cx(s.isActive)}
        key={item.sfid}
        text={item.name.concat(", ", item.country.name)}
        label={
          <div>
            <span className={`famfamfam-flags ${item.country.countryCode}`} />
          </div>
        }
      />
    );
  };

  renderMenuCity = ({ handleClick, item, isActive }) => {
    return item ? (
      <MenuItem
        className={cx(isActive ? s.isActive : null)}
        key={item.sfid}
        text={item.name.concat(", ", item.country.name)}
        label={
          <div>
            <span className={`famfamfam-flags ${item.country.countryCode}`} />
          </div>
        }
        onClick={handleClick}
      />
    ) : (
      <MenuItem key="loadingSpinner" text="Loading..." />
    );
  };

  render() {
    const { handleChange, post, cities } = this.props;
    const { city, duration, url } = this.state;

    return (
      <Fragment>
        <div className="pt-form-group">
          <label className="pt-label" htmlFor="city">
            <TooltipLabel label="City" required tooltip="Please select a city" />
            <CitySelect
              onItemSelect={item => {
                this.addCity(item, "city");
                this.setState({ city: item });
              }}
              currentItem={city}
            />
          </label>
        </div>
        {/* <div className="pt-form-group">
          <label className="pt-label" htmlFor="category">
            <span>City</span>
            <div className="pt-select pt-inline">
              <select
                className={cx("pt-fill")}
                value={city}
                name="city"
                onChange={(e) => this.updateCity(e)}
              >
                {cities.map(city => (
                  <option key={city.sfid} value={city.sfid}>
                    {city.name}
                  </option>
                ))}
              </select>
            </div>
          </label>
        </div> */}
        <div className="pt-card pt-elevation-0">
          <Switch
            label={duration ? "Full Time" : "Part Time"}
            name="duration"
            checked={duration}
            onChange={e => this.toggleDuration(e)}
          />
        </div>
        <div className="pt-form-group">
          <label className="pt-label" htmlFor="title">
            <TooltipLabel label="Job Url" required tooltip="Job Detail Url" />
            <input
              type="url"
              name="url"
              className="pt-input pt-fill"
              id="url"
              value={url}
              onChange={e => this.updateUrl(e)}
              placeholder="Job Url"
            />
          </label>
        </div>
      </Fragment>
    );
  }
}

JobSidebar.contextTypes = {
  fetch: PropTypes.func.isRequired,
  client: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  // cities: (Object.values(state.cities.byId) || [])
});

export default connect(mapStateToProps, null)(withStyles(s)(JobSidebar));
