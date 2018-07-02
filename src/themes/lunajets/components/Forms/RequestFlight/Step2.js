import React, { Component } from "react";
import { connect } from "react-redux";
import s from "./css/overlay.css";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import cx from "classnames";
import { CONTACT_TITLES, DIAL_CODES } from "../../../constants/requestFlight";
import { capitalize } from "lodash";
import _ from "lodash";
import { submitFlight, addCompletedStep, removeCompletedStep, updateContact, prevStep, nextStep } from "../../../actions/requestFlight";
import TelephoneInput from '../../UI/TelephoneInput';
import Text from '../../Primitives/Text';
import { injectIntl } from 'react-intl';

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export class Step2 extends Component {

  constructor(props) {
    super(props);
    this.state = {
      errors: undefined
    }
  }
  
  formSubmit = (e) => {
    e.preventDefault();
    const errors = {};

    const { contactInfo } = this.props.requestFlight;

    //console.log(contactInfo);
    if (!CONTACT_TITLES.includes(contactInfo.title)) {
      errors.title = 'Invalid option'
    }

    if (!contactInfo.email) {
      errors.email = 'Email is Required';
    } else if (!EMAIL_REGEX.test(contactInfo.email)) {
      errors.email = 'Invalid Email';
    }

    if (!contactInfo.lastName || !contactInfo.lastName.trim().length ) {
      errors.lastName = 'Last Name is Required';
    }
    
    if (!Object.keys(errors).length) { // if no errors

      this.setState({
        errors: []
      }, () => {
        this.props.addCompletedStep(2);   // add as complete
        this.props.submitFlight();        // submits the data to the API
      })
      
    } else { // in case of errors

        this.setState({
          errors: errors
        }, () => {
          this.props.removeCompletedStep(1) // if the user goes back and changes something that produces an error, we have to avoid allowing going further
          console.error(errors);
        })

    }

  } // end form submit

  onPhoneUpdate = (value) => {
    this.props.updateContact({
      field: 'phone',
      value: value
    })
  }
  

  render() {
    const { errors } = this.state;
    const { intl } = this.props;
    const { contactInfo } = this.props.requestFlight;

    const firstNamePlaceholder = intl.formatMessage({id: 'request-flight.step2-placeholder.firstname', defaultMessage: "First Name" });
    const lastNamePlaceholder = intl.formatMessage({id: 'request-flight.step2-placeholder.lastname', defaultMessage: "Last Name" });
    const emailPlaceholder = intl.formatMessage({id: 'request-flight.step2-placeholder.email', defaultMessage: "Email" });
    const additionalNotesPlaceholder = intl.formatMessage({id: 'request-flight.step2-placeholder.additional-notes', defaultMessage: "Notes about the flight or anything else that you might need to be included on the service" });

    return (
      <form className={cx(s.stepsForm, s.contactInfo)} onSubmit={this.formSubmit}>
        <div className={cx("formRow", s.header)}>
          <h3>Contact Details</h3>
        </div>
        <div className={s.formRow}>
          <div className={cx(s.groupRow, s.email, s.marginRight)}>
            <div className={cx("form-group", s.inputGroup, s.title)}>
              <label htmlFor="title">
                <Text defaultMessage="Title" id="form.request-flight.step-2.label.title" />
              </label>
              <select name="title" className={cx("form-control", s.select )} defaultValue={contactInfo.title} id="title" onChange={e => this.props.updateContact({field: 'title', value: e.target.value})} value={contactInfo.title}>
                {
                  CONTACT_TITLES.map((title, index) => <option key={`title-${index}`} value={title}>{capitalize(title)}</option>)
                }
              </select>
            </div>

            <div className={cx("form-group", s.inputGroup, s.names)}>
              <label htmlFor="first-name"><Text defaultMessage="First Name" id="form.request-flight.step-2.label.first_name" /></label>
              <input
                defaultValue={contactInfo.firstName}
                onBlur={e => this.props.updateContact({field: 'firstName', value: e.target.value})}
                name="firstName"
                type="text"
                className="form-control"
                id="first-name"
                placeholder={firstNamePlaceholder}
              />
            </div>

          </div>

          <div className={cx("form-group", s.inputGroup, s.names)}>
            <label htmlFor="last-name"><Text defaultMessage="Last Name" id="form.request-flight.step-2.label.last_name" /></label>
            <input
              defaultValue={contactInfo.lastName}
              onBlur={e => this.props.updateContact({field: 'lastName', value: e.target.value})}
              name="lastName"
              type="text"
              className={cx("form-control", (errors && errors['lastName']) ? s.error : null)}
              id="last-name"
              placeholder={lastNamePlaceholder}
            />
          </div>

        </div>

        <div className={s.formRow}>

          <div className={cx("form-group", s.inputGroup, s.email)}>
            <label htmlFor="email"><Text defaultMessage="Email" id="form.request-flight.step-2.label.email" /></label>
            <input defaultValue={contactInfo.email} onBlur={e => this.props.updateContact({field: 'email', value: e.target.value})} name="email" type="email" className={cx("form-control", (errors && errors['email']) ? s.error : null) } id="email" placeholder={emailPlaceholder} />
          </div>

          <div className={cx("form-group", s.inputGroup, s.phone)}>
            <label htmlFor="phone"><Text defaultMessage="Phone Number" id="form.request-flight.step-2.label.phone" /></label>
            <TelephoneInput countryCode={this.props.ipInfo.country} onBlur={(value) => this.onPhoneUpdate(value)} />
          </div>

        </div>

        <div className={s.formRow}>

          <div className={cx("form-group", s.inputGroup)}>
            <label htmlFor="additional-info"><Text defaultMessage="Additional info" id="form.request-flight.step-2.label.additional-info" /></label>
            <textarea
              defaultValue={contactInfo.additionalNotes}
              onBlur={e => this.props.updateContact({field: 'additionalNotes', value: e.target.value})}
              name="additionalNotes"
              className={"form-control"}
              id="additional-info"
              rows="4"
              placeholder={additionalNotesPlaceholder}
            />
          </div>

        </div>

        <div className={cx(s.formRow, s.actions)}>
          <a href="#" onClick={() => this.props.prevStep()} className={s.linkAction}><span><Text defaultMessage="Go Back" id="form.request-flight.step-2.link.go-back" /></span></a>
        </div>

        <div className={cx(s.formRow, s.center, s.actions)}>
          <button type="submit" className="btn action dk-red shadow half-block"><Text defaultMessage="CONFIRM" id="form.request-flight.step-2.btn.confirm" /></button>
        </div>

      </form>
    );
  }
}

const mapStateToProps = state => ({
  ipInfo: state.ipInfo,
  requestFlight: state.requestFlight
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  nextStep: () => dispatch(nextStep()),
  prevStep: () => dispatch(prevStep()),
  updateContact: ({ field, value }) => dispatch(updateContact({field, value})),
  removeCompletedStep: (index) => dispatch(removeCompletedStep(index)),
  addCompletedStep: (index) => dispatch(addCompletedStep(index)),
  submitFlight: () => dispatch(submitFlight())
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(injectIntl(Step2)));
