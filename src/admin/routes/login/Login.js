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
import Logo from "../../components/Logo";
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
    toaster: ref => this.toaster = ref,
  };

  static propTypes = {
    login: PropTypes.func,
  };

  constructor(props) {
    super(props);
  }

  handleSubmit = (e) => {
    e.preventDefault();

    this.toaster.clear();

    this.props.login({
      login: {
        email: this.email.value,
        password: this.password.value,
      },
    });
  }

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
    history.replace('/');
  }

  render() {
    const { errors, loading = false } = this.props.auth;

    return (
      <div className={cx(s.root)}>
        <div className={cx(s.container)}>

          <div className={s.logo}>
            <Logo />
          </div>

          <Toaster position={Position.TOP} ref={this.refHandlers.toaster} />

          <form onSubmit={this.handleSubmit} ref={el => this.loginForm = el}>

            <div className="pt-form-group">
              <div className="pt-input-group">
                <span className="pt-icon pt-icon-user" />
                <input
                  className="pt-input"
                  type="email"
                  name="email"
                  id="email-input"
                  placeholder="Type your Email ..."
                  ref={input => this.email = input}
                />
              </div>
            </div>

            <div className="pt-form-group">

              <div className="pt-input-group">
                <input
                  type="password"
                  name="password"
                  id="password-input"
                  ref={input => this.password = input}
                  className="pt-input"
                  placeholder="Enter your password..."
                />
                <span className="pt-icon pt-icon-lock" />
              </div>
            </div>

            <div className="pt-form-group">
              <Button type="submit" className="pt-button pt-fill pt-ui-text" intent={Intent.NONE} loading={loading}>Login</Button>
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
