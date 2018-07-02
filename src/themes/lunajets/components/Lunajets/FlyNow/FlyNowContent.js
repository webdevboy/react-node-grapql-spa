import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from "classnames";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import { PhoneCall, Mail } from 'react-feather';
import { connect } from 'react-redux';
import TelephoneInput from '../../UI/TelephoneInput';
import Text from '../../Primitives/Text';
// import { ClipLoader as Loader } from 'halogen';
import s from "./FlyNow.css";

const Loader = () => <span>Loading ....</span>

class FlyNowContent extends Component { 

  static contextTypes = {
    fetch: PropTypes.func,
    store: PropTypes.object,
  }
  
  constructor() {
    super();
    this.state = {
      callForm: false,
      phone: undefined,
      isLoading: false,
      complete: false
    }
  }

  chooseOpt = (e) => {
    e.preventDefault();
    this.setState({
      callForm: true
    })
  }

  openMail = (e) => {
    e.preventDefault();
    window.location.href = `mailto:lunajets@lunajets.com?subject=${encodeURI('Fly Now')}`;
  }

  onPhoneUpdate = (value) => {
    this.setState({
      phone: value
    })
  }

  renderBase = () => {
    return (
      <div className={s.body}>
        <button type="button" className={"btn btn-block dk-grey-bg"} onClick={this.chooseOpt}>
          <Text id="client.navTop.flyNow.requestACall" defaultMessage="request a call" />
          <PhoneCall size={24} />
        </button>
        <Text className={s.or} id="client.navTop.flyNow.or" defaultMessage="OR" />
        <button type="button" className={"btn btn-block dk-red-bg"}>
          <Text id="client.navTop.flyNow.emailUs" defaultMessage="email us" />
          <Mail size={24} />
        </button>
      </div>
    );
  }

  submitForm = async (e) => {
    e.preventDefault();

    if (this.state.complete) {
      this.props.onComplete();
    }

    this.setState({
      isLoading: true
    })

    const { fetch, store } = this.context;
    const state = store.getState();
    const flynow = await fetch("/api/flynow", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        phone: this.state.phone,
        ipInfo: state.ipInfo,
        browser: {
          locale: window.navigator.language,
        },
        website: {
          locale: state.intl.locale || state.intl.defaultLocale,
        },
      })
    });

    const data = await flynow.json();

    if (data && data.success) {
      this.setState({
        isLoading: false,
        complete: true
      })
    }

  }

  componentWillMount() {
    this.setState({
      complete: false
    })
  }

  renderCallForm = () => {
    return (
      <form onSubmit={this.submitForm}>
        {
          !this.state.complete ? 
            <div className={cx("form-group", s.inputGroup, s.title)}>
              <label htmlFor="phone">Phone Number</label>
              <TelephoneInput className={cx(s.phone, (this.state.isLoading) ? s.disable : null)} countryCode={this.props.ipInfo.country} onBlur={(value) => this.onPhoneUpdate(value)} />
            </div>
          :
          <Text 
            id="client.navTop.flyNow.advisorWillCallYouShortly" 
            defaultMessage="A Private jet Advisor will call you shortly" />
        }
        <button type="submit" className={cx("btn btn-block", (!this.state.complete) ? 'dk-red-bg' : s.complete, (this.state.isLoading) ? s.loading : null, s.mediumbtn)}>
          
          { 
            this.state.isLoading 
              ? <Loader color="#fff" size="16px" margin="4px" /> 
              : 
                !this.state.complete 
                  ? <Text 
                  id="client.navTop.flyNow.callMeBack" 
                  defaultMessage="CALL ME BACK" />
                  : <Text 
                  id="client.navTop.flyNow.thankYou" 
                  defaultMessage="Thank You" />
          }

        </button>
        <p className={s.callreach}>
        <Text 
          id="client.navTop.flyNow.orCallReachUs" 
          defaultMessage="OR CALL REACH US:" />
          <span>+41 844 041 844</span>
          <span>lunajets@lunajets.com</span>
        </p>
      </form>
    );
  }

  render() {

    return (
      <div className={s.content}>
        <span className={s.title}>
          {
            (this.state.callForm) 
            ? <Text id="client.navTop.flyNow.ourAdvisorsHereToHelp" defaultMessage="Our team of private aviation advisors is here to help!" />
            : <Text id="client.navTop.flyNow.haveAdvisorCallYouBack" defaultMessage="Have a Private Aviation Advisor call you back immediately" />
          }
        </span>
        { !this.state.callForm ? this.renderBase() : this.renderCallForm() }
      </div>
    );

  }
}

const mapStateToProps = state => ({
  ipInfo: state.ipInfo,
});

export default connect(mapStateToProps)(withStyles(s)(FlyNowContent))
