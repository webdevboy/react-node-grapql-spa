import React from "react";
import { defineMessages, FormattedMessage } from "react-intl";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from "./list.css";
import cx from "classnames";
import { connect } from "react-redux";
import Row from "./row/row";


const messages = defineMessages({
  avatar: {
    id: "user.list.avatar",
    defaultMessage: "Avatar",
    description: "user.list.avatar",
  },
  name: {
    id: "user.list.name",
    defaultMessage: "Name",
    description: "user.list.name",
  },
  email: {
    id: "user.list.email",
    defaultMessage: "Email",
    description: "user.list.email",
  },
  role: {
    id: "user.list.role",
    defaultMessage: "Role",
    description: "user.list.role",
  },
  lastaccessed: {
    id: "user.list.lastaccessed",
    defaultMessage: "Last time accessed",
    description: "user.list.lastaccessed",
  },
});


class UsersList extends React.Component {
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
                <th><FormattedMessage {...messages.avatar} /></th>
                <th><FormattedMessage {...messages.name} /></th>
                <th><FormattedMessage {...messages.email} /></th>
                <th><FormattedMessage {...messages.role} /></th>
                <th><FormattedMessage {...messages.lastaccessed} /></th>
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

export default connect(mapStateToProps, { })(withStyles(s)(UsersList));
