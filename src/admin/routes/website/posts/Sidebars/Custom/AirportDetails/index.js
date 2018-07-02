import React, { Component, Fragment } from "react";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import cx from "classnames";
import s from "./AirportDetails.css";
import { connect } from "react-redux";
import { Intent, MenuItem, Button } from "@blueprintjs/core";
import { Suggest } from "@blueprintjs/labs";
import TooltipLabel from "admin/components/TooltipLabel";
import * as _ from 'lodash';

import { fetchAllAirports } from "admin/actions/airports";

class AirportSidebar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      airport: {},
      query: '',
      sfidsDispatched: [],
    }
  }

  componentDidMount() {
    if (this.props.post && this.props.post.meta && this.props.post.meta.airport_sfid) {
      this.props.fetchAirports(null, null, [this.props.post.meta.airport_sfid]);
    }
    this.props.fetchAirports(null, 50);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.sflist.length !== nextProps.sflist.length &&
        !this.state.airport.sfid &&
        this.props.post &&
        this.props.post.meta &&
        this.props.post.meta.airport_sfid) {
      const filtered = nextProps.sflist.filter(airport => airport.sfid === this.props.post.meta.airport_sfid);
      if (filtered.length) {
        this.setState({
          query: filtered[0].name
        });
        this.modelInput.setState({selectedItem: filtered[0]});
      } else if (this.state.sfidsDispatched.indexOf(this.props.post.meta.airport_sfid) === -1) {
        this.props.fetchAirports(null, null, [this.props.post.meta.airport_sfid]);
        this.setState({
          sfidsDispatched: this.state.sfidsDispatched.concat([this.props.post.meta.airport_sfid])
        })
      }
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

  selectAirport = (airport) => {
    this.props.onMetaChange({
      ...this.props.post.meta,
      airport_sfid: airport.sfid
    });
  }

  summaryChange = (e) => {
    this.props.onMetaChange({
      ...this.props.post.meta,
      summary: e.target.value
    });
  } 

  renderAirportItem = ({ handleClick, item, isActive }) => {
    return (
      <MenuItem
        className={cx(isActive ? s.isActive : null)}
        key={item.sfid}
        text={item.full_name}
        onClick={handleClick}
      />
    );
  }

  fetchAirports = () => {
    const { query } = this.state;
    console.log('fetching airports...', query);
    this.props.fetchAirports(query, 10);
  }

  debouncedFetch = _.debounce(this.fetchAirports, 500);

  filterAirports = (query, items) => {
    const loweredQuery = query.toLowerCase();
    if (query !== this.state.query) {
      this.setState({ query });
      this.debouncedFetch();
    }

    return items.filter(item => item.name && item.name.toLowerCase().includes(loweredQuery));
  };

  render() {
    const { handleChange, sflist, post } = this.props;
    const { query } = this.state;
    console.log(post);

    console.log('AIRPORTS => ',sflist);


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
            <TooltipLabel label="Short description for Airport Map" tooltip="Please write a short description for airport map" />
            <textarea
              style={{ minHeight: "80px" }}
              name="summary"
              className="pt-input pt-fill"
              id="description"
              value={post.meta.summary || ''}
              onChange={(e) => this.summaryChange(e)}
              placeholder="Short description for Airport Map"
            />
          </label>
        </div>
        <div className="pt-form-group">
          <label className="pt-label" htmlFor="manufacturer">
            <TooltipLabel label="Airport" required tooltip="Please select an airport from Salesforce" />
            <Suggest
              ref={ref => this.modelInput = ref}
              name="airport"
              items={sflist}
              popoverProps={{ className: s.suggester }}
              itemRenderer={this.renderAirportItem}
              className="pt-fill"
              onItemSelect={this.selectAirport}
              itemListPredicate={this.filterAirports}
              resetOnSelect
              inputValueRenderer={item => item.full_name}
              noResults={NoResults}
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
  fetchAirports: (search, limit, sfids) => dispatch(fetchAllAirports(search, limit, sfids))
});

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(s)(AirportSidebar)
);
