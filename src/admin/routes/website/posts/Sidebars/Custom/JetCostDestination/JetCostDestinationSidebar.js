import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import cx from "classnames";
import s from "./JetCostDestination.css";
import { connect } from "react-redux";
import { Toaster, Position, Intent, MenuItem, Button } from "@blueprintjs/core";
import { MultiSelect, Suggest } from "@blueprintjs/labs";
import TooltipLabel from "admin/components/TooltipLabel";
import Loading from "react-loading-animation";
import _ from 'lodash';
import { fetchPosts } from "admin/actions/posts";
import { fetchEmptyLegs } from "admin/actions/emptyLegs";
import { fetchCities, fetchCitiesForEditor } from "admin/actions/cities";
import Sidebar from "admin/components/Sidebar";
import Editor from "admin/components/Editor";

class JetCostDestinationSidebar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedPosts: [],
      selectedEmptyLegs: [],
      emptyLegs: [],
      posts: [],
      cities: [],
      city: null,
      fetched: false,
      suggestEdited: false,
      loading: true
    }
  }

  componentDidMount() {
    const {
      posts,
      cities,
      emptyLegs,
      post: {
        meta: {
          empty_leg_list,
          other_destinations,
          city_sfid
        }
      }
    } = this.props;

    if (this.filterOriginalItems(emptyLegs, empty_leg_list).length === 0) {
      this.props.fetchEmptyLegs();
    }

    if (this.filterOriginalItems(posts, other_destinations).length === 0) {
      this.props.fetchPosts({
        type: 'airport'
      });
    }

    // if (this.filterOriginalItems(cities, [city_sfid]).length === 0) {
    //   this.props.fetchCities();
    // }

    // if (city_sfid) {
    //   const filteredCities = cities.filter(city => city.sfid === city_sfid);  
    //   if (filteredCities.length) {
    //     this.setState({
    //       city: filteredCities[0]
    //     });
    //     this.modelInput.setState({selectedItem: filteredCities[0]});
    //   }      
    // }

    this.props.fetchCitiesForEditor();
  }

  componentWillReceiveProps(nextProps) {
    const {
      posts,
      cities,
      emptyLegs,
      isPostLoading,
      isEmptyLegLoading,
      post: {
        meta: {
          empty_leg_list,
          other_destinations,
          city_sfid
        }
      },
    } = nextProps;
    let citiesArray = [];
    if (cities && cities.length > 1) {
      citiesArray = this.mergeCitiesAndCountries(cities[1], cities[0]);
      this.setState({
        loading: false
      });
    }

    this.setState({
      emptyLegs,      
      posts: posts.filter(post => post.type ==='airport'),
      cities: citiesArray,
      loading: isEmptyLegLoading || isPostLoading
    });

    if (city_sfid) {
      const filteredCities = citiesArray.filter(city => city.sfid === city_sfid);

      if (filteredCities.length) {
        this.setState({
          city: filteredCities[0]
        });
      }
    }

    if (!this.state.fetched && !isPostLoading && !isEmptyLegLoading
          && nextProps.posts.length && nextProps.emptyLegs.length) {
      this.setState({
        fetched: true,
        selectedPosts: this.filterOriginalItems(posts, other_destinations),
        selectedEmptyLegs: this.filterOriginalItems(emptyLegs, empty_leg_list),
      });
    }

    if (city_sfid) {
      const filteredCities = cities.filter(city => city.sfid === city_sfid);  
      if (filteredCities.length) {
        this.setState({
          city: filteredCities[0]
        });
        // this.modelInput.setState({selectedItem: filteredCities[0]});
      }      
    }
  }

  renderPostItem = ({ handleClick, item, isActive, type }) => {
    let text = '';
    if (type === 'emptyLeg') {
      text = `${item.from_airport.name}, ${item.from_airport.city.name}, ${item.from_airport.city.country.name} 
      => ${item.to_airport.name}, ${item.to_airport.city.name}, ${item.to_airport.city.country.name}`;
    } else if (type === 'city') {
      text = `${item.name}, ${item.country.name}`;
    } else {
      text = item.title;
    }
    return <MenuItem
      className={cx(isActive ? s.isActive : null)}
      key={type === "city" ? item.sfid : item.id}
      text={text}
      onClick={handleClick}
    />
  };

  renderPostTag = (item, type) => 
    type === 'emptyLeg' ? 
    `${item.from_airport.name}, ${item.from_airport.city.name}, ${item.from_airport.city.country.name} 
    => ${item.to_airport.name}, ${item.to_airport.city.name}, ${item.to_airport.city.country.name}`
    : item.slug;

  addPost = (item, type) => {
    const typeStr = this.capitalizeFirstLetter(type);
    
    if (type === 'city') {
      this.setState({ city: item });
      this.props.onMetaChange({
        ...this.props.post.meta,
        city_sfid: item.sfid
      });
    } else {
      let selectedItems = this.state[`selected${typeStr}s`];

      selectedItems = selectedItems.filter((post, i) => i !== this.getSelectedItemIndex(item, type));
      selectedItems = [...selectedItems, item];
  
      const updatedState = {};
      updatedState[`selected${typeStr}s`] = selectedItems;
      this.setState(updatedState);
  
      const updatedMeta = {};
      const metaKey = type === 'post' ? `other_destinations` : `empty_leg_list`;
      updatedMeta[metaKey] = selectedItems.map(post => 
          (type === 'post' ? { post_uuid: post.id } : {empty_leg_id: post.id}));
      this.props.onMetaChange({
        ...this.props.post.meta,
        ...updatedMeta
      });
    }

  };

  debouncedFetch = _.debounce(() => {
    const { query } = this.state;
    console.log('fetching emptyLegs...', query);
    this.props.fetchEmptyLegs({ name: query });
  }, 500);

  filterItem = (query, item, index) => {
    const entryString = item.title || item.name || (item.from_airport && item.from_airport.name);
    const entry = _.toLower(`${entryString}`);

    if (item.from_airport && item.from_airport.name) {
      if (query !== this.state.query) {
        this.setState({ query });
        this.debouncedFetch();
      }
    }

    return String(entry).includes(query.toLowerCase());
  };

  handleClear = (type) => {
    const typeStr = this.capitalizeFirstLetter(type);

    const clearedState = {};
    const stateKey = `selected${typeStr}s`;
    clearedState[stateKey] = [];
    this.setState(clearedState);

    const clearedMeta = {};
    const metaKey = type === 'post' ? `other_destinations` : `empty_leg_list`;
    clearedMeta[metaKey] = [];
    this.props.onMetaChange({
      ...this.props.post.meta,
      ...clearedMeta
    });
  };

  handleTagRemove = (_tag, index, type) => {

    const typeStr = this.capitalizeFirstLetter(type);
    const stateKey = `selected${typeStr}s`;
    let selectedItems = this.state[stateKey];

    selectedItems = selectedItems.filter((post, i) => i !== index);

    const removedState = {};
    removedState[stateKey] = selectedItems;
    this.setState(removedState);

    const removedMeta = {};
    const metaKey = type === 'post' ? `other_destinations` : `empty_leg_list`;
    removedMeta[metaKey] = selectedItems;
    this.props.onMetaChange({
      ...this.props.post.meta,
      ...removedMeta
    });
  };

  getSelectedItemIndex(item, type) {
    const typeStr = this.capitalizeFirstLetter(type);
    return this.state[`selected${typeStr}s`].indexOf(item);
  }

  filterOriginalItems = (posts, selectedItems) => {
    return posts.filter(v =>
      (selectedItems || []).map(_v => _v && (_v.post_uuid || _v.empty_leg_id)).indexOf(v.id) !== -1)
  }
  
  capitalizeFirstLetter = (string) => {
      return string.charAt(0).toUpperCase() + string.slice(1);
  }

  mergeCitiesAndCountries(cities, countries) {
    let citiesArray = [];
    let citiesName = [];
    let defaultCountry = {
      name: "Unknown",
      countryCode: "FR"
    };   

    cities.map(city => {
      // Check if city is dupe
      if (citiesName.indexOf(city.name) === -1) {
        citiesName.push(city.name);
        let cityArray = {};
        let cityCountry = defaultCountry;
        cityArray["sfid"] = city.sfid;
        cityArray["name"] = city.name;
        cityArray["country_code"] = city.country_code;

        for (var i = 0; i < countries.length; i++) {
          if (countries[i].sfid === city.country_code) {
            cityCountry = countries[i];
            break;
          }
        }

        cityArray["country"] = cityCountry;
        citiesArray.push(cityArray);
      }
    });
    return citiesArray;
  }

  render() {
    const { handleChange, post, categories, isEdit, isTranslate, isDuplicate } = this.props;
    const { suggestEdited, city, loading } = this.state;

    const Loading = (
      <MenuItem
        className={s.menuloader}
        text="Fetching Models ..."
        label={<Button type="button" className={cx("pt-button pt-fill pt-minimal")} loading />}
      />
    );

    const NoResults = <MenuItem iconName="pt-icon-issue" text="No Results" intent={Intent.WARNING} />;
    const getTagProps = (_value, index) => ({
      intent: Intent.NONE,
      minimal: false
    });
    const getClearButton = (type) => {
      const typeStr = this.capitalizeFirstLetter(type);
      return this.state[`selected${typeStr}s`].length > 0 ? (
        <Button iconName="pt-icon-cross" minimal onClick={() => this.handleClear(type)} />
      ) : null;
    }
    return (
      <Fragment>
        <div className="pt-form-group">
          <label className="pt-label" htmlFor="city">
            <TooltipLabel label="City" required tooltip="Please select a city" />
            <Suggest
              // ref={this.refHandlers.manufacturerInput}
              name="city"
              inputProps={
                (isEdit || isTranslate || isDuplicate) && !suggestEdited
                  ? {
                      value: city ? `${city.name}, ${city.country.name}` : "",
                      onChange: e => {
                        this.setState({ suggestEdited: true });
                      }
                    }
                  : {}
              }
              items={this.state.cities}
              popoverProps={{ className: s.suggester }}
              itemRenderer={args => this.renderPostItem({ ...args, type: "city" })}
              className="pt-fill"
              onItemSelect={(item) => this.addPost(item, 'city')}
              itemPredicate={this.filterItem}
              ref={ref => this.modelInput = ref}
              resetOnSelect
              inputValueRenderer={item => `${item.name}, ${item.country.name}`}
              noResults={loading ? Loading : NoResults}
            />
          </label>
        </div>
        <div className="pt-form-group">
          <label className="pt-label" htmlFor="selectedEmptyLegs">
            <TooltipLabel label="Empty Leg Lists" tooltip="Please select empty legs" />
            <MultiSelect
              name="empty_leg_list"
              items={this.state.emptyLegs}
              popoverProps={{ className: s.suggester }}
              itemRenderer={(args) => this.renderPostItem({...args, type: 'emptyLeg'})}
              tagRenderer={(item) => this.renderPostTag(item, 'emptyLeg')}
              onItemSelect={(item) => this.addPost(item, 'emptyLeg')}
              itemPredicate={this.filterItem}
              selectedItems={this.state.selectedEmptyLegs}
              tagInputProps={{
                tagProps: getTagProps,
                onRemove: (_tag, index) => this.handleTagRemove(_tag, index, 'emptyLeg'),
                rightElement: getClearButton('emptyLeg')
              }}
              noResults={loading ? Loading : NoResults}
            />
          </label>
        </div>
        <div className="pt-form-group">
          <label className="pt-label" htmlFor="selectedPosts">
            <TooltipLabel label="Other Destinations" required tooltip="Please select other destination" />
            <MultiSelect
              name="other_destinations"
              items={this.state.posts}
              popoverProps={{ className: s.suggester }}
              itemRenderer={(args) => this.renderPostItem({...args, type: 'post'})}
              tagRenderer={(item) => this.renderPostTag(item, 'post')}
              onItemSelect={(item) => this.addPost(item, 'post')}
              itemPredicate={this.filterItem}
              selectedItems={this.state.selectedPosts}
              tagInputProps={{
                tagProps: getTagProps,
                onRemove: (_tag, index) => this.handleTagRemove(_tag, index, 'post'),
                rightElement: getClearButton('post')
              }}
              noResults={loading ? Loading: NoResults}
            />
          </label>
        </div>
      </Fragment>
    );
  }
}

JetCostDestinationSidebar.contextTypes = {
  fetch: PropTypes.func.isRequired,
  client: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  return {
    posts: (Object.values(state.posts.byId) || [])
        .filter( post => 
          (ownProps.post && ownProps.post.language ? post.language.id === ownProps.post.language.id :
          post.language.id === state.runtime.availableLocales[state.runtime.defaultLocale].id)),
    emptyLegs: (Object.values(state.emptyLegs.byId) || []),
    cities: Object.values(state.cities.byId) || [],
    isPostLoading: state.posts.isLoading,
    isEmptyLegLoading: state.emptyLegs.isFetching
  }
};

export default connect(mapStateToProps, { fetchPosts, fetchEmptyLegs, fetchCities, fetchCitiesForEditor })(
  withStyles(s)(JetCostDestinationSidebar)
);
