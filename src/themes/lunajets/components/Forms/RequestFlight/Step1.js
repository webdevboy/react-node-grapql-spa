import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import s from "./css/requestFlight.css";
import overlay from "./css/overlay.css";
import DatePicker from "react-datepicker";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import datepicker from "react-datepicker/dist/react-datepicker.css";
import TimePicker from "../../UI/TimePicker";
import { PlusSquare, Briefcase, Calendar, Crosshair, User, XCircle, ChevronUp, AlertCircle } from "react-feather";
import {
  clearLocation,
  removeCompletedStep,
  addCompletedStep,
  goToStep,
  nextStep,
  addLeg,
  returnLeg,
  changeLocation,
  changePax,
  changeDate,
  changeOption,
} from "../../../actions/requestFlight";
import cx from "classnames";
import moment from "moment";
import InputLocation from "./InputLocation";
import Leg from './Leg';
import Text from '../../Primitives/Text';
// const DatepickerInput = ({ step, onClick, value }) =>
// <div className={cx(s.datepicker, (step) ? overlay.legField : null)} onClick={onClick}>
//   <Calendar color="#A8AAB7" />
//   { value }
// </div>

export class Step1 extends Component {

  state = {
    errors: [],
  }

  formSubmit = e => {
    e.preventDefault();

    // return this.nextStep(); // move to next step
    const errors = [];

    this.props.legs.forEach((leg, index) => {
      if (!leg.from) {
        errors[index] = {
          ...errors[index],
          from: "Required",
        };
      }

      if (!leg.to) {
        errors[index] = {
          ...errors[index],
          to: "Required",
        };
      }
    });

    if (!errors.length) {
      // if no errors

      this.setState(
        {
          errors: [],
        },
        () => {
          this.props.addCompletedStep(1); // add as complete
          this.props.goToStep({ step: 2 }); // jump to step2 right away
        }
      );
    } else {
      // in case of errors

      if (this.props.step === 0) {
        this.nextStep(); // move to next step
      } else {
        this.setState(
          {
            errors: errors,
          },
          () => {
            this.props.removeCompletedStep(1); // if the user goes back and changes something that produces an error, we have to avoid allowing going further
            console.error(errors);
          }
        );
      }
    }    
  }; // end form submit

  nextStep = () => {
    this.props.nextStep();
  };

  componentDidMount = () => {
    this.forceUpdate();
  };

  componentDidUpdate = () => {
  }

  componentWillMount = () => {
    this.forceUpdate();
  };


  render() {
    const { onStart, title, paragraph, step, legs, flightOptions, contactInfo, config, completedSteps, isMobile, isHeader } = this.props;
    const sticky = this.props.forceSticky || this.props.sticky;

    const currentLeg = legs.length - 1;
    const remainingLegs = legs.slice(0, currentLeg).map((leg, index) => ({index}));

    return (
      <form
        className={cx("step-1",s["req-flight"],s.insideOverlay,step ? overlay.stepsForm : null,step ? overlay.reqflight : null)}
        id="request_flight"
        onSubmit={this.formSubmit}
        ref={el => (this.reqflight = el)}>

        {
          (sticky) ? null : (title || paragraph) ?
            <div>
              { (title) ? <h2><Text {...title} /></h2> : null }
              { (paragraph) ? <p><Text {...paragraph} /></p> : null }
            </div>
          : null
        }
       
        <div className={s.wrapper}>

          {/* { 
            (step > 0 && remainingLegs.length)
            ? <div className={s.remainingLegs}>
              </div>
            : null
          }

          {
            (step === 0 && !isMobile) ? <div className={s.currentLeg}>
              { (!sticky || !isHeader) ? remainingLegs.map(({index}) => (<Leg isHeader={isHeader} sticky={sticky} remaining={true} index={index} errors={this.state.errors[index]} />)) : null }
              <Leg isHeader={isHeader} sticky={sticky} index={currentLeg} isMobile={isMobile} errors={this.state.errors[currentLeg]} />
            </div> : null
          }

          {
            (step === 0 && isMobile && !sticky && !isHeader) ? <div className={s.currentLeg}>
              { remainingLegs.map(({index}) => (<Leg isHeader={isHeader} sticky={sticky} remaining={true} index={index} errors={this.state.errors[index]} />)) }
              <Leg isHeader={isHeader} sticky={sticky} index={currentLeg} isMobile={isMobile} errors={this.state.errors[currentLeg]} />
            </div> : null
          } */}

          {/* OVERLAY SECTION */}
          

          {
            (!sticky && !isHeader)
            ?
              <div className={s.currentLeg}>
                {remainingLegs.map(({index}) => (<Leg key={`remaining-${index}-leg`} isHeader={isHeader} sticky={sticky} remaining={true} index={index} errors={this.state.errors[index]} />))}
                <Leg isHeader={isHeader} sticky={sticky} index={currentLeg} isMobile={isMobile} errors={this.state.errors[currentLeg]} />
              </div>
            : (legs.length === 1 && !isMobile)
              ? <div className={s.currentLeg}>
                  <Leg isHeader={isHeader} sticky={sticky} index={currentLeg} isMobile={isMobile} errors={this.state.errors[currentLeg]} />
                </div>
              : null
          }
          
        </div>

   

        {
          (step > 0) ?
            <div className={cx(overlay.formRow, overlay.center, overlay.actions)}>
              <button className={"btn action dk-red shadow half-block"} type="submit">
                <Text defaultMessage="Request Quotes" id="form.request-flight.btn.request" />
              </button>
            </div>
          : null
        }


        {
          ((step === 0 && legs.length > 1) && (isMobile || sticky || isHeader)) ?
              <div className={s.formActions}>
                <button className={s.requestbtn} type="submit">
                  <Text defaultMessage="Request Quotes" id="form.request-flight.btn.request" />
                  { legs.length > 1 ? <span className={s.badge}>{legs.length}</span> : null }
                </button>
              </div>
           : (isMobile && !isHeader && step === 0) ?
              <div className={s.formActions}>
                <button className={s.requestbtn} type="submit">
                  <Text defaultMessage="Request Quotes" id="form.request-flight.btn.request" />
                  { legs.length > 1 ? <span className={s.badge}>{legs.length}</span> : null }
                </button>
              </div> : null
        }
          
        {
         (isMobile && isHeader && step === 0 && legs.length <= 1) ?
          <div className={s.formActions}>
            <button className={s.requestbtn} type="submit">
              <Text defaultMessage="Request Quotes" id="form.request-flight.btn.request" />
              { legs.length > 1 ? <span className={s.badge}>{legs.length}</span> : null }
            </button>
          </div> : null
       }
       {
         (!isMobile && !isHeader && step === 0 && legs.length > 1 && !sticky) ?
          <div className={s.formActions}>
            <button className={s.requestbtn} type="submit">
              <Text defaultMessage="Request Quotes" id="form.request-flight.btn.request" />
              { legs.length > 1 ? <span className={s.badge}>{legs.length}</span> : null }
            </button>
          </div> : null
       }
        {/* {
          (step === 0 && !isMobile && !isHeader && !sticky && legs.length > 1) ?
            <div className={s.formActions}>
              <button className={s.requestbtn} type="submit">
                <Text defaultMessage="Request Quotes" id="form.request-flight.btn.request" />
                { legs.length > 1 ? <span className={s.badge}>{legs.length}</span> : null }
              </button>
            </div>
          : null
        } */}
        {/* {
          (!sticky) ?
            (step > 0) ? 
               :
              (legs.length > 1) ?
                
              : (isMobile) ?
                <div className={s.formActions}>
                  <button className={s.requestbtn} type="submit">
                    <Text defaultMessage="Request Quotes" id="form.request-flight.btn.request" />
                  </button>
                </div> : null
          : (step === 0 && isMobile)
            ?
              <div className={s.formActions}>
                <button className={s.requestbtn} type="submit">
                  <Text defaultMessage="Request Quotes 1" id="form.request-flight.btn.request" />
                </button>
              </div>
            : (legs.length > 1 && !sticky) ?
              <div className={s.formActions}>
                <button className={s.requestbtn} type="submit">
                  <Text defaultMessage="Request Quotes 2" id="form.request-flight.btn.request" />
                </button>
              </div>
              : null
        }         */}
       
        
      </form>
    );
  }
}

const mapStateToProps = state => ({
  ...state.requestFlight,
  locale: state.intl.locale,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  nextStep: () => dispatch(nextStep()),
  goToStep: ({ step }) => dispatch(goToStep({ step })),
  removeLeg: index => dispatch(removeLeg(index)),
  returnLeg: () => dispatch(returnLeg()),
  addCompletedStep: index => dispatch(addCompletedStep(index)),
  removeCompletedStep: index => dispatch(removeCompletedStep(index)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(datepicker, s, overlay)(Step1));
