import React, { Component } from "react";
import Filter from "admin/components/Filter";
import Action from "admin/components/Action";
import Page from "admin/components/Page";
import PropTypes from "prop-types";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from "./Offices.css";
import Breadcrumbs from "admin/components/Breadcrumbs";
import history from "core/history";
import cx from "classnames";
import { connect } from "react-redux";
import { Menu, Switch, ContextMenu, Tooltip, Overlay, MenuItem, MenuDivider, Popover, Intent, Toaster, PopoverInteractionKind, Position } from "@blueprintjs/core";
import moment from "moment/moment";

const Collapsed = ({ addOffice, editOffice, removeOffices }) => (
  <Menu>
    <MenuItem
      iconName="pt-icon-add"
      text="Add User"
      intent={Intent.PRIMARY}
      className={s.menuItem}
    />
  </Menu>
);

const OfficeRow = ({
  office, select, isActive, editOffice, removeOffice,
}) => (
  <tr onClick={select} className={(isActive) ? s.isActive : null}>
    <td>{office.name}</td>
    <td>{office.country}</td>
    <td>{office.location}</td>
    <td>{office.email}</td>
    <td>{office.phone}</td>
    <td className={s.actionCol}>
      <Action key="item-action-edit" icon="pt-icon-edit" intent="pt-intent-primary" action={e => editOffice(e, office.id)} tooltip="Edit Office" />
      <Action key="item-action-remove" icon="pt-icon-remove" intent="pt-intent-danger" action={e => removeOffice(e, [office.id])} tooltip="Remove Office" />
    </td>
  </tr>
);

class Offices extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: [],
    };
  }

  addOffice = (e) => {
    e.preventDefault();
    history.push("/offices/add");
  }

  editOffice = (e, id) => {
    e.stopPropagation();

    if (id) {
      return history.push(`/offices/edit/${id}`);
    }

    if (!id && this.state.selected.length === 1) {
      return history.push(`/offices/edit/${this.state.selected[0]}`);
    }
  }

  select = (e, id) => {
    console.log("OFFICE ID =>", id);
  }


  render() {
    const { currentRoute, officesArray, officesById } = this.props;

    // const filteredUsers = this.filterUsers(usersArray);     // set filter search
    // const users = this.orderBy(filteredUsers);              // ser order

    const breadcrumbs = <Breadcrumbs key="breadcrumb" route={currentRoute} />;

    const filters = [
    // <Filter key={`filter-search`} type="search" label={'Search'} search={this.changeSearch} />,
    // <Filter key={`filter-role`} type="select" field={'role'} label={'Role'} options={rolesArray.map(role => ({ label: role.name, value: role.id }))} reset={this.props.removeFilter} select={this.filterBy} />,
    ];

    const actions = [
      <Action key="action-add" icon="pt-icon-add" intent="pt-intent-primary" action={this.addOffice} label="Add Office" />,
      // <Action key={`action-edit`} icon="pt-icon-edit" intent="pt-intent-default" className={(this.state.selected.length !== 1) ? 'pt-disabled' : null} action={this.editUser} tooltip={'Edit User'} />,
      // <Action key={`action-remove`} icon="pt-icon-remove" intent="pt-intent-danger" className={(!this.state.selected.length) ? 'pt-disabled' : null} action={this.alertRemoveUsers} tooltip={'Remove Users'} />,
    ];

    const actionPopover = <Collapsed />;

    return (
      <Page actions={actions} actionPopover={actionPopover} filters={filters} breadcrumbs={breadcrumbs}>
        <div className={s.offices}>
          <table className="pt-table pt-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Country</th>
                <th>Location</th>
                <th>Email</th>
                <th>Phone</th>
                <th className={s.actionCol} />
              </tr>
            </thead>
            <tbody onScroll={this.onScrollToBottom}>
              {officesArray && officesArray.map((office, index) =>
              (<OfficeRow
                key={`office-${index}`}
                office={office}
                select={e => this.select(e, office.id)}
                isActive={(this.state.selected.includes(office.id))}
                editOffice={this.editOffice}
                removeOdffice={this.alertRemoveOffices}
              />))}

            </tbody>
          </table>
        </div>
      </Page>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  officesArray: state.offices.ids.map(id => state.offices.byId[id]) || [],
  officesById: state.offices.byId,

});

export default connect(mapStateToProps)(withStyles(s)(Offices));
