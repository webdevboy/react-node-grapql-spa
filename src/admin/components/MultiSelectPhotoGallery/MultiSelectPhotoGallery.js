import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import s from "./MultiSelectPhotoGallery.css";
import Modal from "react-responsive-modal";
import Gallery from "react-photo-gallery";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import { generateKey } from "./generateKey";
import Loading from "react-loading-animation";
import MediaCenter from "admin/routes/mediacenter/MediaCenter";

// For usage on the client side
import normalize from "normalize.css";
import famfamfam from "famfamfam-flags/dist/sprite/famfamfam-flags.css";
import blueprint from "@blueprintjs/core/dist/blueprint.css";
import blueprintlabs from "@blueprintjs/labs/dist/blueprint-labs.css";
import datetimepicker from "@blueprintjs/datetime/dist/blueprint-datetime.css";
import uppyCss from "uppy/dist/uppy.css";
import bootstrap from "bootstrap/dist/css/bootstrap.min.css";

import loaders from "loaders.css/loaders.css";
import g from "../Layout/Global.css"; // global


const Checkmark = ({ selected }) => (
  <div
    style={
      selected
        ? {
            left: "4px",
            top: "4px",
            position: "absolute",
            zIndex: "1",
          }
        : { display: "none" }
    }
  >
    <svg style={{ fill: "white", position: "absolute" }} width="24px" height="24px">
      <circle cx="12.5" cy="12.2" r="8.292" />
    </svg>
    <svg style={{ fill: "#06befa", position: "absolute" }} width="24px" height="24px">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
    </svg>
  </div>
);

const imgStyle = {
  display: "block",
  transition: "transform .135s cubic-bezier(0.0,0.0,0.2,1),opacity linear .15s",
};
const selectedImgStyle = {
  transform: "translateZ(0px) scale3d(0.9, 0.9, 1)",
  transition: "transform .135s cubic-bezier(0.0,0.0,0.2,1),opacity linear .15s",
};
const cont = {
  backgroundColor: "#eee",
  cursor: "pointer",
  overflow: "hidden",
  float: "left",
  position: "relative",
};

const SelectedImage = ({ index, onClick, photo, margin }) => {
  // calculate x,y scale
  const sx = (100 - 30 / photo.width * 100) / 100;
  const sy = (100 - 30 / photo.height * 100) / 100;
  selectedImgStyle.transform = `translateZ(0px) scale3d(${sx}, ${sy}, 1)`;
  return (
    <div
      key={generateKey()}
      style={{ margin, width: photo.width, ...cont }}
      className={!photo.selected ? "not-selected" : ""}
    >
      <Checkmark selected={!!photo.selected} />
      <img
        key={generateKey()}
        style={photo.selected ? { ...imgStyle, ...selectedImgStyle } : { ...imgStyle }}
        {...photo}
        onClick={e => onClick(e, { index, photo })}
      />

      <style>{`.not-selected:hover{outline:2px solid #06befa}`}</style>
    </div>
  );
};

class MultiSelectPhotoGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isLoading: true,
      photos: null,
      selectedPhoto: [],
    };
  }

  componentDidMount() {
    this.props.onRef(this);
  }

  componentWillUnmount() {
    this.props.onRef(undefined);
  }

  openLoading = () => {
    this.setState({
      isOpen: true,
      isLoading: true,
    });
  };

  openGallery = () => {
    this.setState({
      isOpen: true,
      isLoading: false,
    });
  };

  closeGallery = () => {
    this.setState({
      isOpen: false,
    });
  };

  savePhotos = () => {
    this.props.selectPhoto(this.state.selectedPhoto);
    this.setState({
      isOpen: false,
    });
  };

  onClickPhoto = (photo) => {
    console.log("PHOTO CLICKED");
    const selected = [];
	let isSelected = false;
    this.state.selectedPhoto.forEach(image => {
      if (image.id !== photo.id) {
        selected.push(image);
      }
	  else{
		isSelected=true;
	  }
    });
	if (!isSelected){
	  selected.push(photo);
	}
    this.setState({
      selectedPhoto: selected,
    });
  };

  render() {
    const { isOpen } = this.state;
    const { currentRoute } = this.props;
    return (
      <Modal
        key={generateKey()}
        open={isOpen}
        onClose={this.closeGallery}
        classNames={{
          modal: "gallery-modal",
          overlay: "gallery-overlay",
          transitionEnter: "transition-enter",
          transitionEnterActive: "transition-enter-active",
          transitionExit: "transition-exit-active",
          transitionExitActive: "transition-exit-active",
        }}
      >
        <div className={s["gallery-wrap"]}>
              <MediaCenter currentRoute={currentRoute} fromPage={true} selectMedia={this.onClickPhoto} multiSelect={true} selectedPhotos={this.state.selectedPhoto} />
              <div className={cx(s["gallery-btn-group"])}>
                <button className={cx(s["gallery-btn-ok"], "btn")} onClick={this.savePhotos}>
                  OK
                </button>
                <button className={cx(s["gallery-btn-cancel"], "btn")} onClick={this.closeGallery}>
                  Cancel
                </button>
              </div>
        </div>
      </Modal>
    );
  }
}

export default withStyles(
  normalize, famfamfam, uppyCss, bootstrap, blueprint, blueprintlabs, datetimepicker, loaders, g, s)(MultiSelectPhotoGallery);
