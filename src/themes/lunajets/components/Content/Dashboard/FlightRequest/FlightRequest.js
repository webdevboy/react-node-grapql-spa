import React from "react";
import PropTypes from 'prop-types';
import cx from "classnames";
import s from "./FlightRequest.scss";
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

class FlightRequest extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  render() {
    const {
      date,
      airports,
      num,
      color,
      iconColor
    } = this.props;

    // const diff = moment(to.time).diff(moment(from.time));
    // const duration = moment.duration(diff);    
    // const h = duration.hours();
    // const m = duration.minutes();
    // const fromTime = moment(from.time).format('HH:mm');
    // const toTime = moment(to.time).format('HH:mm');

    // return (
    //   <div>
    //     <div className={cx("d-flex", s['flight-container'])}>
    //       <div className={cx("d-flex align-items-center", s['flight-route'])}>
    //         {
    //           airports[0] &&
    //           <div className={cx(s['flight-info'])}>
    //             <span className={cx(s['name'])} style={{color: color}}>{airports[0].name}</span>
    //             <div className={cx(s["country-detail"], "d-flex align-items-center")}>
    //               <div className={cx("famfamfam-flags", airports[0].countryCode)} />
    //               <span className={cx("mono", s['mono'])} style={{color: color}}>
    //                 {airports[0].city}, {airports[0].countryCode.toUpperCase()}
    //               </span>
    //             </div>
    //           </div>
    //         }
    //         {
    //           airports[0] &&
    //           <div className="flight-icon">
    //             <MdAirplanemodeActive
    //                 className={cx('d-none d-sm-block', s["icn"])}
    //                 size={25}
    //                 color={iconColor}
    //                 style={{ transform: "rotate(90deg)"}}
    //               />
    //             <MdAirplanemodeActive
    //                 className={cx('d-block d-sm-none',s["icn"])}
    //                 size={25}
    //                 color={iconColor}
    //                 style={{ transform: "rotate(90deg)"}}
    //               />
    //           </div>
    //         }

    //         {
    //           airports[1] &&
    //           <div className={cx(s['flight-info'])}>
    //             <span className={cx(s['name'])} style={{color: color}}>{airports[1].name}</span>
    //             <div className={cx(s["country-detail"], "d-flex align-items-center")}>
    //               <div className={cx("famfamfam-flags", airports[1].countryCode)} />
    //               <span className={cx("mono", s['mono'])} style={{color: color}}>
    //                 {airports[1].city}, {airports[1].countryCode.toUpperCase()}
    //               </span>
    //             </div>
    //           </div>
    //         }
    //         {
    //           airports[1] &&  airports.length > 2 &&
    //           <div className="flight-icon">
    //             <MdAirplanemodeActive
    //                 className={cx('d-none d-sm-block', s["icn"])}
    //                 size={25}
    //                 color={iconColor}
    //                 style={{ transform: "rotate(90deg)"}}
    //               />
    //             <MdAirplanemodeActive
    //                 className={cx('d-block d-sm-none',s["icn"])}
    //                 size={25}
    //                 color={iconColor}
    //                 style={{ transform: "rotate(90deg)"}}
    //               />
    //           </div>            
    //         }

    //         {
    //           airports[2] &&
    //           <div className={cx(s['flight-info'])}>
    //             <span className={cx(s['name'])} style={{color: color}}>{airports[2].name}</span>
    //             <div className={cx(s["country-detail"], "d-flex align-items-center")}>
    //               <div className={cx("famfamfam-flags", airports[2].countryCode)} />
    //               <span className={cx("mono", s['mono'])} style={{color: color}}>
    //                 {airports[2].city}, {airports[2].countryCode.toUpperCase()}
    //               </span>
    //             </div>
    //           </div>
    //         }
    //       </div>

    //       <div className={cx("d-none d-sm-flex flex-column justify-content-center",s['flight-date'])}>          
    //         <Text className={cx('uppercase')} style={{color: '#b6cada'}} defaultMessage="Date" id="client.customer.area.flight.date"/>
    //         <FormattedDate value={date} day="numeric" month="short" year="numeric" />
    //       </div>

    //       <div className={cx("d-none d-sm-flex align-items-center justify-content-center", s['flight-seat'])}>
    //         <span><User size={14} colcor="#b6cada"/></span> &nbsp;
    //         <span>{num}</span>
    //       </div>
    //     </div>
    //     <div className={cx("d-flex d-sm-none align-items-center", s['flight-mobile-date-seat'])}>          
    //       <div className={cx("d-flex",s['flight-date'])}>            
    //         <FormattedDate value={date} day="numeric" month="short" year="numeric" />
    //       </div>
    //       <div className={cx("d-flex align-items-center", s['flight-seat'])}>
    //         <span><User size={14} colcor="#b6cada"/></span> &nbsp;
    //         <span>{num}</span>
    //       </div>
    //     </div>
    //   </div>
      
    // )
    return (
      <div>
        <div className={cx("d-flex", s['flight-container'])}>
          {
            airports.map((airport, index)=>
              <div className={cx("d-flex align-items-center", s['flight-route'])}>
                <div className={cx(s['flight-info'])}>
                  <span className={cx(s['name'])} style={{color: color}}>{airport.name}</span>
                  <div className={cx(s["country-detail"], "d-flex align-items-center")}>
                    <div className={cx("famfamfam-flags", airport.countryCode)} />
                    <span className={cx("mono", s['mono'])} style={{color: color}}>
                      {airport.city}, {airport.countryCode.toUpperCase()}
                    </span>
                  </div>
                </div>
                {
                  index < airports.length - 1 &&
                  <div className={cx(s['flight-icon'])}>
                    <MdAirplanemodeActive
                        className={cx('d-none d-sm-block', s["icn"])}
                        size={22}
                        color={iconColor}
                        style={{ transform: "rotate(90deg)"}}
                      />
                    <MdAirplanemodeActive
                        className={cx('d-block d-sm-none',s["icn-mobile"])}
                        size={22}
                        color={iconColor}
                        style={{ transform: "rotate(90deg)"}}
                      />
                  </div>
                }
              </div>              
            )
          }
          <div className={cx("d-none d-sm-flex flex-column justify-content-center",s['flight-date'])}>          
            <Text className={cx('uppercase')} style={{color: '#b6cada'}} defaultMessage="Date" id="client.customer.area.flight.date"/>
            <FormattedDate value={date} day="numeric" month="short" year="numeric" />
          </div>

          <div className={cx("d-none d-sm-flex align-items-center", s['flight-seat'])}>
            <User size={16} color="#b6cada"/> &nbsp;
            <span>{num}</span>
          </div>
        </div>

        <div className={cx("d-flex d-sm-none align-items-center", s['flight-mobile-date-seat'])}>          
          <div className={cx("d-flex",s['flight-date'])}>            
            <FormattedDate value={date} weekday="short" day="numeric" month="short" year="numeric" />
          </div>
          <div className={cx("d-flex align-items-center", s['flight-seat'])}>
            <User color="#b6cada" size={14}/> &nbsp;
            <span>{num}</span>
          </div>
        </div>
      </div>      
    )
  }
}

FlightRequest.propTypes = {
  date: PropTypes.string,
  airports: PropTypes.array,  
  num: PropTypes.number,
  color: PropTypes.string,
  iconColor: PropTypes.string
}

FlightRequest.defaultProps = {  
  date: new Date().toISOString(),
  airports:[
    {
      name: 'GVA',
      city: 'Genava',
      countryCode: 'ch',
      time: moment(new Date).format()  
    },
    {
      name: 'LIS',
      city: 'Lisbon',
      countryCode: 'pt',
      time: moment(new Date).add(2, 'hours').format()  
    }
  ],  
  num: 3,
  color: '#263d50',
  iconColor: '#263d50'
}

export default withStyles(s)(FlightRequest);
