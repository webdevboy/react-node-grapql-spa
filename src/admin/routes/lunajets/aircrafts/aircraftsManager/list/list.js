import React from "react";
import { defineMessages, FormattedMessage } from "react-intl";
import withStyles from "isomorphic-style-loader/lib/withStyles";
// import s from '../../../../../../styles/list.css';
import cx from "classnames";
import { connect } from "react-redux";
import Row from "./row";


const messages = defineMessages({
  model: {
    id: "aircraft.list.model",
    defaultMessage: "Model",
    description: "aircraft.list.avatar",
  },
  manufacturer: {
    id: "aircraft.list.manufacturer",
    defaultMessage: "Manufacturer",
    description: "aircraft.list.manufacturer",
  },
  range: {
    id: "aircraft.list.range",
    defaultMessage: "Range",
    description: "aircraft.list.range",
  },
  speed: {
    id: "aircraft.list.speed",
    defaultMessage: "Speed",
    description: "aircraft.list.speed",
  },
  height: {
    id: "aircraft.list.height",
    defaultMessage: "Height",
    description: "aircraft.list.height",
  },
  width: {
    id: "aircraft.list.width",
    defaultMessage: "Width",
    description: "aircraft.list.width",
  },
  length: {
    id: "aircraft.list.length",
    defaultMessage: "Length",
    description: "aircraft.list.length",
  },
  seats: {
    id: "aircraft.list.seats",
    defaultMessage: "Seats",
    description: "aircraft.list.seats",
  },
  luggage: {
    id: "aircraft.list.luggage",
    defaultMessage: "Luggage",
    description: "aircraft.list.luggage",
  },
  carryOn: {
    id: "aircraft.list.carryon",
    defaultMessage: "Carry on",
    description: "aircraft.list.carryon",
  },
});


class List extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div className={s["chat-container"]}>
        <div className={s["container-header"]} />
        <div className={s.content}>
          <table className={cx(s.table)}>
            <thead>
              <tr>
                <th />
                <th><FormattedMessage {...messages.model} /></th>
                <th><FormattedMessage {...messages.manufacturer} /></th>
                <th><FormattedMessage {...messages.range} /></th>
                <th><FormattedMessage {...messages.speed} /></th>
                <th><FormattedMessage {...messages.height} /></th>
                <th><FormattedMessage {...messages.width} /></th>
                <th><FormattedMessage {...messages.length} /></th>
                <th><FormattedMessage {...messages.seats} /></th>
                <th><FormattedMessage {...messages.luggage} /></th>
                <th><FormattedMessage {...messages.carryOn} /></th>
              </tr>
            </thead>
            <tbody>
              {this.props.aircrafts.map(user =>
                <Row key={user.id} user={user} userRemoval={this.props.userRemoval} toggleInspectorEditor={this.props.toggleInspectorEditor} setUser={this.props.setUser} />)}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
});

export default connect(mapStateToProps, { })(withStyles(s)(List));
