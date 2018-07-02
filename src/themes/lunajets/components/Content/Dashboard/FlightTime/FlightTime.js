import React from "react";
import PropTypes from 'prop-types';
import cx from "classnames";
import s from "./FlightTime.scss";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import moment from 'moment';
import { FormattedDate } from "react-intl";
import { FormattedTime } from "react-intl";
import { User } from 'react-feather';
import MdAirplanemodeActive from "react-icons/lib/md/airplanemode-active";
import MdAirlineSeatReclineExtra from "react-icons/lib/md/airline-seat-recline-extra";
import MdTimer from "react-icons/lib/md/timer";
import FaPlane from "react-icons/lib/fa/plane";
import Text from "themes/lunajets/components/Primitives/Text";

class FlightTime extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  render() {
    const {
      date,
      from,
      to,
      num
    } = this.props;

    const diff = moment(to.time).diff(moment(from.time));
    const duration = moment.duration(diff);    
    const h = duration.hours();
    const m = duration.minutes();
    const fromTime = moment(from.time).format('HH:mm');
    const toTime = moment(to.time).format('HH:mm');

    return (
      <div className={cx("d-flex", s['flight-time-container'])}>
        <div className={cx("d-flex align-items-center justify-content-center",s['flight-date'])}>
          <FormattedDate value={date} weekday="short" day="numeric" month="short" year="2-digit" />
        </div>
        <div className={cx("d-flex align-items-center",s['airports'])}>
          <div className={cx("d-flex align-items-center justify-content-center",s['airport'])}>
            <div className={cx("d-flex")}>
              <span className={cx("d-none d-sm-block famfamfam-flags", from.countryCode, s['flag'])} />
              <div className={cx(null)}>              
                <div>                
                  <span>{from.name}</span>
                  <span className={cx('d-none d-md-inline')}> - {from.city}, </span>
                  <span className={cx('d-none d-md-inline')}>{from.countryCode ? from.countryCode.toUpperCase() : ''}</span>
                </div>                
                <div>
                  {fromTime}
                </div>
              </div>
            </div>
          </div>

          <div className={cx("d-flex align-items-center justify-content-center", s['timeline'])}>
            <div>{h>0 ? h + 'h': ''} {m>0 ? m : ''}</div>
            <div className={cx(s['hr-container'])}>
              <hr/>
              <i className={cx("fa fa-angle-right", s['arrow'])}></i>
            </div>          
          </div>

          <div className={cx("d-flex align-items-center justify-content-center", s['airport'])}>          
            <div className={cx("d-flex")}>
              <span className={cx("d-none d-sm-block famfamfam-flags", to.countryCode, s['flag'])} /> 
              <div className={cx(null)}>
                <div>
                  <span>{to.name}</span>
                  <span className={cx('d-none d-md-inline')}> - {to.city}, </span>
                  <span className={cx('d-none d-md-inline')}>{to.countryCode ? to.countryCode.toUpperCase() : ''}</span>
                </div>
                <div>
                  {toTime}                
                </div>
              </div>
            </div>
          </div>
        </div>                
        <div className={cx("d-flex align-items-center justify-content-center", s['seat'])}>
          <User color="#b6cada" size={16}/> &nbsp;
          <span>{num}</span>
        </div>
      </div>      
    )
  }
}

FlightTime.propTypes = {
  date: PropTypes.string,
  from: PropTypes.object,
  to: PropTypes.object,
  num: PropTypes.number
}

FlightTime.defaultProps = {  
  date: new Date().toISOString(),
  from: {
    name: 'GVA',
    city: 'Genava',
    countryCode: 'ch',
    time: moment(new Date).format()
  },
  to: {
    name: 'LIS',
    city: 'Lisbon',
    countryCode: 'pt',
    time: moment(new Date).add(2, 'hours').format()
  },
  num: 3
}

export default withStyles(s)(FlightTime);
