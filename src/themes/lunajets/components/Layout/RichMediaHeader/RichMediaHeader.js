import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from "./RichMediaHeader.css";
import cx from "classnames";
import Modal from "react-responsive-modal";
import Loading from "react-loading-animation";
import TiPencil from "react-icons/lib/ti/pencil";
import { fetchMedia } from "admin/actions/media";
import { updateOrCreateMediaReference, setRichMediaList } from "shared/actions/media";
import MediaGallery from "admin/components/MediaGallery";
import history from "core/history";

class RichMediaHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isLoading: false,
      newValue: "",
    };
  }
  componentDidMount() {
    this.props.setRichMediaList();
  }
  onClick = e => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ isOpen: true });
  };

  onCloseModal = () => {
    this.setState({ isOpen: false });
  };
  onClickCancel = e => {
    e.stopPropagation();
    this.setState({ isOpen: false });
  };
  selectPhoto = async photo => {
    this.setState({ isLoading: true });
    const mediaReference = await this.props.updateOrCreateMediaReference(this.props.id, photo.id);
    history.push("/");
    this.setState({ isLoading: false });
  };
  openPhotoGallery = async () => {
    this.setState({ isLoading: true });
    const data = await this.props.fetchMedia({ mimetype: "image%" });

    let photos = [];
    data &&
      data.files.medias.forEach(file => {
        const photo = { id: file.id, src: file.src, width: 4, height: 3 };
        photos.push(photo);
      });

    this.setState({ isLoading: false });
    this.photogallery.openGallery(photos);
  };
  render() {
    const { id, defaultSrc, children, medias, auth } = this.props;
    const background = (medias && medias[id] && medias[id][0]) || defaultSrc;
    const currentRoute = {
      name: "Home",
      path: "",
      parent: {
        children: [],
        parent: null,
      },
    };

    return (
      <Loading isLoading={this.state.isLoading}>
        <MediaGallery
          onRef={ref => (this.photogallery = ref)}
          selectPhoto={this.selectPhoto}
          currentRoute={currentRoute}
        />
        <div id="media-header" className={s.root} style={{ backgroundImage: `url('${background}')` }}>
          <div className="container">{children}</div>
          {auth.editMode ? (
            <span className={cx("button-edit-admin")} onClick={this.openPhotoGallery}>
              <TiPencil size={68} />
            </span>
          ) : null}
        </div>
      </Loading>
    );
  }
}

const mapStateToProps = state => ({
  medias: state.media.richMedia,
  auth: state.auth,
});

export default connect(mapStateToProps, { fetchMedia, updateOrCreateMediaReference, setRichMediaList })(
  withStyles(s)(RichMediaHeader),
);
