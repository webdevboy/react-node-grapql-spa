import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import cx from "classnames";
import s from "./PrivateJetCharter.css";
import { connect } from "react-redux";
import { Toaster, Position, Intent, MenuItem, Button } from "@blueprintjs/core";
import { Suggest, MultiSelect } from "@blueprintjs/labs";
import TooltipLabel from "admin/components/TooltipLabel";
import Loading from "react-loading-animation";
import LoadingSpinner from "admin/components/LoadingSpinner";
import _ from 'lodash';
import PhotoGallery from "admin/components/PhotoGallery";
import { fetchMedia } from "admin/actions/media";

import { fetchPosts } from "admin/actions/posts";
import Sidebar from "admin/components/Sidebar";
import Editor from "admin/components/Editor";

class PrivateJetCharterSidebar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedPosts: [],
      posts: [],
      postFetched: false,
      isGalleryLoading: false,
    }
  }

  componentDidMount() {
    const { posts, post: { meta: { aircraft_list } } } = this.props;
    if (this.filterOriginalPosts(posts, aircraft_list).length === 0) {
      this.props.fetchPosts({
        type: 'aircraft'
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { posts, post: { meta: { aircraft_list } } } = nextProps;
    this.setState({
      posts: nextProps.posts,
    });

    if (!this.state.postFetched && nextProps.posts.length) {
      this.setState({
        postFetched: true,
        selectedPosts: this.filterOriginalPosts(posts, aircraft_list)
      });
    }
  }

  openMediaGallery = async () => {
    this.setState({ isGalleryLoading: true });
    const data = await this.props.fetchMedia({ mimetype: "video%" });
    const photos = [];

    // const data1 = [
    //   {
    //     id: '123-123-123-111',
    //     src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
    //   },
    //   {
    //     id: '123-123-123-222',
    //     src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
    //   },
    //   {
    //     id: '123-123-123-333',
    //     src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
    //   },
    //   {
    //     id: '123-123-123-444',
    //     src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4'
    //   }
    // ]
    data.files.medias.forEach(file => {
      const photo = {
        id: file.id,
        src: this.getMediaThumbnailUrl(file.src),
        width: 4,
        height: 3
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
      difference_video: media
    });
  };

  renderPostItem = ({ handleClick, item, isActive }) => (
    <MenuItem
      className={cx(isActive ? s.isActive : null)}
      key={item.id}
      text={item.title}
      onClick={handleClick}
    />
  );

  renderPostTag = item => item.slug;

  addPost = item => {
    let selectedPosts = this.state.selectedPosts;
    if (this.getSelectedPostIndex(item) !== -1) {
      selectedPosts = selectedPosts.filter((post, i) => i !== this.getSelectedPostIndex(item));
    } else {
      selectedPosts = [...selectedPosts, item];
    }
    this.setState({ selectedPosts });
    this.props.onMetaChange({
      ...this.props.post.meta,
      aircraft_list: selectedPosts.map(post => ({ post_uuid: post.id }))
    });
  };

  filterPost = (query, item, index) => {
    const entry = _.toLower(`${item.title}`);
    const loweredQuery = query.toLowerCase();
    return String(entry).includes(loweredQuery);
  };

  handleClear = () => {
    this.setState({ selectedPosts: [] });
    this.props.onMetaChange({
      ...this.props.post.meta,
      aircraft_list: []
    });
  };

  handleTagRemove = (_tag, index) => {
    let selectedPosts = this.state.selectedPosts;
    selectedPosts = this.state.selectedPosts.filter((post, i) => i !== index);
    this.setState({ selectedPosts });
    this.props.onMetaChange({
      ...this.props.post.meta,
      aircraft_list: selectedPosts
    });
  };

  getMediaThumbnailUrl(src) {
    const video = document.createElement('video');
    video.src = src;
    video.autoplay = false;

    const canvas = document.createElement('canvas');
    canvas.width = 320;
    canvas.height = 240;
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    return canvas.toDataURL('image/jpeg');
  }

  getSelectedPostIndex(post) {
    return this.state.selectedPosts.indexOf(post);
  }

  filterOriginalPosts = (posts, aircraft_list) =>
    posts.filter(v =>
      (aircraft_list || []).map(_v => _v.post_uuid).indexOf(v.id) !== -1)



  render() {
    const { handleChange, post, categories } = this.props;

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
      this.state.selectedPosts.length > 0 ? (
        <Button iconName="pt-icon-cross" minimal onClick={this.handleClear} />
      ) : null;

    return (
      <Fragment>
        <PhotoGallery onRef={ref => (this.photogallery = ref)} selectPhoto={this.selectMedia} type={'video'}/>
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
        <div className="pt-form-group">
          <label className="pt-label" htmlFor="selectedPosts">
            <TooltipLabel label="Aircraft Lists" tooltip="Please select posts" />
            <MultiSelect
              name="aircraft_list"
              items={this.state.posts}
              popoverProps={{ className: s.suggester }}
              itemRenderer={this.renderPostItem}
              tagRenderer={this.renderPostTag}
              onItemSelect={this.addPost}
              itemPredicate={this.filterPost}
              selectedItems={this.state.selectedPosts}
              tagInputProps={{ tagProps: getTagProps, onRemove: this.handleTagRemove, rightElement: clearButton }}
              noResults={NoResults}
            />
          </label>
        </div>
      </Fragment>
    );
  }
}

PrivateJetCharterSidebar.contextTypes = {
  fetch: PropTypes.func.isRequired,
  client: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  return {    
    posts: (Object.values(state.posts.byId) || [])
      .filter(
        post => post.type === 'aircraft' && 
        (ownProps.post && ownProps.post.language ? post.language.id === ownProps.post.language.id :
        post.language.id === state.runtime.availableLocales[state.runtime.defaultLocale].id))
  }
};

export default connect(mapStateToProps, { fetchPosts, fetchMedia })(
  withStyles(s)(PrivateJetCharterSidebar)
);
