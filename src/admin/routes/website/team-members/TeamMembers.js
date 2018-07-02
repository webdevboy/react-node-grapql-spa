import React, { Component } from "react";
import Filter from "admin/components/Filter";
import Action from "admin/components/Action";
import Page from "admin/components/Page";
import PropTypes from "prop-types";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from "./TeamMembers.css";
import Breadcrumbs from "admin/components/Breadcrumbs";
import history from "core/history";
import cx from "classnames";
import { connect } from "react-redux";
import { Menu, Switch, ContextMenu, Tooltip, Overlay, MenuItem, MenuDivider, Popover, Intent, Toaster, PopoverInteractionKind, Position } from "@blueprintjs/core";
import moment from "moment/moment";

const Collapsed = ({ addTeamMembers, editTeamMember, removeTeamMembers }) => (
  <Menu>
    <MenuItem
      iconName="pt-icon-add"
      text="Add User"
      intent={Intent.PRIMARY}
      className={s.menuItem}
    />
  </Menu>
);

const TeamMemberRow = ({
  teamMember, select, isActive, editTeamMember, removeTeamMember,
}) => (
  <tr onClick={select} className={(isActive) ? s.isActive : null}>
    <td>{teamMember.first_name}</td>
    <td>{teamMember.last_name}</td>
    <td>{teamMember.email}</td>
    <td>{teamMember.title}</td>
    <td>{teamMember.bio}</td>
    <td>{teamMember.flag}</td>
    <td className={s.actionCol}>
      <Action key="item-action-edit" icon="pt-icon-edit" intent="pt-intent-primary" action={e => editTeamMember(e, teamMember.id)} tooltip="Edit Team Member" />
      <Action key="item-action-remove" icon="pt-icon-remove" intent="pt-intent-danger" action={e => removeTeamMember(e, [removeTeamMember.id])} tooltip="Remove Team Member" />
    </td>
  </tr>
);

class TeamMembers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: [],
    };
  }

  addTeamMember = (e) => {
    e.preventDefault();
    history.push("/team-members/add");
  }

  editTeamMember = (e, id) => {
    e.stopPropagation();

    if (id) {
      return history.push(`/team-members/edit/${id}`);
    }

    if (!id && this.state.selected.length === 1) {
      return history.push(`/team-members/edit/${this.state.selected[0]}`);
    }
  }

  select = (e, id) => {
    console.log("team-members ID =>", id);
  }


  render() {
    const { currentRoute, teamMembersArray, teamMembersById } = this.props;

    // const filteredUsers = this.filterUsers(usersArray);     // set filter search
    // const users = this.orderBy(filteredUsers);              // ser order

    const breadcrumbs = <Breadcrumbs key="breadcrumb" route={currentRoute} />;

    const filters = [
      // <Filter key={`filter-search`} type="search" label={'Search'} search={this.changeSearch} />,
      // <Filter key={`filter-role`} type="select" field={'role'} label={'Role'} options={rolesArray.map(role => ({ label: role.name, value: role.id }))} reset={this.props.removeFilter} select={this.filterBy} />,
    ];

    const actions = [
      <Action key="action-add" icon="pt-icon-add" intent="pt-intent-primary" action={this.addTeamMember} label="Add Team Member" />,
      // <Action key={`action-edit`} icon="pt-icon-edit" intent="pt-intent-default" className={(this.state.selected.length !== 1) ? 'pt-disabled' : null} action={this.editUser} tooltip={'Edit User'} />,
      // <Action key={`action-remove`} icon="pt-icon-remove" intent="pt-intent-danger" className={(!this.state.selected.length) ? 'pt-disabled' : null} action={this.alertRemoveUsers} tooltip={'Remove Users'} />,
    ];

    const actionPopover = <Collapsed />;

    return (
      <Page actions={actions} actionPopover={actionPopover} filters={filters} breadcrumbs={breadcrumbs}>
        <div className={s.teamMembers}>
          <table className="pt-table pt-striped">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Title</th>
                <th>Bio</th>
                <th>Flag</th>
                <th className={s.actionCol} />
              </tr>
            </thead>
            <tbody onScroll={this.onScrollToBottom}>
              {teamMembersArray && teamMembersArray.map((teamMember, index) =>
              (<TeamMemberRow
                key={`teamMember-${index}`}
                teamMember={teamMember}
                select={e => this.select(e, teamMember.id)}
                isActive={(this.state.selected.includes(teamMember.id))}
                editTeamMember={this.teamMember}
                removeTeamMember={this.alertRemoveTeamMembers}
              />))}

            </tbody>
          </table>
        </div>
      </Page>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  teamMembersArray: state.teamMembers.ids.map(id => state.teamMembers.byId[id]) || [],
  teamMembersById: state.teamMembers.byId,

});

export default connect(mapStateToProps)(withStyles(s)(TeamMembers));
