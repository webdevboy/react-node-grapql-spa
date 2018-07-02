import React from "react";
import ReactDOM from "react-dom";
import cx from "classnames";
import s from "./css/requestFlight.css";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import PropTypes from "prop-types";
import _ from "lodash";
import moment from "moment";
import Promise from "bluebird";
import { Overlay } from "@blueprintjs/core";
// import blueprint from "@blueprintjs/core/dist/blueprint.css";
import { PlusSquare, Briefcase, Calendar, Crosshair, User, XCircle, ChevronUp } from "react-feather";
import { connect } from "react-redux";
import { getIpInfo } from "../../../actions/IpInfo";
import { DateTimePicker } from "material-ui-pickers";
import StepOverlay from "./Overlay";
import {
  goToStep,
  toggleOptions,
  removeLeg,
  returnLeg,
  changeLocation,
  changePax,
  changeDate,
  changeOption,
} from "../../../actions/requestFlight";
import Step1 from "./Step1";
import overlay from "./css/overlay.css";
import miniCheck from "./gfx/mini-check.svg";
import remove from "./gfx/remove.svg";
import OptionPopup from "./OptionPopup";
import Text from "../../Primitives/Text";

class RequestFlight extends React.Component {
  static contextTypes = {
    isMobile: PropTypes.bool,
  };

  state = {
    start: !this.context.isMobile || false,
    sticky: false,
    isMobile: this.context.isMobile || false,
  };

  observeScroll = () => {
    const scrollPosRequestFlight = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollPosRequestFlight > 325) {
      if (this.state.prevScroll < scrollPosRequestFlight) {
        // going down
        this.setState({
          sticky: true,
          prevScroll: scrollPosRequestFlight,
        });
      } else {
        // going up
        this.setState({
          sticky: true,
          prevScroll: scrollPosRequestFlight,
        });
      }
    } else {
      this.setState({
        sticky: false,
        prevScroll: scrollPosRequestFlight,
      });
    }
  };

  observeMobile = e => {
    if (this.state.isMobile !== e.detail) {
      this.setState({
        isMobile: e.detail,
      });
    }
  };

  componentDidMount = () => {
    window.addEventListener("scroll", this.observeScroll);
    document.getElementsByTagName("BODY")[0].addEventListener("toggle-mobile", this.observeMobile);
    this.setState({
      isMobile: window.isMobile,
      start: !window.isMobile,
    });
  };

  componentWillUnmount = () => {
    window.removeEventListener("scroll", this.observeScroll);
    document.getElementsByTagName("BODY")[0].removeEventListener("toggle-mobile", this.observeMobile);
  };

  closeModal = e => {
    e.preventDefault();
    this.props.toggleOptions({ index: this.props.showOption });
  };

  start = () => {
    if ((this.state.sticky || this.props.header) && this.state.isMobile) {
      this.props.goToStep({ step: 1 });
    } else {
      this.setState({ start: true });
    }
  };

  jump = () => {
    this.props.goToStep({ step: 1 });
  };

  render() {
    const { header, showOption, step, legs, isHomePage } = this.props;
    const { start, sticky, isMobile } = this.state;

    return (
      <div
        className={cx(
          "row",
          s["req-flight-wrapper"],
          s["req-flight-container"],
          start ? s.start : null,
          header ? s.header : "",
          sticky && step === 0 ? s.sticky : null,
        )}
      >
        <div className="col">
          <Overlay onClose={this.closeModal} isOpen={showOption !== null && isMobile}>
            <OptionPopup closeModal={this.closeModal} />
          </Overlay>
          {isHomePage && step === 0 && !header && !sticky ? (
            <Text className={s.heading} defaultMessage="Private Jets Unlimited" id="request-flight.message" h2/>
          ) : null}
          {step > 0 ? (
            <StepOverlay isMobile={isMobile} />
          ) : isMobile && !start ? (
            <button
              className={cx(s.requestbtn, s.block, s.homeBtn)}
              type="button"
              onClick={() => this.start()}
              onTouchEnd={() => this.start()}
            >
              <Text defaultMessage="Request Quotes" id="form.request-flight.btn.request" />
              {legs.length > 1 && (sticky || header) ? <span className={s.badge}>{legs.length}</span> : null}
            </button>
          ) : (
            <Step1 isHeader={header} start={start} isMobile={isMobile} sticky={sticky} />
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state.requestFlight,
  locale: state.intl.locale,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  getIpInfo: () => dispatch(getIpInfo()),
  goToStep: ({ step }) => dispatch(goToStep({ step })),
  removeLeg: index => dispatch(removeLeg(index)),
  returnLeg: () => dispatch(returnLeg()),
  changeLocation: ({ value, index, direction }) => dispatch(changeLocation({ value, index, direction })),
  changePax: ({ value, index }) => dispatch(changePax({ value, index })),
  changeDate: ({ date, index }) => dispatch(changeDate({ date, index })),
  changeOption: ({ field, value }) => dispatch(changeOption({ field, value })),
  toggleOptions: ({ index }) => dispatch(toggleOptions({ index })),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(RequestFlight));
