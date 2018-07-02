import React, { Component } from 'react';
import cx from "classnames";
import _ from 'lodash';

import { DIAL_CODES } from './fixtures';

const PHONE_REGEX = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

export class TelephoneInput extends Component {
  constructor(props) {
    super(props);

    
    const phoneCountry = props.countryCode ? props.countryCode.toLowerCase() : "gb";
    
    const dial = _.find(DIAL_CODES, { code: phoneCountry.toUpperCase() }).dial_code;
    
    this.state = {
      phoneCountry: phoneCountry,
      phone: dial,
      dial: dial,
    };
  }

  onChangePhoneInput = (e) => {
    
    if (e.target.value.length > 1 && e.target.value.charAt(0) === "+") {
      const newDial = _.find(DIAL_CODES, (val) => {
        if (e.target.value.startsWith(val.dial_code)) {
          return true;
        }
      });

      if (newDial) {
        const stripeDial = e.target.value.replace(newDial.dial_code, "").trim();
        this.setState({
          //phone: stripeDial,
          phone: e.target.value.trim(),
          phoneCountry: newDial.code.toLowerCase(),
          dial: newDial.dial_code
        });
      } else {
        this.setState({
          // phone: e.target.value.replace(this.state.dial, ''),
          phone: e.target.value.trim(),
        });
      }
    } else {
      this.setState({
        // phone: e.target.value.replace(this.state.dial, ''),
        phone: e.target.value.trim(),
      });
    }

  }

  changePhoneCountry = (e, countryCode) => {
    const dial = _.find(DIAL_CODES, { code: countryCode.toUpperCase() }).dial_code;

    if( this.props.onCountryChange ) {
      this.props.onCountryChange(countryCode);
    }

    this.setState({
      phoneCountry: countryCode,
      dial: dial,
      phone: dial
    });
  }

  render() {
    const { className, onBlur, value } = this.props;
    const { phoneCountry, dial, phone } = this.state;
    return (
      <div className={cx("input-group", className)}>
        <div className="input-group-btn">
          <button type="button" className="btn btn-secondary dropdown-toggle" id="country-flag" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <span className={cx("famfamfam-flags", phoneCountry.toLowerCase())} />
          </button>
          <div className="dropdown-menu" aria-labelledby="country-flag">
            { DIAL_CODES.map(country =>
              <a
                role="button"
                key={`country-dial-code-${country.code}`}
                onTouchEnd={e => this.changePhoneCountry(e, country.code.toLowerCase())}
                onClick={e => this.changePhoneCountry(e, country.code.toLowerCase())}
                className="dropdown-item">
                  <span className={cx("famfamfam-flags", country.code.toLowerCase())} />
                  <span>{country.name}</span>
              </a>
            )}
          </div>
        </div>
        <input pattern="(\+)([\s0-9]){9,}" required onChange={this.onChangePhoneInput} onBlur={(e) => onBlur(e.target.value)} name="phone" type="text" value={`${phone}`} className="form-control" id="phone" placeholder="Phone Number" />
      </div>
    )
  }
}

export default TelephoneInput
