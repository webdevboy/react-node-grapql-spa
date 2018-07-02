import React from "react";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from "./row.css";
import cx from "classnames";
import { connect } from "react-redux";


class Row extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.activate = this.activate.bind(this);
    this.state = {
      active: false,
    };
  }

  handleClick(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    this.props.setUser(this.props.user);
    this.props.toggleInspectorEditor(true);
  }

  activate(ev) {
    ev.stopPropagation();
    this.setState({
      active: !this.state.active,
    });
    this.props.userRemoval(this.props.user.id);
  }

  prevent(ev) {
    ev.stopPropagation();
  }

  render() {
    return (
      <tr onClick={this.handleClick} className={this.state.active ? s.active : ""}>
        <td onClick={this.prevent}>{this.props.user.role.name.toLowerCase() !== "god" ? <input type="checkbox" className={s.myinput} onChange={this.activate} /> : ""}</td>
        <td><div className={s["table-avatar"]}><img className={s["chat-avatar"]} src={this.props.user.avatar_path} /></div></td>
        <td>{this.props.user.first_name ? `${this.props.user.first_name}` : ""} {this.props.user.last_name ? `${this.props.user.last_name}` : ""}</td>
        <td>{this.props.user.email}</td>
        <td>{this.props.user.role.name}</td>
        <td>{this.props.user.last_login ? new Date(this.props.user.last_login).toDateString() : ""}</td>
      </tr>
    );
  }
}

const mapStateToProps = state => ({
});

export default connect(mapStateToProps, { })(withStyles(s)(Row));
