import React from "react";
import PropTypes from "prop-types";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import { connect } from "react-redux";
import { defineMessages, FormattedMessage } from "react-intl";
import s from "./Login.css";
import { login } from "../../actions/auth";
import cx from "classnames";
import User from "react-feather/dist/icons/user";
import Lock from "react-feather/dist/icons/lock";
import { Loader } from "react-loaders";
import Logo from "../../../components/Lunajets/Logo";
import { Button, Position, Toaster, Intent } from "@blueprintjs/core";
import history from "core/history";

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

const EMAIL_PATTERN = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

class Login extends React.Component {
  refHandlers = {
    toaster: ref => (this.toaster = ref),
  };

  static propTypes = {
    user: PropTypes.object,
    login: PropTypes.func,
  };

  constructor(props) {
    super(props);
  }

  handleSubmit = e => {
    e.preventDefault();

    this.toaster.clear();

    this.props.login({
      email: this.email.value,
      password: this.password.value,
    });
  };

  componentWillUpdate(nextProps) {
    if (nextProps.auth.errors && nextProps.auth.errors instanceof Array) {
      this.toaster.show({
        message: nextProps.auth.errors[0].message,
        timeout: 3000,
        intent: Intent.DANGER,
        iconName: "pt-icon-error",
      });
    }

    if (nextProps.auth.token) {
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
  }

  onToasterSuccessDismiss = () => {
    history.push("/");
  };

  render() {
    const loading = false;

    return (
      <div className={cx(s["login-root"])}>
        <div className={cx(s["login-box"])}>
          <h1 className={s.title}>LUNAJETS</h1>

          <Toaster position={Position.TOP} ref={this.refHandlers.toaster} />

          <form onSubmit={this.handleSubmit} ref={el => (this.loginForm = el)}>
            <div className={cx(s["input-container"])}>
              <input
                type="email"
                name="email"
                id="email-input"
                ref={input => (this.email = input)}
                required
              />
              <label htmlFor="email">Email</label>
              <div className={s.bar}></div>
            </div>

            <div className={cx(s["input-container"])}>
              <input
                type="password"
                name="password"
                id="password-input"
                ref={input => (this.password = input)}
                required
              />
              <label htmlFor="password">Password</label>
              <div className={s.bar}></div>
            </div>

            <div className="text-center">
              <Button type="submit" className="pt-button pt-fill pt-ui-text" intent={Intent.NONE} loading={loading}>
                Login
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { login })(withStyles(s)(Login));
