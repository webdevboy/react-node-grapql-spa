import React from "react";
import { defineMessages, FormattedMessage } from "react-intl";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from "../../../../../styles/inspector.css";
import cx from "classnames";
import { createUser } from "../../../../../redux/actions/user";
import { connect } from "react-redux";


const messages = defineMessages({
  currentTalks: {
    id: "currentTalks.container.header",
    defaultMessage: "Current Talks",
    description: "currentTalks.container.header",
  },
});


class Inspector extends React.Component {
  constructor(props) {
    super(props);
    this.handleClickClose = this.handleClickClose.bind(this);
    this.handleClickSave = this.handleClickSave.bind(this);
    this.change = this.change.bind(this);
    this.changeSelect = this.changeSelect.bind(this);
    this.checkEmailValidity = this.checkEmailValidity.bind(this);
    this.state = {
      email: "",
      first_name: "",
      last_name: "",
      role: "",
      role_id: "",
      error_email: false,
      valid_email: false,
    };
  }

  handleClickSave() {
    if (!this.state.error_email && this.state.email !== "") {
      this.props.createUser({
        email: this.state.email, first_name: this.state.first_name, last_name: this.state.last_name, role_id: this.state.role_id,
      }).then(() => {
        this.state = {
          email: "",
          first_name: "",
          last_name: "",
          role: "",
          role_id: "",
          error_email: false,
          valid_email: false,
        };
        this.props.toggleInspectorState();
      });
    } else {
      this.setState({
        error_email: true,
      });
    }
  }

  handleClickClose() {
    this.props.toggleInspectorState();
  }

  change(ev) {
    this.setState({
      [ev.target.name]: ev.target.value,
    });
  }

  componentDidMount() {
    // let e = document.getElementById("user_role");
    // let role = e.options[e.selectedIndex].innerHTML;
    // let key = e.options[e.selectedIndex].getAttribute('value');
    // this.setState({
    //   role: role,
    //   role_id: key,
    // });
  }

  componentDidUpdate(prevProps, prevState) {

  }

  changeSelect(ev) {
    const role = ev.target.options[ev.target.selectedIndex].innerHTML;
    const key = ev.target.options[ev.target.selectedIndex].getAttribute("value");
    this.setState({
      role,
      role_id: key,
    });
  }

  checkEmailValidity(ev) {
    this.setState({
      error_email: false,
      valid_email: false,
    });
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(ev.target.value)) {
      this.setState({
        error_email: true,
      });
    } else {
      this.setState({
        valid_email: true,
      });
    }
  }

  render() {
    return (
      <div className={cx(s.container, (this.props.fixed ? s.fixed : s[""]), (!this.props.fixed ? (this.props.inspectorState ? s.open : s.close) : ""))}>
        <div className={s["container-header"]}>
          <h3>Add team member</h3>
        </div>
        <div className={s["container-content"]}>
          <div className={s.info}>
            <div>
              <label>Email:</label><input
                name="email"
                value={this.state.email}
                className={cx(s.fieldInput, this.state.error_email ? s.error : "", this.state.valid_email ? s.success : "")}
                type="text"
                placeholder="Enter email"
                onChange={this.change}
                onBlur={this.checkEmailValidity}
              />
              { this.state.error_email ? <div><label className={s["label-error"]}>Email not valid</label></div> : ""}
            </div>
            <div>
              <label>First name</label><input name="first_name" value={this.state.first_name} className={s.fieldInput} type="text" placeholder="Enter first name" onChange={this.change} />
            </div>
            <div>
              <label>Last name</label><input name="last_name" value={this.state.last_name} className={s.fieldInput} type="text" placeholder="Enter last name" onChange={this.change} />
            </div>
          </div>
        </div>
        <div className={s["container-action"]}>
          {this.props.fixed ? false : <div><button className={s.actionsBtns} onClick={this.handleClickSave}>Add</button><button className={s.actionsBtns} onClick={this.handleClickClose}>Cancel</button></div>}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  roles: state.admin.roles,
});


export default connect(mapStateToProps, { createUser })(withStyles(s)(Inspector));
