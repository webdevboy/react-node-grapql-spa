import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import cx from "classnames";
import moment from "moment";
import Clock from "material-ui-icons/AccessTime";
import Date from "material-ui-icons/DateRange";
import ArrowLeft from "material-ui-icons/KeyboardArrowLeft";
import ArrowRight from "material-ui-icons/KeyboardArrowRight";
import InputLocation from "./InputLocation";
import { PlusSquare, Briefcase, Calendar, Crosshair, User, ChevronUp, AlertCircle } from "react-feather";
import DatePicker from "react-datepicker";
import TimePicker from "../../UI/TimePicker";
import {
  clearLocation,
  changeLocation,
  changePax,
  changeDate,
  toggleOptions,
  addLeg,
  returnLeg,
  goToStep,
  removeLeg,
} from "../../../actions/requestFlight";
import arrowFrom from "./gfx/arrow-up.svg";
import arrowTo from "./gfx/arrow-down.svg";
import remove from "./gfx/remove.svg";
import removeRed from "./gfx/removeRed.svg";
import removeOverlay from "./gfx/removeOverlay.svg";
import Text from '../../Primitives/Text';
import s from "./css/requestFlight.css";
import Options from './Options';
import overlay from './css/overlay.css';
import OptionPopup from './OptionPopup';
import xCircle from './gfx/x-circle.svg';

const ArrowDown = () => (
  <span className={s.icon}>
    <object data={arrowTo} type="image/svg+xml" />
  </span>
);

const ArrowUp = () => (
  <span className={s.icon}>
    <object data={arrowFrom} type="image/svg+xml" />
  </span>
);

const ErrorIcon = () => (
  <span className={s.icon}>
    <AlertCircle color="#FF6B6B" size="18" />
  </span>
);

const RequestFlightBtn = ({ legCount, step, isHeader }) => (
  <button className={s.requestbtn} type="submit">
    <Text defaultMessage="Request Quote" id="form.request-flight.btn.request" />
  </button>
);

const Actions = ({ legs, addLeg, isOverlay, toggleOptions, index }) => {
  return (
    <div className={cx(s.actions, (isOverlay) ? overlay.inoverlay : null)}>
      <div className="left-actions">
        <button type="button" onClick={(e) => addLeg(e)} className={(!legs[legs.length - 1].from || !legs[legs.length - 1].to) ? s.disabled : null}>
          <PlusSquare />
          <span>
            <Text defaultMessage="Add Leg" id="form.request-flight.btn.add-leg" />
          </span>
        </button>
      </div>
      <div className="filler"></div>
      <div className="right-actions">
        <button type="button"
          onClick={(e) => toggleOptions(e, index)}
        >
        <Briefcase /><span>
        <Text defaultMessage="More Options" id="form.request-flight.btn.more-options" />
          </span></button>
      </div>
    </div>
  )
}

export class Leg extends Component {

  today = () => {
    const today = moment();
    return moment(today)
      .add(today.minutes() < 30 ? 2 : 3, "hours")
      .minutes(today.minutes() < 30 ? 30 : 0);
  }

  state = {
    showOptions: false,
    calendarOpen: false,
  };

  toggleCalendar = e => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      calendarOpen: !this.state.calendarOpen,
    }, () => this._calendar.setOpen(this.state.calendarOpen));
  };

  selectTime = ({ date, index }) => {
    this.props.changeDate({ date, index });
    this.setState({
      calendarOpen: false,
    },() => this._calendar.setOpen(false));
  };

  onAddClick = (e) => {
    e.preventDefault();
    if (this.props.step === 0) {
      this.props.goToStep({ step: 1 });
      this.props.addLeg();
    } else {

      this.props.addLeg();
    }

  }

  toggleOptions = (e, index) => {
    e.preventDefault();
    this.props.toggleOptions({ index });
  }

  updateDate = (date, index) => {
    this.props.changeDate({ date, index });
  }

  togglePaxDropdown = (e) => {
    e.preventDefault();
    this.pax.open();
  }

  render() {
    const {
      showOption,
      isMobile,
      remaining,
      errors,
      index,
      legCount,
      config,
      leg,
      step,
      changeLocation,
      clearLocation,
      addLeg,
      toggleOptions,
      changePax,
      currentLocale,
      sticky,
      legs,
      isHeader,
    } = this.props;
    


    return (
      <div className={s["leg-wrapper"]} key={`leg-${index}`}>
        <div className={cx(s.leg, step ? overlay.leg : null)}>
          {/* LEG INDICATOR */}
          {
            (legCount && legCount > 1)
              ? <div className={cx(s.legIndex, (step > 0) ? overlay.legIndex : null)}>{ index + 1 }</div>
              : null
          }
          
          {/* FROM */}
          <InputLocation
            direction={"FROM"}
            key={`leg-${index}-from`}
            defaultSelection={leg.from ? leg.from : undefined}
            current={!remaining}
            geolocation={true}
            autoFocus={true}
            icon={<ArrowUp />}
            errorIcon={<ErrorIcon />}
            hasErrors={step > 0 && errors && errors.from}
            className={cx(s.location, step ? overlay.legField : null)}
            onSelect={selection => changeLocation({ value: selection, index, direction: "from" })}
            clear={() => clearLocation({ index, direction: "from" })}                
          />
          {/* TO */}
          <InputLocation
            defaultSelection={leg.to ? leg.to : undefined}
            geolocation={false}
            key={`leg-${index}-to`}
            icon={<ArrowDown />}
            errorIcon={<ErrorIcon />}
            hasErrors={step > 0 && errors && errors.to}
            className={cx(s.location,step ? overlay.legField : null)}
            direction={"TO"}
            onSelect={selection => changeLocation({ value: selection, index, direction: "to" })}
            clear={() => clearLocation({ index, direction: "to" })}
          />

          {/* DATEPICKER */}
          <div className={cx(s.dtpicker, step ? overlay.legField : null)} ref={el => (this.dtpicker = el)}>
            <div className={s.dateClicker} onClick={this.toggleCalendar} />
            <Calendar color="#A8AAB7" />
            <DatePicker
              ref={c => (this._calendar = c)}
              selected={moment(leg.date)}
              onChange={(d) => this.updateDate(d, index)}
              minDate={moment(this.today())}
              dropdownMode={"select"}
              autoFocus={false}
              readOnly={true}
              shouldCloseOnSelect={false}
              locale={currentLocale}
              dateFormat="ddd, DD MMM YYYY HH:mm"
            >
              <div className={s.timepickerWrapper}>
                <div className={s["arrow-wrapper"]} />
                <TimePicker
                  className={s.timepicker}
                  currentDate={moment(leg.date)}
                  onChange={date => this.selectTime({ date, index })}
                />
              </div>
            </DatePicker>
          </div>

          {/* PASSANGERS */}
          <div className={cx(s.pax, step ? overlay.legField : null)}>
            <User color="#A8AAB7" />
            <span className={s.value}>{leg.pax}</span>
            <select id="pax" value={leg.pax} onChange={e => changePax({ value: e.target.value, index })}>
              {config.options.pax.map(opt => (
                <option key={`opt-${opt}`} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          {
            (!sticky && legCount > 1) ?
              <span className={s.closeBtn} onClick={() => this.props.removeLeg(index)}>
                <object data={xCircle} type="image/svg+xml" />
              </span>
            : null
          }
          
          { (sticky || isHeader)
            ? (
              <div className={cx(s.actions, s.sticky)}>
                <div className={s["leftActions"]}>
                  <button
                    type="button"
                    className={cx(s.addleg, !legs[legs.length - 1].from || !legs[legs.length - 1].to ? s.disabled : null)}
                    onClick={e => this.onAddClick(e)}
                  >
                    <PlusSquare color="#FFFFFF" />
                    <span>
                      <Text defaultMessage="Add Leg" id="form.request-flight.btn.add-leg" />
                    </span>
                  </button>

                  <button
                    type="button"
                    className={cx(s.toggleoptions, this.state.showOptions ? (step ? overlay.isOpen : s.isOpen) : null)}
                    onClick={(e) => this.toggleOptions(e, index)}
                  >
                    <Briefcase color="#FFFFFF" />
                      <span>
                        <Text defaultMessage="More Options" id="form.request-flight.btn.more-options" />
                      </span>
                  </button>


                  { (showOption === index) ? <OptionPopup
                    sticky={sticky}
                    toggleOptions={this.toggleOptions} /> : null }
                </div>


              </div>
            )
            : null
            
          }
          
          { (!isMobile && legs.length <= 1 && step !== 1) ? <RequestFlightBtn isHeader={isHeader} legCount={legCount} step={step} /> : null }

        </div>
        { (!sticky && !isHeader) ? <Options isOverlay={(step>0)} isMobile={isMobile} toggleOptions={this.toggleOptions} remaining={remaining} expanded={(showOption === index)} index={index} /> : null }
        { (index === legCount - 1 && !sticky && !isHeader)
          ? <Actions legs={legs} isOverlay={(step>0)} addLeg={this.onAddClick} toggleOptions={this.toggleOptions} index={index} />
          : null }
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  legs: state.requestFlight.legs,
  leg: state.requestFlight.legs[ownProps.index],
  step: state.requestFlight.step,
  showOption: state.requestFlight.showOption,
  legCount: state.requestFlight.legs.length,
  config: state.requestFlight.config,
  currentLocale: state.intl.locale || state.intl.defaultLocale,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  changeLocation: ({ value, index, direction }) => dispatch(changeLocation({ value, index, direction })),
  clearLocation: ({ index, direction }) => dispatch(clearLocation({ index, direction })),
  addLeg: () => dispatch(addLeg()),
  toggleOptions: ({ index }) => dispatch(toggleOptions({ index })),
  changePax: ({ value, index }) => dispatch(changePax({ value, index })),
  changeDate: ({ date, index }) => dispatch(changeDate({ date, index })),
  goToStep: ({ step }) => dispatch(goToStep({ step })),
  returnLeg: () => dispatch(returnLeg()),
  removeLeg: (index) => dispatch(removeLeg(index)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Leg)
