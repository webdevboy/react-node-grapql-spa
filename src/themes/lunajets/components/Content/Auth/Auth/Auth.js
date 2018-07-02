import React from "react";
import PropTypes from "prop-types";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import { connect } from "react-redux";
import cx from "classnames";
import { X } from "react-feather";
import s from "./Auth.scss";
import ResetPassword from "../ResetPassword";
import Login from "../Login";
import Register from "../Register";
import { closeAuthModal, openAuthModal } from "themes/lunajets/actions/ui";
import history from 'core/history';

class Auth extends React.Component {

  static contextTypes = {
    params: PropTypes.object,
  }

  changeAction = (action) => {
    this.props.openAuthModal({ action })
  }

  getAction = (action) => {
    switch (action) {
      case 'login':
        return <Login changeAction={this.changeAction} />;
      case 'forgot_password':
        return <ResetPassword changeAction={this.changeAction} />;
      case 'create_account':
        return <Register changeAction={this.changeAction} />;
      default:
        return null
    }
  }

  closeModal = (e) => {
    e.preventDefault();
    this.props.closeAuthModal();
    // if (this.context.params.action) { this.context.params.action = undefined }
  }

  closeModalOnOverlay = (e) => {
    if (e.currentTarget === e.target) {
      this.props.closeAuthModal();
      // if (this.context.params.action) { this.context.params.action = undefined }
    }
  }

  render() {
    const { action } = this.props;

    return (
      <div className={cx(s["auth-root"])} onClick={this.closeModalOnOverlay}>
          <div className={cx(s["auth-box"])}>
            <div className={s.close} onClick={this.closeModal}>
              <X color="#FFF" size="24" />
            </div>
            { this.getAction(action) }
          </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authModal: state.ui.authModal,
});

export default connect(mapStateToProps, { closeAuthModal, openAuthModal })(withStyles(s)(Auth));
