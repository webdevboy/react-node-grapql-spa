import React from "react";
import ReactDOM from "react-dom";
import { defineMessages, FormattedMessage } from "react-intl";
import PropTypes from "prop-types";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from "./Roles.css";
import Breadcrumbs from "../../components/Breadcrumbs";
import Filter from "../../components/Filter";
import Action from "../../components/Action";
import Page from "../../components/Page";
import cx from "classnames";
import { Menu, Switch, ContextMenu, Tooltip, Overlay, MenuItem, MenuDivider, Popover, Intent, Toaster, PopoverInteractionKind, Position } from "@blueprintjs/core";
import { connect } from "react-redux";
import moment from "moment";
import { addRole, editRole } from "admin/actions/userRoles";
import history from "core/history";
import UserInspectPanel from "./UserInspectPanel";
import { random, times } from "lodash";

const Collapsed = ({ saveRole, cancel }) => (
  <Menu>
    <MenuItem
      iconName="pt-icon-confirm"
      onClick={e => saveRole}
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

class Role extends React.Component {
  refHandlers = {
    toaster: ref => this.toaster = ref,
  };

  static propTypes = {
  };

  constructor(props) {
    super(props);

    this.state = {
      name: (this.props.edit) ? this.props.role.name : "",
      description: (this.props.edit) ? this.props.role.description : "",
      permissions: (this.props.edit) ? this.props.role.permissions : [],
    };

    this.originalState = this.state;
  }

  editRole = async () => {
    this.toaster.clear();

    const role = {
      name: this.state.name,
      description: this.state.description,
      permissions: this.state.permissions,
    };

    Object.keys(role).forEach((field) => {
      if (this.props.role[field] === role[field]) {
        delete role[field];
      }
    });

    if (Object.keys(role).length) {
      await this.props.editRole(this.props.role.id, role);

      // check for errors
      this.toaster.show(this.props.errors ? {
        message: this.props.errors.graphQLErrors[0].message || null,
        timeout: 3000,
        intent: Intent.DANGER,
        iconName: "pt-icon-error",
      } : {
        message: "Role edited successfully!",
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

  saveRole = async () => {
    this.toaster.clear();

    const role = {
      name: this.state.name,
      description: this.state.description,
      permissions: this.state.permissions,
    };

    Object.keys(role).forEach((field) => {
      if (field === "name" && !role[field]) {
        this.toaster.show({
          message: `${_.capitalize(field)} is required!`,
          timeout: 3000,
          intent: Intent.DANGER,
          iconName: "pt-icon-error",
        });
      }
    });

    await this.props.addRole(role);

    this.setState(this.originalState);

    // check for errors
    this.toaster.show(this.props.errors ? {
      message: this.props.errors.graphQLErrors[0].message || null,
      timeout: 3000,
      intent: Intent.DANGER,
      iconName: "pt-icon-error",
    } : {
      message: "Role created successfully!",
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
      history.push("/roles");
    } else {
      history.goBack();
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  togglePermission = (id) => {
    if (this.state.permissions.includes(id)) {
      const index = this.state.permissions.indexOf(id);
      this.setState({
        permissions: [
          ...this.state.permissions.splice(0, index),
          ...this.state.permissions.splice(index + 1, this.state.permissions.length - 1),
        ],
      });
    } else {
      this.setState({
        permissions: [
          ...this.state.permissions,
          id,
        ],
      });
    }
  }


  render() {
    const {
      edit, roles, rolesArray, permissionsArray, currentRoute, isLoading,
    } = this.props;

    const breadcrumbs = <Breadcrumbs route={currentRoute} />;

    const actions = [
      <Action key="action-confirm" icon="pt-icon-confirm" loading={isLoading} intent="pt-intent-success" action={(this.props.edit) ? this.editRole : this.saveRole} label="Save" />,
      <Action key="action-cancel" icon="pt-icon-undo" intent="pt-intent-default" action={this.cancel} label="Close" />,
    ];

    const actionPopover = <Collapsed save={this.saveRole} cancel={this.cancel} />;

    return (
      <Page actions={actions} actionPopover={actionPopover} breadcrumbs={breadcrumbs}>
        <div className={s.role}>

          <Toaster position={Position.TOP} ref={this.refHandlers.toaster} />

          <form onSubmit={e => e.preventDefault()} className={s["role-form"]}>

            <div className={s["lj-form"]}>

              <div className="pt-form-group">
                <label className="pt-label" style={{ flex: "1" }}>
                  Name
                  <span className="pt-text-muted">(required)</span>
                  <input name="name" onChange={this.handleChange} className="pt-input pt-fill" type="text" value={this.state.name} placeholder="Name" dir="auto" />
                </label>
              </div>

              <div className="pt-form-group">
                <label className="pt-label">
                  Description
                  <textarea className="pt-input pt-fill" name="description" onChange={this.handleChange} required type="email" value={this.state.description} placeholder="Some description about this role" dir="auto">{this.state.description}</textarea>
                </label>
              </div>

            </div>

            <div className={s["lj-form"]}>

              <h5>Permissions</h5>

              <table className="pt-table pt-default">
                <thead>
                  <tr>
                    <th />
                    <th>ID</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    permissionsArray.map(permission =>
                      (<tr key={`permission-${permission.id}`}>
                        <td>
                          <Switch checked={this.state.permissions.includes(permission.id)} onChange={() => this.togglePermission(permission.id)} />
                        </td>
                        <td>{permission.action}</td>
                        <td>{permission.description}</td>
                       </tr>))
                  }

                </tbody>
              </table>

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
  isLoading: state.roles.isLoading,
  errors: state.roles.errors,
  role: state.roles.byId[ownProps.id] || null,
  permissionsArray: state.roles.permissions.ids.map(id => state.roles.permissions.byId[id]) || [],
});

export default connect(mapStateToProps, { addRole, editRole })(withStyles(s)(Role));

