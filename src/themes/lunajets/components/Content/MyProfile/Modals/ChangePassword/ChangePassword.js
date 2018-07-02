import React from "react";
import PropTypes from "prop-types";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from "./ChangePassword.scss";
import cx from "classnames";
import Text from 'themes/lunajets/components/Primitives/Text';
import CheckCircle from "react-feather/dist/icons/check-circle";
import XCircle from "react-feather/dist/icons/x-circle";

const validatePasswordMatch = (password, confirmPassword) => {
  return password === confirmPassword;
}

const validateOldPassword = (password) => {
  return (password.length > 8);
}

const validatePassword = (password) => {
  let validate = {
    characters: false,
    number: false,
    letters: false
  };

  if(password.length < 8) {
    validate.characters = true;
  }

  if (password.search(/\d/) == -1) {
    validate.number = true;
  }

  if (password.search(/[a-z]/) == -1) {
    validate.letters = true;    
  }

  if (password.search(/[A-Z]/) == -1) {
    validate.letters = true;    
  }

  return validate;
}

export const PasswordErrorModal = (errors) => 
  <div className={cx(s["password-error-container"])}>
    <div className={cx(s.row)}>
      <Text id="client.register.form.password.validate.title" defaultMessage="Your Password mush have:" />
    </div>
    <div className={cx(s.row, errors.characters ? s.error : null)}>
      <span className={cx(s.icon)}>
        {errors.characters
          ? <XCircle color="#ffffff" size="10"/>
          : <CheckCircle color="#ffffff" size="10"/>
        }
      </span>
      <Text className={cx(s.desc)} id="client.register.form.password.validate.characters" defaultMessage="8 or more characters" />
    </div>
    <div className={cx(s.row, errors.number ? s.error : null)}>
      <span className={cx(s.icon)}>
        {errors.number
          ? <XCircle color="#ffffff" size="10"/>
          : <CheckCircle color="#ffffff" size="10"/>
        }
      </span>
      <Text className={cx(s.desc)} id="client.register.form.password.validate.number" defaultMessage="At least one number" />
    </div>
    <div className={cx(s.row, errors.letters ? s.error : null)}>
      <span className={cx(s.icon)}>
        {errors.letters
          ? <XCircle color="#ffffff" size="10"/>
          : <CheckCircle color="#ffffff" size="10"/>
        }
      </span>
      <Text className={cx(s.desc)} id="client.register.form.password.validate.letters" defaultMessage="Upper & lowercase letters" />
    </div>
  </div>

class ChangePassword extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      valid: false,
      isPasswordValid: false,
      isOldPasswordError: false,
      isPasswordError: {
        characters: true,
        number: true,
        letters: true
      },
      matchedPassword: false
    };

    this.onChangeInput = this.onChangeInput.bind(this);
    this.onBlueInput = this.onBlueInput.bind(this);
    this.onMouseEnter = this.onMouseEnter.bind(this);
  }

  handleSubmit = e => {
    e.preventDefault();
  };

  onChangeInput(e) {
    e.preventDefault();
    const { matchedPassword, isPasswordError, isOldPasswordError } = this.state;

    const validPassword = validatePassword(this.password.value);
    const validate = {
      isPasswordError: validPassword,
      isOldPasswordError: (!validateOldPassword(this.oldPassword.value) && isOldPasswordError),
      matchedPassword: !validatePasswordMatch(this.password.value, this.confirmPassword.value),
      valid: (
          (!validPassword.characters && !validPassword.number && !validPassword.letters)
          && validateOldPassword(this.oldPassword.value)
          && validatePasswordMatch(this.password.value, this.confirmPassword.value)
        )
    };

    this.setState(validate);
  }

  onBlueInput(e, type) {
    e.preventDefault();

    let validate = {};
    const validPassword = validatePassword(this.password.value);

    switch(type) {
      case "oldPassword":
        validate.isOldPasswordError = !validateOldPassword(this.oldPassword.value);
        break;
      case "password":
        validate.isPasswordError = validPassword;
        validate.matchedPassword = !validatePasswordMatch(this.password.value, this.confirmPassword.value);
        if( !validPassword.characters && !validPassword.number && !validPassword.letters ) {
          validate.isPasswordValid = false;
        }
        break;
      case "confirm":
        validate.matchedPassword = !validatePasswordMatch(this.password.value, this.confirmPassword.value);
        break;
      default:
        break;
    }
    validate.valid = (
      (!validPassword.characters && !validPassword.number && !validPassword.letters)
      && validateOldPassword(this.oldPassword.value)
      && validatePasswordMatch(this.password.value, this.confirmPassword.value)
    )
 
    this.setState(validate);
  }

  onMouseEnter(e) {
    e.preventDefault();
    this.setState({
      isPasswordValid: true
    });
  }

  render() {  
    const { toggleOpenedModal } = this.props;
    const { valid, isPasswordError, isPasswordValid, isOldPasswordError, matchedPassword} = this.state;

    return (
      <div className={cx(s["change-password-root"])}>
        <h1 className={s.title}>
          <Text id="client.modal.change.password.title" defaultMessage="CHANGE PASSWORD" />
        </h1>

        <div className={s.close} onClick={() => toggleOpenedModal(false, '')}>
          <XCircle color="#3e5970" size="20"/>
        </div>

        <form onSubmit={this.handleSubmit} ref={el => (this.changePasswordForm = el)}>

          <div className={cx(s["input-container"])}>
            <div className={cx(s.label)}>
              <Text id="client.modal.change.password.label.current.password" defaultMessage="TYPE YOUR CURRENT PASSWORD" />
            </div>
            <div className={cx(s.input, isOldPasswordError ? s['is-error'] : null )}>
              <input
                type="password"
                name="oldPassword"
                id="old-password-input"
                onChange={this.onChangeInput}
                onBlur={(e) => this.onBlueInput(e, 'oldPassword')}
                ref={input => (this.oldPassword = input)}
                required
              />
              {isOldPasswordError &&
                <div className={cx(s.error)}>
                  <Text id="client.modal.change.password.old.requried" defaultMessage="(Required! & Type valid your password)" />
                </div>
                }
            </div>
          </div>
          <div className={cx(s["input-container"])}>
            <div className={cx(s.label)}>
              <Text id="client.modal.change.password.label.new.password" defaultMessage="TYPE YOUR NEW PASSWORD" />
            </div>
            <div className={cx(s.input)}>
              <input
                type="password"
                name="password"
                id="password-input"
                onChange={this.onChangeInput}
                onBlur={(e) => this.onBlueInput(e, 'password')}
                onFocus={this.onMouseEnter}
                ref={input => (this.password = input)}
                required
              />
              {isPasswordValid &&
                <PasswordErrorModal {...isPasswordError}/>
              }
            </div>
          </div>
          <div className={cx(s["input-container"])}>
            <div className={cx(s.label)}>
              <Text id="client.modal.change.password.label.retype.new.password" defaultMessage="RETYPE YOUR NEW PASSWORD" />
            </div>
            <div className={cx(s.input, matchedPassword ? s['is-error'] : null )}>
                <input
                  type="password"
                  name="confirm-password"
                  id="confirm-password-input"
                  placeholder="Repeat Password"
                  onChange={this.onChangeInput}
                  onBlur={(e) => this.onBlueInput(e, 'confirm')}
                  ref={input => (this.confirmPassword = input)}
                  required
                />
                {matchedPassword &&
                <div className={cx(s.error)}>
                  <Text id="client.modal.change.password.not.match.error" defaultMessage="(Must be matched!)" />
                </div>
                }
            </div>
          </div>

          <div className={cx(s.buttons)} onClick={() => toggleOpenedModal(true, 'new-password')}>
            <button type="submit" className={cx( s["pt-button"], valid ? s["pt-success"] : null )}>
              <Text id="client.change.password.modal.button.save" defaultMessage="SAVE" />
            </button>
          </div>

          <div className={cx(s.text)}>
              <a className={cx(s.link)} onClick={() => toggleOpenedModal(true, 'forgot-password')}>
                <Text id="client.change.password.modal.button.forgot.password" defaultMessage="Forgot your password?" />
              </a>
          </div>
        </form>
      </div>
    );
  }
}

export default withStyles(s)(ChangePassword);
