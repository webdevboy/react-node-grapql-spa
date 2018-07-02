import React from "react";
import PropTypes from "prop-types";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import { connect } from 'react-redux';
import { defineMessages, FormattedMessage } from "react-intl";
import cx from "classnames";
import User from "react-feather/dist/icons/user";
import Lock from "react-feather/dist/icons/lock";
import XCircle from "react-feather/dist/icons/x-circle";
import Eye from "react-feather/dist/icons/eye";
import EyeOff from "react-feather/dist/icons/eye-off";
import { Position, Toaster, Intent } from "@blueprintjs/core";
import Text from 'themes/lunajets/components/Primitives/Text';
import s from "./Login.scss";
import { login } from '../../../../actions/auth';
import history from 'core/history';
import { closeAuthModal } from "themes/lunajets/actions/ui";

const messages = defineMessages({
  loginArea: {
    id: "login.area",
    defaultMessage: "Lunajets Admin area",
    description: "Admin area",
  },
  loginEmail: {
    id: "login.email",
    defaultMessage: "Email",
    description: "Brand name displayed in header",
  },
  loginPassword: {
    id: "login.password",
    defaultMessage: "Password",
    description: "Title in page header",
  },
  resetPassword: {
    id: "login.reset.password",
    defaultMessage: "Reset Password",
    description: "Link reset password",
  },
});

// const EMAIL_PATTERN = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

const validateEmail = (email) => {
  let EMAIL_PATTERN = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return EMAIL_PATTERN.test(String(email).toLowerCase());
}

const validatePassword = (password) => {
  return password.length >= 8;
}

class Login extends React.Component {

  refHandlers = {
    toaster: ref => this.toaster = ref,
  }

  state = {
    passwordType: 'password',
    valid: false,
    isError: false,
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    if (this.toaster.getToasts().length) {
      this.toaster.clear();
    }

    await this.props.login({
      email: this.email.value,
      password: this.password.value,
    });

    const { auth } = this.props;

    if (auth.errors && auth.errors instanceof Array) {
      this.toaster.show({
        message: auth.errors[0].message,
        timeout: 3000,
        intent: Intent.DANGER,
        iconName: "pt-icon-error",
      });
      return;
    }

    let message;
    
    if (auth.migrated) { message = "Welcome dear user, we've updated our website and we need you to set a new password, please check your email inbox" }
    if (auth.activate) { message = "You're account requires activation. Please check your email inbox" }
    if (auth.reset_password) { message = "You've request a password reset. Please check your email inbox" }

    if (auth.migrated || auth.activate || auth.reset_password) {
      this.toaster.show({
        message,
        timeout: 5000,
        intent: Intent.WARNING,
        onDismiss: this.dismissToast,
        iconName: "pt-icon-warning-sign",
      });
      return;
    }

    if (auth.token) {
      this.toaster.show({
        message: "Success! Wai't while we redirect you",
        timeout: 3000,
        intent: Intent.SUCCESS,
        onDismiss: this.onToasterSuccessDismiss,
        iconName: "pt-icon-tick-circle",
        action: {
          text: "Let's Go",
          onClick: this.onToasterSuccessDismiss,
        },
      });
    }

  };

  dismissToast = () => {
    this.toaster.dismiss()
  }

  onToasterSuccessDismiss = () => {
    this.props.closeAuthModal();
    history.push('/customer-area');
  };

  onChangeInput = (e) => {
    e.preventDefault();
    const { isError } = this.state;

    const validate = {
      isError: (!validateEmail(this.email.value) && isError),
      valid: (validateEmail(this.email.value) && validatePassword(this.password.value))
    };

    this.setState(validate);
  }

  onBlurInput = (e) => {
    e.preventDefault();

    const validate = {
      isError: !validateEmail(this.email.value),
      valid: (validateEmail(this.email.value) && validatePassword(this.password.value))
    };

    this.setState(validate);
  }

  clearEmail = () => {
    this.email.value = '';
    this.setState({
      valid: false,
      isError: false,
    });
  }

  changePasswordType = (type) => {
    this.setState({
      passwordType: type
    });
  }

  render() {
    const { passwordType, valid, isError } = this.state;
    const { loading = false } = this.props.auth;

    return (
      <div className={cx(s["login-root"])}>
        <h1 className={s.title}>
          <Text id="client.login.form.title" defaultMessage="LOGIN" />
        </h1>

        <Toaster className={s.toast} position={Position.TOP} ref={this.refHandlers.toaster} />

        <form onSubmit={this.handleSubmit} ref={el => (this.loginForm = el)}>
          <div className={cx(s["input-container"], s["radis-top"])}>
            <div className={cx(s.icon)}>
              <User color="#3e5970" size="20" />
            </div>
            <div className={cx(s.input, isError ? s['is-error'] : null )}>
              <input
                type="email"
                name="email"
                id="email-input"
                placeholder="Email"
                onChange={this.onChangeInput}
                onBlur={this.onBlurInput}
                ref={input => (this.email = input)}
                required
              />
              {isError &&
              <div className={cx(s.error)}>
                <Text id="client.login.form.email.error" defaultMessage="(Please enter a valid email address)" />
              </div>
              }
            </div>
            <div className={cx(s.btn)} onClick={this.clearEmail}>
              <XCircle color="#3e5970" size="20" />
            </div>
          </div>

          <div className={cx(s["input-container"], s["radis-bottom"])}>
            <div className={cx(s.icon)}>
              <Lock color="#3e5970" size="20" />
            </div>
            <div className={cx(s.input)}>
              <input
                type={passwordType}
                name="password"
                id="password-input"
                placeholder="Password"
                onChange={this.onChangeInput}
                onBlur={this.onBlueInput}
                ref={input => (this.password = input)}
                required
              />
            </div>
            <div className={cx(s.btn)}>
              {passwordType === "password"
                ? <Eye color="#3e5970" size="20" onClick={() => this.changePasswordType('text')}/>
                : <EyeOff color="#3e5970" size="20" onClick={() => this.changePasswordType('password')}/>
              }
            </div>
          </div>

          <div className={cx(s.text)}>
              <a className={cx(s.link)} onClick={() => this.props.changeAction('forgot_password')}>
                <Text id="client.login.form.forgot.password" defaultMessage="Forgot your password?" />
              </a>
          </div>

          <div className={cx(s.buttons)}>
            <button type="submit" className={cx( s["pt-button"], valid ? s["pt-success"] : null )}>
              { (!loading) ? <Text id="client.login.form.button.signin" defaultMessage="SIGN IN" /> : <span>Loading ...</span> }
            </button>
          </div>

          <div className={cx(s.text)}>
              <Text id="client.login.form.not.registered" defaultMessage="Not registered?" />
              <br />
              <a className={cx(s.link)} onClick={() => this.props.changeAction('create_account')}>
                <Text id="client.login.form.create.new.account" defaultMessage="Create new account" />
              </a>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  auth,
});

export default connect(mapStateToProps, { login, closeAuthModal })(withStyles(s)(Login));
