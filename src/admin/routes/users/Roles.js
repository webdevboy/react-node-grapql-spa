import React from "react";
import { defineMessages, FormattedMessage } from "react-intl";
import PropTypes from "prop-types";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from "./Roles.css";
import Breadcrumbs from "../../components/Breadcrumbs";
import Filter from "../../components/Filter";
import Action from "../../components/Action";
import Page from "../../components/Page";
import cx from "classnames";
import { Alert, Menu, ContextMenu, Overlay, MenuItem, MenuDivider, Popover, Intent, PopoverInteractionKind, Position } from "@blueprintjs/core";
import { connect } from "react-redux";
import moment from "moment";
import { removeRoles } from "admin/actions/userRoles";
import history from "core/history";
// import UserInspectPanel from './UserInspectPanel';
import _ from "lodash";

const Collapsed = ({
  addRole, editRole, removeRoles, selection,
}) => (
  <Menu>
    <MenuItem
      iconName="pt-icon-add"
      onClick={() => addRole}
      text="Add Role"
      intent={Intent.PRIMARY}
      className={s.menuItem}
    />
    <MenuItem
      iconName="pt-icon-edit"
      onClick={e => ((selection.length !== 1) ? e.preventDefault() : editRole)}
      intent={Intent.NONE}
      text="Edit Role"
      className={cx(s.menuItem, (selection.length !== 1) ? "pt-disabled" : null)}
    />
    <MenuItem
      iconName="pt-icon-remove"
      onClick={e => ((!selection.length) ? e.preventDefault() : removeRoles)}
      text="Remove Roles"
      intent={Intent.DANGER}
      className={cx(s.menuItem, (!selection.length) ? "pt-disabled" : null)}
    />
  </Menu>
);

const UserContextMenu = ({ editRole, removeUser, id }) => (
  <Menu>
    <MenuItem
      iconName="pt-icon-edit"
      onClick={() => editRole(id)}
      intent={Intent.NONE}
      text="Edit User"
      className={s.menuItem}
    />
    <MenuItem
      iconName="pt-icon-remove"
      onClick={() => removeUser([id])}
      intent={Intent.DANGER}
      text="Remove User"
      className={s.menuItem}
    />
  </Menu>
);

const RoleRow = ({
  role, contextMenu, select, isActive, editRole, removeRole,
}) => (
  <tr onClick={select} onContextMenu={contextMenu} className={(isActive) ? s.isActive : null}>
    <td>{role.name}</td>
    <td>{role.description}</td>
    <td>{role.total_users}</td>
    <td className={s.actionCol}>
      <Action key="item-action-edit" icon="pt-icon-edit" intent="pt-intent-primary" action={e => editRole(e, role.id)} tooltip="Edit Role" />
      <Action key="item-action-remove" icon="pt-icon-remove" intent="pt-intent-danger" action={e => removeRole(e, [role.id])} tooltip="Remove Role" />
    </td>
  </tr>
);

class Roles extends React.Component {
  static propTypes = {
  };

  constructor(props) {
    super(props);

    this.state = {
      predicate: ["name"],
      order: [false],
      selected: [],
      filter: null,
      search: "",
      removeWarning: false,
    };

    console.log(props);
  }

  select = (e, id, index) => {
    if (e.shiftKey) {
      const { rolesArray } = this.props;

      const filtered = this.filterRoles(rolesArray); // set filter search
      const roles = this.orderBy(filtered); // ser order

      const foundIndex = _.findIndex(roles, { id: this.state.selected[this.state.selected.length - 1] }) || 0;
      const selected = (foundIndex > index) ? roles.slice(index, foundIndex) : roles.slice(foundIndex, index + 1);
      const ids = selected.map(item => item.id);
      this.setState({ selected: (index < foundIndex) ? ids.concat(this.state.selected) : ids });
    } else if (e.metaKey) {
      if (!this.state.selected.includes(id)) {
        this.setState({ selected: [...this.state.selected, id] });
      } else {
        const removeIndex = _.findIndex(this.state.selected, id);
        this.setState({
          selected: [
            ...this.state.selected.slice(0, removeIndex),
            ...this.state.selected.slice(removeIndex, this.state.selected.length - 1),
          ],
        });
      }
    } else {
      this.setState({ selected: (!this.state.selected.includes(id)) ? [id] : [] });
    }
  }

  addRole = () => {
    history.push("/users/roles/add");
  }

  editRole = (e, id) => {
    e.stopPropagation();
    if (id) {
      return history.push(`/users/roles/edit/${id}`);
    }

    if (!id && this.state.selected.length === 1) {
      return history.push(`/users/roles/edit/${this.state.selected[0]}`);
    }
  }

  alertRemoveRoles = (e, ids) => {
    e.stopPropagation();
    this.setState({
      removeWarning: true,
      deleteQueue: ids || this.state.selected,
    });
  }

  confirmRemoveRoles = async () => {
    await this.props.removeRoles(this.state.deleteQueue);
    this.setState({
      selected: [],
      deleteQueue: undefined,
      removeWarning: false,
    });
  }

  hideInspect = () => {
    const state = this.state;
    delete state.inspect;
    this.setState(state);
  }

  openContextMenu = (e, id) => {
    e.preventDefault();

    ContextMenu.show(
      <UserContextMenu popoverClassName="pt-dark" editRole={this.editRole} removeUser={this.alertRemoveRoles} id={id} />,
      {
        left: e.clientX,
        top: e.clientY,
      },
    );
  }

  // filterBy = (field, value) => {
  //   if (value !== null) {
  //     this.props.setFilter({ filter: { field, value } });
  //     this.setState({ selected: [] })
  //   }
  // }

  changeSearch = (e) => {
    this.setState({
      search: e.target.value,
    });
  }

  filterRoles = roles => roles.filter((role) => {
    const filteredRes = Object.keys(role).map(key => _.includes(typeof role[key] === "string" ? role[key].toLowerCase() : "", this.state.search.toLowerCase()));
    return filteredRes.includes(true);
  })

  toggleSortBy = (e, predicate) => {
    e.preventDefault();

    if (this.state.predicate.every((pred, i) => pred === predicate[i])) {
      this.setState({
        order: predicate.map((predicate, index) => !this.state.order[index] || false),
      });
    } else {
      this.setState({
        predicate,
        order: predicate.map((predicate, index) => this.state.order[index] || false),
      });
    }
  }

  closeRemoveWarning = () => {
    this.setState({
      removeWarning: false,
    });
  }

  orderBy = roles => _.orderBy(roles, this.state.predicate, this.state.order.map(order => ((order) ? "desc" : "asc")));

  render() {
    const { rolesArray, rolesById } = this.props;

    console.log(rolesArray);

    const filtered = this.filterRoles(rolesArray); // set filter search
    const roles = this.orderBy(filtered); // ser order

    const breadcrumbs = <Breadcrumbs key="breadcrumb" route={this.props.currentRoute} />;

    const filters = [
      <Filter key="filter-search" type="search" label="Search" search={this.changeSearch} />,
    ];

    const actions = [
      <Action key="action-add" icon="pt-icon-add" intent="pt-intent-primary" action={this.addRole} label="Add Role" />,
      // <Action key={`action-edit`} icon="pt-icon-edit" intent="pt-intent-default" className={(this.state.selected.length !== 1) ? 'pt-disabled' : null} action={this.editRole} tooltip={'Edit Role'} />,
      // <Action key={`action-remove`} icon="pt-icon-remove" intent="pt-intent-danger" className={(!this.state.selected.length) ? 'pt-disabled' : null} action={this.alertRemoveRoles} tooltip={'Remove Role'} />,
    ];

    const actionPopover = <Collapsed selection={this.state.selected} addRole={this.addRole} editRole={this.editRole} removeRoles={this.alertRemoveRoles} />;

    return (
      <Page actions={actions} actionPopover={actionPopover} filters={filters} breadcrumbs={breadcrumbs}>
        <div className={s.roles}>

          <Alert
            intent={Intent.DANGER}
            iconName="pt-icon-warning-sign"
            isOpen={this.state.removeWarning}
            confirmButtonText={"I'm sure!"}
            onConfirm={this.confirmRemoveRoles}
            cancelButtonText="Cancel"
            onCancel={this.closeRemoveWarning}
          >
            <span>Are you sure you want to remove this records?</span>
          </Alert>

          <table className="pt-table pt-striped">
            <thead>
              <tr>
                <th onClick={e => this.toggleSortBy(e, ["name"])}>Name</th>
                <th onClick={e => this.toggleSortBy(e, ["description"])}>Description</th>
                <th onClick={e => this.toggleSortBy(e, ["total_users"])}>Total Users</th>
                <th className={s.actionCol} />
              </tr>
            </thead>
            <tbody>
              {
                roles && roles.map((role, index) =>
                  (<RoleRow
                    key={`role-${role.id}`}
                    role={role}
                    contextMenu={e => this.openContextMenu(e, role.id)}
                    select={e => this.select(e, role.id, index)}
                    isActive={(this.state.selected.includes(role.id))}
                    removeRole={this.alertRemoveRoles}
                    editRole={this.editRole}
                  />))
              }
            </tbody>
          </table>

          {/* <Overlay isOpen={this.state.inspect} onClose={this.hideInspect}>
            <UserInspectPanel user={usersById[this.state.inspect]} />
          </Overlay> */}
        </div>

      </Page>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  rolesArray: state.roles.ids.map(id => state.roles.byId[id]) || [],
  rolesById: state.roles.byId,
});

export default connect(mapStateToProps, { removeRoles })(withStyles(s)(Roles));

