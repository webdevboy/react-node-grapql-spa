import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import cx from "classnames";
import s from "./Fleet.css";
import * as _ from "lodash";
import { connect } from "react-redux";
import { Toaster, Position, Intent, NumericInput, MenuItem, Button, Switch } from "@blueprintjs/core";
import { Suggest, MultiSelect } from "@blueprintjs/labs";
import { graphql } from "react-apollo";
import Sidebar from "admin/components/Sidebar";
import Editor from "admin/components/Editor";
import TooltipLabel from "admin/components/TooltipLabel";
import LoadingSpinner from "admin/components/LoadingSpinner";
import Loading from "react-loading-animation";
import MediaGallery from "admin/components/MediaGallery";
import MultiSelectPhotoGallery from "admin/components/MultiSelectPhotoGallery";
import Action from "admin/components/Action";
import TiPlus from "react-icons/lib/ti/plus";
import fetchSF_AircraftsManufacturers from "admin/queries/fetchSF_AircraftsManufacturers.graphql";
import fetchSF_AircraftsByManufacturer from "admin/queries/fetchSF_AircraftsByManufacturer.graphql";
import fetchDataAircraftPostEditor from "admin/queries/fetchDataAircraftPostEditor.graphql";
import { fetchMedia } from "admin/actions/media";
import { fetchDataForEditor } from "admin/actions/aircrafts";

class AircraftSidebar extends Component {
  /* refHandlers = {
    manufacturerInput: ref => (this.manufacturerInput = ref.input),
    aircraftInput: ref => (this.aircraftInput = ref.input)
  }; */
  constructor(props) {
    super(props);
    const { data } = props;
    this.state = {
      suggestManuEdited: false,
      suggestAircraftEdited: false,
      isGalleryLoading: false,
      manufacturers: [],
      aircrafts: [],
      posts: [],
      manufacturer: "",
      aircraft: "",
      similarPosts: this.props.post.meta.similar_aircraft_list ? this.props.post.meta.similar_aircraft_list : [],
    };
  }

  componentDidMount() {
    let variables = {
      type: this.props.post.type,
      language_id: this.props.post.language.id,
    };
    if (this.props.post.meta.manufacturer) {
      variables = {
        ...variables,
        manufacturer_sfid: this.props.post.meta.manufacturer,
      };
    }
    this.props.fetchDataForEditor(variables);
  }

  componentWillReceiveProps(nextProps) {
    const { dataList, post: { meta: { similar_aircraft_list } } } = nextProps;
    if (!nextProps.loading) {
	  let newState = {
        manufacturers: (dataList && dataList.manufacturers) || [],
        posts: (dataList && dataList.posts) || [],
      };
      if (this.props.post.id){
		newState = {
		  ...newState,
		  posts: (dataList && dataList.posts.filter(p => p.id !== this.props.post.id) ) || [],
		};
	  }else{
		newState = {
		  ...newState,
		  posts: (dataList && dataList.posts) || [],
		};
	  }
      if (dataList && dataList.aircrafts.length > 0 && !this.state.suggestManuEdited) {
        newState = {
          ...newState,
          aircrafts: dataList && dataList.aircrafts,
        };
      }
      if (dataList && dataList.posts.length > 0) {
        newState = {
          ...newState,
          similarPosts: this.filterOriginalPosts(dataList.posts, similar_aircraft_list),
        };
      }
      this.setState({
        ...newState,
      });
    }
  }

  filterOriginalPosts = (posts, similar_aircraft_list) =>
    posts.filter(v => (similar_aircraft_list || []).map(_v => _v.post_uuid).indexOf(v.id) !== -1);

  handleChange = e => {
    this.props.onMetaChange({
      ...this.props.post.meta,
      [e.target.name]: e.target.value,
    });
  };

  getAircraftModels = sfid => {
    const { client } = this.context;

    return new Promise((resolve, reject) => {
      client
        .query({
          query: fetchSF_AircraftsByManufacturer,
          variables: {
            manufacturer_sfid: sfid,
          },
        })
        .then(({ data }) => {
          resolve(data.aircrafts);
        });
    });
  };

  addManu = async ({ sfid, name }) => {
   this.aircraftSuggest.input.value="";
    this.aircraftSuggest.state.activeItem = null;
    this.aircraftSuggest.state.selectedItem = null;
    const aircrafts = await this.getAircraftModels(sfid);
    this.setState({
      manufacturer: sfid,
      aircrafts,
    });
    this.props.onMetaChange({
      ...this.props.post.meta,
      manufacturer: sfid,
    });
  };

  filterManu = (query, item, index) => {
    const entry = _.toLower(`${item.name}`);
    const loweredQuery = query.toLowerCase();
    return String(entry).includes(loweredQuery);
  };

  addAircraft = item => {
    this.setState({
      aircraft: item,
    });
    this.props.onMetaChange({
      ...this.props.post.meta,
      aircraft_sfid: item.sfid,
	  category: item.category_id,
    });
  };

  addPost = item => {
    let similarPosts = this.state.similarPosts;
    if (this.getSelectedPostIndex(item) !== -1) {
      similarPosts = similarPosts.filter((post, i) => i !== this.getSelectedPostIndex(item));
    } else {
      similarPosts = [...similarPosts, item];
    }
    this.setState({ similarPosts });
    this.props.onMetaChange({
      ...this.props.post.meta,
      similar_aircraft_list: similarPosts.map(post => ({ post_uuid: post.id })),
    });
  };

  handleClear = () => {
    this.setState({ similarPosts: [] });
    this.props.onMetaChange({
      ...this.props.post.meta,
      similar_aircraft_list: [],
    });
  };

  handleTagRemove = (_tag, index) => {
    let similarPosts = this.state.similarPosts;
    similarPosts = this.state.similarPosts.filter((post, i) => i !== index);
    this.setState({ similarPosts });
    this.props.onMetaChange({
      ...this.props.post.meta,
      similar_aircraft_list: similarPosts.map(post => ({ post_uuid: post.id })),
    });
  };

  filterAircraft = (query, item, index) => {
    const entry = _.toLower(`${item.name}`);
    const loweredQuery = query.toLowerCase();
    return String(entry).includes(loweredQuery);
  };

  filterPost = (query, item, index) => {
    const entry = _.toLower(`${item.title}`);
    const loweredQuery = query.toLowerCase();
    return String(entry).includes(loweredQuery);
  };

  renderPostItem = ({ handleClick, item, isActive }) => (
    <MenuItem
      className={cx(isActive ? s.isActive : null)}
      key={item.id}
      text={item.title}
      label={item.title}
      onClick={handleClick}
    />
  );

  renderManuItem = ({ handleClick, item, isActive }) => (
    <MenuItem
      className={cx(isActive ? s.isActive : null)}
      key={item.sfid}
      text={item.name}
      label={item.name}
      onClick={handleClick}
    />
  );

  renderPostTag = item => item.slug;

  getSelectedPostIndex(post) {
    return this.state.similarPosts.indexOf(post);
  }

  renderManuItemValue = item => `${item.name}`;

  renderAircraftItem = ({ handleClick, item, isActive }) => (
    <MenuItem
      className={cx(isActive ? s.isActive : null)}
      key={item.sfid}
      text={item.name}
      label={item.name}
      onClick={handleClick}
    />
  );

  renderAircraftItemValue = item => `${item.name}`;

  toggleFeatured = () => {
    this.props.onMetaChange({
      ...this.props.post.meta,
      featured: !this.props.post.meta.featured,
    });
  };

  removeCabinViewImage = () => {
    this.props.onMetaChange({
      ...this.props.post.meta,
      cabin_view_image: null,
    });
  };

  openCabinViewPhotoGallery = async () => {
    this.photoCabinViewGallery.openGallery();
  };

  selectCabinViewPhoto = photo => {
    this.props.onMetaChange({
      ...this.props.post.meta,
      cabin_view_image:{ id: photo.id, src: photo.src },
    });
  };

  removeFloorMapImage = () => {
    this.props.onMetaChange({
      ...this.props.post.meta,
      floor_map_image: null,
    });
  };

  selectFloorMapPhoto = photo => {
    this.props.onMetaChange({
      ...this.props.post.meta,
      floor_map_image:{ id: photo.id, src: photo.src },
    });
  };

  openFloorMapPhotoGallery = async () => {
    this.photoFloorMapGallery.openGallery();
  };

  openPhotoGallery = async () => {
    this.setState({ isGalleryLoading: true });
    const data = await this.props.fetchMedia({ mimetype: "image%", get_all: true });
    const photos = [];
    data.files.medias.forEach(file => {
      const photo = {
        id: file.id,
        src: file.src,
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

  selectPhoto = photos => {
    this.props.onMetaChange({
      ...this.props.post.meta,
      aircraft_gallery: photos,
    });
  };
  render() {
    const { onMetaChange, post, isEdit, isTranslate, isDuplicate, dataList, currentRoute } = this.props;
    const {suggestManuEdited, suggestAircraftEdited} = this.state;
    if (this.props.loading || !dataList) {
      return <LoadingSpinner />;
    }

    if (
      post.meta.similar_aircraft_list &&
      post.meta.similar_aircraft_list.length > 0 &&
      (isTranslate || isDuplicate) &&
      this.filterOriginalPosts(dataList.posts, post.meta.similar_aircraft_list).length === 0
    ) {
      onMetaChange({
        ...post.meta,
        similar_aircraft_list: [],
      });
      return <LoadingSpinner />;
    }

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
    const clearButton =
      this.state.similarPosts.length > 0 ? (
        <Button iconName="pt-icon-cross" minimal onClick={this.handleClear} />
      ) : null;
    return (
      <Fragment>
        <MediaGallery
          onRef={ref => (this.photoFloorMapGallery = ref)}
          selectPhoto={this.selectFloorMapPhoto}
          currentRoute={this.props.currentRoute}
        />
        <MediaGallery
          onRef={ref => (this.photoCabinViewGallery = ref)}
          selectPhoto={this.selectCabinViewPhoto}
          currentRoute={this.props.currentRoute}
        />
        {/* slider */}
        <MultiSelectPhotoGallery currentRoute={currentRoute} onRef={ref => (this.photogallery = ref)} selectPhoto={this.selectPhoto} />
        <div className="pt-form-group">
          <label className="pt-label" htmlFor="files">
            Slider
          </label>
          {this.state.isGalleryLoading ? (
            <LoadingSpinner />
          ) : (
            <div className={s["slider-placeholder"]}>
              <div className={cx(s["slider-upload"], post.meta.aircraft_gallery ? s.isFilled : null)}>
                {post.meta.aircraft_gallery ? (
                  <div className={cx(s["slider-group"])}>
                    {post.meta.aircraft_gallery.map(slide => <img className={cx(s["slide-img"])} src={slide.src} />)}
                    <Button className={cx("pt-button pt-minimal")} onClick={this.openPhotoGallery}>
                      <TiPlus size="75" color="#fff" className="btn-icon" />
                    </Button>
                  </div>
                ) : (
                  <Button className={cx("pt-button pt-minimal")} onClick={this.openPhotoGallery}>
                    <TiPlus size="75" color="#fff" className="btn-icon" />
                  </Button>
                )}
              </div>
              <span className={s["slider-label"]}>Click the '+' sign to choose the slider picture(s)</span>
            </div>
          )}
        </div>

        {/* similar posts */}
        <div className="pt-form-group">
          <label className="pt-label" htmlFor="similarPosts">
            <TooltipLabel label="Similar Aircraft Posts" required tooltip="Please select similar airport posts" />
            <MultiSelect
              name="similar_aircraft_list"
              items={this.state.posts}
              popoverProps={{ className: s.suggester }}
              itemRenderer={this.renderPostItem}
              tagRenderer={this.renderPostTag}
              onItemSelect={this.addPost}
              itemPredicate={this.filterPost}
              selectedItems={this.state.similarPosts}
              tagInputProps={{ tagProps: getTagProps, onRemove: this.handleTagRemove, rightElement: clearButton }}
              noResults={this.props.loading ? Loading : NoResults}
            />
          </label>
        </div>

        {/* manufacturer */}
        <div className="pt-form-group">
          <label className="pt-label" htmlFor="manufacturer">
            <TooltipLabel label="Manufacturer" required tooltip="Please select a manufacturer" />
            <Suggest
              // ref={this.refHandlers.manufacturerInput}
              name="manufacturer"
              inputProps={
                (isEdit || isTranslate || isDuplicate) && !suggestManuEdited
                  ? {
                      value:
                        post.meta.manufacturer && this.state.manufacturers.length > 0
                          ? `${this.state.manufacturers.find(manu => manu.sfid === post.meta.manufacturer).name}`
                          : "",
                      onChange: (e) => {this.setState({suggestManuEdited: true,});},
                    }
                  : {}
              }
              items={this.state.manufacturers}
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

        {/* aircraft model */}
        <div className="pt-form-group">
          <label className="pt-label" htmlFor="aircraft">
            <TooltipLabel label="Aircraft" required tooltip="Please select a aircraft model" />
            <Suggest
              // ref={this.refHandlers.aircraftInput}
              name="aircraft"
              inputProps={
                (isEdit || isTranslate || isDuplicate) && !suggestManuEdited && !suggestAircraftEdited
                  ? {
                      value:
                        post.meta.aircraft_sfid && this.state.aircrafts.length > 0
                          ? `${this.state.aircrafts.find(aircraft => aircraft.sfid === post.meta.aircraft_sfid).name}`
                          : "",
                      onChange: (e) => {this.setState({suggestAircraftEdited: true,});},
                    }
                  : {}
              }
              ref={ref => (this.aircraftSuggest = ref)}
              items={this.state.aircrafts}
              popoverProps={{ className: s.suggester }}
              itemRenderer={this.renderAircraftItem}
              className="pt-fill"
              onItemSelect={this.addAircraft}
              itemPredicate={this.filterAircraft}
              resetOnSelect
              inputValueRenderer={this.renderAircraftItemValue}
              noResults={this.props.loading ? Loading : NoResults}
            />
          </label>
        </div>
        <div className="pt-card pt-elevation-0">
          <Switch
            label={
              <div className={s.labelFeatured}>
                <span className={cx(s.star, "pt-icon", !post.meta.featured ? "pt-icon-star-empty" : "pt-icon-star")} />
                <span>Is Featured?</span>
              </div>
            }
            name="featured"
            checked={post.meta.featured}
            onChange={this.toggleFeatured}
          />
        </div>
        <div className="pt-form-group">
          <label className="pt-label" htmlFor="order">
            <TooltipLabel label="Order" required tooltip="order of aircraft" />
            <input
              maxLength={80}
              type="number"
              pattern="[0-9]*"
              name="order"
              className="pt-input pt-large pt-fill pt-bold"
              id="order"
              value={post.meta.order}
              onChange={this.handleChange}
              placeholder="Order"
            />
          </label>
        </div>
          {/* Floor Map image */}
          <div className="pt-form-group">
            <label className="pt-label" htmlFor="files">
              Floor Map Image
            </label>
            {this.state.isGalleryLoading ? (
            <LoadingSpinner />
          ) : (
              <div className={s["banner-placeholder"]}>
                {post.meta.floor_map_image ? (
                  <Action
                    key="item-action-remove"
                    className="button-remove"
                    icon="pt-icon-remove"
                    intent="pt-intent-danger"
                    action={this.removeFloorMapImage}
                    tooltip="Remove Image"
                  />
                ) : null}
                <div className={cx(s["banner-upload"], post.meta.floor_map_image ? s.isFilled : null)}>
                  {post.meta.floor_map_image ? (
                    <img src={post.meta.floor_map_image.src} onClick={this.openFloorMapPhotoGallery} />
                  ) : (
                    <Button className={cx("pt-button pt-minimal")} onClick={this.openFloorMapPhotoGallery}>
                      Add Floor Map Image
                    </Button>
                  )}
                </div>
                <span className={s["banner-label"]}>Click to choose the floor map picture</span>
              </div>
          )}
          </div>
          {/* Cabin View image */}
          <div className="pt-form-group">
            <label className="pt-label" htmlFor="files">
              Cabin View Image
            </label>
            {this.state.isGalleryLoading ? (
            <LoadingSpinner />
          ) : (
              <div className={s["banner-placeholder"]}>
                {post.meta.cabin_view_image ? (
                  <Action
                    key="item-action-remove"
                    className="button-remove"
                    icon="pt-icon-remove"
                    intent="pt-intent-danger"
                    action={this.removeCabinViewImage}
                    tooltip="Remove Image"
                  />
                ) : null}
                <div className={cx(s["banner-upload"], post.meta.cabin_view_image ? s.isFilled : null)}>
                  {post.meta.cabin_view_image ? (
                    <img src={post.meta.cabin_view_image.src} onClick={this.openCabinViewPhotoGallery} />
                  ) : (
                    <Button className={cx("pt-button pt-minimal")} onClick={this.openCabinViewPhotoGallery}>
                      Add Cabin View Image
                    </Button>
                  )}
                </div>
                <span className={s["banner-label"]}>Click to choose the cabin view picture</span>
              </div>
          )}
          </div>
      </Fragment>
    );
  }
}

AircraftSidebar.contextTypes = {
  fetch: PropTypes.func.isRequired,
  client: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  return {
    loading: state.aircrafts.fetching,
    dataList: state.aircrafts.dataList,
    //posts: (Object.values(state.posts) || []).filter(post => (post.type === 'aircraft' && post.language_id === ownProps.post.language_id && post.id !== ownProps.post.id))
  };
};

export default connect(mapStateToProps, { fetchDataForEditor, fetchMedia })(withStyles(s)(AircraftSidebar));
