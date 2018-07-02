import React, { Component, Fragment } from "react";
import * as _ from "lodash";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import cx from "classnames";
import s from "./PrivateJetChaterManufacturerSideBar.css";
import { connect } from "react-redux";
import { Toaster, Position, Intent, MenuItem, Button } from "@blueprintjs/core";
import { Suggest, MultiSelect } from "@blueprintjs/labs";
import TooltipLabel from "admin/components/TooltipLabel";
import Loading from "react-loading-animation";
import LoadingSpinner from "admin/components/LoadingSpinner";
import MediaGallery from "admin/components/MediaGallery";
import Action from "admin/components/Action";
import { fetchMedia } from "admin/actions/media";
import { fetchPosts } from "admin/actions/posts";
import { fetchCities } from "admin/actions/cities";
import { fetchManufacturers } from "admin/actions/manufacturers";
import Sidebar from "admin/components/Sidebar";
import Editor from "admin/components/Editor";

class PrivateJetChaterManufacturerSideBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedAircraftPosts: [],
      aircraftPosts: [],
      manufacturers: [],
      manufacturer_sfid: "",
      postFetched: false,
      isGalleryLoading: false,
      suggestManuEdited: false
    };
  }

  componentDidMount() {
    const {
      posts,
      manufacturers,
      post: {
        meta: { manufacturer_sfid, aircraft_list }
      }
    } = this.props;

    if (!manufacturers.length) {
      this.props.fetchManufacturers();
    }

    if (this.filterOriginalItems(posts, aircraft_list).length === 0) {
      this.props.fetchPosts({
        type: 'aircraft'
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const {
      posts,
      manufacturers,
      isPostLoading,
      isManuLoading,
      post: {
        meta: { manufacturer_sfid, aircraft_list }
      }
    } = nextProps;
    this.setState({
      aircraftPosts: posts.filter(post => post.type === "aircraft"),
      manufacturers
    });

    if (!this.state.postFetched && !isPostLoading && !isManuLoading && nextProps.posts.length) {
      this.setState({
        postFetched: true,
        selectedAircraftPosts: this.filterOriginalItems(posts, aircraft_list)
      });
    }
  }

  filterOriginalItems = (posts, selectedItems) => {
    return posts.filter(v => (selectedItems || []).map(_v => _v && _v.post_uuid).indexOf(v.id) !== -1);
  };

  filterPost = (query, item, index) => {
    const entry = _.toLower(`${item.title}`);
    const loweredQuery = query.toLowerCase();
    return String(entry).includes(loweredQuery);
  };

  renderPostItem = ({ handleClick, item, isActive }) => (
    <MenuItem className={cx(isActive ? s.isActive : null)} key={item.id} text={item.title} onClick={handleClick} />
  );

  getSelectedPostIndex(post) {
    return this.state.selectedAircraftPosts.indexOf(post);
  }

  renderPostTag = item => item.slug;

  renderManuItem = ({ handleClick, item, isActive }) => (
    <MenuItem className={cx(isActive ? s.isActive : null)} key={item.sfid} text={item.name} onClick={handleClick} />
  );

  handleTagRemove = (_tag, index) => {
    let selectedAircraftPosts = this.state.selectedAircraftPosts;
    selectedAircraftPosts = this.state.selectedAircraftPosts.filter((post, i) => i !== index);
    this.setState({ selectedAircraftPosts });
    this.props.onMetaChange({
      ...this.props.post.meta,
      aircraft_list: selectedAircraftPosts
    });
  };

  addPost = item => {
    let selectedAircraftPosts = this.state.selectedAircraftPosts;
    if (this.getSelectedPostIndex(item) !== -1) {
      selectedAircraftPosts = selectedAircraftPosts.filter((post, i) => i !== this.getSelectedPostIndex(item));
    } else {
      selectedAircraftPosts = [...selectedAircraftPosts, item];
    }
    this.setState({ selectedAircraftPosts });
    this.props.onMetaChange({
      ...this.props.post.meta,
      aircraft_list: selectedAircraftPosts.map(post => ({ post_uuid: post.id }))
    });
  };

  handleClear = () => {
    this.setState({ selectedAircraftPosts: [] });
    this.props.onMetaChange({
      ...this.props.post.meta,
      aircraft_list: []
    });
  };

  filterManu = (query, item, index) => {
    const entry = _.toLower(`${item.name}`);
    const loweredQuery = query.toLowerCase();
    return String(entry).includes(loweredQuery);
  };

  renderManuItemValue = item => `${item.name}`;

  addManu = ({ sfid, name }) => {
    const { posts } = this.props;
    this.setState({
      manufacturer_sfid: sfid,
      selectedAircraftPosts: []
    });
    this.props.onMetaChange({
      ...this.props.post.meta,
      manufacturer_sfid: sfid,
      aircraft_list: []
    });
  };

  handleChangeTeaser = e => {
    this.props.onMetaChange({
      ...this.props.post.meta,
      [e.target.name]: e.target.value
    });
  };

  selectPhoto = photo => {
    this.props.onMetaChange({
      ...this.props.post.meta,
      teaser_image: {
        id: photo.id,
        src: photo.src
      }
    });
  };

  removeBannerPhoto = () => {
    this.props.onMetaChange({
      ...this.props.post.meta,
      teaser_image: null
    });
  };

  openPhotoGallery = async () => {
    this.setState({ isGalleryLoading: true });
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
    this.setState({ isGalleryLoading: false });
    this.photogallery.openGallery(photos);
  };

  handleChangeOrder = e => {
    this.props.onMetaChange({
      ...this.props.post.meta,
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { handleChange, currentRoute, post, categories, isEdit, isTranslate, isDuplicate } = this.props;
    const { manufacturer_sfid, aircraftPosts, suggestManuEdited, manufacturers } = this.state;
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
    const clearButton =
      this.state.selectedAircraftPosts.length > 0 ? (
        <Button iconName="pt-icon-cross" minimal onClick={this.handleClear} />
      ) : null;

    return (
      <Fragment>
        <MediaGallery
          onRef={ref => (this.photogallery = ref)}
          selectPhoto={this.selectPhoto}
          currentRoute={currentRoute}
        />
        {/* manufacturer */}
        <div className="pt-form-group">
          <label className="pt-label" htmlFor="manufacturer">
            <TooltipLabel label="Manufacturer" required tooltip="Please select a manufacturer" />
            <Suggest
              name="manufacturer"
              inputProps={
                (isEdit || isTranslate || isDuplicate) && !suggestManuEdited
                  ? {
                      value:
                        post.meta.manufacturer_sfid && manufacturers && manufacturers.length > 0
                          ? `${manufacturers.find(manu => manu.sfid === post.meta.manufacturer_sfid).name}`
                          : "",
                      onChange: e => {
                        this.setState({
                          suggestManuEdited: true,
                          manufacturer_sfid: "",
                          selectedAircraftPosts: []
                        });
                        this.props.onMetaChange({
                          ...this.props.post.meta,
                          manufacturer_sfid: "",
                          aircraft_list: []
                        });
                      }
                    }
                  : {}
              }
              items={manufacturers}
              popoverProps={{ className: s.suggester }}
              itemRenderer={this.renderManuItem}
              className="pt-fill"
              onItemSelect={this.addManu}
              itemPredicate={this.filterManu}
              resetOnSelect
              inputValueRenderer={this.renderManuItemValue}
              noResults={this.props.loading ? Loading : NoResults}
            />
          </label>
        </div>
        <div className="pt-form-group">
          <label className="pt-label" htmlFor="Aircraft Post">
            <TooltipLabel label="Aircraft Posts" required tooltip="Please select aircraft posts" />
            <MultiSelect
              name="aircraft_list"
              items={
                manufacturer_sfid ? aircraftPosts.filter(post => post.meta.manufacturer === manufacturer_sfid) : []
              }
              popoverProps={{ className: s.suggester }}
              itemRenderer={this.renderPostItem}
              tagRenderer={this.renderPostTag}
              onItemSelect={this.addPost}
              itemPredicate={this.filterPost}
              selectedItems={this.state.selectedAircraftPosts}
              tagInputProps={{ tagProps: getTagProps, onRemove: this.handleTagRemove, rightElement: clearButton }}
              noResults={this.props.loading ? Loading : NoResults}
            />
          </label>
        </div>
        <div className="pt-form-group">
          <label className="pt-label" htmlFor="order">
            <TooltipLabel label="Order" required tooltip="order of private jet charter manufacturer page" />
            <input
              maxLength={80}
              type="number"
              pattern="[0-9]*"
              name="order"
              className="pt-input pt-large pt-fill pt-bold"
              id="order"
              value={post.meta.order}
              onChange={this.handleChangeOrder}
              placeholder="Order"
            />
          </label>
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
          {this.state.isGalleryLoading ? <LoadingSpinner /> :
            <div className={s["banner-placeholder"]}>
              {post.meta.teaser_image ? (
                <Action
                  key="item-action-remove"
                  className="button-remove"
                  icon="pt-icon-remove"
                  intent="pt-intent-danger"
                  action={this.removeBannerPhoto}
                  tooltip="Remove Image"
                />
              ) : null}
              <div className={cx(s["banner-upload"], post.meta.teaser_image ? s.isFilled : null)}>
                {post.meta.teaser_image ? (
                  <img src={post.meta.teaser_image.src} onClick={this.openPhotoGallery} />
                ) : (
                  <Button className={cx("pt-button pt-minimal")} onClick={this.openPhotoGallery}>
                    Add Teaser Image
                  </Button>
                )}
              </div>
              <span className={s["banner-label"]}>Click to choose the teaser picture</span>
            </div>
          }
        </div>
      </Fragment>
    );
  }
}

PrivateJetChaterManufacturerSideBar.contextTypes = {
  fetch: PropTypes.func.isRequired,
  client: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
  return {
    posts: (Object.values(state.posts.byId) || [])
        .filter( post => 
          (ownProps.post && ownProps.post.language ? post.language.id === ownProps.post.language.id :
          post.language.id === state.runtime.availableLocales[state.runtime.defaultLocale].id)),
    manufacturers: Object.values(state.manufacturers.byId) || [],
    isPostLoading: state.posts.isLoading,
    isManuLoading: state.manufacturers.isLoading
  };
};

export default connect(mapStateToProps, { fetchMedia, fetchPosts, fetchManufacturers })(
  withStyles(s)(PrivateJetChaterManufacturerSideBar)
);
