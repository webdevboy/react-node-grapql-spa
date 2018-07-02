import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import s from "./css/overlay.css";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import cx from "classnames";
import checkCircle from "./gfx/check-circle.png";
import airplane from "./gfx/airplane.svg";
import moment from "moment";
import Map from "../../Widgets/MapBox";
import PriceEstimates from './PriceEstimates';
import { goToStep, prevStep, reset } from "../../../actions/requestFlight";
import _ from 'lodash';
import Text from '../../Primitives/Text';
import { injectIntl, FormattedDate } from 'react-intl';

const GeoLocationType = ({direction, data}) => {
  return (<div className={(direction === 'from') ? s.tripFrom : s.tripTo}>
    <span className={cx("famfamfam-flags", data.countryCode.toLowerCase())} />
    <span className={s.label}>{ data.label }</span>
  </div>
  )
}

const AirportType = ({direction, data}) => {
  return (<div className={(direction === 'from') ? s.tripFrom : s.tripTo}>
    <span className={cx("famfamfam-flags", data.city.country.countryCode.toLowerCase())} />
    <span className={s.label}>{ `${data.iata || data.icao} ${data.city.name},` } {data.name}, {data.city.country.name}</span>
  </div>
  )
}
// <span></span></div> : null }

export class Step3 extends Component {

  constructor(props) {
    super(props);
    this.state = {
      categoriesExpanded: false
    }
  }

  editFlight = (e) => {
    e.preventDefault();
    this.props.goToStep({step: 1});
  }

  completeRequest = (e) => {
    e.preventDefault();

    this.props.reset();

  }

  toggleCategories = (e) => {
    e.preventDefault();

    this.setState({
      categoriesExpanded: !this.state.categoriesExpanded
    })
  }

  render() {
    const { categoriesExpanded } = this.state;
    const { intl } = this.props;
    const { legs, contactInfo, currentLocale } = this.props.requestFlight;

    const legPins = _.reduce(legs, (legPins, leg, index) => {
      if (index === 0) {

        if (leg.from.__typename === 'SFAirport') {
          let coords = leg.from.coordinates.split(',')
          legPins.push([parseFloat(coords[1]), parseFloat(coords[0])])
        } else {
          legPins.push([leg.from.geometry.location.lng, leg.from.geometry.location.lat])
        }

        if (leg.to.__typename === 'SFAirport') {
          let coords = leg.to.coordinates.split(',')
          legPins.push([parseFloat(coords[1]), parseFloat(coords[0])])
        } else {
          legPins.push([leg.to.geometry.location.lng, leg.to.geometry.location.lat])
        }

      } else {
        if (leg.to.__typename === 'SFAirport') {
          let coords = leg.to.coordinates.split(',')
          legPins.push([parseFloat(coords[1]), parseFloat(coords[0])])
        } else {
          legPins.push([leg.to.geometry.location.lng, leg.to.geometry.location.lat])
        }
      }

      return legPins

    }, []);


    //console.log(legPins);

    return (
      <form className={cx(s.stepsForm, s.completed)} onSubmit={(e) => this.completeRequest(e)}>

        <div className={cx(s.formRow, s.header, s.thankYou)}>
          <h3>
            <img src={checkCircle} width="42px" height="40px" />
            <span>
              <Text defaultMessage="Thank You" id="form.request-flight.step-3.label.thank-you" />
              <i>{contactInfo.title} {contactInfo.lastName}</i>
            </span>
          </h3>
          <p>
          <Text defaultMessage="An Advisor already started working on your request and will get back to you shortly.
            Please find below a price estimate." id="form.request-flight.step-3.paragraph.adivsor" />
          </p>
        </div>

        <div className={cx(s.formRow, s.flightResume)}>
          <div className={s.trips}>
            {
              legs.map((leg, index) => (<div className={s.tripLeg} key={`trip-leg-${index}`}>
                <div className={s.tripDate}>
                  { moment(leg.date, "ddd, DD MMM YYYY HH:mm") }
                </div>
                {
                  (leg.from.__typename === 'GeoType' || leg.from.__typename === 'LocationType') 
                  ? <GeoLocationType direction={'from'} data={leg.from} />
                  : <AirportType direction={'from'} data={leg.from} />
                }

                <div className={s.plane}>
                  <object data={airplane} type="image/svg+xml" />
                </div>

                {
                  (leg.to.__typename === 'GeoType' || leg.to.__typename === 'LocationType') 
                  ? <GeoLocationType direction={'to'} data={leg.to} />
                  : <AirportType direction={'to'} data={leg.to} />
                }
              </div>)
            )}
          </div>

          <div className={s.editAction}>
            <a href="#" onClick={this.editFlight} className={s.linkAction}><span>
              <Text defaultMessage="Edit My Request" id="form.request-flight.step-3.link.edit-my-request" />
              </span></a>
          </div>

          <div className={s.map}>
            <Map type={'legs'} legs={legPins} emptyleg={false} />
          </div>

          {/* <div className={s.estimates}>
            <PriceEstimates expanded={categoriesExpanded} />
          </div> */}

          {/* <div className={s.editAction}>
            <a href="#" onClick={this.toggleCategories} onTouchEnd={this.toggleCategories} className={cx(s.linkAction, s.toggleCategories, (categoriesExpanded) ? s.isOpen : null)}><span>View More Categories</span></a>
          </div> */}

        </div>

        <div className={cx(s.formRow, s.center, s.actions)}>
          <button type="submit" className="btn action dk-red shadow half-block">
            <Text defaultMessage="Home" id="form.request-flight.step-3.btn.home" />
          </button>
        </div>

      </form>
    );
  }
}

const mapStateToProps = state => ({
  requestFlight: state.requestFlight,
  currentLocale: state.intl.locale || state.intl.defaultLocale,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  goToStep: ({step}) => dispatch(goToStep({step})),  
  nextStep: () => dispatch(nextStep()),
  prevStep: () => dispatch(prevStep()),
  reset: () => dispatch(reset())
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(injectIntl(Step3)));
