import React,{ Fragment }  from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import s from "./style.css";
import { connect } from "react-redux";
import Modal from "react-responsive-modal";
import { updatePageMeta } from "shared/actions/post";
import LoadingSpinner from "themes/lunajets/components/Widgets/LoadingSpinner";
import TiPencil from "react-icons/lib/ti/pencil";
import RichTextEditor from "../../RichTextEditor";
import Video from "themes/lunajets/components/Primitives/Video";

class VideoUpdater extends React.Component {
  constructor(props) {
    super(props);
    const { post, locale } = this.props;
    this.state = {
      isOpen: false,
      isLoading: false,
      video: post.meta.video_link ? post.meta.video_link : "",
    };
    this.videoTextarea = null;
  }

  componentWillReceiveProps(nextProps) {
    const { locale, post } = nextProps;
    
    if (post.id !== this.props.post.id){
      this.setState({
        video: post.meta.video_link,
      });
    }
  }
  onClick = e => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ isOpen: true });
  };

  onCloseModal = () => {
    this.setState({ isOpen: false });
  };

  onClickOk = async e => {
    const { post, locale } = this.props;
    const { value } = this.videoTextarea;
    e.stopPropagation();
    this.setState({ isLoading: true });
    const data = await this.props.updatePageMeta({id:post.id,metaValue:{video_link: value}});
    this.setState({ isOpen: false, isLoading: false, video: value });
  };

  onClickCancel = e => {
    e.stopPropagation();
    this.setState({ isOpen: false });
  };
  updateNewValue = e => {
    this.setState({ newValue: e });
  };

  render() {
    const { auth, language_id, locale, post, defaultVideo } = this.props;
    const videoSrc = this.state.video ? this.state.video : defaultVideo
    if (this.state.isLoading){
      return <LoadingSpinner />;
    }
    return (
      <Fragment>
        <Video border source={videoSrc} />
        <span className={cx(this.props.className, "editable-text position-relative")}>
          <Modal
            open={this.state.isOpen}
            onClose={this.onCloseModal}
            little
            classNames={{
              modal: "custom-admin-edit-modal",
            }}
          >
            <p className="modal-title">Please enter the video source</p>
            <textarea
                onClick={e => {
                  e.stopPropagation();
                }}
                type="text"
                className={cx("form-control", "modal-input")}
                id="translation-input"
                defaultValue={videoSrc}
                ref={textarea => {
                  this.videoTextarea = textarea;
                }}
              />
            <div className="btn-edit-group">
              <button className={cx("button-edit-ok", "btn", "dk-red")} onClick={this.onClickOk}>
                Ok
              </button>
              <button className={cx("button-edit-cancel", "btn")} onClick={this.onClickCancel}>
                Cancel
              </button>
            </div>
          </Modal>
          {auth.editMode ? (
            <span className={cx("button-edit-admin")} onClick={this.onClick}>
              <TiPencil size={18} />
            </span>
          ) : null}
        </span>
        
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
    auth: state.auth,
  };
};

export default connect(mapStateToProps, { updatePageMeta })(VideoUpdater);
