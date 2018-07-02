import React from "react";
import PropTypes from "prop-types";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from "./AccountEdit.scss";
import cx from "classnames";
import Text from 'themes/lunajets/components/Primitives/Text';
import ChevronRight from "react-feather/dist/icons/chevron-right";
import Select from 'react-select';
import TelephoneInput from '../../../../UI/TelephoneInput';

import { isoCountries } from './countries';

const validateEmail = (email) => {
  let EMAIL_PATTERN = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return EMAIL_PATTERN.test(String(email).toLowerCase());
}

class AccountEdit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        title: "Mr",
        firstName: "Eymeric",
        lastName: "Segard",
        companyName: "",
        Position: "",
        email: "",
        phoneCode: "ch",
        phoneNumber: "",
        addressLine1: "",
        addressLine2: "",
        postCode: "",
        city: "",
        country: "",
      },
      valid: false,
      isError: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.updateTitle = this.updateTitle.bind(this);
    this.updateCountry = this.updateCountry.bind(this);
    this.onPhoneUpdate = this.onPhoneUpdate.bind(this);
    this.onCountryChange = this.onCountryChange.bind(this);
    this.accountSave = this.accountSave.bind(this);
    this.changePassword = this.changePassword.bind(this);
  }

  handleSubmit = e => {
    e.preventDefault();
  };

  handleChange = (name, event) => {
    event.preventDefault();

    let validate = {
      user: {
        ...this.state.user,
        [name]: event.target.value
      }
    };

    if (name === "email") {
      validate = {
        isError: !validateEmail(this.email.value),
        valid: validateEmail(this.email.value),
        user: {
          ...this.state.user,
          [name]: event.target.value
        }
      };
    }

    this.setState(validate);
  }

  handleBlur(e) {
    e.preventDefault();

    const validate = {
      isError: !validateEmail(this.email.value),
      valid: validateEmail(this.email.value)
    };

    this.setState(validate);
  }

  updateTitle (newValue) {
		this.setState({
      user: {
        ...this.state.user,
        title: newValue,
      }
		});
  }

  updateCountry(newValue) {
		this.setState({
      user: {
        ...this.state.user,
        country: newValue,
      }
		});
  }
  
  onPhoneUpdate(telNumber) {
    this.setState({
      user: {
        ...this.state.user,
        phoneNumber: telNumber
      }
		});
  }

  onCountryChange(countryCode) {
    this.setState({
      user: {
        ...this.state.user,
        phoneCode: countryCode,
      }
		});
  }

  accountSave() {
    this.props.toggleEditMode();
    this.props.toggleOpenedModal(true, "saved");
  }

  changePassword() {
    this.props.toggleOpenedModal(true, "change-password");
  }

  render() {

    const { toggleEditMode, toggleOpenedModal } = this.props;
    const { user, isError, valid } = this.state;

    const titles = [
      { value: 'Mr', label: 'Mr' },
      { value: 'Ms', label: 'Ms' },
      { value: 'Mrs', label: 'Mrs' }
    ];
    return (
      <div className={cx(s["account-edit-root"])}>
        <form onSubmit={this.handleSubmit} ref={el => (this.editForm = el)}>
          <div className={cx(s["input-group"])}>
            <div className={s.row}>
              <div className={cx(s.select, s["r-border"])}>
                <Select
                  id="title-select"
                  ref={(ref) => { this.title = ref; }}
                  onBlurResetsInput={false}
                  onSelectResetsInput={false}
                  autoFocus={false}
                  options={titles}
                  simpleValue
                  clearable={false}
                  name="title"
                  disabled={false}
                  value={user.title}
                  onChange={this.updateTitle}
                  rtl={false}
                  searchable={false}
                />
              </div>
              <div className={cx(s.input, s["r-border"])}>
                <input
                  type="text"
                  name="firstName"
                  id="first-name-input"
                  placeholder="First Name"
                  onChange={(e) => this.handleChange('firstName', e)}
                  value={user.firstName}
                  ref={input => (this.firstName = input)}
                />
              </div>
              <div className={cx(s.input)}>
                <input
                  type="text"
                  name="lastName"
                  id="last-name-input"
                  placeholder="Last Name"
                  onChange={(e) => this.handleChange("lastName", e)}
                  value={user.lastName}
                  ref={input => (this.lastName = input)}
                />
              </div>
            </div>
          </div>

          <div className={cx(s["input-group"])}>
            <div className={cx(s.row, s["b-border"])}>
              <div className={cx(s.input)}>
                <input
                  type="text"
                  name="companyName"
                  id="company-name-input"
                  placeholder="Company Name"
                  onChange={(e) => this.handleChange("companyName", e)}
                  value={user.companyName}
                  ref={input => (this.companyName = input)}
                />
              </div>
            </div>
            <div className={s.row}>
              <div className={cx(s.input)}>
                <input
                  type="text"
                  name="Position"
                  id="position-input"
                  placeholder="Position"
                  onChange={(e) => this.handleChange("position", e)}
                  value={user.position}
                  ref={input => (this.position = input)}
                />
              </div>
            </div>
          </div>

          <div className={cx(s["input-group"])}>
            <div className={cx(s.row, s["b-border"])}>
              <div className={cx(s.input, isError ? s['is-error'] : null )}>
                <input
                  type="email"
                  name="email"
                  id="email-input"
                  placeholder="Email"
                  onChange={(e) => this.handleChange("email", e)}
                  onBlur={this.handleBlur}
                  value={user.email}
                  ref={input => (this.email = input)}
                />
                {isError &&
                <div className={cx(s.error)}>
                  <Text id="client.account.edit.email.error" defaultMessage="(Please enter a valid email address)" />
                </div>
                }
              </div>
            </div>
            <div className={cx(s.row, s["b-border"])}>
              <div className={cx(s.input)}>
                <TelephoneInput className={cx(s.phone)} countryCode={user.phoneCode} onCountryChange={(countryCode) => this.onCountryChange(countryCode)} onBlur={(value) => this.onPhoneUpdate(value)} />
              </div>
            </div>
            <div className={cx(s.row, s["b-border"])}>
              <div className={cx(s.input)}>
                <input
                  type="text"
                  name="addressLine1"
                  id="address-line-1-input"
                  placeholder="Address Line 1"
                  onChange={(e) => this.handleChange("addressLine1", e)}
                  value={user.addressLine1}
                  ref={input => (this.addressLine1 = input)}
                />
              </div>
            </div>
            <div className={cx(s.row, s["b-border"])}>
              <div className={cx(s.input)}>
                <input
                  type="text"
                  name="addressLine2"
                  id="address-line-2-input"
                  placeholder="Address Line 2"
                  onChange={(e) => this.handleChange("addressLine2", e)}
                  value={user.addressLine2}
                  ref={input => (this.addressLine2 = input)}
                />
              </div>
            </div>
            <div className={cx(s.row, s["b-border"])}>
              <div className={cx(s.input, s["r-border"])}>
                <input
                  type="text"
                  name="postcode"
                  id="postcode-input"
                  placeholder="Postcode"
                  onChange={(e) => this.handleChange("postCode", e)}
                  value={user.postCode}
                  ref={input => (this.postCode = input)}
                />
              </div>
              <div className={cx(s.input)}>
                <input
                  type="text"
                  name="city"
                  id="city-input"
                  placeholder="City"
                  onChange={(e) => this.handleChange("city", e)}
                  value={user.city}
                  ref={input => (this.city = input)}
                />
              </div>
            </div>
            <div className={s.row}>
              <div className={cx(s.select)}>
                <Select
                  id="country-select"
                  ref={(ref) => { this.country = ref; }}
                  onBlurResetsInput={false}
                  onSelectResetsInput={false}
                  autoFocus={false}
                  options={isoCountries}
                  simpleValue
                  clearable={false}
                  name="country"
                  placeholder="Country"
                  disabled={false}
                  value={user.country}
                  onChange={this.updateCountry}
                  rtl={false}
                  searchable={false}
                />
              </div>
            </div>
          </div>
          
          <div className={cx(s.buttons)}>
            <button className={cx(s["cp-button"])} onClick={this.changePassword}>
              <Text className={s.text} id="client.account.detail.button.change.password" defaultMessage="Change password" />
              <ChevronRight color="#3e5970" size="30" />
            </button>

            <button className={cx(s["pt-button"])} onClick={this.accountSave}>
              <Text id="client.account.detail.button.save" defaultMessage="SAVE" />
            </button>
          </div>
        </form>
      </div>
    );
  }
}


export default withStyles(s)(AccountEdit);
