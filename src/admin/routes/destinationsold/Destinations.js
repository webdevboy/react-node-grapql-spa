import React, { Component } from "react";
import Filter from "../../components/Filter";
import Action from "../../components/Action";
import Page from "../../components/Page";
import PropTypes from "prop-types";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from "./Destinations.css";
import Breadcrumbs from "../../components/Breadcrumbs";
import history from "core/history";
import cx from "classnames";
import { connect } from "react-redux";
import { Menu, Switch, ContextMenu, Tooltip, Overlay, MenuItem, MenuDivider, Popover, Intent, Toaster, PopoverInteractionKind, Position } from "@blueprintjs/core";
import moment from "moment/moment";
import { setFilter, removeFilter } from "admin/actions/destinations";
import _ from "lodash";

const Collapsed = ({ addDestination, editDestination, removeDestinations }) => (
  <Menu>
    <MenuItem
      iconName="pt-icon-add"
      text="Add Destination"
      intent={Intent.PRIMARY}
      className={s.menuItem}
    />
  </Menu>
);

const DestinationRow = ({
  destination, language, select, isActive, editDestination, removeDestination, viewDestination,
}) => (
  <tr onClick={select} className={(isActive) ? s.isActive : null}>
    <td className={s.inspectCol}>
      <Action key="item-action-view" icon="pt-icon-eye-open" action={e => viewDestination(e, destination.id)} tooltip="View Destination" />
    </td>
    <td>{destination.title}</td>
    <td><span className={cx("famfamfam-flags", destination.city.country.countryCode)} />{ destination.city.name }</td>
    <td>
      <span>{language.language}</span>
      <span style={{ marginLeft: "5px" }} className={cx("pt-tag pt-minimal")}> {language.locale}</span>
    </td>
    <td>
      {
        (!destination.published) ? <span className="pt-tag pt-minimal pt-intent-primary">Draft</span> : <span className="pt-tag pt-minimal pt-intent-success">Published</span>
      }
    </td>
    <td>{`${destination.author.first_name || null} ${destination.author.last_name || null}`}</td>
    <td className={s.actionCol}>
      <Action key="item-action-edit" icon="pt-icon-edit" intent="pt-intent-primary" action={e => editDestination(e, destination.id)} tooltip="Edit Destination" />
      <Action key="item-action-remove" icon="pt-icon-remove" intent="pt-intent-danger" action={e => removeDestination(e, [destination.id])} tooltip="Remove Destination" />
    </td>
  </tr>
);

class Destinations extends Component {
  constructor(props) {
    super(props);

    this.state = {
      predicate: ["created_at"],
      order: [false],
      selected: [],
      search: "",
      removeWarning: false,
    };
  }

  addDestination = (e) => {
    e.preventDefault();
    history.push("/destinations/add");
  }

  editDestination= (e, id) => {
    e.stopPropagation();

    if (id) {
      return history.push(`/destinations/edit/${id}`);
    }

    if (!id && this.state.selected.length === 1) {
      return history.push(`/destinations/edit/${this.state.selected[0]}`);
    }
  }

  select = (e, id, index) => {
    console.log(e, id, index);
    if (e.shiftKey) {
      const { destinationsArray } = this.props;
      const filterDestinations = this.filterDestinations(destinationsArray); // set filter search
      const destinations = this.orderBy(filterDestinations); // ser order

      const foundIndex = _.findIndex(destinations, { id: this.state.selected[this.state.selected.length - 1] }) || 0;
      const selected = (foundIndex > index) ? destinations.slice(index, foundIndex) : destinations.slice(foundIndex, index + 1);
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

  filterDestinations = destinations => destinations.filter((destination) => {
    const filteredRes = Object.keys(destination).map(key => _.includes(typeof destination[key] === "string" ? destination[key].toLowerCase() : "", this.state.search.toLowerCase()));
    return filteredRes.includes(true);
  })

  orderBy = destinations => _.orderBy(destinations, this.state.predicate, this.state.order.map(order => ((order) ? "desc" : "asc")));


  select = (e, id) => {
    console.log("Destination ID =>", id);
  }


  render() {
    const {
      currentRoute, languages, languagesById, destinationsArray, destinationsById,
    } = this.props;

    const filteredDestinations = this.filterDestinations(destinationsArray); // set filter search
    const destinations = this.orderBy(filteredDestinations); // ser order

    const breadcrumbs = <Breadcrumbs key="breadcrumb" route={currentRoute} />;

    const filters = [
      <Filter key="filter-search" type="search" label="Search" search={this.changeSearch} />,
      <Filter key="filter-language" type="select" field="language" label="Language" options={languages.map(lang => ({ label: lang.locale, value: lang.id }))} reset={this.props.removeFilter} select={this.filterBy} />,
    ];

    const actions = [
      <Action key="action-add" icon="pt-icon-add" intent="pt-intent-primary" action={this.addDestination} label="Add Destination" />,
      // <Action key={`action-edit`} icon="pt-icon-edit" intent="pt-intent-default" className={(this.state.selected.length !== 1) ? 'pt-disabled' : null} action={this.editUser} tooltip={'Edit User'} />,
      // <Action key={`action-remove`} icon="pt-icon-remove" intent="pt-intent-danger" className={(!this.state.selected.length) ? 'pt-disabled' : null} action={this.alertRemoveUsers} tooltip={'Remove Users'} />,
    ];

    const actionPopover = <Collapsed />;

    return (
      <Page actions={actions} actionPopover={actionPopover} filters={filters} breadcrumbs={breadcrumbs}>
        <div className={s.destinations}>
          <table className="pt-table pt-striped">
            <thead>
              <tr>
                <th />
                <th>Title</th>
                <th>City</th>
                <th>Language</th>
                <th>State</th>
                <th>Author</th>
                <th className={s.actionCol} />
              </tr>
            </thead>
            <tbody onScroll={this.onScrollToBottom}>

              { destinations && destinations.map((destination, index) =>
                (<DestinationRow
                  key={`destination-${index}`}
                  destination={destination}
                  language={languagesById[destination.language].locale}
                  select={e => this.select(e, destination.id)}
                  isActive={(this.state.selected.includes(destination.id))}
                  editDestination={this.editDestination}
                  removeDestination={this.alertRemoveDestinations}
                />))}

            </tbody>
          </table>
        </div>
      </Page>
    );
  }
}

const getVisibles = (items, filter) => {
  if (!filter) { return items; }

  if (Array.isArray(filter)) {
    filter.forEach(({ field, value }) => {
      items = items.filter(item => item[field] === value);
    });
  } else {
    return items.filter(item => item[filter.field] === filter.value);
  }

  return items;
};

const mapStateToProps = (state, ownProps) => {
  const allDestinations = state.destinations.ids.map(id => state.destinations.byId[id]) || [];
  const destinations = getVisibles(allDestinations, state.destinations.visibilityFilter);

  return {
    defaultLocale: state.intl.defaultLocale,
    languagesById: state.languages.byId,
    languages: state.languages.ids.map(id => state.languages.byId[id]) || [],
    destinationsArray: destinations,
    destinationById: state.destinations.byId,
  };
};

export default connect(mapStateToProps, { setFilter, removeFilter })(withStyles(s)(Destinations));
