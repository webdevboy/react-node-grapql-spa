import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import cx from "classnames";
import s from "./PrivateJetCharterBetweenTwoCities.css";
import { connect } from "react-redux";
import { Toaster, Position, Intent, MenuItem, Button, Switch } from "@blueprintjs/core";
import { Suggest, MultiSelect } from "@blueprintjs/labs";
import TooltipLabel from "admin/components/TooltipLabel";
import Loading from "react-loading-animation";
import LoadingSpinner from "admin/components/LoadingSpinner";
import _ from "lodash";
import PhotoGallery from "admin/components/PhotoGallery";
import MediaGallery from "admin/components/MediaGallery";
import Action from "admin/components/Action";
import { fetchMedia } from "admin/actions/media";
import { fetchPosts } from "admin/actions/posts";
import { fetchCities, fetchCitiesForEditor, fetchSelectedCities } from "admin/actions/cities";
import Sidebar from "admin/components/Sidebar";
import Editor from "admin/components/Editor";
import CitySelect from "admin/components/select/CitySelect";

class PrivateJetCharterBetweenTwoCitiesSidebar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedAircraftPosts: [],
      selectedFirstairportPosts: [],
      selectedSecondairportPosts: [],
      selectedHeliportPosts: [],
      aircraftPosts: [],
      airportPosts: [],
      heliportPosts: [],
      firstCity: null,
      secondCity: null,
      postFetched: false,
      isGalleryLoading: false,
      isTeaserLoading: false,
      suggestEdited: false,
    };
  }

  componentDidMount() {
    const {
      posts,
      cities,
      post: {
        meta: {
          aircraft_list,
          recommended_firstairports,
          recommended_secondairports,
          recommended_heliports,
          first_city_sfid,
          second_city_sfid,
        },
      },
    } = this.props;

    if (this.filterOriginalItems(posts, aircraft_list).length === 0) {
      this.props.fetchPosts({
        type: "airport",
      });
      this.props.fetchPosts({
        type: "heliport",
      });
      this.props.fetchPosts({
        type: "aircraft",
      });
    }
    let listCity = [];
    first_city_sfid && listCity.push(first_city_sfid);
    second_city_sfid && listCity.push(second_city_sfid);
    listCity.length > 0 && this.props.fetchSelectedCities(listCity);
  }

  componentWillReceiveProps(nextProps) {
    const {
      posts,
      cities,
      isPostLoading,
      isCityLoading,
      post: {
        meta: {
          aircraft_list,
          recommended_firstairports,
          recommended_secondairports,
          recommended_heliports,
          first_city_sfid,
          second_city_sfid,
        },
      },
    } = nextProps;

    this.setState({
      airportPosts: posts.filter(post => post.type === "airport"),
      heliportPosts: posts.filter(post => post.type === "heliport"),
      aircraftPosts: posts.filter(post => post.type === "aircraft"),
    });

    if (!this.state.postFetched && !isPostLoading && !isCityLoading && nextProps.posts.length) {
      this.setState({
        postFetched: true,
        selectedAircraftPosts: this.filterOriginalItems(posts, aircraft_list),
        selectedFirstairportPosts: this.filterOriginalItems(posts, recommended_firstairports),
        selectedSecondairportPosts: this.filterOriginalItems(posts, recommended_secondairports),
        selectedHeliportPosts: this.filterOriginalItems(posts, recommended_heliports),
      });
    }

    if (first_city_sfid && cities && cities.cities) {
      const filteredCities = cities.cities.filter(city => city.sfid === first_city_sfid);

      if (filteredCities.length) {
        this.setState({
          firstCity: filteredCities[0],
        });
      }
    }

    if (second_city_sfid && cities && cities.cities) {
      const filteredCities = cities.cities.filter(city => city.sfid === second_city_sfid);

      if (filteredCities.length) {
        this.setState({
          secondCity: filteredCities[0],
        });
      }
    }
  }

  openMediaGallery = async () => {
    this.setState({ isGalleryLoading: true });
    const data = await this.props.fetchMedia({ mimetype: "video%" });
    const photos = [];

    data.files.medias.forEach(file => {
      const photo = {
        id: file.id,
        src: this.getMediaThumbnailUrl(file.src),
        width: 4,
        height: 3,
      };
      if (
        this.props.post.meta.aircraft_gallery &&
        _.find(this.props.post.meta.aircraft_gallery, selPhoto => selPhoto.media_id === file.id)
      ) {
        photo.selected = true;
      }
      photos.push(photo);
    });
    this.setState({ isGalleryLoading: false });
    this.photogallery.openGallery(photos);
  };

  selectMedia = media => {
    this.props.onMetaChange({
      ...this.props.post.meta,
      difference_video: media,
    });
  };

  renderPostItem = ({ handleClick, item, isActive, type }) => {
    return (
      <MenuItem
        className={cx(isActive ? s.isActive : null)}
        key={type === "city" ? item.sfid : item.id}
        text={type === "city" ? `${item.name}, ${item.country.name}` : item.title}
        onClick={handleClick}
      />
    );
  };

  renderPostTag = item => item.slug;

  addPost = (item, type) => {
    const typeStr = this.capitalizeFirstLetter(type);

    if (type === "city") {
      this.setState({ city: item });
      this.props.onMetaChange({
        ...this.props.post.meta,
        city_sfid: item.sfid,
      });
    } else {
      let selectedPosts = this.state[`selected${typeStr}Posts`];

      selectedPosts = selectedPosts.filter((post, i) => i !== this.getSelectedPostIndex(item, type));
      selectedPosts = [...selectedPosts, item];

      const updatedState = {};
      updatedState[`selected${typeStr}Posts`] = selectedPosts;
      this.setState(updatedState);

      const updatedMeta = {};
      const metaKey = type === "aircraft" ? `${type}_list` : `recommended_${type}s`;
      updatedMeta[metaKey] = selectedPosts.map(post => ({ post_uuid: post.id }));
      this.props.onMetaChange({
        ...this.props.post.meta,
        ...updatedMeta,
      });
    }
  };

  addCity = (item, type) => {
    this.setState({ [`${type}City`]: item });
    this.props.onMetaChange({
      ...this.props.post.meta,
      [`${type}_city_sfid`]: item.sfid,
    });
  };

  filterPost = (query, item, index) => {
    const entry = _.toLower(`${item.title}`);
    const loweredQuery = query.toLowerCase();
    return String(entry).includes(loweredQuery);
  };

  handleClear = type => {
    const typeStr = this.capitalizeFirstLetter(type);

    const clearedState = {};
    const stateKey = `selected${typeStr}Posts`;
    clearedState[stateKey] = [];
    this.setState(clearedState);

    const clearedMeta = {};
    const metaKey = type === "aircraft" ? `${type}_list` : `recommended_${type}s`;
    clearedMeta[metaKey] = [];
    this.props.onMetaChange({
      ...this.props.post.meta,
      ...clearedMeta,
    });
  };

  handleTagRemove = (_tag, index, type) => {
    const typeStr = this.capitalizeFirstLetter(type);
    const stateKey = `selected${typeStr}Posts`;
    let selectedPosts = this.state[stateKey];

    selectedPosts = selectedPosts.filter((post, i) => i !== index);

    const removedState = {};
    removedState[stateKey] = selectedPosts;
    this.setState(removedState);

    const removedMeta = {};
    const metaKey = type === "aircraft" ? `${type}_list` : `recommended_${type}s`;
    removedMeta[metaKey] = selectedPosts.map(post => ({ post_uuid: post.id }));
    this.props.onMetaChange({
      ...this.props.post.meta,
      ...removedMeta,
    });
  };

  getMediaThumbnailUrl(src) {
    const video = document.createElement("video");
    video.src = src;
    video.autoplay = false;

    const canvas = document.createElement("canvas");
    canvas.width = 320;
    canvas.height = 240;
    const context = canvas.getContext("2d");
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    return canvas.toDataURL("image/jpeg");
  }

  getSelectedPostIndex(post, type) {
    const typeStr = this.capitalizeFirstLetter(type);
    return this.state[`selected${typeStr}Posts`].indexOf(post);
  }

  filterOriginalItems = (posts, selectedItems) => {
    return posts.filter(v => (selectedItems || []).map(_v => _v && _v.post_uuid).indexOf(v.id) !== -1);
  };

  capitalizeFirstLetter = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  handleChangeTeaser = e => {
    this.props.onMetaChange({
      ...this.props.post.meta,
      [e.target.name]: e.target.value,
    });
  };

  selectTeaser = photo => {
    this.props.onMetaChange({
      ...this.props.post.meta,
      teaser_image: {
        id: photo.id,
        src: photo.src,
      },
    });
  };

  removeTeaserPhoto = () => {
    this.props.onMetaChange({
      ...this.props.post.meta,
      teaser_image: null,
    });
  };

  openTeaserGallery = async () => {
    this.setState({ isTeaserLoading: true });
    const data = await this.props.fetchMedia({ mimetype: "image%" });
    let photos = [];
    data.files.medias.forEach(file => {
      const photo = { id: file.id, src: file.src, width: 4, height: 3 };
      if (this.props.post.media && photo.id === this.props.post.media.id) {
        photo.selected = true;
      } else if (this.props.post.media_id && photo.id === this.props.post.media_id) {
        photo.selected = true;
      }
      photos.push(photo);
    });
    this.setState({ isTeaserLoading: false });
    this.teasergallery.openGallery(photos);
  };

  toggleFeatured = () => {
    this.props.onMetaChange({
      ...this.props.post.meta,
      featured_homepage: !this.props.post.meta.featured_homepage,
    });
  };

  render() {
    const { handleChange, currentRoute, post, isEdit, isTranslate, isDuplicate, categories } = this.props;
    const { suggestEdited, firstCity, secondCity } = this.state;
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
      minimal: false,
    });
    const getClearButton = type => {
      const typeStr = this.capitalizeFirstLetter(type);
      return this.state[`selected${typeStr}Posts`].length > 0 ? (
        <Button iconName="pt-icon-cross" minimal onClick={() => this.handleClear(type)} />
      ) : null;
    };

    return (
      <Fragment>
        <PhotoGallery onRef={ref => (this.photogallery = ref)} selectPhoto={this.selectMedia} />
        <MediaGallery
          onRef={ref => (this.teasergallery = ref)}
          selectPhoto={this.selectTeaser}
          currentRoute={currentRoute}
        />
        {/* <div className="pt-form-group">
          <label className="pt-label" htmlFor="files">
            Media
          </label>
          {this.state.isGalleryLoading ? (
            <LoadingSpinner />
          ) : (
            <Button className="pt-button pt-minimal" onClick={this.openMediaGallery}>
              Add Media
            </Button>
          )}
        </div> */}
        {/* FIRST CITY */}
        <div className="pt-form-group">
          <label className="pt-label" htmlFor="first_city">
            <TooltipLabel label="First City" required tooltip="Please select the first city" />
            <CitySelect
              onItemSelect={item => {
                this.addCity(item, "first");
              }}
              currentItem={firstCity}
            />
          </label>
        </div>

        {/* SECOND CITY */}
        <div className="pt-form-group">
          <label className="pt-label" htmlFor="second_city">
            <TooltipLabel label="Second City" required tooltip="Please select the second city" />
            <CitySelect
              onItemSelect={item => {
                this.addCity(item, "second");
              }}
              currentItem={secondCity}
            />
          </label>
        </div>

        <div className="pt-form-group">
          <label className="pt-label" htmlFor="selectedAircraftPosts">
            <TooltipLabel label="Aircraft Lists" required tooltip="Please select posts" />
            <MultiSelect
              name="aircraft_list"
              items={this.state.aircraftPosts}
              popoverProps={{ className: s.suggester }}
              itemRenderer={this.renderPostItem}
              tagRenderer={this.renderPostTag}
              onItemSelect={item => this.addPost(item, "aircraft")}
              itemPredicate={this.filterPost}
              selectedItems={this.state.selectedAircraftPosts}
              tagInputProps={{
                tagProps: getTagProps,
                onRemove: (_tag, index) => this.handleTagRemove(_tag, index, "aircraft"),
                rightElement: getClearButton("aircraft"),
              }}
              noResults={this.props.isPostLoading ? Loading : NoResults}
            />
          </label>
        </div>
        {/*First Recommended Airport*/}
        <div className="pt-form-group">
          <label className="pt-label" htmlFor="selectedFirstAirportPosts">
            <TooltipLabel label="First Recommended Airports" required tooltip="Please select the first airports" />
            <MultiSelect
              name="first_airport_list"
              items={this.state.airportPosts}
              popoverProps={{ className: cx(s["suggester"]) }}
              itemRenderer={args => this.renderPostItem({ ...args, type: "airport" })}
              tagRenderer={item => this.renderPostTag(item, "airport")}
              onItemSelect={item => this.addPost(item, "firstairport")}
              itemPredicate={this.filterPost}
              selectedItems={this.state.selectedFirstairportPosts}
              tagInputProps={{
                tagProps: getTagProps,
                onRemove: (_tag, index) => this.handleTagRemove(_tag, index, "firstairport"),
                rightElement: getClearButton("firstairport"),
              }}
              noResults={this.props.isPostLoading ? Loading : NoResults}
            />
          </label>
        </div>
        {/*Second Recommended Airport*/}
        <div className="pt-form-group">
          <label className="pt-label" htmlFor="selectedAirportPosts">
            <TooltipLabel label="Second Recommended Airports" required tooltip="Please select the second airports" />
            <MultiSelect
              name="second_airport_list"
              items={this.state.airportPosts}
              popoverProps={{ className: cx(s["suggester"]) }}
              itemRenderer={args => this.renderPostItem({ ...args, type: "airport" })}
              tagRenderer={item => this.renderPostTag(item, "secondairport")}
              onItemSelect={item => this.addPost(item, "secondairport")}
              itemPredicate={this.filterPost}
              selectedItems={this.state.selectedSecondairportPosts}
              tagInputProps={{
                tagProps: getTagProps,
                onRemove: (_tag, index) => this.handleTagRemove(_tag, index, "secondairport"),
                rightElement: getClearButton("secondairport"),
              }}
              noResults={this.props.isPostLoading ? Loading : NoResults}
            />
          </label>
        </div>
        <div className="pt-form-group">
          <label className="pt-label" htmlFor="selectedHeliportPosts">
            <TooltipLabel label="Recommended Heliports" required tooltip="Please select heliports" />
            <MultiSelect
              name="heliport_list"
              items={this.state.heliportPosts}
              popoverProps={{ className: cx(s["suggester"]) }}
              itemRenderer={args => this.renderPostItem({ ...args, type: "heliport" })}
              tagRenderer={item => this.renderPostTag(item, "heliport")}
              onItemSelect={item => this.addPost(item, "heliport")}
              itemPredicate={this.filterPost}
              selectedItems={this.state.selectedHeliportPosts}
              tagInputProps={{
                tagProps: getTagProps,
                onRemove: (_tag, index) => this.handleTagRemove(_tag, index, "heliport"),
                rightElement: getClearButton("heliport"),
              }}
              noResults={this.props.isPostLoading ? Loading : NoResults}
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
                    !post.meta.featured_homepage ? "pt-icon-star-empty" : "pt-icon-star",
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
          <label className="pt-label" htmlFor="teaserText">
            <TooltipLabel label="Teaser Text" tooltip="Teaser text, Maximum length of 80 Characters" />
            <textarea
              style={{ minHeight: "80px" }}
              maxLength={160}
              name="teaser_text"
              className="pt-input pt-fill"
              id="teaser_text"
              value={post.meta.teaser_text}
              onChange={this.handleChangeTeaser}
              placeholder="Teaser Text"
            />
          </label>
        </div>
        <div className="pt-form-group">
          <label className="pt-label" htmlFor="files">
            Teaser Image
          </label>
          {this.state.isTeaserLoading ? (
            <LoadingSpinner />
          ) : (
            <div className={s["banner-placeholder"]}>
              {post.meta.teaser_image ? (
                <Action
                  key="item-action-remove"
                  className="button-remove"
                  icon="pt-icon-remove"
                  intent="pt-intent-danger"
                  action={this.removeTeaserPhoto}
                  tooltip="Remove Image"
                />
              ) : null}
              <div className={cx(s["banner-upload"], post.meta.teaser_image ? s.isFilled : null)}>
                {post.meta.teaser_image ? (
                  <img src={post.meta.teaser_image.src} onClick={this.openTeaserGallery} />
                ) : (
                  <Button className={cx("pt-button pt-minimal")} onClick={this.openTeaserGallery}>
                    Add Teaser Image
                  </Button>
                )}
              </div>
              <span className={s["banner-label"]}>Click to choose the teaser picture</span>
            </div>
          )}
        </div>
      </Fragment>
    );
  }
}

PrivateJetCharterBetweenTwoCitiesSidebar.contextTypes = {
  fetch: PropTypes.func.isRequired,
  client: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  return {
    posts: (Object.values(state.posts.byId) || []).filter(
      post =>
        ownProps.post && ownProps.post.language
          ? post.language.id === ownProps.post.language.id
          : post.language.id === state.runtime.availableLocales[state.runtime.defaultLocale].id,
    ),

    cities: state.cities.byId,
    isPostLoading: state.posts.isLoading,
    isCityLoading: state.cities.isLoading,
  };
};

export default connect(mapStateToProps, {
  fetchPosts,
  fetchMedia,
  fetchCities,
  fetchSelectedCities,
  fetchCitiesForEditor,
})(withStyles(s)(PrivateJetCharterBetweenTwoCitiesSidebar));
