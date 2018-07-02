import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { connect } from "react-redux";
import s from "./MultiPhotoLinkGallery.css";
import Modal from "react-responsive-modal";
import Gallery from "react-photo-gallery";
import LoadingSpinner from "admin/components/LoadingSpinner";
import MediaGallery from "admin/components/MediaGallery";
import { Toaster, Position, NumericInput, Intent, MenuItem, Button } from "@blueprintjs/core";
import TooltipLabel from "admin/components/TooltipLabel";
import Action from "admin/components/Action";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import { fetchMedia } from "admin/actions/media";
import Loading from "react-loading-animation";
import MediaCenter from "admin/routes/mediacenter/MediaCenter";
import { updatePageMeta } from "shared/actions/post";
import TiPlus from "react-icons/lib/ti/plus";

class MultiPhotoLinkGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPhotos: [],
      currentId: "",
      currentSrc: "",
      currentOrder: "",
      currentLink: "",
      isGalleryLoading: false,
      isOpen: false,
      post: undefined,
    };
  }

  componentDidMount() {
    this.props.onRef(this);
  }

  componentWillUnmount() {
    this.props.onRef(undefined);
  }

  selectPhoto = photo => {
    this.setState({
      currentId: photo.id,
      currentSrc: photo.src,
    });
  };

  openPhotoGallery = async () => {
    const { post, selectedPhotos } = this.state;
    this.setState({ isGalleryLoading: true });
    const data = await this.props.fetchMedia({ mimetype: "image%" });
    let photos = [];
    data.files.medias.forEach(file => {
      const photo = { id: file.id, src: file.src, width: 4, height: 3 };
      if (_.find(selectedPhotos, selPhoto => selPhoto.id === file.id)) {
        photo.selected = true;
      }
      photos.push(photo);
    });
    this.setState({ isGalleryLoading: false });
    this.photogallery.openGallery(photos);
  };

  openGallery = (post, selectedPhotos) => {
    this.setState({
      isOpen: true,
      isGalleryLoading: false,
      post: post,
      selectedPhotos: selectedPhotos,
    });
  };

  closeGallery = () => {
    this.setState({
      isOpen: false,
    });
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  savePhotos = async () => {
    const { selectPhotos } = this.props;
    const { selectedPhotos, post } = this.state;
    const data = await this.props.updatePageMeta({ id: post.id, metaValue: { gallery_photo: selectedPhotos } });
    selectPhotos(selectedPhotos);
    this.setState({
      isOpen: false,
    });
  };

  addPhoto = () => {
    const { currentId, currentSrc, currentLink, currentOrder } = this.state;
    const photo = {
      id: currentId,
      src: currentSrc,
      order: currentOrder,
      link: currentLink,
    };
    this.setState({
      selectedPhotos: [...this.state.selectedPhotos, photo],
      currentId: "",
      currentSrc: "",
      currentOrder: "",
      currentLink: "",
    });
  };

  removePhoto = item => {
    const { selectedPhotos } = this.state;
    const newPhotos = selectedPhotos.filter(photo => photo.id !== item.id);
    this.setState({
      selectedPhotos: newPhotos,
    });
  };

  removeSliderPhoto = () => {
    this.setState({
      currentId: "",
      currentSrc: "",
    });
  };

  render() {
    const { selectPhotos, currentRoute } = this.props;
    const { isOpen, selectedPhotos, currentSrc, currentOrder, currentLink } = this.state;

    return (
      <Modal
        open={isOpen}
        onClose={this.closeGallery}
        classNames={{
          modal: "gallery-modal pencil-modal",
          overlay: "gallery-overlay",
          transitionEnter: "transition-enter",
          transitionEnterActive: "transition-enter-active",
          transitionExit: "transition-exit-active",
          transitionExitActive: "transition-exit-active",
        }}
      >
        <div className={cx(s["gallery-wrap"], "pt-dark")}>
          <MediaGallery
            onRef={ref => (this.photogallery = ref)}
            selectPhoto={this.selectPhoto}
            currentRoute={currentRoute}
          />

          {/* Slide creating form */}
          <label className="pt-label">
            <TooltipLabel label="CREATE SLIDE" tooltip="Slide creating form" />
          </label>
          <div className={cx(s["slide-creating-form"])}>
            {/* photo gallery */}
            {this.state.isGalleryLoading ? (
              <LoadingSpinner />
            ) : (
              <div className={s["slide-placeholder"]}>
                {currentSrc ? (
                  <Action
                    key="item-action-save-photo"
                    className="button-remove"
                    icon="pt-icon-remove"
                    intent="pt-intent-danger"
                    action={this.removeSliderPhoto}
                    tooltip="Remove Image"
                  />
                ) : null}
                <div className={cx(s["slide-upload"], currentSrc ? s.isFilled : null)}>
                  {currentSrc ? (
                    <img src={currentSrc} onClick={this.openPhotoGallery} />
                  ) : (
                    <Button className={cx("pt-button pt-minimal")} onClick={this.openPhotoGallery}>
                      <TiPlus size="75" color="#fff" className="btn-icon" />
                    </Button>
                  )}
                </div>
              </div>
            )}

            <div className={cx(s["slide-inputs"])}>
              {/* Target URL */}
              <div className="pt-form-group">
                <label className="pt-label" htmlFor="target_url">
                  <TooltipLabel label="Target URL" required tooltip="URL of the slide" />
                  <div className="pt-input-group">
                    <span className="pt-icon pt-icon-link" />
                    <input
                      key="currentLink"
                      type="url"
                      name="currentLink"
                      value={currentLink}
                      onChange={this.handleChange}
                      className="pt-input pt-fill"
                      id="target_url"
                      placeholder="Target URL"
                    />
                  </div>
                </label>
              </div>

              {/* Order */}
              <div className="pt-form-group">
                <label className="pt-label" htmlFor="order">
                  <TooltipLabel label="Order" required tooltip="Order of the slide" />
                  <div className="pt-input-group">
                    <input
                      key="currentOrder"
                      maxLength={80}
                      type="number"
                      pattern="[0-9]*"
                      name="currentOrder"
                      value={currentOrder}
                      onChange={this.handleChange}
                      className="pt-input"
                      id="order"
                      placeholder="Order"
                    />
                  </div>
                </label>
              </div>
            </div>

            {/* button ADD */}
            <div className={cx(s["slide-button-add"])}>
              <Button
                key="action-add"
                className={cx("pt-fill pt-button pt-icon-add pt-intent-primary")}
                onClick={this.addPhoto}
                disabled={!currentSrc || !currentOrder || !currentLink}
              >
                Add Slide
              </Button>
            </div>
          </div>

          {/* Added photos in slider */}
          <label className="pt-label mt-5">
            <TooltipLabel label="CURRENT SLIDES" tooltip="Current slides display" />
          </label>
          <div className={cx(s["current-slides"])}>
            {selectedPhotos.length > 0 ? (
              selectedPhotos.map(photo => {
                return (
                  <div className={cx(s["slide-item"])}>
                    <div className={s["slide-photo"]}>
                      <img src={photo.src} />
                    </div>

                    <div className={cx(s["slide-infos"])}>
                      <div className="pt-form-group">
                        <label className="pt-label">
                          <span>Target URL</span>
                          <div className="pt-input-group">
                            <input value={photo.link} className="pt-input" disabled />
                          </div>
                        </label>
                      </div>

                      <div className="pt-form-group">
                        <label className="pt-label">
                          <span>Order</span>
                          <div className="pt-input-group">
                            <input value={photo.order} className="pt-input" disabled />
                          </div>
                        </label>
                      </div>
                    </div>

                    <div className={cx(s["slide-button-remove"])}>
                      <Button
                        key="item-action-save-photo"
                        className={cx("button-remove pt-fill pt-button pt-icon-remove pt-intent-danger")}
                        onClick={() => this.removePhoto(photo)}
                      >
                        Remove Slide
                      </Button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className={cx(s["slide-item"], "h-100 justify-content-center")}>
                <span>The slider is empty</span>
              </div>
            )}
          </div>

          <div className={cx("btn-edit-group", s["gallery-btn-group"])}>
            <button className={cx(s["button-edit-ok"], "btn")} onClick={this.savePhotos}>
              OK
            </button>
            <button className={cx(s["button-edit-cancel"], "btn")} onClick={this.closeGallery}>
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps, { fetchMedia, updatePageMeta })(withStyles(s)(MultiPhotoLinkGallery));
