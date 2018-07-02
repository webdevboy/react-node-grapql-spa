import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import s from "./MediaGallery.css";
import Modal from "react-responsive-modal";
import Gallery from "react-photo-gallery";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import { generateKey } from "./generateKey";
import Loading from "react-loading-animation";
import MediaCenter from "../../routes/mediacenter/MediaCenter";
import { fetchFiles, newMedia, createFolder, getMedia, removeFile } from '../../actions/media';
import { connect } from "react-redux";

// For usage on the client side
import blueprint from "@blueprintjs/core/dist/blueprint.css";
import uppyCss from "uppy/dist/uppy.css";
import loaders from "loaders.css/loaders.css";
import g from "../Layout/Global.css"; // global

const Checkmark = ({ selected }) => (
  <div style={selected ? { left: "4px", top: "4px", position: "absolute", zIndex: "1" } : { display: "none" }}>
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
  //calculate x,y scale
  const sx = (100 - 30 / photo.width * 100) / 100;
  const sy = (100 - 30 / photo.height * 100) / 100;
  selectedImgStyle.transform = `translateZ(0px) scale3d(${sx}, ${sy}, 1)`;
  return (
    <div
      key={generateKey()}
      style={{ margin, width: photo.width, ...cont }}
      className={!photo.selected ? "not-selected" : ""}
    >
      <Checkmark selected={photo.selected ? true : false} />
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

class PhotoGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isLoading: true,
      photos: null,
    };
  }

  async componentDidMount() {
    this.props.onRef(this);
    await this.props.fetchFiles();
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

  openGallery = photos => {
    this.setState({
      isOpen: true,
      isLoading: false,
      photos: photos,
    });
  };

  closeGallery = () => {
    this.setState({
      isOpen: false,
    });
  };

  onClickPhoto = (photo) => {
    console.log("PHOTO CLICKED", photo);
    this.props.selectPhoto(photo);
    this.setState({ isOpen: false });
  };

  render() {
    const { isOpen, photos } = this.state;
    const { selectPhoto, currentRoute } = this.props;
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
        {/* <div className={s["gallery-wrap"]}>
          {photos ? (
            <Gallery
              key={generateKey()}
              columns={4}
              margin={10}
              photos={photos}
              onClick={this.onClickPhoto}
              ImageComponent={SelectedImage}
            />
          ) : null}
        </div> */}
        <MediaCenter currentRoute={currentRoute} fromPage={true} selectMedia={this.onClickPhoto} />
      </Modal>
    );
  }
}

const mapStateToProps = state => {
  const filesById = state.media.byId;
  const files = state.media.ids.map(id => filesById[id]) || [];
  console.log(state.media.ids, files)
  const folders = state.media.folders.filter(folder => !(['thumbnails', 'original'].includes(folder.name)));

  return {
    files,
    filesById,
    folders,
    currentFolder: state.media.currentFolder,
  };
};

const mapDispatch = {
  getMedia,
  fetchFiles,
  newMedia,
  createFolder,
  removeFile,
};

export default connect(mapStateToProps, mapDispatch)(
  withStyles( uppyCss, blueprint, loaders, g, s)(PhotoGallery),
);
