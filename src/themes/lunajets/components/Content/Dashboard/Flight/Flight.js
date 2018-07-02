import React from "react";
import PropTypes from 'prop-types';
import cx from "classnames";
import s from "./Flight.scss";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import { FormattedDate } from "react-intl";

import MdAirplanemodeActive from "react-icons/lib/md/airplanemode-active";
import MdAirlineSeatReclineExtra from "react-icons/lib/md/airline-seat-recline-extra";
import MdTimer from "react-icons/lib/md/timer";
import FaPlane from "react-icons/lib/fa/plane";
import iconMessage from './gfx/message-m.svg';
import FormattedCurrency from "../../../i18n/FormattedCurrency";
import Text from "../../../Primitives/Text";
import FlightRoute from '../../Detail/FlightRoutes';

import AircraftSvg from './aircraft.svg';
import ChevronRight from "react-feather/dist/icons/chevron-right";

const V1 = ({ editorID, flight, goIcon, goFlight }) => (
  <div className={cx("my-3", flight.selected ? s.selected : null)}>
    <Text defaultMessage={flight.title} id={flight.id} className={s.title} />
    <div className={s["detail"]}>
      <div className={s["sub"]}>
        <FlightRoute airports={flight.airports} color={flight.selected ? '#263d50' : '#6f6f6f'} />
        <div className={cx(s["date-box"], s["date"])}>
          <span className={cx("prefix d-none d-sm-block", s["prefix"])}>
            <Text defaultMessage="date" id="client.emptyLeg.detail.from" />
          </span>
          <span className={cx(s["empty-leg-date"], "d-none d-sm-block", flight.selected ? "dk-blue" : null)}>
            <FormattedDate value={flight.date} weekday="short" day="numeric" month="short" year="numeric" />
          </span>
          <span className={cx(s["empty-leg-date"], "d-block d-sm-none", flight.selected ? "dk-blue" : null)}>
            <FormattedDate value={flight.date} weekday="short" day="numeric" month="short" year="2-digit" />
          </span>
        </div>
      </div>      
      {
        goIcon == 'arrow' && 
        <button className={cx("btn lt-red m-0", s.btn)} onClick={() => goFlight(flight)}>
          <ChevronRight color="white" size={36}/>
        </button>
      }

      {
        goIcon == 'news' && 
        <button className={cx("btn lt-red m-0", s.btn)} onClick={() => goFlight(flight)}>
          <img src={iconMessage} />
          {
            flight.selected && 
            <Text defaultMessage={'New'} id={`client.flight.news.button`}/>
          }            
        </button>          
      }      
    </div>
  </div>
);

class Flight extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  render() {
    const {
      editorID, flight, select, goIcon, goFlight
    } = this.props;

    return <V1 editorID={editorID} flight={flight} goIcon={goIcon} goFlight={goFlight}/>
  }
}

Flight.propTypes = {
  editorID: PropTypes.string,
  goIcon: PropTypes.string
}

Flight.defaultProps = {
  editorID: '',
  goIcon: 'arrow'
}

export default withStyles(s)(Flight);
