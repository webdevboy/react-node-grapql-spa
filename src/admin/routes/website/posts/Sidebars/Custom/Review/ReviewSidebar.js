import React, { Component, Fragment } from "react";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import cx from "classnames";
import s from "./Review.css";
import { connect } from "react-redux";
import { Intent, MenuItem, Button, Switch } from "@blueprintjs/core";
import { Suggest } from "@blueprintjs/labs";
import TooltipLabel from "admin/components/TooltipLabel";
import * as _ from 'lodash';

import DatePicker from "react-datepicker";
import datepicker from "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

import { fetchAllAirports } from "admin/actions/airports";

class ReviewSidebar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      airport: {},
      query: {
        to: '',
        from: ''
      }
    }
  }

  componentDidMount() {
    this.props.fetchAirports(null, 50);
    const { post } = this.props;
    if ( post && post.meta && post.meta.details ) {
      this.modelFromInput.setState({selectedItem: post.meta.details.from_airport || ''});
      this.modelToInput.setState({selectedItem: post.meta.details.to_airport || ''});
    }
  }

  renderPostItem = ({ handleClick, item, isActive }) => (
    <MenuItem
      className={cx(isActive ? s.isActive : null)}
      key={item.id}
      text={item.title}
      onClick={handleClick}
    />
  );

  selectFromAirport = (airport) => {
    this.props.onMetaChange({
      ...this.props.post.meta,
      details: {
        ...this.props.post.meta.details,
        from_airport: airport,
        date: Date.now()
      }
    });
  }

  selectToAirport = (airport) => {
    this.props.onMetaChange({
      ...this.props.post.meta,
      details: {
        ...this.props.post.meta.details,
        to_airport: airport,
        date: Date.now()
      }
    });
  }

  reviewChange = (e) => {
    this.props.onMetaChange({
      ...this.props.post.meta,
      review: e.target.value
    });
  } 

  renderAirportItem = ({ handleClick, item, isActive }) => (
    <MenuItem
      className={cx(isActive ? s.isActive : null)}
      key={item.sfid}
      text={item.full_name}
      onClick={handleClick}
    />
  );

  fetchAirports = (type) => {
    const { query } = this.state;
    console.log('fetching airports...', query[type]);
    this.props.fetchAirports(query[type], 10);
  }

  debouncedFetch = (type) => _.debounce(() => this.fetchAirports(type), 500);

  filterAirports = (query, items, type) => {
    const loweredQuery = query.toLowerCase();
    if (query !== this.state.query[type]) {
      this.setState({
        query: {
          ...this.state.query,
          [type]: query
        }
      });
      this.debouncedFetch(type)();
    }

    return items.filter(item => item.name.toLowerCase().includes(loweredQuery));
  };

  toggleFeatured = () => {
    this.props.onMetaChange({
      ...this.props.post.meta,
      featured_homepage: !this.props.post.meta.featured_homepage
    });
  };

  updateReviewerName(e) {
    this.props.onMetaChange({
      ...this.props.post.meta,
      reviewer_name: e.target.value,
    });
  };

  handleDateChange(newDate) {
    this.props.onMetaChange({
      ...this.props.post.meta,
      review_date: moment(newDate).format('LL')
    });
  }

  render() {
    const { handleChange, sflist, post } = this.props;
    const { query } = this.state;
    
    const Loading = (
      <MenuItem
        className={s.menuloader}
        text="Fetching Models ..."
        label={<Button type="button" className={cx("pt-button pt-fill pt-minimal")} loading />}
      />
    );
    const NoResults = <MenuItem iconName="pt-icon-issue" text="No Results" intent={Intent.WARNING} />;
    
    return (
      <Fragment>
        <div className="pt-form-group">
          <label className="pt-label" htmlFor="manufacturer">
            <TooltipLabel label="Review" tooltip="Please write a review" />
            <textarea
              style={{ minHeight: "80px" }}
              name="review"
              className="pt-input pt-fill"
              id="review"
              value={post.meta.review || ''}
              onChange={(e) => this.reviewChange(e)}
              placeholder="Review"
            />
          </label>
        </div>
        <div className="pt-card pt-elevation-0">
          <Switch
            label={
              <div className={s.labelFeatured}>
                <span
                  className={cx(
                    s.star,
                    "pt-icon",
                    !post.meta.featured_homepage ? "pt-icon-star-empty" : "pt-icon-star"
                  )}
                />
                <span>Is Featured HomePage?</span>
              </div>
            }
            name="featured"
            checked={post.meta.featured_homepage}
            onChange={this.toggleFeatured}
          />
        </div>
        <div className="pt-form-group">
          <label className="pt-label" htmlFor="manufacturer">
            <TooltipLabel label="From Airport" required tooltip="Please select an airport from Salesforce" />
            <Suggest
              ref={ref => this.modelFromInput = ref}
              name="from_airport"
              items={sflist}
              popoverProps={{ className: s.suggester }}
              itemRenderer={this.renderAirportItem}
              className="pt-fill"
              onItemSelect={this.selectFromAirport}
              itemListPredicate={(query, items) => {
                return this.filterAirports(query, items, 'from')
              }}
              resetOnSelect
              inputValueRenderer={item => `${item.full_name}`}
              noResults={NoResults}
            />
          </label>
        </div>
        <div className="pt-form-group">
          <label className="pt-label" htmlFor="manufacturer">
            <TooltipLabel label="To Airport" required tooltip="Please select an airport from Salesforce" />
            <Suggest
              ref={ref => this.modelToInput = ref}
              name="to_airport"
              items={sflist}
              popoverProps={{ className: s.suggester }}
              itemRenderer={this.renderAirportItem}
              className="pt-fill"
              onItemSelect={this.selectToAirport}
              itemListPredicate={(query, items) => {
                return this.filterAirports(query, items, 'to')
              }}
              resetOnSelect
              inputValueRenderer={item => `${item.full_name}`}
              noResults={NoResults}
            />
          </label>
        </div>
        <div className="pt-form-group">
          <label className="pt-label" htmlFor="title">
            <TooltipLabel label="Reviewer Name" required tooltip="Reviewer Name" />
            <input
              type="text"
              name="reviewer_name"
              className="pt-input pt-large pt-fill"
              id="reviewer_name"
              value={post.meta.reviewer_name || ''}
              onChange={(e) => this.updateReviewerName(e)}
              placeholder="Reviewer Name"
            />
          </label>
        </div>
        <div className="pt-form-group">
          <label className="pt-label" htmlFor="title">
            <TooltipLabel label="Date of the Review" required tooltip="Date of the Review" />
            <DatePicker
              className="pt-input pt-fill w-100"
              selected={moment(post.meta.review_date)}
              onChange={date => this.handleDateChange(date)}
              autoFocus={false}
              readOnly={true}
              shouldCloseOnSelect={false}
              dateFormat="DD/MM/YYYY"
              placeholderText="DD/MM/YYYY"
              locale={post.language.locale || "en-GB"}
            />
          </label>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  loading: state.airports.fetching,
  sflist: state.airports.sflist
});

const mapDispatchToProps = dispatch => ({
  fetchAirports: (search, limit) => dispatch(fetchAllAirports(search, limit))
});

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(datepicker, s)(ReviewSidebar)
);
