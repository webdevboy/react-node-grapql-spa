import React from "react";
import TiPencil from "react-icons/lib/ti/pencil";
import Modal from "react-responsive-modal";
import cx from "classnames";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import LoadingSpinner from "../../Widgets/LoadingSpinner";
import { addTranslation } from "shared/actions/intl";

class TextPencilEditor extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      isLoading: false,      
    };
    this.textarea = null;
    this.urlTextarea = null;
  }
  onClickOk = async e => {
    e.stopPropagation();
    const { value } = this.textarea;
    const pathUrl = this.urlTextarea ? this.urlTextarea.value : '';
    if (value) {
      this.setState({ isLoading: true });
      await this.props.addTranslation({
        message_id: this.props.messageId,
        locale: this.props.intl.locale,
        content: value,
        defaultMessage: this.props.defaultMessage || this.props.messageId,
        pathUrl,
      });
      /*if(!this.props.isLink)
        this.props.onTranslationChange(value);
      else
        this.props.onTranslationChange(value,pathUrl);*/
    }
    this.setState({ isModalOpen: false, isLoading: false });
  };
  openModal = (e) => {
    e.stopPropagation();
    e.preventDefault();
    this.setState({ isModalOpen: true });
  };
  closeModal = (e) => {
    e.preventDefault();
    this.setState({ isModalOpen: false, isLoading: false });
  };
  getCurrentTranslation() {
    const {
      intl: { locale, messages },
    } = this.props;
    const { messageId, defaultMessage, isLink } = this.props;
    const translations = messages[locale];
    const translation = translations && translations[messageId];
    return translation || defaultMessage || messageId;
  }

  getCurrentUrl(){
    const { messageId, url, isLink, currentLocale } = this.props;    
    return url ? (url.indexOf(currentLocale) == 1 ? url.substr(currentLocale.length+1) : url) : '';
  }

  componentDidMount() {
    //this.props.onTranslationChange(this.getCurrentTranslation());
  }
  render() {
    const { auth, isLink } = this.props;
    const { isModalOpen, isLoading } = this.state;
    return (
      <React.Fragment>
        {(auth.editMode && auth.user && auth.user.is_admin) ? (
          <span className={cx("button-edit-admin")} onClick={this.openModal} style={this.props.pencilStyle}>
            <TiPencil size={18} />
          </span>
        ) : null}
        <Modal
          onClick={e => {
            e.stopPropagation();
          }}
          open={isModalOpen}
          classNames={{
            modal: "custom-admin-edit-modal",
          }}
          little
          showCloseIcon={false}
        >
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <React.Fragment>
              <p className="modal-title">Please enter the translation of text (or alt of image)</p>
              <textarea
                onClick={e => {
                  e.stopPropagation();
                }}
                type="text"
                className={cx("form-control", "modal-input")}
                id="translation-input"
                defaultValue={this.getCurrentTranslation()}
                ref={textarea => {
                  this.textarea = textarea;
                }}
              />              
              {(isLink && 
                <div className={cx("pt-4")}>
                <p className="modal-title">Please enter the link (e.g. start with "/" for internal link or "http" for external link) </p>
                  <textarea
                    onClick={e => {
                      e.stopPropagation();
                    }}
                    type="text"
                    className={cx("form-control", "modal-input")}
                    id="translation-input-url"
                    defaultValue={this.getCurrentUrl()}
                    placeholder="URL"
                    ref={textarea => {
                      this.urlTextarea = textarea;
                    }}
                  />
                </div>
              )}
              <div className="btn-edit-group">
                <button className={cx("button-edit-ok", "btn", "dk-red")} onClick={this.onClickOk}>
                  OK
                </button>
                <button className={cx("button-edit-cancel", "btn")} onClick={this.closeModal}>
                  Cancel
                </button>
              </div>
            </React.Fragment>
          )}
        </Modal>
      </React.Fragment>
    );
  }
}

const mapState = state => ({
    currentLocale: state.intl.locale,
    intl: state.intl,
    auth: state.auth
});

export default connect(mapState, { addTranslation })(TextPencilEditor);
