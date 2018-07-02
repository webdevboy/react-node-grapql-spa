import React from "react";
import PropTypes from "prop-types";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from "./ForgotPassword.scss";
import cx from "classnames";
import Text from 'themes/lunajets/components/Primitives/Text';
import XCircle from "react-feather/dist/icons/x-circle";

const validateEmail = (email) => {
  let EMAIL_PATTERN = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return EMAIL_PATTERN.test(String(email).toLowerCase());
}

class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      valid: false,
      isEmailError: false,
    };

    this.onChangeInput = this.onChangeInput.bind(this);
    this.onBlueInput = this.onBlueInput.bind(this);
  }

  handleSubmit = e => {
    e.preventDefault();
  };

  onChangeInput(e) {
    e.preventDefault();
    const { isEmailError } = this.state;

    const validate = {
      isEmailError: (!validateEmail(this.email.value) && isEmailError),
      valid: validateEmail(this.email.value)
    };

    this.setState(validate);
  }

  onBlueInput(e, type) {
    e.preventDefault();

    let validate = {};

    validate.isEmailError = !validateEmail(this.email.value);
    validate.valid = validateEmail(this.email.value);
 
    this.setState(validate);
  }

  render() {  
    const { toggleOpenedModal } = this.props;
    const { valid, isEmailError} = this.state;

    return (
      <div className={cx(s["forgot-password-root"])}>
        <h1 className={s.title}>
          <Text id="client.modal.forgot.password.title" defaultMessage="FORGET YOUR PASSWORD" />
        </h1>

        <div className={s.close} onClick={() => toggleOpenedModal(false, '')}>
          <XCircle color="#3e5970" size="20"/>
        </div>

        <form onSubmit={this.handleSubmit} ref={el => (this.forgotPasswordForm = el)}>
          <div className={s.desc}>
            <Text id="client.modal.forgot.password.desc" defaultMessage="Please confirm your email address in order to receive a link to reset your password" />
          </div>
          <div className={cx(s["input-container"])}>
            <div className={cx(s.input, isEmailError ? s['is-error'] : null )}>
              <input
                type="email"
                name="email"
                id="old-password-input"
                onChange={this.onChangeInput}
                onBlur={(e) => this.onBlueInput(e, 'email')}
                ref={input => (this.email = input)}
                required
              />
              {isEmailError &&
                <div className={cx(s.error)}>
                  <Text id="client.modal.forgot.password.error.valid" defaultMessage="(Please enter a valid email address)" />
                </div>
                }
            </div>
          </div>
          
          <div className={cx(s.buttons)} onClick={() => toggleOpenedModal(true, 'forgot-password-confirm')}>
            <button type="submit" className={cx( s["pt-button"], valid ? s["pt-success"] : null )}>
              <Text id="client.forgot.password.modal.button.send" defaultMessage="SEND" />
            </button>
          </div>

        </form>
      </div>
    );
  }
}

export default withStyles(s)(ForgotPassword);
