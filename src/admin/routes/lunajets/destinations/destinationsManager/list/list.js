import React from "react";
import { defineMessages, FormattedMessage } from "react-intl";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from "./list.css";
import cx from "classnames";
import { connect } from "react-redux";
import Row from "./row/row";


const messages = defineMessages({
  airport: {
    id: "destination.list.airport",
    defaultMessage: "Airport",
    description: "destination.list.airport",
  },
  city: {
    id: "destination.list.city",
    defaultMessage: "City",
    description: "destination.list.city",
  },
  country: {
    id: "destination.list.country",
    defaultMessage: "Country",
    description: "destination.list.country",
  },
});


class DestinationsList extends React.Component {
  constructor(props) {
    super(props);
  }

  handleDoubleClick() {
    // history.push('/chat/1223');
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
                <th><FormattedMessage {...messages.airport} /></th>
                <th><FormattedMessage {...messages.city} /></th>
                <th><FormattedMessage {...messages.country} /></th>
              </tr>
            </thead>
            <tbody>
              {this.props.users.map(user =>
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

export default connect(mapStateToProps, { })(withStyles(s)(DestinationsList));
