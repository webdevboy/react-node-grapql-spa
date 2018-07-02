import React from "react";
import PropTypes from 'prop-types';
import cx from "classnames";
import s from "./FlightRoutes.scss";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import { FormattedDate } from "react-intl";

import MdAirplanemodeActive from "react-icons/lib/md/airplanemode-active";
import MdAirlineSeatReclineExtra from "react-icons/lib/md/airline-seat-recline-extra";
import MdTimer from "react-icons/lib/md/timer";
import FaPlane from "react-icons/lib/fa/plane";

import FormattedCurrency from "../../../i18n/FormattedCurrency";
import Text from "../../../Primitives/Text";

import AircraftSvg from './aircraft.svg';

const V1 = ({ editorID, airports, color, style, countryBoxStyle, countryDetailClasses }) => (
  <div className={cx('d-flex')} style={style}>
    <ol className={s["leg-list"]}>
    {
      airports.map((a, index) => 
        <li className={s["country-box"]} style={countryBoxStyle}>
          <div>
            <span className={cx("iata mono dk-blue", s.iata)} style={{color: color}}>{a.name}</span>
            <div className={cx(s["country-detail"], countryDetailClasses)}>
              <div className={cx("famfamfam-flags", a.countryCode)} />
              <span className={cx("mono", s.mono)} style={{color: color}}>
                {a.city}, {a.countryCode.toUpperCase()}
              </span>
            </div>
          </div>
          <div className="d-none d-sm-block">
          {
            index !== airports.length - 1 ?
            <MdAirplanemodeActive
              className={cx(s["icn"])}
              size={25}
              color="#B6CADA"
              style={{ transform: "rotate(90deg)", marginLeft: "30px", marginRight: "30px" }}
            /> : null
          }  
          </div>   
          <div className="d-sm-none d-block">
          {
            index !== airports.length - 1 ?
            <MdAirplanemodeActive
              className={cx(s["icn"])}
              size={10}
              color="#B6CADA"
              style={{ transform: "rotate(90deg)", marginLeft: "7px", marginRight: "7px" }}
            /> : null
          }  
          </div>     
        </li>
      )
    }
    </ol>
  </div>
);

class FlightRoutes extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  render() {
    const {
      editorID,
      airports,
      color,
      style,
      countryBoxStyle,      
      countryDetailClasses
      
    } = this.props;

    return <V1 editorID={editorID} airports={airports} color={color} style={style} countryBoxStyle={countryBoxStyle} countryDetailClasses={countryDetailClasses}/>
  }
}

FlightRoutes.propTypes = {
  editorID: PropTypes.string,
  airports: PropTypes.array,
  countryDetailClasses: PropTypes.string
}

FlightRoutes.defaultProps = {
  editorID: '',
  airports: [
    {
      name: 'GVA',
      city: 'Geneva',
      countryCode: 'ch'
    },
    {
      name: 'LIS',
      city: 'Lisbon',
      countryCode: 'pt'
    },
    {
      name: 'GVA',
      city: 'Geneva',
      countryCode: 'ch'
    },
  ],
  countryDetailClasses: 'd-none d-sm-flex align-items-center'
}

export default withStyles(s)(FlightRoutes);
