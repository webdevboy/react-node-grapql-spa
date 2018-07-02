import React from "react";
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from "./Register.scss";
import cx from "classnames";
import CheckCircle from "react-feather/dist/icons/check-circle";
import XCircle from "react-feather/dist/icons/x-circle";
import Eye from "react-feather/dist/icons/eye";
import EyeOff from "react-feather/dist/icons/eye-off";
import Text from 'themes/lunajets/components/Primitives/Text';
import { createAccount } from '../../../../actions/auth';

const validateEmail = (email) => {
  let EMAIL_PATTERN = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return EMAIL_PATTERN.test(String(email).toLowerCase());
}

const validatePasswordMatch = (password, confirmPassword) => {
  return password === confirmPassword;
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

const validateName = (name) => {
  return name !== '';
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

class Register extends React.Component {

  state = {
    accountType: 0,
    titleType: 'Mr',
    passwordType: 'password',
    valid: false,
    isEmailError: false,
    isFirstNameError: false,
    isLastNameError: false,
    isPasswordValid: false,
    isPasswordError: {
      characters: true,
      number: true,
      letters: true
    },
    matchedPassword: false
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    const account = {
      email: this.email.value,
      password: this.password.value,
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      title: this.state.titleType,
      // accountType: this.state.accountType,
    };

    const options = {
      locale: this.props.locale,
      website: true,
    };

    console.log(account);
    const acc = await this.props.createAccount({ account, options });

    console.log(acc);


  };

  onChangeInput = (e) => {
    e.preventDefault();
    const { isEmailError, isFirstNameError, isLastNameError, matchedPassword, isPasswordError } = this.state;

    const validPassword = validatePassword(this.password.value);
    const validate = {
      isEmailError: (!validateEmail(this.email.value) && isEmailError),
      isFirstNameError: (!validateName(this.firstName.value) && isFirstNameError),
      isLastNameError: (!validateName(this.lastName.value) && isLastNameError),
      isPasswordError: validPassword,
      matchedPassword: !validatePasswordMatch(this.password.value, this.confirmPassword.value),
      valid: (
          validateEmail(this.email.value) 
          && (!validPassword.characters && !validPassword.number && !validPassword.letters)
          && validateName(this.firstName.value)
          && validateName(this.lastName.value)
          && validatePasswordMatch(this.password.value, this.confirmPassword.value)
        )
    };

    this.setState(validate);
  }

  onBlurInput = (e, type) => {
    e.preventDefault();
    const validate = {};
    const validPassword = validatePassword(this.password.value);

    switch(type) {
      case "email":
        validate.isEmailError = !validateEmail(this.email.value);
        break;
      case "first":
        validate.isFirstNameError = !validateName(this.firstName.value);
        break;
      case "last":
        validate.isLastNameError = !validateName(this.lastName.value);
        break;
      case "password":
        validate.isPasswordError = validPassword;
        validate.matchedPassword = !validatePasswordMatch(this.password.value, this.confirmPassword.value);
        validate.isPasswordValid = (!validPassword.characters && !validPassword.number && !validPassword.letters);
        break;
      case "confirm":
        validate.matchedPassword = !validatePasswordMatch(this.password.value, this.confirmPassword.value);
        break;
      default:
        break;
    }
    
    validate.valid = (
      validateEmail(this.email.value)
      && (!validPassword.characters && !validPassword.number && !validPassword.letters)
      && validateName(this.firstName.value)
      && validateName(this.lastName.value)
      && validatePasswordMatch(this.password.value, this.confirmPassword.value)
    )
 
    this.setState(validate);
  }

  onMouseEnter = (e) => {
    e.preventDefault();
    this.setState({
      isPasswordValid: true
    });
  }

  changePasswordType = (type) => {
    this.setState({
      passwordType: type
    });
  }

  changeAccountType = (type) => {
    this.setState({
      accountType: type
    });
  }

  changeTitleType = (type) => {
    this.setState({
      titleType: type
    });
  }

  render() {
    const {
      accountType,
      titleType,
      passwordType,
      valid,
      isEmailError,
      isFirstNameError,
      isLastNameError,
      isPasswordError,
      matchedPassword,
      isPasswordValid,
    } = this.state;

    return (
      <div className={cx(s["register-root"])}>
        <h1 className={s.title}>
          <Text id="client.register.form.title" defaultMessage="REGISTER" />
        </h1>

        <form onSubmit={this.handleSubmit} ref={el => this.registerForm = el}>
          <div className={cx("row", s["input-type-container"])}>
            <div className={cx("col-6", s.box)} onClick={() => this.changeAccountType(0)}>
              <input
                type="radio"
                name="accountType"
                value="0"
                id="radio1"
                checked={ accountType === 0 ? 'checked' : '' }
              />
              <label htmlFor="radio1">
                <Text id="client.register.form.account.personal" defaultMessage="Personal account" />
              </label>
            </div>
            <div className={cx("col-6", s.box)} onClick={() => this.changeAccountType(1)}>
              <input
                type="radio"
                name="accountType"
                value="1"
                id="radio2"
                checked={ accountType === 1 ? 'checked' : '' }
              />
              <label htmlFor="radio2">
                <Text id="client.register.form.account.corporate" defaultMessage="Corporate account" />
              </label>
            </div>
          </div>

          <div className={cx("row", s["input-container"], s["radis-top"])}>
            <div className={cx("col-3", s.label)}>
              <Text id="client.register.form.title.label" defaultMessage="Title" />
            </div>
            <div className={cx("col-3")} onClick={() => this.changeTitleType("Mr")}>
              <input
                type="radio"
                name="titleType"
                value="Mr"
                id="radio3"
                checked={ titleType === "Mr" ? 'checked' : '' }
              />
              <label htmlFor="radio3">
                <Text id="client.register.form.title.mr" defaultMessage="Mr" />
              </label>
            </div>
            <div className={cx("col-3")} onClick={() => this.changeTitleType("Ms")}>
              <input
                type="radio"
                name="titleType"
                value="Ms"
                id="radio4"
                checked={ titleType === "Ms" ? 'checked' : '' }
              />
              <label htmlFor="radio4">
                <Text id="client.register.form.title.ms" defaultMessage="Ms" />
              </label>
            </div>
            <div className={cx("col-3")} onClick={() => this.changeTitleType("Mrs")}>
              <input
                type="radio"
                name="titleType"
                value="Mrs"
                id="radio5"
                checked={ titleType === "Mrs" ? 'checked' : '' }
              />
              <label htmlFor="radio5">
                <Text id="client.register.form.title.mrs" defaultMessage="Mrs" />
              </label>
            </div>
          </div>

          <div className={cx("row", s["input-container"])}>
            <div className={cx("col-6", s.col)}>
              <div className={cx(s.input, isFirstNameError ? s['is-error'] : null )}>
                <input
                  type="text"
                  name="firstName"
                  id="first-name-input"
                  placeholder="First Name"
                  onChange={this.onChangeInput}
                  onBlur={(e) => this.onBlurInput(e, 'first')}
                  ref={input => this.firstName = input}
                  required
                />
                {isFirstNameError &&
                <div className={cx(s.error)}>
                  <Text id="client.register.form.required.error" defaultMessage="(Required!)" />
                </div>
                }
              </div>
            </div>
            <div className={cx("col-6", s.col)}>
              <div className={cx(s.input, isLastNameError ? s['is-error'] : null )}>
                <input
                  type="text"
                  name="lastName"
                  id="last-name-input"
                  placeholder="Last Name"
                  onChange={this.onChangeInput}
                  onBlur={(e) => this.onBlurInput(e, 'last')}
                  ref={input => this.lastName = input}
                  required
                />
                {isLastNameError &&
                <div className={cx(s.error)}>
                  <Text id="client.register.form.required.error" defaultMessage="(Required!)" />
                </div>
                }
              </div>
            </div>
          </div>

          <div className={cx(s["input-container"])}>
            <div className={cx(s.input, isEmailError ? s['is-error'] : null )}>
              <input
                type="email"
                name="email"
                id="email-input"
                placeholder="Email"
                onChange={this.onChangeInput}
                onBlur={(e) => this.onBlurInput(e, 'email')}
                ref={input => this.email = input}
                required
              />
              {isEmailError &&
              <div className={cx(s.error)}>
                <Text id="client.register.form.email.error" defaultMessage="(Please enter a valid email address)" />
              </div>
              }
            </div>
          </div>

          <div className={cx("row", s["input-container"], s["radis-bottom"])}>
            <div className={cx("col-6", s.col)}>
              <div className={cx(s.input)}>
                <input
                  type={passwordType}
                  name="password"
                  id="password-input"
                  placeholder="Password"
                  onChange={this.onChangeInput}
                  onBlur={(e) => this.onBlurInput(e, 'password')}
                  onFocus={this.onMouseEnter}
                  ref={input => this.password = input}
                  required
                />
                {isPasswordValid &&
                  <PasswordErrorModal {...isPasswordError}/>
                }
              </div>
              <div className={cx(s.btn)}>
                {passwordType === "password"
                  ? <Eye color="#3e5970" size="20" onClick={() => this.changePasswordType('text')}/>
                  : <EyeOff color="#3e5970" size="20" onClick={() => this.changePasswordType('password')}/>
                }
              </div>
            </div>
            <div className={cx("col-6", s.col)}>
              <div className={cx(s.input, matchedPassword ? s['is-error'] : null )}>
                <input
                  type={passwordType}
                  name="confirm-password"
                  id="confirm-password-input"
                  placeholder="Repeat Password"
                  onChange={this.onChangeInput}
                  onBlur={(e) => this.onBlurInput(e, 'confirm')}
                  ref={input => this.confirmPassword = input}
                  required
                />
                {matchedPassword &&
                <div className={cx(s.error)}>
                  <Text id="client.register.form.not.match.error" defaultMessage="(Must be matched!)" />
                </div>
                }
              </div>
            </div>
          </div>

          <div className={cx(s.text)}>
              <Text id="client.register.form.desc.by" defaultMessage="By registering you accept our" />
              <br />
              <a className={cx(s.link)}>
                <Text id="client.register.form.terms" defaultMessage="Terms & Conditions" />
              </a>
              <Text className="mx-2" id="client.register.form.desc.and" defaultMessage="and" />
              <a className={cx(s.link)}>
                <Text id="client.register.form.privacy" defaultMessage="Data Privacy" />
              </a>
          </div>

          <div className={cx(s.buttons)}>
            <button type="submit" className={cx( s["pt-button"], valid ? s["pt-success"] : null )}>
              <Text id="client.register.form.button.register" defaultMessage="REGISTER" />
            </button>
          </div>

          <div className={cx(s.text)}>
              <Text id="client.register.form.already.registered" defaultMessage="Already registered?" />
              <br />
              <a className={cx(s.link)} onClick={() => this.props.changeAction('create_account')}>
                <Text id="client.register.form.goto.signin" defaultMessage="Sign In" />
              </a>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  locale: state.intl.locale || state.intl.defaultLocale,
  auth: state.auth,
});

export default connect(mapStateToProps, { createAccount })(withStyles(s)(Register));
