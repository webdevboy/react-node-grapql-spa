import React, { Component } from "react";
import PropTypes from "prop-types";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import { connect } from "react-redux";
import _ from "lodash";
import cx from "classnames";
import { Loader } from 'react-loaders';
import { goToStep, reset } from "../../../actions/requestFlight";
import s from "./css/overlay.css";
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import CloseOverlayBtn from './CloseOverlayBtn';
import StepIndicator from './StepIndicator';
import Text from '../../Primitives/Text';

const THANK_YOUR_ADVISOR = `
An Advisor already started working on your request
and will get back to you shortly.
Please find below a price estimate.
`;

const RenderStep = ({ step, isMobile }) => {
  switch (step) {
    case 1:
      return <Step1 isMobile={isMobile} title={{defaultMessage: 'Flight Details', id: 'flight.request.step-1.flight-details' }} />
    case 2:
      return <Step2 isMobile={isMobile} title={{defaultMessage: 'Contact Details', id: 'flight.request.step-2.contact-details' }} />
    case 3:
      return <Step3 isMobile={isMobile} paragraph={{defaultMessage: THANK_YOUR_ADVISOR, id: 'flight.request.step-3.advisor' }} />
    default:
      return null
  }
}
export class Overlay extends Component {
  
  state = {
    pullDown: false,
  }

  steps = _.times(this.props.config.steps.max)
  
  closeOverlay = (e) => {
    e.preventDefault();
    const { reset, goToStep, step } = this.props;
    (step === 3) ? reset() : this.setState({pullDown: false}, () => {
      goToStep({ step: 0 })
    });
  }

  jumpToStep = (step) => {
    console.log('LET ME GO TO ', step);
    const { completedSteps, goToStep, step: current } = this.props;
    console.log('current step ', current);
    const isComplete = completedSteps.includes(step);
    const currentIsComplete = completedSteps.includes(current);

    console.log('LET ME?', step < current);
    if (isComplete || currentIsComplete || step < current) goToStep({ step })
  }

  componentWillMount = () => {
    if (this.props.step > 0) {
      this.setState({ pullDown: true })
    } else {
      this.setState({ pullDown: false })
    }
  }

  componentWillUnmount = () => {
    if (this.props.step === 3) {
      this.props.reset();
    }
  }

  render() {
    const { step, config, completedSteps, isLoading, isMobile } = this.props;

    return (
      <div className={cx(s.stepOverlay, (this.state.pullDown) ? s.pullDown : null)}>
        <div className="container">
          <CloseOverlayBtn closeOverlay={this.closeOverlay} />
          <div className="row">
            <div className={cx(s.overlayContainer, "col-lg-12")}>
              <StepIndicator
                steps={this.steps}
                step={step}
                maxSteps={config.steps.max}
                jumpToStep={this.jumpToStep}
                completedSteps={completedSteps}
              />
              <div className="form-content">
                { (!isLoading)
                  ? <RenderStep step={step} isMobile={isMobile} />
                  : <Loader style={{display: 'flex', justifyContent: 'center'}} type="ball-beat" active={true} color="#3e5970" />
                }
              </div>

              <div className={s.overlayActions}>
                <button className={s.closebtn} type="button" onClick={e => this.closeOverlay(e)}>
                  <Text defaultMessage="GO BACK" id="form.request-flight.overlay.go-back" />
                </button>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state.requestFlight;

const mapDispatchToProps = (dispatch, ownProps) => ({
  goToStep: ({step}) => dispatch(goToStep({step})),
  reset: () => dispatch(reset())
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(Overlay));
