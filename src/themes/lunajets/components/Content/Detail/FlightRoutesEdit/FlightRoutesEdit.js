import React from "react";
import PropTypes from 'prop-types';
import cx from "classnames";
import s from "./FlightRoutesEdit.scss";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import { FormattedDate } from "react-intl";

import FormattedCurrency from "../../../i18n/FormattedCurrency";
import Text from "../../../Primitives/Text";
import Button from "../../../Primitives/Button";
import AircraftSvg from './aircraft.svg';
import FlightRoutes from '../FlightRoutes';
import MoreVert from "react-icons/lib/md/more-vert";

class FlightRoutesEdit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showMore: false
    }
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  showEdit = () => {
    this.setState({
      showMore: true
    });
  }
  render() {
    const {
      airports,
      editRoute,
      deleteRoute
    } = this.props;

    return <div className={cx(s['route-edit'], "d-flex align-items-center justify-content-between pl-3")}>
      <FlightRoutes airports={this.props.airports} color="#263d50" style={this.state.showMore ? {marginLeft: '-40px'} : {marginLeft: '0'}}/>
      <div className={cx(s.buttons, "d-flex align-items-center")}>
      {
        !this.state.showMore ? 
          <MoreVert color="#e2e2e1" size={25} onClick={this.showEdit}/>
        : <div className="d-flex" style={{height: "100%"}}>
          <button className="dk-blue-bg" style={{fontSize: "14px", padding: "0 15px"}} onClick={this.props.editRoute}>Edit</button>
          <button className="lt-red-bg" style={{fontSize: "14px"}} onClick={this.props.deleteRoute}>Delete</button>
        </div>
      }
      </div>
    </div>
  }
}

export default withStyles(s)(FlightRoutesEdit);
