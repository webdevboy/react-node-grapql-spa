import React from "react";
import PropTypes from "prop-types";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from "./FavouriteAirportList.scss";
import cx from "classnames";
import { CheckCircle } from 'react-feather';
import Text from 'themes/lunajets/components/Primitives/Text';
import MdFlightTakeoff from "react-icons/lib/md/flight-takeoff";

const Checkmark = ({size}) => (
  <div style={{'marginTop': '-12px'}}>
    <svg style={{ fill: "white", position: "absolute" }} width="20px" height="24px">
      <circle cx="12.5" cy="12.2" r="8.292" />
    </svg>
    <svg style={{ fill: "#263d50", position: "absolute" }} width="24px" height="24px">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
    </svg>
  </div>
);

const airportList = [
  {
    route: 'LISBON, PT - LIS, LPPT',
    selected: true
  },
  {
    route: 'LISBON, PT - LIS, LPPT',
    selected: false
  },
  {
    route: 'LISBON, PT - LIS, LPPT',
    selected: false
  }
]

class FavouriteAirportList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {      
    }    
  }  

  render() {  
    const { filterText } = this.props;

    const result = airportList.filter(airport => airport.route.toLowerCase().includes(filterText.toLowerCase()));
    
    return (
      <div className={cx(s["favourite-airport-list"])}>
        {
          result.map((airport, index)=>
            <div className={cx(s["favourite-airport"], airport.selected ? s['selected'] : null)} key={`favourite.airport.list.${index}`}>
              <div className={cx(s["icon"])}>
                {
                  !airport.selected &&
                  <MdFlightTakeoff
                    className={cx(s["icn"])}
                    size={25}
                    color="#e2e2e1"
                  />
                }

                {
                  airport.selected && 
                  <Checkmark className={cx(s["icn"])} size={20}/>
                }                
              </div>
              <div className={s.details}>
                <i className={"famfamfam-flags pt"} /> LISBON, PT - LIS, LPPT
              </div>
              <div className={s.distance}>22Km</div>        
            </div>
          )
        }        
      </div>      
    );
  }
}


export default withStyles(s)(FavouriteAirportList);
