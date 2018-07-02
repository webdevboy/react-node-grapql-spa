import React from "react";
import ReactDOM from "react-dom";
import { defineMessages, FormattedMessage } from "react-intl";
import PropTypes from "prop-types";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from "./Users.css";
import Breadcrumbs from "../../components/Breadcrumbs";
import Filter from "../../components/Filter";
import Action from "../../components/Action";
import Page from "../../components/Page";
import cx from "classnames";
import { Menu, Switch, ContextMenu, Tooltip, Overlay, MenuItem, MenuDivider, Popover, Intent, Toaster, PopoverInteractionKind, Position } from "@blueprintjs/core";
import { connect } from "react-redux";
import moment from "moment";
import { addUser, editUser } from "admin/actions/users";
import history from "core/history";
import UserInspectPanel from "./UserInspectPanel";
import { random, times } from "lodash";
import generatePassword from "../../../core/randomPasswordGenerator";

const Collapsed = ({ saveUser, cancel }) => (
  <Menu>
    <MenuItem
      iconName="pt-icon-confirm"
      onClick={e => saveUser}
      intent={Intent.SUCCESS}
      text="Save"
      className={cx(s.menuItem)}
    />
    <MenuItem
      iconName="pt-icon-undo"
      onClick={e => cancel}
      text="Cancel"
      intent={Intent.NONE}
      className={cx(s.menuItem)}
    />
  </Menu>
);

class User extends React.Component {
  refHandlers = {
    toaster: ref => this.toaster = ref,
  };

  static propTypes = {
  };

  constructor(props) {
    super(props);

    console.log(this);

    this.state = {
      first_name: (this.props.edit) ? this.props.user.first_name : "",
      last_name: (this.props.edit) ? this.props.user.last_name : "",
      email: (this.props.edit) ? this.props.user.email : "",
      role_id: (this.props.edit) ? this.props.user.role : this.props.rolesArray.reverse()[0].id, // get first
      image: (this.props.edit) ? this.props.user.avatar_path : undefined,

      password: {
        value: (!this.props.edit) ? generatePassword() : "",
        confirmValue: "",
        confirm: false,
        disabled: !!(this.props.edit),
      },

    };

    this.originalState = this.state;
  }

  generatePassword = (e) => {
    e.preventDefault();
    console.log("HERE");

    this.setState({
      password: {
        value: generatePassword(),
        confirm: false,
      },
    });
  }

  changePassword = (e) => {
    const password = {
      value: e.target.value,
      confirm: true,
    };
    this.setState({ password: { ...this.state.password, ...password } });
  }

  changePasswordConfirm = (e) => {
    const password = {
      confirmValue: e.target.value,
    };
    this.setState({ password: { ...this.state.password, ...password } });
  }

  editUser = async () => {
    console.log(this);

    this.toaster.clear();

    const user = {
      email: this.state.email,
      first_name: this.state.first_name,
      last_name: this.state.last_name,
    };

    Object.keys(user).forEach((field) => {
      if (this.props.user[field] === user[field]) {
        delete user[field];
      }
    });

    // if email is not valid
    if (user.email && !user.email.length) {
      return this.toaster.show({
        message: "Email is required!",
        timeout: 3000,
        intent: Intent.DANGER,
        iconName: "pt-icon-error",
      });
    }

    if (!this.state.password.disabled && ((this.state.password.confirm && this.state.password.value === this.state.password.confirmValue && this.state.password.value.length) || (!this.state.password.confirm && this.state.password.value.length))) {
      user.password = this.state.password.value;
    }

    // if password is to weak
    if (user.password && this.state.password.value.length < 8) {
      return this.toaster.show({
        message: "Password not accepted, please ensure it has 8 or more characters",
        timeout: 3000,
        intent: Intent.DANGER,
        iconName: "pt-icon-error",
      });
    }

    if (this.state.role_id !== this.props.user.role.id) {
      user.role_id = this.state.role_id;
    }


    if (Object.keys(user).length) {
      await this.props.editUser(this.props.user.id, user);

      // check for errors
      this.toaster.show(this.props.errors ? {
        message: this.props.errors.graphQLErrors[0].message || null,
        timeout: 3000,
        intent: Intent.DANGER,
        iconName: "pt-icon-error",
      } : {
        message: "User edited successfully!",
        timeout: 3000,
        intent: Intent.SUCCESS,
        iconName: "pt-icon-success",
        action: {
          text: "Ok",
          onClick: this.cancel,
        },
      });
    } else {
      return this.toaster.show({
        message: "You have to change something!",
        timeout: 3000,
        intent: Intent.DANGER,
        iconName: "pt-icon-error",
      });
    }
  }

  saveUser = async () => {
    this.toaster.clear();

    const user = {
      email: this.state.email,
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      role_id: this.state.role_id,
    };

    if ((this.state.password.confirm && this.state.password.value === this.state.password.confirmValue && this.state.password.value.length >= 8) || !this.state.password.confirm) {
      user.password = this.state.password.value;
    } else {
      this.toaster.show({
        message: "Password not accepted, please ensure it has 8 or more characters",
        timeout: 3000,
        intent: Intent.DANGER,
        iconName: "pt-icon-error",
      });
    }

    Object.keys(user).forEach((field) => {
      if (field === "email" && !user[field]) {
        this.toaster.show({
          message: `${_.capitalize(field)} is required!`,
          timeout: 3000,
          intent: Intent.DANGER,
          iconName: "pt-icon-error",
        });
      }
    });

    await this.props.addUser(user);

    this.setState(this.originalState);

    // check for errors
    this.toaster.show(this.props.errors ? {
      message: this.props.errors.graphQLErrors[0].message || null,
      timeout: 3000,
      intent: Intent.DANGER,
      iconName: "pt-icon-error",
    } : {
      message: "User created successfully!",
      timeout: 3000,
      intent: Intent.SUCCESS,
      iconName: "pt-icon-success",
      action: {
        text: "Ok",
        onClick: this.cancel,
      },
    });
  }

  cancel = () => {
    if (!history.length) {
      history.push("/users");
    } else {
      history.goBack();
    }
  }

  addedFile = (e) => {
    e.preventDefault();

    const reader = new FileReader();
    const file = ReactDOM.findDOMNode(this.refs.file).files[0];

    reader.onerror = error => console.log("Error: ", error);

    reader.onloadend = () =>
      this.setState({
        image: reader.result,
        file,
      });

    reader.readAsDataURL(file);
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  togglePasswordChange = () => {
    const password = {
      ...this.state.password,
      disabled: !this.state.password.disabled,
      value: generatePassword(),
    };

    this.setState({
      password,
    });
  }

  render() {
    const {
      edit, roles, rolesArray, currentRoute, isLoading,
    } = this.props;

    const breadcrumbs = <Breadcrumbs route={currentRoute} />;

    const actions = [
      <Action key="action-confirm" icon="pt-icon-confirm" loading={isLoading} intent="pt-intent-success" action={(this.props.edit) ? this.editUser : this.saveUser} label="Save" />,
      <Action key="action-cancel" icon="pt-icon-undo" intent="pt-intent-default" action={this.cancel} label="Close" />,
    ];

    const actionPopover = <Collapsed save={this.saveUser} cancel={this.cancel} />;

    return (
      <Page actions={actions} actionPopover={actionPopover} breadcrumbs={breadcrumbs}>
        <div className={s.user}>

          <Toaster position={Position.TOP} ref={this.refHandlers.toaster} />

          <form onSubmit={e => e.preventDefault()} className={s["user-form"]}>

            <div className={s["avatar-placeholder"]}>

              <div className={cx(s["avatar-upload"], (this.state.image) ? s.isFilled : null)}>
                { this.state.image ? <img src={this.state.image} /> : null }
                <input type="file" ref="file" onChange={this.addedFile} accept="image/*" />
              </div>

              <span className={s["avatar-label"]}>Drop here or click to chose the user avatar</span>

            </div>

            <div className={s["lj-form"]}>

              <div className="pt-form-group pt-inline">

                <label className="pt-label" style={{ flex: "1" }}>
                  Name
                  <div className="pt-form-group pt-inline">

                    <label className="pt-label" style={{ flex: "1" }}>
                      <input name="first_name" onChange={this.handleChange} className="pt-input pt-fill" type="text" value={this.state.first_name} placeholder="First Name" dir="auto" />
                    </label>

                    <label className="pt-label" style={{ flex: "1" }}>
                      <input name="last_name" onChange={this.handleChange} className="pt-input pt-fill" type="text" value={this.state.last_name} placeholder="Last Name" dir="auto" />
                    </label>

                  </div>
                </label>

                <label className="pt-label" style={{ marginRight: "0" }}>
                  Role
                  <div className="pt-form-group">

                    <div className="pt-select pt-inline">
                      <select className="pt-fill" value={this.state.role_id || rolesArray[0].id} style={{ background: "rgba(255,255,255,.05)", boxShadow: "inset 0 0 0px 1px rgba(255,255,255,.05)" }} name="role_id" onChange={this.handleChange}>
                        { rolesArray.reverse().map(({ id }) => <option key={`role-${id}`} selected={id === this.state.role_id} value={id}>{roles[id].name}</option>) }
                      </select>
                    </div>


                  </div>
                </label>

              </div>

              <div className="pt-form-group">
                <label className="pt-label">
                  Email
                  <span className="pt-text-muted">(required)</span>
                  <input className="pt-input pt-fill" name="email" onChange={this.handleChange} required type="email" value={this.state.email} placeholder="@lunajets.com" dir="auto" />
                </label>
              </div>

              <div className={cx("pt-form-group")}>
                <label className="pt-label">
                  Password
                  <div className={cx("pt-input-group", (this.state.password.confirm && this.check) ? "pt-intent-danger" : (this.state.password.confirm) ? (this.state.password.value !== this.state.password.confirmValue || this.state.password.value.length < 8) ? "pt-intent-danger" : "pt-intent-success" : null)}>
                    <input type={this.state.password.confirm ? "password" : "text"} className={cx("pt-input", (this.state.password.disabled) ? "pt-disabled" : null)} value={this.state.password.value} onChange={this.changePassword} />
                    <span className="pt-input-action">
                      <Tooltip content="Generate Password" inline position={Position.LEFT} hoverOpenDelay={600}>
                        <button type="button" className="pt-button pt-minimal pt-intent-primary pt-icon-random" onClick={this.generatePassword} />
                      </Tooltip>
                    </span>

                  </div>
                </label>
              </div>

              {
                this.state.password.confirm ?
                  <div className={cx("pt-form-group")}>
                    <label className="pt-label">
                      Password Confirmation
                      <span className="pt-text-muted">(must match field above)</span>
                      <div className={cx("pt-input-group", (this.state.password.value !== this.state.password.confirmValue || this.state.password.value.length < 8) ? "pt-intent-danger" : "pt-intent-success")}>
                        <input className={cx("pt-input pt-fill", (this.state.password.disabled) ? "pt-disabled" : null)} type="password" value={this.state.password.confirmValue} onChange={this.changePasswordConfirm} dir="auto" />
                        {
                          (this.state.password.value !== this.state.password.confirmValue) ?
                            <span className="pt-input-action pt-icon pt-icon-error" />
                          : <span className="pt-input-action pt-icon pt-icon-endorsed" />
                        }

                      </div>
                    </label>
                  </div>
                : null
              }

              {
                this.props.edit ?
                  <Switch checked={!this.state.password.disabled} label="Change Password" onChange={this.togglePasswordChange} />
                : null
              }

            </div>


          </form>

        </div>

      </Page>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  roles: state.roles.byId,
  rolesArray: state.roles.ids.map(id => state.roles.byId[id]) || [],
  isLoading: state.users.isLoading,
  errors: state.users.errors,
  user: state.users.byId[ownProps.id] || null,
});

export default connect(mapStateToProps, { addUser, editUser })(withStyles(s)(User));

