import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import cx from "classnames";
import { graphql } from "react-apollo";
import { connect } from "react-redux";
import { Suggest, MultiSelect } from "@blueprintjs/labs";
import Loading from "react-loading-animation";
import LoadingSpinner from "admin/components/LoadingSpinner";
import TooltipLabel from "admin/components/TooltipLabel";
import PhotoGallery from "admin/components/PhotoGallery";
import MediaGallery from "admin/components/MediaGallery";
import Action from "admin/components/Action";
import moment from "moment";
import s from "./Events.css";
import _ from "lodash";
import {
  Menu,
  Checkbox,
  Switch,
  Button,
  ContextMenu,
  Tooltip,
  Overlay,
  MenuItem,
  MenuDivider,
  Popover,
  Intent,
  Toaster,
  PopoverInteractionKind,
  Position,
} from "@blueprintjs/core";

import { DateRangePicker, DateRangeInput } from "@blueprintjs/datetime";
import { fetchEventPostForEditor } from "admin/actions/events";
import { fetchMedia } from "admin/actions/media";
import { fetchCities, fetchSelectedCities } from "admin/actions/cities";
import CitySelect from "admin/components/select/CitySelect";

class EventSidebar extends Component {
  constructor(props) {
    super(props);
    const { post } = this.props;

    this.state = {
      isGalleryLoading: false,
      isLoading: false,
      suggestEdited: false,
      selectedAirports: [],
      city: null,
    };
  }

  componentDidMount() {
    let variables = {
      type: "airport",
      language_id: this.props.post.language.id,
    };
    const { post } = this.props;
    this.props.fetchEventPostForEditor(variables);
    post.meta.city_sfid && this.props.fetchSelectedCities([post.meta.city_sfid]);
  }

  filterSelectedAirport(posts, airportIds) {
    return posts.filter(v => (airportIds || []).map(_v => _v.airportPost_id).indexOf(v.id) !== -1);
  }

  componentWillReceiveProps(nextProps) {
    const {
      dataList,
      cities,
      post: {
        meta: { recommended_airports },
      },
    } = nextProps;
    if (!nextProps.loading && dataList && dataList.posts) {
      this.setState({
        posts: dataList && dataList.posts,
        selectedAirports: this.filterSelectedAirport(dataList.posts, recommended_airports),
      });
    }
    const { isEdit, isTranslate, isDuplicate } = this.props;
    if ((isEdit || isTranslate || isDuplicate) && !this.state.city && cities.cities && cities.cities[0]) {
      this.setState({
        city: cities.cities[0],
      });
    }
  }

  renderPostItem = ({ handleClick, item, isActive }) => {
    return (
      <MenuItem className={cx(isActive ? s.isActive : null)} key={item.id} text={item.title} onClick={handleClick} />
    );
  };

  renderPostTag = item => {
    return item.title;
  };

  addPost = item => {
    let selectedAirports = this.state.selectedAirports;
    if (this.getSelectedPostIndex(item) !== -1) {
      selectedAirports = selectedAirports.filter((post, i) => i !== this.getSelectedPostIndex(item));
    } else {
      selectedAirports = [...selectedAirports, item];
    }

    let similar_aircraft_list = selectedAirports.map(post => ({
      airportPost_id: post.id,
      airport_name: post.details.name__c,
      airport_coordinates: `${post.details.location__latitude__s},${post.details.location__longitude__s}`,
      airport_url: `/${post.type}/${post.slug}`,
    }));

    this.setState({
      selectedAirports: selectedAirports,
    });
    this.props.onMetaChange({
      ...this.props.post.meta,
      recommended_airports: similar_aircraft_list,
    });
  };

  getSelectedPostIndex(post) {
    return this.state.selectedAirports.indexOf(post);
  }

  addCity = city => {
    this.setState({ city });
    this.props.onMetaChange({
      ...this.props.post.meta,
      city_sfid: city.sfid,
      city_name: city.name,
    });
  };

  handleDateChange = selectedDates => {
    let from_date, to_date;
    if (selectedDates[1] !== null && selectedDates[0] === selectedDates[1]) {
      from_date = selectedDates[0];
      to_date = null;
    } else {
      from_date = selectedDates[0];
      to_date = selectedDates[1];
    }

    this.props.onMetaChange({
      ...this.props.post.meta,
      from_date,
      to_date,
    });
  };

  handleWebsiteChange = inWebsite => {
    this.props.onMetaChange({
      ...this.props.post.meta,
      website: inWebsite.target.value,
    });
  };

  handleCheckboxChange = inCheckbox => {
    let display_helicopter_transfer = !this.props.post.meta.display_helicopter_transfer;
    this.props.onMetaChange({
      ...this.props.post.meta,
      display_helicopter_transfer: display_helicopter_transfer,
    });
  };

  handleClear = () => {
    this.setState({
      selectedAirports: [],
    });

    this.props.onMetaChange({
      ...this.props.post.meta,
      recommended_airports: [],
    });
  };

  handleTagRemove = (_tag, index) => {
    let selectedAirports = this.state.selectedAirports.filter((post, i) => i !== index);
    let similar_aircraft_list = selectedAirports.map(post => ({
      airportPost_id: post.id,
      airport_name: post.details.name__c,
      airport_coordinates: `${post.details.location__latitude__s},${post.details.location__longitude__s}`,
      airport_url: `/${post.type}/${post.slug}`,
    }));

    this.setState({
      selectedAirports: selectedAirports,
    });
    this.props.onMetaChange({
      ...this.props.post.meta,
      recommended_airports: similar_aircraft_list,
    });
  };

  filterPost = (query, item, index) => {
    const entry = _.toLower(`${item.title}`);
    const loweredQuery = query.toLowerCase();
    return String(entry).includes(loweredQuery);
  };

  openPhotoGallery = async () => {
    this.photogallery.openGallery();
  };

  removeHelicopterImage = () => {
    this.props.onMetaChange({
      ...this.props.post.meta,
      helicopter_image: null,
    });
  };

  selectPhoto = photo => {
    this.props.onMetaChange({
      ...this.props.post.meta,
      helicopter_image: { id: photo.id, src: photo.src },
    });
  };

  toggleFeatured = () => {
    this.props.onMetaChange({
      ...this.props.post.meta,
      featured: !this.props.post.meta.featured,
    });
  };

  toggleFeaturedEvergreen = () => {
    this.props.onMetaChange({
      ...this.props.post.meta,
      featured_evergreen: !this.props.post.meta.featured_evergreen,
    });
  };

  render() {
    const { onMetaChange, post, isEdit, isTranslate, isDuplicate, dataList } = this.props;
    const { suggestEdited, selectedAirports, city } = this.state;
    if (this.props.loading || !dataList) {
      return <LoadingSpinner />;
    }

    let meta = post.meta;
    if (
      meta.recommended_airports &&
      meta.recommended_airports.length > 0 &&
      (isTranslate || isDuplicate) &&
      this.filterSelectedAirport(dataList.posts, meta.recommended_airports).length === 0
    ) {
      onMetaChange({
        ...post.meta,
        recommended_airports: [],
      });
      return <LoadingSpinner />;
    }

    var minDateFiveYear = new Date();
    minDateFiveYear.setFullYear(minDateFiveYear.getFullYear() - 5);
    var maxDateFiveYear = new Date();
    maxDateFiveYear.setFullYear(maxDateFiveYear.getFullYear() + 5);

    const editOptionsForDate = { minDate: minDateFiveYear, maxDate: maxDateFiveYear };

    const getTagProps = (_value, index) => ({
      intent: Intent.NONE,
      minimal: false,
    });

    const NoResults = <MenuItem iconName="pt-icon-issue" text="No Results" intent={Intent.WARNING} />;
    const clearButton =
      selectedAirports.length > 0 ? (
        <Button iconName="pt-icon-cross" minimal={true} onClick={this.handleClear} />
      ) : null;

    let eventFromDate = undefined;
    let eventToDate = undefined;

    if (meta.from_date) {
      const fromDate = moment(meta.from_date, ["YYYY-MM-DDTHH:mm:ss.SSS"]);
      eventFromDate = fromDate.toDate();
    }

    if (meta.to_date) {
      const toDate = moment(meta.to_date, ["YYYY-MM-DDTHH:mm:ss.SSS"]);
      eventToDate = toDate.toDate();
    }

    return (
      <Fragment>
        <MediaGallery
          onRef={ref => (this.photogallery = ref)}
          selectPhoto={this.selectPhoto}
          currentRoute={this.props.currentRoute}
        />
        <div className="pt-form-group">
          {/* City */}
          <div className={cx("pt-form-group")}>
            <label className="pt-label" htmlFor="city">
              <TooltipLabel
                label="City"
                required
                tooltip="Select a city for the event, this will link all the content belonging to the city to the event page, like airports"
              />
            </label>
            <CitySelect onItemSelect={this.addCity} currentItem={city} />
          </div>

          {/* From Until Date */}
          <div className={cx("pt-form-group")}>
            <label className="pt-label">
              <TooltipLabel label="From - Until" required>
                <span>Choose a date range for the event, single days are allowed!</span>
              </TooltipLabel>
            </label>
            <DateRangePicker
              value={[eventFromDate, eventToDate]}
              onChange={this.handleDateChange}
              locale={`${this.props.defaultLocale}-GB`}
              shortcuts={false}
              allowSingleDayRange
              {...editOptionsForDate}
            />
          </div>
          {/* Event URL section */}
          <div className="pt-form-group">
            <label className="pt-label" htmlFor="event_url">
              <span>Event URL</span>
              <div className="pt-input-group">
                <span className="pt-icon pt-icon-link" />
                <input
                  type="url"
                  name="url"
                  value={meta.website}
                  className="pt-input pt-fill"
                  id="event_url"
                  onChange={this.handleWebsiteChange}
                  placeholder="Event URL"
                />
              </div>
            </label>
          </div>

          {/* Recommended Airport */}
          <div className="pt-form-group">
            <label className="pt-label" htmlFor="recommendedAirport">
              <TooltipLabel label="Recommended Airports" required tooltip="Please select recommended airport posts" />
              {this.state.posts ? (
                <MultiSelect
                  name="recommended_airport_list"
                  items={this.state.posts ? this.state.posts : null}
                  popoverProps={{ className: s.suggester }}
                  itemRenderer={this.renderPostItem}
                  tagRenderer={this.renderPostTag}
                  onItemSelect={this.addPost}
                  itemPredicate={this.filterPost}
                  selectedItems={selectedAirports}
                  tagInputProps={{ tagProps: getTagProps, onRemove: this.handleTagRemove, rightElement: clearButton }}
                  noResults={NoResults}
                />
              ) : null}
            </label>
          </div>
          {/* Helicopter transfter checkbox */}
          <div className="pt-form-group">
            <div className="pt-form-group">
              <Checkbox
                checked={meta.display_helicopter_transfer}
                label="Display Helicopter Transfer Editor"
                onChange={this.handleCheckboxChange}
              />
            </div>
          </div>
          {/* Helicopter image */}
          <div className="pt-form-group">
            <label className="pt-label" htmlFor="files">
              Helicopter Image
            </label>
            <Loading isLoading={this.state.isGalleryLoading}>
              <div className={s["banner-placeholder"]}>
                {meta.helicopter_image ? (
                  <Action
                    key="item-action-remove"
                    className="button-remove"
                    icon="pt-icon-remove"
                    intent="pt-intent-danger"
                    action={this.removeHelicopterImage}
                    tooltip="Remove Image"
                  />
                ) : null}
                <div className={cx(s["banner-upload"], meta.helicopter_image ? s.isFilled : null)}>
                  {meta.helicopter_image ? (
                    <img src={meta.helicopter_image.src} onClick={this.openPhotoGallery} />
                  ) : (
                    <Button className={cx("pt-button pt-minimal")} onClick={this.openPhotoGallery}>
                      Add Helicopter Image
                    </Button>
                  )}
                </div>
                <span className={s["banner-label"]}>Click to choose the helicopter picture</span>
              </div>
            </Loading>
          </div>
        </div>
        {/* Featured */}
        <div className="pt-card pt-elevation-0">
          <Switch label="Featured" name="featured" checked={post.meta.featured} onChange={this.toggleFeatured} />
        </div>
        {/* Featured on Evergreen Page*/}
        <div className="pt-card pt-elevation-0">
          <Switch
            label="Featured Evergreen"
            name="featured_evergreen"
            checked={post.meta.featured_evergreen}
            onChange={this.toggleFeaturedEvergreen}
          />
        </div>
      </Fragment>
    );
  }
}

EventSidebar.contextTypes = {
  fetch: PropTypes.func.isRequired,
  client: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  return {
    loading: state.events.fetching,
    dataList: state.events.dataList,
    cities: state.cities.byId,
  };
};

export default connect(mapStateToProps, { fetchEventPostForEditor, fetchMedia, fetchSelectedCities })(
  withStyles(s)(EventSidebar),
);
