import React, { Fragment } from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import cx from "classnames";
import s from "./style.css";
import { connect } from "react-redux";
import Modal from "react-responsive-modal";
import { updatePageMeta } from "shared/actions/post";
import LoadingSpinner from "themes/lunajets/components/Widgets/LoadingSpinner";
import TiPencil from "react-icons/lib/ti/pencil";
import RichTextEditor from "../../RichTextEditor";
import Carousel from "themes/lunajets/components/Widgets/Carousel";
import MultiPhotoLinkGallery from "admin/components/MultiPhotoLinkGallery";
import MultiSelectPhotoGallery from "admin/components/MultiSelectPhotoGallery";

class SliderLink extends React.Component {
  constructor(props) {
    super(props);
    const { post, locale } = this.props;
    this.state = {
      selectedPhotos: (post.meta && post.meta.gallery_photo) || []
    };
  }

  componentWillReceiveProps(nextProps) {
    const { locale, post } = nextProps;
    if (post.id !== this.props.post.id) {
      this.setState({
        selectedPhotos: (post.meta && post.meta.gallery_photo) || []
      });
    }
  }
  openGallery = () => {
    const { selectedPhotos } = this.state;
    this.photogallery.openGallery(this.props.post, selectedPhotos);
  };

  selectPhotos = selectedPhotos => {
    this.setState({
      selectedPhotos: selectedPhotos
    });
  };

  render() {
    const { auth, language_id, locale, post, defaultSlides } = this.props;
    const { selectedPhotos } = this.state;
    let slidesRetrieved = [];
    const orderedPhotos = selectedPhotos && selectedPhotos.length > 0 && _.orderBy(selectedPhotos, ['order'],['asc']) || [];
    orderedPhotos.map(photo => slidesRetrieved.push({ image: photo.src, description: "", link: photo.link }));
    const slides = slidesRetrieved.length > 0 ? slidesRetrieved : defaultSlides;
    const currentRoute = {
      name: "Home",
      path: "",
      parent: {
        children: [],
        parent: null
      }
    };
    if (this.state.isLoading) {
      return <LoadingSpinner />;
    }
    return (
      <Fragment>
        <MultiPhotoLinkGallery
          onRef={ref => (this.photogallery = ref)}
          selectPhotos={this.selectPhotos}
          currentRoute={currentRoute}
        />
        <Carousel slides={slides} withLink={true} slidesToShow={3} slidesToScroll={3} />
        {auth.editMode ? (
          <span className={cx("button-edit-admin")} onClick={this.openGallery}>
            <TiPencil size={68} />
          </span>
        ) : null}
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  const currentLocale = state.intl.locale;
  const availableLocales = state.runtime.availableLocales;
  let language_id = false;

  for (var key in availableLocales) {
    if (availableLocales.hasOwnProperty(key)) {
      if (availableLocales[key].locale === currentLocale) {
        language_id = availableLocales[key].id;
      }
    }
  }
  return {
    language_id: language_id,
    locale: currentLocale,
    auth: state.auth
  };
};

export default connect(mapStateToProps, { updatePageMeta })(SliderLink);
