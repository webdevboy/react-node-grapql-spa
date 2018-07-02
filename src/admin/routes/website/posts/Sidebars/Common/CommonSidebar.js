import React, { Component, Fragment } from "react";
import _ from "lodash";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import cx from "classnames";
import uuidv4 from "uuid/v4";
import { connect } from "react-redux";
import { Alert, Toaster, Position, Intent, Button, MenuItem } from "@blueprintjs/core";
import { MultiSelect } from "@blueprintjs/labs";
import s from "./CommonSidebar.css";
import Sidebar from "admin/components/Sidebar";
import Editor from "admin/components/Editor";
import Action from "admin/components/Action";
import TooltipLabel from "admin/components/TooltipLabel";
import MediaGallery from "admin/components/MediaGallery";
import Loading from "react-loading-animation";
import { fetchMedia } from "admin/actions/media";
import slugify from "slugify";

class CommonSidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isGalleryLoading: {
        BANNER: false,
        CARD_IMAGE: false
      },
      currentGalleryType: 'BANNER',
      editSlug: false,
      slug: this.props.post.slug || "",
      showWarningUpdateSlug: false,
      footerLabel: "",
      footerUrl: "",
      footer: {
        title: "",
        content: [],
      },
      selectedItems: [],
    };

    let {
      post: { meta },
    } = props;

    if (meta && meta.footer) {
      this.state.footer = {
        title: meta.footer.title,
        content: meta.footer.content || [],
      };
    }
  }

  selectPhoto = (photo) => {
    let newPost = this.props.post;

    if (this.state.currentGalleryType === 'BANNER') {
      newPost = Object.assign({}, newPost, {
        media: { id: photo.id, src: photo.src },
        media_id: photo.id,
      });
    } else if (this.state.currentGalleryType === 'CARD_IMAGE') {
      newPost = Object.assign({}, newPost, {
        meta: {
          ...newPost.meta,
          card_image: {
            id: photo.id,
            src: photo.src
          }
        }
      })
    }
    
    this.props.handlePostChange(newPost);
  };

  openPhotoGallery = async (type) => {
    const { post, fetchMedia } = this.props;

    this.setState({
      isGalleryLoading: {
        ...this.state.isGalleryLoading,
        [type]: true
      }
    });
    const data = await fetchMedia({ mimetype: "image%" });
    let photos = [];
    data.files.medias.forEach(file => {
      const photo = { id: file.id, src: file.src, width: 4, height: 3 };
      if (type === 'BANNER') {
        if (post.media && photo.id === post.media.id) {
          photo.selected = true;
        } else if (post.media_id && photo.id === post.media_id) {
          photo.selected = true;
        }
      } else if (type === 'CARD_IMAGE') {
        if (post.meta && post.meta.card_image && photo.id === post.meta.card_image.id) {
          photo.selected = true;
        }
      }
      
      photos.push(photo);
    });
    this.setState({
      isGalleryLoading: {
        ...this.state.isGalleryLoading,
        [type]: false
      },
      currentGalleryType: type
    });
    this.photogallery.openGallery(photos);
  };

  removeBannerPhoto = () => {
    let newPost = {
      ...this.props.post,
      media: null,
      media_id: null,
    };
    this.props.handlePostChange(newPost);
  };

  changeText(e, field) {
    const updatedState = {};

    if (field === "footerTitle") {
      updatedState.footer = { title: e.target.value, content: [] };
    } else {
      updatedState[field] = e.target.value;
    }
    this.setState({
      ...this.state,
      ...updatedState,
    });
  }

  appendFooterItem = () => {
    let {
      post: { meta },
      onMetaChange,
    } = this.props;
    let { footer, footerLabel, footerUrl } = this.state;

    if (!footerLabel || !footerUrl) return;
    if (!meta) meta = {};

    footer.content.push({ id: uuidv4(), label: footerLabel, url: footerUrl });
    this.setState({
      ...this.state,
      footer,
      footerLabel: "",
      footerUrl: "",
    });
    this.props.onMetaChange({
      ...meta,
      footer,
    });
  };

  removeFooterItem = index => {
    let {
      post: { meta },
      onMetaChange,
    } = this.props;
    const { footer, title, footerLabel, footerUrl } = this.state;

    if (!meta) meta = {};

    footer.content = footer.content.filter((from, i) => i !== index);
    this.setState({
      ...this.state,
      footer,
    });
    this.props.onMetaChange({
      ...meta,
      footer,
    });
  };

  toggleEditSlug = force => {
    this.setState({
      editSlug: force || !this.state.editSlug,
    });
  };

  getFooter = () => {
    const { post } = this.props;
    const { footer, footerLabel, footerUrl } = this.state;

    return (
      <div className={cx("pt-form-group", s["footer-order"])}>
        <label className="pt-label" htmlFor="path-footer">
          <TooltipLabel label="Footer Links" tooltip="Footer" />
        </label>
        <br />
        <label className="pt-label" htmlFor="path-footer-title">
          <TooltipLabel label="Title" tooltip="Footer Title" />
          <div className="pt-input-group pt-fill">
            <input
              ref={el => (this.currentFrom = el)}
              id="path-footer-title"
              type="text"
              name="title"
              className="pt-input"
              value={footer.title}
              placeholder="Title"
              onChange={e => this.changeText(e, "footerTitle")}
            />
          </div>
        </label>
        <label className="pt-label" htmlFor="path-footer-item">
          <TooltipLabel label="Link" tooltip="Footer Link" />
          <div className="pt-input-group pt-fill">
            <input
              ref={el => (this.currentFrom = el)}
              id="path-footer-item"
              type="text"
              name="item"
              className="pt-input"
              value={footerLabel}
              placeholder="Label"
              onChange={e => this.changeText(e, "footerLabel")}
            />
          </div>
          <div className="pt-input-group pt-fill">
            <input
              ref={el => (this.currentFrom = el)}
              id="path-footer-url"
              type="text"
              name="url"
              className="pt-input"
              value={footerUrl}
              placeholder="Url"
              onChange={e => this.changeText(e, "footerUrl")}
            />
            <div className="pt-input-action">
              <Button
                className="pt-button pt-minimal pt-intent-success pt-icon-add"
                onClick={() => this.appendFooterItem()}
              />
            </div>
          </div>
        </label>
        {footer.content &&
          footer.content.map((item, index) => (
            <div key={`content-index-${index}`} className="pt-input-group pt-fill d-flex">
              <input readOnly type="text" className={cx("pt-input pt-disabled", s["link-text"])} value={item.label} />
              <input readOnly type="text" className={cx("pt-input pt-disabled", s["link-text"])} value={item.url} />
              <div className={cx("pt-input-action", s["link-remove-btn"])}>
                <Button
                  className="pt-button pt-minimal pt-intent-danger pt-icon-remove"
                  onClick={() => this.removeFooterItem(index)}
                />
              </div>
            </div>
          ))}
      </div>
    );
  };

  popupConfirmChange = () => {
    this.setState({
      showWarningUpdateSlug: true,
    });
  };

  confirmSlugChange = () => {
    this.setState(
      {
        showWarningUpdateSlug: false,
      },
      () => {
        this.toggleEditSlug(false);
        this.handleSlugChange();
      },
    );
  };

  componentDidUpdate = prevProps => {
    const { post } = this.props;
    const { title } = prevProps.post;

    if (post.title !== title && !this.state.editSlug) {
      this.handleSlugChange(post.title);
    }
  };

  handleSlugChange = value => {
    this.setState(
      {
        slug: slugify(value || (this.slug ? this.slug.value : ""), {
          lower: true,
          remove: /[$*^`´\;±|_§#€?&$+~.%=()'"!,\\/\:@]/i,
        }),
      },
      () => {
        this.props.handlePostChange({
          ...this.props.post,
          slug: this.state.slug,
        });
      },
    );
  };

  renderPathComponentItem = ({ item, handleClick }) => {
    const { post } = this.props;
    let theLabel = "/";
    item.meta && item.meta.pathUrl && Object.keys(item.meta.pathUrl).map((key, index) => {
      theLabel = theLabel.concat(item.meta.pathUrl[key].url,'/');
    });
    theLabel = theLabel.concat(item.slug);
    return <MenuItem key={item.id} disabled={post.meta && post.meta.pathUrl && !_.isEmpty(post.meta.pathUrl)} text={theLabel} onClick={handleClick} />;
  };

  onPathComponentSelect = item => {
    let pathUrl = item.meta && item.meta.pathUrl ? { ...item.meta.pathUrl } : {};
    pathUrl[item.id] = {
      url: item.slug,
      order: this.getNextOrderOfUrl(item),
    }
    this.updatePathPostIds(pathUrl);
  };

  renderPathComponentTag = item => {
    let theLabel = "/";
    item.meta && item.meta.pathUrl && Object.keys(item.meta.pathUrl).map((key, index) => {
      theLabel = theLabel.concat(item.meta.pathUrl[key].url,'/');
    });
    theLabel = theLabel.concat(item.slug);
    return theLabel;
  };

  onPathComponentTagRemove = (value, index) => {
    this.updatePathPostIds({});
  };

  getNextOrderOfUrl = (item) => {
    if (item.meta && item.meta.pathUrl){
      const listValue = Object.values(item.meta.pathUrl);
      return (listValue.length > 0) ? listValue.reduce((max, p) => p.order > max ? p.order : max, listValue[0].order) + 1 : 1;
    }else{
      return 1;
    }
  }

  updatePathPostIds = (pathUrl) => {
    const { post, handlePostChange } = this.props;
    const newPost = {
      ...post,
      meta: {
        ...post.meta,
        pathUrl,
      },
    };
    handlePostChange(newPost);
  };

  filterPathComponent = (query, item) => {
    let theLabel = "";
    item.meta && item.meta.pathUrl && Object.keys(item.meta.pathUrl).map((key, index) => {
      theLabel = theLabel.concat(item.meta.pathUrl[key].url,'/');
    });
    theLabel = theLabel.concat(item.slug);
    return theLabel.includes(query.toLowerCase());
  };

  render() {
    const { handleChange, post, currentRoute, availablePathPosts, showCardImage } = this.props;
    const { pathUrl = {} } = post.meta;
    let listPostId = [];
    Object.keys(pathUrl).map((key,index) => listPostId.push({id: key, order: pathUrl[key].order}));
    const orderedList = _.orderBy(listPostId, 'order', 'desc');
    const parentId = orderedList[0] ? [orderedList[0].id] : [];
    
    const filteredAvailablePosts = availablePathPosts.filter(availablePost => {
      return !parentId.includes(availablePost.id) && availablePost.id !== post.id;
    });
    const selectedPosts = availablePathPosts.filter(availablePost => parentId.includes(availablePost.id));
    return (
      <Fragment>
        <Alert
          intent={Intent.WARNING}
          iconName="pt-icon-warning-sign"
          isOpen={this.state.showWarningUpdateSlug}
          confirmButtonText={"OK"}
          onConfirm={this.confirmSlugChange}
        >
          <span>Note: this action will also update the link on SalesForce!</span>
        </Alert>
        <MediaGallery
          onRef={ref => (this.photogallery = ref)}
          selectPhoto={this.selectPhoto}
          currentRoute={currentRoute}
        />
        <div className="pt-form-group">
          <label className="pt-label" htmlFor="language">
            <span>Language</span>
            <input
              maxLength={80}
              type="text"
              name="language"
              className="pt-input pt-large pt-fill pt-bold"
              id="language"
              value={post.language.language}
              disabled
            />
          </label>
        </div>
        <div className="pt-form-group">
          <label className="pt-label" htmlFor="files">
            Banner
          </label>
          <Loading isLoading={this.state.isGalleryLoading['BANNER']}>
            <div className={s["banner-placeholder"]}>
              {post.media ? (
                <Action
                  key="item-action-remove"
                  className="button-remove"
                  icon="pt-icon-remove"
                  intent="pt-intent-danger"
                  action={this.removeBannerPhoto}
                  tooltip="Remove Image"
                />
              ) : null}
              <div className={cx(s["banner-upload"], post.media ? s.isFilled : null)}>
                {post.media ? (
                  <img src={post.media.src} onClick={() => this.openPhotoGallery('BANNER')} />
                ) : (
                  <Button className={cx("pt-button pt-minimal")} onClick={() => this.openPhotoGallery('BANNER')}>
                    Add Banner Image
                  </Button>
                )}
              </div>
              <span className={s["banner-label"]}>Click to choose the banner picture</span>
            </div>
          </Loading>
        </div>
        {showCardImage && (<div className="pt-form-group">
          <label className="pt-label" htmlFor="files">
            Teaser Image
          </label>
          <Loading isLoading={this.state.isGalleryLoading['CARD_IMAGE']}>
            <div className={s["banner-placeholder"]}>
              {post.media ? (
                <Action
                  key="item-action-remove"
                  className="button-remove"
                  icon="pt-icon-remove"
                  intent="pt-intent-danger"
                  action={this.removeBannerPhoto}
                  tooltip="Remove Image"
                />
              ) : null}
              <div className={cx(s["banner-upload"], post.meta && post.meta.card_image ? s.isFilled : null)}>
                {post.meta && post.meta.card_image ? (
                  <img src={post.meta.card_image.src} onClick={() => this.openPhotoGallery('CARD_IMAGE')} />
                ) : (
                  <Button className={cx("pt-button pt-minimal")} onClick={() => this.openPhotoGallery('CARD_IMAGE')}>
                    Add Teaser Image
                  </Button>
                )}
              </div>
              <span className={s["banner-label"]}>Click to choose the card picture</span>
            </div>
          </Loading>
        </div>)}
        <div className="pt-form-group">
          <label className="pt-label" htmlFor="title">
            <TooltipLabel label="Title" required tooltip="Post title, Maximum length of 80 Characters" />
            <input
              maxLength={80}
              type="text"
              name="title"
              className="pt-input pt-large pt-fill pt-bold"
              id="title"
              value={post.title}
              onChange={handleChange}
              placeholder="Title"
            />
          </label>
          {this.state.editSlug ? (
            <div className="pt-input-group pt-fill">
              <input
                maxLength={80}
                ref={el => (this.slug = el)}
                type="text"
                name="slug"
                onBlur={this.checkToRemoveFocus}
                className="pt-input pt-fill"
                id="slug"
                ref={el => (this.slug = el)}
                value={this.state.slug}
                onChange={e => this.handleSlugChange(e.target.value)}
                placeholder="Slug"
              />
              <div className="pt-input-action">
                <Button
                  className="pt-button pt-minimal pt-intent-success pt-icon-tick-circle"
                  onClick={() => (post.type === "aircraft" ? this.popupConfirmChange() : this.confirmSlugChange())}
                />
              </div>
            </div>
          ) : (
            <div className="fill">
              <span>Slug: {`/${post.slug}`}</span>
              <button onClick={() => this.toggleEditSlug()} className="pt-button pt-minimal pt-icon-edit" />
            </div>
          )}
        </div>
        <div className="pt-form-group">
          <label className="pt-label">Parent Page</label>
          <MultiSelect
            name="pathComponents"
            items={filteredAvailablePosts}
            itemRenderer={this.renderPathComponentItem}
            onItemSelect={this.onPathComponentSelect}
            tagRenderer={this.renderPathComponentTag}
            selectedItems={selectedPosts}
            itemPredicate={this.filterPathComponent}
            tagInputProps={{
              onRemove: this.onPathComponentTagRemove,
            }}
          />
        </div>
        <div className="pt-form-group">
          <label className="pt-label" htmlFor="description">
            <TooltipLabel
              label="Summary"
              tooltip="A little summary about the post, this might appear as a title when hovering a link or a component targeting this post, also this will be used as meta description for the post. Maximum length of 160 Characters"
            />
            <textarea
              style={{ minHeight: "80px" }}
              name="summary"
              className="pt-input pt-fill"
              id="description"
              value={post.summary}
              onChange={handleChange}
              placeholder="Write a litle summary"
            />
          </label>
        </div>
        <div className="pt-form-group">
          <label className="pt-label" htmlFor="state">
            <span>State</span>
            <div className="pt-select pt-inline">
              <select className={cx("pt-fill")} value={post.state} name="state" onChange={handleChange}>
                <option key="state-draft" value="draft">
                  Draft ✖
                </option>
                <option key="state-pending" value="pending">
                  Schedule ⌛
                </option>
                <option key="state-published" value="published">
                  Publish ✔
                </option>
              </select>
            </div>
          </label>
        </div>
        {this.getFooter()}
      </Fragment>
    );
  }
}

CommonSidebar.contextTypes = {
  fetch: PropTypes.func.isRequired,
  client: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => ({});

export default connect(mapStateToProps, { fetchMedia })(withStyles(s)(CommonSidebar));
