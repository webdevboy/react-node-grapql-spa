import React, { Component } from "react";
import Filter from "admin/components/Filter";
import Action from "admin/components/Action";
import Page from "admin/components/Page";
import StateTag from "admin/components/StateTag";
import NoResultsRow from "admin/components/NoResultsRow";
import PropTypes from "prop-types";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from "./Destinations.css";
import Breadcrumbs from "admin/components/Breadcrumbs";
import history from "core/history";
import cx from "classnames";
import { connect } from "react-redux";
import { Alert, Menu, Switch, ContextMenu, Tooltip, Overlay, MenuItem, MenuDivider, Popover, Intent, Toaster, PopoverInteractionKind, Position } from "@blueprintjs/core";
import moment from "moment/moment";
import { setFilter, removeFilter, removeDestination, removeDestinationTranslation } from "admin/actions/destinations";
import _ from "lodash";
import DestinationSidebar from "./DestinationSidebar";


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

const GroupRow = ({
  id, destinations, master, baseLang, languagesById, destination, language, select, isActive, editDestination, removeDestination, viewDestination,
}) => (
  <tr onClick={() => select(id)} className={(isActive) ? s.isActive : null}>
    <td className="preview-col">
      <Action key="item-action-view" icon="pt-icon-eye-open" action={e => viewArticle(e, master.id, master.category)} tooltip="View Article" />
    </td>
    <td className="id-col">
      {id}
    </td>
    <td>
      <div><a href="#">{master.title}</a></div>
      <div>
        {
          destinations.map(destination =>
            (<StateTag
              onClick={e => editDestination(e, destination.id)}
              key={`tag-locale-${destination.language}`}
              value={destination.published}
              text={languagesById[destination.language].locale}
            />))}
      </div>
    </td>
    <td><span className={cx("famfamfam-flags", master.city.country.countryCode)} />{ master.city.name }</td>
    <td>{`${master.author.first_name || null} ${master.author.last_name || null}`}</td>
    <td className="single-action-col">
      <Action key="item-action-remove" icon="pt-icon-remove" intent="pt-intent-danger" action={e => removeDestination(e, id)} tooltip="Remove Destination" />
    </td>
  </tr>
);

class Destinations extends Component {
  constructor(props) {
    super(props);

    this.state = {
      predicate: ["created_at", "updated_at"],
      order: [true, false],
      selected: undefined,
      search: "",
      removeWarning: false,
      removeWarningTranslation: false,
      trash: false,
    };
  }


  toggleTrashBin = () => {
    this.setState({ trash: !this.state.trash });
  }

  alertRemove = (e, id) => {
    e.stopPropagation();
    this.setState({
      removeWarning: true,
      deleteQueue: id,
    });
  }

  confirmRemove = async () => {
    await this.props.removeDestination(this.state.deleteQueue);
    this.setState({
      deleteQueue: undefined,
      removeWarning: false,
    });
  }

  alertRemoveTranslation = (e, id) => {
    e.stopPropagation();
    this.setState({
      removeWarningTranslation: true,
      deleteQueue: id,
    });
  }

  confirmRemoveTranslation = async () => {
    await this.props.removeDestinationTranslation(this.state.deleteQueue);

    this.setState({
      deleteQueue: undefined,
      removeWarningTranslation: false,
    });
  }

  addDestination = (e) => {
    e.preventDefault();
    history.push("/website/destinations/add");
  }

  editDestination= (e, id) => {
    e.stopPropagation();
    if (id) {
      return history.push(`/website/destinations/edit/${id}`);
    }
  }

  translateDestination = async (e, id, lang_id, duplicate = false) => {
    e.preventDefault();
    return history.push(`/website/destinations/add/${id}/${lang_id}?duplicate=${String(duplicate)}`);
  }

  changeSearch = (e) => {
    this.setState({
      search: e.target.value,
    });
  }

  searchFilter = (items) => {
    let search = this.state.search.toLowerCase();

    if (search.charAt(0) === ":") {
      search = search.substr(1);
      return items.filter(item => (Object.keys(item).map(key => _.includes(item.destination_id.toLowerCase(), search.toLowerCase()))).includes(true));
    }
    return items.filter(item => (Object.keys(item).map((key) => {
      if (key === "from_date" || key === "until_date") {
        const val = _.includes(moment(item[key]).format("ll").toString().toLowerCase(), search);
        return val;
      }

      switch (typeof item[key]) {
        case "string":
          if (key === "destination_id") { return false; }
          return _.includes(item[key].toLowerCase(), search);

        case "object":
          if (Array.isArray(item[key])) {
            return _.includes((item[key]).map(val => val.toLowerCase()), search);
          }
          return _.includes(_.valuesIn(item[key]).map(val => typeof val === "string" && val.toLowerCase()).join(","), search);
      }
    }))
      .includes(true));
  }

  orderBy = destinations => _.orderBy(destinations, this.state.predicate, this.state.order.map(order => ((order) ? "desc" : "asc")));


  select = (id) => {
    // e.preventDefault();
    if (this.state.selected !== id) {
      this.setState({ selected: id });
    }
  }

  closeSidebar = () => {
    this.setState({ selected: undefined });
  }

  closeRemoveWarning = () => {
    this.setState({
      removeWarning: false,
      removeWarningTranslation: false,
    });
  }

  render() {
    const {
      currentRoute, languages, languagesById, baseLang, destinationsArray, destinationsById,
    } = this.props;

    const filteredDestinations = this.searchFilter(destinationsArray); // set filter search
    const destinations = this.orderBy(filteredDestinations); // ser order
    const grouped = _.groupBy(destinations, destination => destination.destination_id);

    const breadcrumbs = <Breadcrumbs key="breadcrumb" route={currentRoute} />;

    const filters = [
      <Filter tooltip="Search here, use :<id> to filter by id only" key="filter-search" type="search" label="Search ..." search={this.changeSearch} />,
    ];

    const actions = [
      <Action key="action-add" icon="pt-icon-add" intent="pt-intent-primary" action={this.addDestination} label="Add Destination" />,
      // <Action key={`action-toggle-trashbin`} icon="pt-icon-trash" intent="pt-intent-none" action={this.toggleTrashBin} tooltip={'View Trash Bin'} />,
    ];


    return (
      <Page actions={actions} filters={filters} breadcrumbs={breadcrumbs}>
        <div className={s.destinations}>

          <Alert
            intent={Intent.DANGER}
            iconName="pt-icon-warning-sign"
            isOpen={this.state.removeWarning}
            confirmButtonText={"I'm sure!"}
            onConfirm={this.confirmRemove}
            cancelButtonText="Cancel"
            onCancel={this.closeRemoveWarning}
          >
            <span>This will erase the full destination record, including translations, are you sure?</span>
          </Alert>

          <Alert
            intent={Intent.DANGER}
            iconName="pt-icon-warning-sign"
            isOpen={this.state.removeWarningTranslation}
            confirmButtonText={"I'm sure!"}
            onConfirm={this.confirmRemoveTranslation}
            cancelButtonText="Cancel"
            onCancel={this.closeRemoveWarning}
          >
            <span>This will delete the selected translation, are you sure?</span>
          </Alert>

          <table className="pt-table pt-striped lj-table">
            <thead>
              <tr>
                <th className="preview-col" />
                <th className="id-col">ID</th>
                <th>Title</th>
                <th>City</th>
                <th>Author</th>
                <th className="single-action-col" />
              </tr>
            </thead>
            <tbody onScroll={this.onScrollToBottom}>

              { Object.keys(grouped).length ?
                Object.keys(grouped).map((key, index) => {
                  const group = grouped[key];
                  const master = _.find(group, function (i) {
                    return (i.language.locale === baseLang.locale);
                  }) || group[0];
                  return (
                    <GroupRow
                      id={key}
                      key={`destination-group-${key}`}
                      destinations={group}
                      languagesById={languagesById}
                      master={master}
                      select={this.select}
                      isActive={(this.state.selected === key)}
                      editDestination={this.editDestination}
                      removeDestination={this.alertRemove}
                      viewDestination={this.viewDestination}
                    />
                  );
                })
              : <NoResultsRow cols={6} />
              }

            </tbody>
          </table>
        </div>

        <Overlay isOpen={(this.state.selected)} transitionName="slide" inline onClose={this.closeSidebar}>

          <DestinationSidebar
            key="sidebar-event"
            groupId={this.state.selected}
            editDestination={this.editDestination}
            removeDestination={this.alertRemoveTranslation}
            viewDestination={this.viewDestination}
            translateDestination={this.translateDestination}
          />
        </Overlay>
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
  const defaultLocale = state.intl.locale;
  const languagesById = state.languages.byId;

  const locale = _.find(languagesById, { locale: defaultLocale });

  const allDestinations = state.destinations.ids.map(id => state.destinations.byId[id]) || [];
  const destinations = getVisibles(allDestinations, state.destinations.visibilityFilter);

  return {
    defaultLocale,
    baseLang: language.id,
    languagesById,
    languages: Object.values(state.languages.ids) || [],
    destinationsArray: destinations,
    destinationById: state.destinations.byId,
  };
};

export default connect(mapStateToProps, {
  setFilter, removeFilter, removeDestination, removeDestinationTranslation,
})(withStyles(s)(Destinations));
