import React, { Component } from "react";
import Filter from "admin/components/Filter";
import Action from "admin/components/Action";
import Page from "admin/components/Page";
import PropTypes from "prop-types";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from "./EmptyLegs.css";
import Breadcrumbs from "admin/components/Breadcrumbs";
import history from "core/history";
import cx from "classnames";
import { connect } from "react-redux";
import { Menu, Switch, ContextMenu, Tooltip, Overlay, MenuItem, MenuDivider, Popover, Intent, Toaster, PopoverInteractionKind, Position } from "@blueprintjs/core";
import moment from "moment/moment";
import { removeEmptyLeg } from "admin/actions/emptyLegs";

const Collapsed = ({ addEmptyLeg, editEmptyLeg, removeEmptyLegFunction }) => (
  <Menu>
    <MenuItem
      iconName="pt-icon-add"
      text="Add Empty Leg"
      intent={Intent.PRIMARY}
      className={s.menuItem}
    />
  </Menu>
);

const EmptyLegRow = ({
  emptyLeg, select, isActive, editEmptyLeg, removeEmptyLegFunction, viewEmptyLeg
}) => (
  <tr onClick={select} className={(isActive) ? s.isActive : null}>
    <td>{(emptyLeg.details && emptyLeg.details.account_name) ? emptyLeg.details.account_name : ""}</td>
    <td>{emptyLeg.details ? emptyLeg.details.manufacturer_name + " " + emptyLeg.details.aircraft_model_name + " (" + emptyLeg.details.registration_number + ")" : ""}</td>
    <td>{(emptyLeg.from_airport && emptyLeg.from_airport.name) ? emptyLeg.from_airport.name : ""}</td>
    <td>{(emptyLeg.to_airport && emptyLeg.to_airport.name) ? emptyLeg.to_airport.name : "" }</td>
    <td>{moment(emptyLeg.from_date).format("ll")}</td>
    <td>{moment(emptyLeg.until_date).format("ll")}</td>
    <td>{emptyLeg.price}</td>
    <td>{(emptyLeg.details && emptyLeg.details.available_seats) ? emptyLeg.details.available_seats : ""}</td>
    <td>{(emptyLeg.featured) ? "Y" : "N"}</td>
    <td>{(emptyLeg.published) ? "Y" : "N"}</td>
    <td className={s.actionCol}>
      <Action key="item-action-view" icon="pt-icon-eye-open" action={e => viewEmptyLeg(e,emptyLeg)} tooltip="View Empty Leg" />
      <Action key="item-action-edit" icon="pt-icon-edit" intent="pt-intent-primary" action={e => editEmptyLeg(e, emptyLeg.id)} tooltip="Edit Empty Leg" />
      <Action key="item-action-remove" icon="pt-icon-remove" intent="pt-intent-danger" action={e => removeEmptyLegFunction(e, emptyLeg.id)} tooltip="Remove Empty Leg" />
    </td>
  </tr>
);

class EmptyLegs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: [],
    };
  }

  addEmptyLeg = (e) => {
    e.preventDefault();
    history.push("empty-legs/add");
  }

  removeEmptyLegFunction = async(e, id) => {
    // this.toaster.clear();
    await this.props.removeEmptyLeg(id);
    // check for errors
    // this.toaster.show(this.props.errors ? {
    //   message: this.props.errors.graphQLErrors[0].message || null,
    //   timeout: 3000,
    //   intent: Intent.DANGER,
    //   iconName: "pt-icon-error",
    // } : {
    //   message: "Empty leg removed successfully!",
    //   timeout: 3000,
    //   intent: Intent.SUCCESS,
    //   iconName: "pt-icon-success",
    //   action: {
    //   text: "Ok",
    //   onClick: this.cancel,
    //   },
    // });
  }

  editEmptyLeg = (e, id) => {
    e.stopPropagation();

    if (id) {
      return history.push(`/website/empty-legs/edit/${id}`);
    }

    if (!id && this.state.selected.length === 1) {
      return history.push(`/website/empty-legs/edit${this.state.selected[0]}`);
    }
  }

  viewEmptyLeg = (e,emptyleg) => {
    e.preventDefault();
    e.stopPropagation();
    const { defaultLanguage, messages } = this.props;

    const pathELF = messages.find(message => {return message.message_id === "url.emptyLegFlights"} );
    const pathEL = messages.find(message => {return message.message_id === "url.emptyLegFlights.emptyLeg"} );
    const port = __DEV__ ? `:${window.App.port}` : "";
    const subDomain = __DEV__ ? '' : 'www.';
    const basePath = `https://${subDomain}${window.App.hostname}${port}`;
    const pathUrl = basePath + '/' + defaultLanguage.locale + '/' + pathELF.translation + '/' + pathEL.translation + '-' + 
      emptyleg.from_airport.city.name.toLowerCase() + '-' + emptyleg.to_airport.city.name.toLowerCase() + '-' + emptyleg.id;
    window.open(`${pathUrl}`);
  }
  
  select = (e, id) => {
    console.log("Empty Legs ID =>", id);
  }

  changeSearch = e => {
    this.setState({
      ...this.state,
      searchValue: e.target.value,
    });
  };

  render() {
    const { currentRoute, emptyLegsArray, emptyLegsById } = this.props;
    const { searchValue, searchCriteria } = this.state;
    const loweredQuery = searchValue ? searchValue.toLowerCase() : "";

    const filteredEmptyLegs = emptyLegsArray.filter(el => {
      const fromName = el.from_airport ? el.from_airport.name : "";
      const toName = el.to_airport ? el.to_airport.name : "";
      const aircraft = el.details ? el.details.manufacturer_name + " " + el.details.aircraft_model_name + " (" + el.details.registration_number + ")" : "";
      const account = el.details ? el.details.account_name : "";
      return _.toLower(el.id.toString().concat(" ", fromName, " ", toName, " ", aircraft, " ", account)).includes(loweredQuery)
   });

    const breadcrumbs = <Breadcrumbs key="breadcrumb" route={currentRoute} />;

    const filters = [
      <Filter
        tooltip="Search"
        key={`filter-search`}
        type="search"
        label={'Search'}
        search={this.changeSearch}
        />,
    ];

    const actions = [
      <Action key="action-add" icon="pt-icon-add" intent="pt-intent-primary" action={this.addEmptyLeg} label="Add Empty Leg" />,
      // <Action key={`action-edit`} icon="pt-icon-edit" intent="pt-intent-default" className={(this.state.selected.length !== 1) ? 'pt-disabled' : null} action={this.editUser} tooltip={'Edit User'} />,
      // <Action key={`action-remove`} icon="pt-icon-remove" intent="pt-intent-danger" className={(!this.state.selected.length) ? 'pt-disabled' : null} action={this.alertRemoveUsers} tooltip={'Remove Users'} />,
    ];

    const actionPopover = <Collapsed />;

    return (
      <Page actions={actions} actionPopover={actionPopover} filters={filters} breadcrumbs={breadcrumbs}>
        <div className={s.emptyLegs}>
          <table className="pt-table pt-striped">
            <thead>
              <tr>
                <th>Operator</th>
                <th>Aircraft Name</th>
                <th>Departure</th>
                <th>Arrival</th>
                <th>From Date</th>
                <th>To Date</th>
                <th>Price</th>
                <th>Availability</th>
                <th>Featured</th>
                <th>Published</th>
                <th className={s.actionCol} />
              </tr>
            </thead>
            <tbody onScroll={this.onScrollToBottom}>
              {filteredEmptyLegs && filteredEmptyLegs.map((emptyLeg, index) => {

                return (
                  <EmptyLegRow
                    key={`emptyleg-${index}`}
                    emptyLeg={emptyLeg}
                    select={e => this.select(e, emptyLeg.id)}
                    isActive={(this.state.selected.includes(emptyLeg.id))}
                    editEmptyLeg={this.editEmptyLeg}
                    removeEmptyLegFunction={this.removeEmptyLegFunction}
                    viewEmptyLeg={this.viewEmptyLeg}
                  />);
              })}
            </tbody>
          </table>
        </div>
      </Page>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const availableLocales = state.runtime.availableLocales;
  const languages = _.keyBy(Object.values(availableLocales), "id");
  const defaultLanguage = availableLocales[state.runtime.defaultLocale];
  return {
    languages,
    defaultLanguage,
  };
};

export default connect(mapStateToProps, {
  removeEmptyLeg
})(withStyles(s)(EmptyLegs));
