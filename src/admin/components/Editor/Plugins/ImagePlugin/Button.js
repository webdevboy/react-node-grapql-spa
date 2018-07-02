import React, { Component } from "react";

import Icon from "./icon.js";
import constants from "./constants";
import { insertDataBlock } from "megadraft";
import { connect } from "react-redux";
import MediaGallery from "admin/components/MediaGallery";
import PhotoGallery from "admin/components/PhotoGallery";
import Loading from "react-loading-animation";
import { fetchMedia } from "admin/actions/media";

class Button extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: false };
  }

  openPhotoGallery = async () => {
    // this.setState({ isLoading: true });
    // const data = await this.props.fetchMedia({mimetype: "image%"});
    // let photos = [];
    // data.files.medias.forEach(file => {
    //    const photo = { id: file.id, src: file.src, width: 4, height: 3 };
    //    photos.push(photo);
    // });
    // this.setState({ isLoading: false });
    this.photospopup.openGallery();
  };

  selectPhoto = photo => {
    const data = { type: constants.PLUGIN_TYPE, src: photo.src, display: "medium" };
    // Calls the onChange method with the new state.
    this.props.onChange(insertDataBlock(this.props.editorState, data));
  };

  render() {
    const statusLoad = this.state ? this.state.isLoading : false;
    return (
      <div>
	    <MediaGallery onRef={ref => (this.photospopup = ref)} selectPhoto={this.selectPhoto} currentRoute={this.props.currentRoute} />
        <Loading isLoading={statusLoad}>
          <button
            className={this.props.className}
            type="button"
            onClick={this.openPhotoGallery}
            title={constants.PLUGIN_NAME}
          >
            <Icon className="sidemenu__button__icon" />
          </button>
        </Loading>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    files: state.media.ids.map(id => state.media.byId[id]),
  }
};
export default connect(mapStateToProps,{fetchMedia})(Button);
