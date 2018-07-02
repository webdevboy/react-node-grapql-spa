import React from "react";
import PropTypes from "prop-types";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import { connect } from 'react-redux';
import cx from "classnames";
import User from "react-feather/dist/icons/user";
import Delete from "react-feather/dist/icons/delete";
import Text from 'themes/lunajets/components/Primitives/Text';
import s from "./ResetPassword.scss";
import { forgotPassword } from '../../../../actions/auth';

const validateEmail = (email) => {
  let EMAIL_PATTERN = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return EMAIL_PATTERN.test(String(email).toLowerCase());
}

class ResetPassword extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      valid: false,
      isError: false
    };

    this.onChangeInput = this.onChangeInput.bind(this);
    this.onBlueInput = this.onBlueInput.bind(this);
    this.clearEmail = this.clearEmail.bind(this);
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    await this.props.forgotPassword({
      email: this.email.value,
    });

    

  };

  onChangeInput(e) {
    e.preventDefault();
    const { isError } = this.state;

    const validate = {
      isError: (!validateEmail(this.email.value) && isError),
      valid: validateEmail(this.email.value)
    };

    this.setState(validate);
  }

  onBlueInput(e) {
    e.preventDefault();

    const validate = {
      isError: !validateEmail(this.email.value),
      valid: validateEmail(this.email.value)
    };

    this.setState(validate);
  }

  clearEmail() {
    this.email.value = '';
    this.setState({
      valid: false,
      error: false,
    });
  }


  render() {
    const { changeAction } = this.props;
    const { valid, isError } = this.state;

    return (
      <div className={cx(s["reset-password-root"])}>
        <h1 className={s.title}>
          <Text id="client.reset.password.form.title" defaultMessage="RESET YOUR PASSWORD" />
        </h1>

        <form onSubmit={this.handleSubmit} ref={el => (this.resetPasswordForm = el)}>
          <div className={cx(s["input-container"])}>
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
                onBlur={this.onBlueInput}
                ref={input => (this.email = input)}
                required
              />
              {isError &&
              <div className={cx(s.error)}>
                <Text id="client.reset.password.form.email.error" defaultMessage="(Please enter a valid email address)" />
              </div>
              }
            </div>
            <div className={cx(s.btn)} onClick={this.clearEmail}>
              <Delete color="#3e5970" size="20" />
            </div>
          </div>

          <div className={cx(s.text)}>
            <Text id="client.reset.password.form.desc" defaultMessage="Please enter the email address you registered with in order to receive instructions on how to reset your password." />
          </div>

          <div className={cx(s.buttons)}>
            <button type="submit" className={cx( s["pt-button"], valid ? s["pt-success"] : null )}>
              <Text id="client.reset.password.form.button" defaultMessage="RESET PASSWORD" />
            </button>
          </div>

          <div className={cx(s.text)}>
              <a className={cx(s.link)} onClick={() => this.props.changeAction('login')}>
                <Text id="client.reset.password.form.button.back" defaultMessage="Back to Login" />
              </a>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(null, { forgotPassword })(withStyles(s)(ResetPassword));
