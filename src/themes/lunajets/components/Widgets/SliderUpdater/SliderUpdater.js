import React, { Component, Fragment } from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from "./SliderUpdater.css";
import cx from "classnames";
import Modal from "react-responsive-modal";
import Loading from "react-loading-animation";
import TiPencil from "react-icons/lib/ti/pencil";
import { fetchMedia } from "admin/actions/media";
import { updateOrCreateListMediaReference, setRichMediaList } from "shared/actions/media";
import Carousel from "themes/lunajets/components/Widgets/Carousel";
import MultiSelectPhotoGallery from "admin/components/MultiSelectPhotoGallery";
import LoadingSpinner from "themes/lunajets/components/Widgets/LoadingSpinner"
import history from 'core/history';

export class SliderUpdater extends Component {
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
  selectPhoto = async photos => {
    this.setState({ isLoading: true });
    const ids = _.map(photos, 'id') || [];
    const mediaReferenceList = await this.props.updateOrCreateListMediaReference({mediaId:this.props.id, ids: ids});
    history.push('/');
    this.setState({ isLoading: false });
  };
  openPhotoGallery = async () => {
    const { medias, id } = this.props;
    this.setState({ isLoading: true });
    const data = await this.props.fetchMedia({ mimetype: "image%" });
    let photos = [];
    data && data.files.medias.forEach(file => {
      const photo = { id: file.id, src: file.src, width: 4, height: 3 };
      if (
        medias && medias[id] &&
        _.find(medias[id], photo => photo === file.src)
      ) {
        photo.selected = true;
      }
      photos.push(photo);
    });

    this.setState({ isLoading: false });
    this.photogallery.openGallery(photos);
  };
  render() {
    const { id, defaultSlides, medias, auth } = this.props;
    const listPhotos = (medias && medias[id]) || [];
    let slidesRetrieved = [];
    listPhotos.map(photo => slidesRetrieved.push({image:photo,description:""}));
    const slides = slidesRetrieved.length > 0 ? slidesRetrieved : defaultSlides;
    const currentRoute = {
      name: "Home",
      path: "",
      parent: {
        children: [],
        parent: null
      }
    };
    if (this.state.isLoading){
      return <LoadingSpinner />
    }
    return (      
      <Fragment>
        <MultiSelectPhotoGallery
          onRef={ref => (this.photogallery = ref)}
          selectPhoto={this.selectPhoto}
          currentRoute={currentRoute}
        />
        <Carousel slides={slides} slidesToShow={3} slidesToScroll={3} />
        {auth.editMode ? (
          <span className={cx("button-edit-admin")} onClick={this.openPhotoGallery}>
            <TiPencil size={68} />
          </span>
        ) : null}
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({  
  medias: state.media.richMedia,
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  { fetchMedia, updateOrCreateListMediaReference, setRichMediaList }
)(withStyles(s)(SliderUpdater));
