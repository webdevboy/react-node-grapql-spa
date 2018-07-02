/*
 * // USAGE:

 * <Text
 *    defaultMessage="How it Works {link}" id="client.home.sectionTitle.howItWorks"
 *    values={{
 *      link: <a href="#"><Text id="link.id" defaultMessage="LINK HERE" /></a>
 *    }}
 *  />
 */
import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import s from "./style.css";
import { connect } from "react-redux";
import Modal from "react-responsive-modal";
import { addRichTextTranslation } from "shared/actions/intl";
import DraftjsDecoder from "utils/DraftjsDecoder";
import { FormattedMessage, injectIntl } from "react-intl";
import Loading from "react-loading-animation";
import TiPencil from "react-icons/lib/ti/pencil";
import RichTextEditor from "../../RichTextEditor";

// temporary work-around (see https://github.com/yahoo/babel-plugin-react-intl/issues/119)

class RichText extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isLoading: false,
      newValue: "",
      ...props,
    };
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
    e.stopPropagation();
    this.setState({ isLoading: true });
    const data = await this.props.addRichTextTranslation({
      message_id: this.props.id,
      locale: this.props.intl.locale,
      content: this.state.newValue,
    });
    this.setState({ isOpen: false, isLoading: false });
  };

  onClickCancel = e => {
    e.stopPropagation();
    this.setState({ isOpen: false });
  };
  updateNewValue = e => {
    this.setState({ newValue: e });
  };

  render() {
    const { currentLocale, defaultMessage, id, auth, intl } = this.props;
    let textContent = "undefined";

    if (intl.richMessages[currentLocale] && intl.richMessages[currentLocale][id]) {
      textContent = intl.richMessages[currentLocale][id] || null;
    }
    return (
      <Loading isLoading={this.state.isLoading}>
        <span className={cx(this.props.className, "editable-text position-relative")}>
          <Modal
            open={this.state.isOpen}
            onClose={this.onCloseModal}
            little
            classNames={{
              modal: "custom-admin-edit-modal",
            }}
          >
            <p className="modal-title">Please enter the translation</p>
            <RichTextEditor onChange={this.updateNewValue} value={textContent} />
            <div className="btn-edit-group">
              <button className={cx("button-edit-ok", "btn", "dk-red")} onClick={this.onClickOk}>
                Ok
              </button>
              <button className={cx("button-edit-cancel", "btn")} onClick={this.onClickCancel}>
                Cancel
              </button>
            </div>
          </Modal>
          <DraftjsDecoder contentState={textContent} />

          {auth.editMode ? (
            <span className={cx("button-edit-admin")} onClick={this.onClick}>
              <TiPencil size={18} />
            </span>
          ) : null}
        </span>
      </Loading>
    );
  }
}

const mapState = state => ({
  currentLocale: state.intl.locale || state.intl.defaultLocale,
  intl: state.intl,
  auth: state.auth,
});

export default connect(mapState, { addRichTextTranslation })(RichText);
