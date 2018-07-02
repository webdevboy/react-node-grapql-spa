import React from "react";
import { defineMessages, FormattedMessage } from "react-intl";
import PropTypes from "prop-types";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from "./Users.css";
import Breadcrumbs from "../../components/Breadcrumbs";
import Filter from "../../components/Filter";
import Action from "../../components/Action";
import Page from "../../components/Page";
import Link from "../../components/Link";
import cx from "classnames";
import { Alert, Menu, ContextMenu, Overlay, MenuItem, MenuDivider, Popover, Intent, PopoverInteractionKind, Position } from "@blueprintjs/core";
import { connect } from "react-redux";
import moment from "moment";
import { setFilter, removeFilter, removeUsers } from "admin/actions/users";
import history from "core/history";
import UserInspectPanel from "./UserInspectPanel";
import _ from "lodash";

const Collapsed = ({
  addUser, editUser, removeUsers, selection,
}) => (
  <Menu>
    <MenuItem
      iconName="pt-icon-add"
      onClick={() => addUser}
      text="Add User"
      intent={Intent.PRIMARY}
      className={s.menuItem}
    />
    <MenuItem
      iconName="pt-icon-edit"
      onClick={e => ((selection.length !== 1) ? e.preventDefault() : editUser)}
      intent={Intent.NONE}
      text="Edit User"
      className={cx(s.menuItem, (selection.length !== 1) ? "pt-disabled" : null)}
    />
    <MenuItem
      iconName="pt-icon-remove"
      onClick={e => ((!selection.length) ? e.preventDefault() : removeUsers)}
      text="Remove Users"
      intent={Intent.DANGER}
      className={cx(s.menuItem, (!selection.length) ? "pt-disabled" : null)}
    />
  </Menu>
);

const UserContextMenu = ({
  editUser, removeUser, inspectUser, id,
}) => (
  <Menu>
    <MenuItem
      iconName="pt-icon-eye-open"
      onClick={() => inspectUser(id)}
      intent={Intent.NONE}
      text="Quick View"
      className={s.menuItem}
    />
    <MenuDivider />
    <MenuItem
      iconName="pt-icon-edit"
      onClick={() => editUser(id)}
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

const UserRow = ({
  user, role, contextMenu, select, isActive, editUser, removeUser,
}) => (
  <tr onClick={select} onContextMenu={contextMenu} className={(isActive) ? s.isActive : null}>
    <td><img className={s.avatar} src={user.avatar_path} alt={`Photo of ${user.first_name} ${user.last_name}`} /></td>
    <td>{`${user.first_name} ${user.last_name}`}</td>
    <td>{user.email}</td>
    <td>{role.name || 'Not Found'}</td>
    <td>{user.last_login ? moment(user.last_login).fromNow() : "Never"}</td>
    <td className={s.actionCol}>
      <Action key="item-action-edit" icon="pt-icon-edit" intent="pt-intent-primary" action={e => editUser(e, user.id)} tooltip="Edit User" />
      <Action key="item-action-remove" icon="pt-icon-remove" intent="pt-intent-danger" action={e => removeUser(e, [user.id])} tooltip="Remove Users" />
    </td>
  </tr>
);

class Users extends React.Component {
  static propTypes = {
  };

  constructor(props) {
    super(props);

    this.state = {
      predicate: ["last_login"],
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
      const { usersArray } = this.props;
      const filteredUsers = this.filterUsers(usersArray); // set filter search
      const users = this.orderBy(filteredUsers); // ser order

      const foundIndex = _.findIndex(users, { id: this.state.selected[this.state.selected.length - 1] }) || 0;
      const selected = (foundIndex > index) ? users.slice(index, foundIndex) : users.slice(foundIndex, index + 1);
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

  addUser = () => {
    history.push("/users/add");
  }

  editUser = (e, id) => {
    e.stopPropagation();

    if (id) {
      return history.push(`/users/edit/${id}`);
    }

    if (!id && this.state.selected.length === 1) {
      return history.push(`/users/edit/${this.state.selected[0]}`);
    }
  }

  alertRemoveUsers = (e, ids) => {
    e.stopPropagation();
    this.setState({
      removeWarning: true,
      deleteQueue: ids || this.state.selected,
    });
  }

  confirmRemoveUsers = async () => {
    await this.props.removeUsers(this.state.deleteQueue);
    this.setState({
      selected: [],
      deleteQueue: undefined,
      removeWarning: false,
    });
  }

  inspectUser = (id) => {
    this.setState({
      inspect: id,
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
      <UserContextMenu
        popoverClassName="pt-dark"
        editUser={this.editUser}
        inspectUser={this.inspectUser}
        removeUser={this.alertRemoveUsers}
        id={id}
      />,
      {
        left: e.clientX,
        top: e.clientY,
      },
    );
  }

  filterBy = (field, value) => {
    if (value !== null) {
      this.props.setFilter({ filter: { field, value } });
      this.setState({ selected: [] });
    }
  }

  changeSearch = (e) => {
    this.setState({
      search: e.target.value,
    });
  }

  filterUsers = users => users.filter((user) => {
    const filteredRes = Object.keys(user).map(key => _.includes(typeof user[key] === "string" ? user[key].toLowerCase() : "", this.state.search.toLowerCase()));
    return filteredRes.includes(true);
  })

  toggleSortBy = (e, predicate) => {
    e.preventDefault();

    console.log("STATE PREDICATE => ", this.state.predicate);
    console.log("NEW PREDICATE => ", predicate);
    console.log("PREDICATES MATCH => ", (this.state.predicate == predicate));


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

  isArrowUp(fieldName){
    const index = this.state.predicate.findIndex(p=>p==fieldName);
    if(index<0) return undefined;
    return this.state.order[index];
  }

  closeRemoveWarning = () => {
    this.setState({
      removeWarning: false,
    });
  }

  orderBy = users => _.orderBy(users, this.state.predicate, this.state.order.map(order => ((order) ? "desc" : "asc")));

  render() {
    const {
      usersArray, usersById, roles, rolesArray,
    } = this.props;

    const filteredUsers = this.filterUsers(usersArray); // set filter search
    const users = this.orderBy(filteredUsers); // ser order

    const breadcrumbs = <Breadcrumbs key="breadcrumb" route={this.props.currentRoute} />;

    const filters = [
      <Filter key="filter-search" type="search" label="Search" search={this.changeSearch} />,
      <Filter key="filter-role" type="select" field="role" label="Role" options={rolesArray.map(role => ({ label: role.name, value: role.id }))} reset={this.props.removeFilter} select={this.filterBy} />,
    ];

    const actions = [
      <Action key="action-add" icon="pt-icon-add" intent="pt-intent-primary" action={this.addUser} label="Add User" />,
      // <Action key={`action-edit`} icon="pt-icon-edit" intent="pt-intent-default" className={(this.state.selected.length !== 1) ? 'pt-disabled' : null} action={this.editUser} tooltip={'Edit User'} />,
      // <Action key={`action-remove`} icon="pt-icon-remove" intent="pt-intent-danger" className={(!this.state.selected.length) ? 'pt-disabled' : null} action={this.alertRemoveUsers} tooltip={'Remove Users'} />,
    ];

    const actionPopover = <Collapsed selection={this.state.selected} addUser={this.addUser} editUser={this.editUser} removeUsers={this.alertRemoveUsers} />;

    return (
      <Page actions={actions} actionPopover={actionPopover} filters={filters} breadcrumbs={breadcrumbs}>
        <div className={s.users}>

          <Alert
            intent={Intent.DANGER}
            iconName="pt-icon-warning-sign"
            isOpen={this.state.removeWarning}
            confirmButtonText={"I'm sure!"}
            onConfirm={this.confirmRemoveUsers}
            cancelButtonText="Cancel"
            onCancel={this.closeRemoveWarning}
          >
            <span>Are you sure you want to remove this records?</span>
          </Alert>

          <table className="pt-table pt-striped">
            <thead>
              <tr>
                <th />
                <th onClick={e => this.toggleSortBy(e, ["first_name", "last_name"])}>
                  <span>Name</span>
                  {
                    this.isArrowUp('first_name') && <span className="pt-icon pt-icon-caret-up"/>
                  }
                  {
                    this.isArrowUp('first_name') === false && <span className="pt-icon pt-icon-caret-down"/>
                  }
                </th>
                <th onClick={e => this.toggleSortBy(e, ["email"])}>
                  <span>Email</span>            
                  {
                    this.isArrowUp('email') && <span className="pt-icon pt-icon-caret-up"/>
                  }
                  {
                    this.isArrowUp('email') === false && <span className="pt-icon pt-icon-caret-down"/>
                  }
                </th>
                <th onClick={e => this.toggleSortBy(e, ["role"])}>
                  <span>Role</span>
                  {
                    this.isArrowUp('role') && <span className="pt-icon pt-icon-caret-up"/>
                  }
                  {
                    this.isArrowUp('role') === false && <span className="pt-icon pt-icon-caret-down"/>
                  }
                </th>
                <th onClick={e => this.toggleSortBy(e, ["last_login"])}>
                  <span>Last Login</span>
                  {
                    this.isArrowUp('last_login') && <span className="pt-icon pt-icon-caret-up"/>
                  }
                  {
                    this.isArrowUp('last_login') === false && <span className="pt-icon pt-icon-caret-down"/>
                  }
                </th>
                <th className={s.actionCol} />
              </tr>
            </thead>
            <tbody>
              {
                users && users.map((user, index) => 
                  (<UserRow
                    key={`user-${user.id}`}
                    user={user}
                    role={roles[user.role]}
                    contextMenu={e => this.openContextMenu(e, user.id)}
                    select={e => this.select(e, user.id, index)}
                    isActive={(this.state.selected.includes(user.id))}
                    editUser={this.editUser}
                    removeUser={this.alertRemoveUsers}
                  />))
              }
              {
                users && !users.length ?
                  <tr>
                    <td colSpan={5} >
                      <div className="pt-non-ideal-state">
                        <div className="pt-non-ideal-state-visual pt-non-ideal-state-icon">
                          <span className="pt-icon pt-icon-search" />
                        </div>
                        <h4 className="pt-non-ideal-state-title">No results found!</h4>
                        <div className="pt-non-ideal-state-description">
                          <Link to="/users/add">Click here to create a new user</Link>
                        </div>
                      </div>
                    </td>
                  </tr>

                : null
              }

            </tbody>
          </table>

          <Overlay isOpen={this.state.inspect} onClose={this.hideInspect}>
            <UserInspectPanel user={usersById[this.state.inspect]} />
          </Overlay>
        </div>

      </Page>
    );
  }
}

const getVisibleUsers = (users, filter) => {
  if (!filter) { return users; }
  return users.filter(user => user[filter.field] === filter.value);
};

const mapStateToProps = (state, ownProps) => {
  const allUsers = state.users.ids.map(id => state.users.byId[id]) || [];
  const users = getVisibleUsers(allUsers, state.users.visibilityFilter);

  return {
    roles: state.roles.byId,
    usersArray: users,
    rolesArray: state.roles.ids.map(id => state.roles.byId[id]) || [],
    usersById: state.users.byId,
  };
};

export default connect(mapStateToProps, { setFilter, removeFilter, removeUsers })(withStyles(s)(Users));

