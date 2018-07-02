import React, { Component } from "react";
import Filter from "admin/components/Filter";
import Action from "admin/components/Action";
import Page from "admin/components/Page";
import Sidebar from "admin/components/Sidebar";
import StateTag from "admin/components/StateTag";
import Breadcrumbs from "admin/components/Breadcrumbs";
import NoResultsRow from "admin/components/NoResultsRow";
import PropTypes from "prop-types";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from "./Events.css";
import history from "core/history";
import cx from "classnames";
import { connect } from "react-redux";
import _ from "lodash";
import moment from "moment/moment";
import {
  Alert,
  Menu,
  Switch,
  ContextMenu,
  Tooltip,
  Overlay,
  MenuItem,
  MenuDivider,
  Popover,
  Intent,
  Toaster,
  PopoverInteractionKind,
  Position,
} from "@blueprintjs/core";
import { removePost, removePostTranslation } from "admin/actions/posts";
import EventSidebar from "./EventSidebar";
import { sortPostByLanguage } from "utils/sortPostByLanguage";

const GroupRow = ({
  id,
  events,
  master,
  city,
  select,
  isActive,
  editEvent,
  removeEvent,
  viewEvent,
  toggleFeatured,
  defaultLanguage,
}) => (
  <tr onClick={() => select(id, events)} className={isActive ? "is-active" : null}>
    <td className="preview-col">
      <Action
        key="item-action-view"
        icon="pt-icon-eye-open"
        action={e => viewEvent(e, master.id)}
        tooltip="View Event"
      />
    </td>
    <td className="id-col">{master.slug}</td>
    <td>
      <div>
        <a href="#">{master.title}</a>
      </div>
      <div>
        {sortPostByLanguage(events, defaultLanguage).map(event => (
          <StateTag
            onClick={e => editEvent(e, event.id)}
            key={`tag-locale-${event.language.id}`}
            value={event.state}
            selected={event.language.id === master.language.id}
            text={event.language.locale}
          />
        ))}
      </div>
    </td>
    <td>
      {city ? <span className={cx("famfamfam-flags", city.country.countryCode)} /> : null}
      {city ? city.name : null}
    </td>
    <td>{moment(master.meta.from_date).format("ll")}</td>
    <td>{moment(master.meta.to_date).format("ll")}</td>
    <td>
      <Action
        key="item-action-remove"
        icon={master.meta.featured ? "pt-icon-star" : "pt-icon-star-empty"}
        intent="pt-intent-primary"
        action={e => toggleFeatured(e, master)}
        tooltip="Toggle Featured state"
      />
    </td>
    <td className="single-action-col">
      <Action
        key="item-action-remove"
        icon="pt-icon-remove"
        intent="pt-intent-danger"
        action={e => removeEvent(e, id)}
        tooltip="Remove Event"
      />
    </td>
  </tr>
);

class Events extends Component {
  constructor(props) {
    super(props);

    this.state = {
      predicate: ["updated_at", "created_at"],
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
  };

  alertRemoveEvent = (e, id) => {
    e.stopPropagation();
    this.setState({
      removeWarning: true,
      deleteQueue: id,
    });
  };

  confirmRemoveEvent = async () => {
    await this.props.removePost(this.state.deleteQueue);
    this.setState({
      deleteQueue: undefined,
      removeWarning: false,
    });
    this.props.refetch();
  };

  alertRemoveEventTranslation = (e, id) => {
    e.stopPropagation();
    this.setState({
      removeWarningTranslation: true,
      deleteQueue: id,
    });
  };

  confirmRemoveEventTranslation = async () => {
    await this.props.removePostTranslation(this.state.deleteQueue);

    this.setState({
      deleteQueue: undefined,
      removeWarningTranslation: false,
    });
    this.props.refetch();
  };

  addEvent = e => {
    e.preventDefault();
    history.push("/website/events/add");
  };

  editEvent = (e, id) => {
    e.stopPropagation();
    if (id) {
      return history.push(`/website/events/edit/${id}`);
    }
  };

  translateEvent = async (e, id, lang_id, duplicate = false) => {
    e.preventDefault();
    return history.push(`/website/events/edit/${id}/${lang_id}?duplicate=${String(duplicate)}`);
  };

  filterBy = (field, value) => {
    if (value !== null) {
      this.props.setFilter({ filter: { field, value } });
      this.setState({ selected: [] });
    }
  };

  changeSearch = e => {
    this.setState({
      search: e.target.value,
    });
  };

  searchFilter = items => {
    let search = this.state.search.toLowerCase();

    if (search.charAt(0) === ":") {
      search = search.substr(1);
      return items.filter(item =>
        Object.keys(item)
          .map(key => _.includes(item.event_id.toLowerCase(), search.toLowerCase()))
          .includes(true),
      );
    }
    return items.filter(item =>
      Object.keys(item)
        .map(key => {
          if (key === "from_date" || key === "until_date") {
            const val = _.includes(
              moment(item[key])
                .format("ll")
                .toString()
                .toLowerCase(),
              search,
            );
            return val;
          }

          switch (typeof item[key]) {
            case "string":
              if (key === "event_id") {
                return false;
              }
              return _.includes(item[key].toLowerCase(), search);

            case "object":
              if (Array.isArray(item[key])) {
                return _.includes(item[key].map(val => typeof val === "string" && val.toLowerCase()), search);
              }
              return _.includes(
                _.valuesIn(item[key])
                  .map(val => typeof val === "string" && val.toLowerCase())
                  .join(","),
                search,
              );
          }
        })
        .includes(true),
    );
  };

  orderBy = events => _.orderBy(events, this.state.predicate, this.state.order.map(order => (order ? "desc" : "asc")));

  select = (id, group) => {
    if (this.state.selected !== id) {
      this.setState({
        selected: id,
        postGroup: group,
      });
    }
  };

  closeSidebar = () => {
    this.setState({ selected: undefined });
  };

  closeRemoveWarning = () => {
    this.setState({
      removeWarning: false,
      removeWarningTranslation: false,
    });
  };

  translatePost = (e, post, langId, flag) => {
    e.stopPropagation();
    if (flag) {
      return history.push(`/website/events/edit/${post.id}/duplicate/${langId}`);
    }
    return history.push(`/website/events/edit/${post.id}/translate/${langId}`);
  };

  mergeCitiesAndCountries(cities, countries) {
    const citiesArray = [];
    const citiesName = [];
    const defaultCountry = {
      name: "Unknown",
      countryCode: "FR",
    };

    cities.map(city => {
      citiesName.push(city.name);
      const cityArray = {};
      let cityCountry = defaultCountry;
      cityArray["sfid"] = city.sfid;
      cityArray["name"] = city.name;
      cityArray["country_code"] = city.country_code;

      for (let i = 0; i < countries.length; i++) {
        if (countries[i].sfid === city.country_code) {
          cityCountry = countries[i];
          break;
        }
      }

      cityArray["country"] = cityCountry;
      citiesArray.push(cityArray);
    });
    return citiesArray;
  }

  toggleFeatured = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    //this.props.toggleFeatured(id, !featured);
  };

  render() {
    const { citiesArray, countriesArray, currentRoute, defaultLanguage, eventsArray } = this.props;
    const { search } = this.state;
    const loweredQuery = search ? search.toLowerCase() : "";
    const mergedCitiesArray = this.mergeCitiesAndCountries(citiesArray, countriesArray);
    const filteredEvents = eventsArray.filter(event => {
      const city =
        event.meta.city_sfid &&
        mergedCitiesArray &&
        mergedCitiesArray.find(city => {
          return city.sfid === event.meta.city_sfid;
        });
      const cityName = city ? city.name : "";
      return _.toLower(event.post_id.concat(" ", event.slug, " ", event.title, " ", cityName)).includes(loweredQuery);
    });
    const events = this.orderBy(filteredEvents); // ser order
    const grouped = _.groupBy(events, event => event.post_id);

    const breadcrumbs = <Breadcrumbs key="breadcrumb" route={currentRoute} />;

    const filters = [
      <Filter
        tooltip="Search here, use :<id> to filter by id only"
        key="filter-search"
        type="search"
        label="Search ..."
        search={this.changeSearch}
      />,
    ];

    const actions = [
      <Action
        key="action-add"
        icon="pt-icon-add"
        intent="pt-intent-primary"
        action={this.addEvent}
        label="Add Event"
      />,
      // <Action key={`action-toggle-trashbin`} icon="pt-icon-trash" intent="pt-intent-none" action={this.toggleTrashBin} tooltip={'View Trash Bin'} />,
    ];

    return (
      <Page actions={actions} filters={filters} breadcrumbs={breadcrumbs}>
        <div className={s.events}>
          <Alert
            intent={Intent.DANGER}
            iconName="pt-icon-warning-sign"
            isOpen={this.state.removeWarning}
            confirmButtonText={"I'm sure!"}
            onConfirm={this.confirmRemoveEvent}
            cancelButtonText="Cancel"
            onCancel={this.closeRemoveWarning}
          >
            <span>This will erase the full event, including translations, are you sure?</span>
          </Alert>

          <Alert
            intent={Intent.DANGER}
            iconName="pt-icon-warning-sign"
            isOpen={this.state.removeWarningTranslation}
            confirmButtonText={"I'm sure!"}
            onConfirm={this.confirmRemoveEventTranslation}
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
                <th>From</th>
                <th>Until</th>
                <th>Featured</th>
                <th className="single-action-col" />
              </tr>
            </thead>
            <tbody onScroll={this.onScrollToBottom}>
              {Object.keys(grouped).length ? (
                Object.keys(grouped).map((key, index) => {
                  const group = grouped[key];
                  const master = _.find(group, function (i) {
                    return (i.language.locale === defaultLanguage.locale);
                  }) || group[0];
                  let eventCity = false;
                  if (master.meta.city_sfid) {
                    mergedCitiesArray &&
                      mergedCitiesArray.map(city => {
                        if (city.sfid === master.meta.city_sfid) {
                          eventCity = city;
                        }
                      });
                  }

                  return (
                    <GroupRow
                      id={key}
                      key={`event-group-${key}`}
                      events={group}
                      group={group}
                      master={master}
                      city={eventCity}
                      select={this.select}
                      isActive={this.state.selected === key}
                      editEvent={this.editEvent}
                      removeEvent={this.alertRemoveEvent}
                      viewEvent={this.viewEvent}
                      toggleFeatured={this.toggleFeatured}
                      defaultLanguage={defaultLanguage}
                    />
                  );
                })
              ) : (
                <NoResultsRow cols={8} />
              )}
            </tbody>
          </table>
        </div>

        <Overlay isOpen={this.state.selected} transitionName="slide" inline onClose={this.closeSidebar}>
          <EventSidebar
            key="sidebar-event"
            postGroup={this.state.postGroup}
            editEvent={this.editEvent}
            removeEvent={this.alertRemoveEventTranslation}
            viewEvent={this.viewEvent}
            translateEvent={this.translateEvent}
            editCity={this.props.editCity}
            editDate={this.props.editDate}
            citiesArray={mergedCitiesArray}
          />
        </Overlay>
      </Page>
    );
  }
}

const mapStateToProps = (state) => {
  const { availableLocales, defaultLocale } = state.runtime;
  const defaultLanguage = availableLocales[defaultLocale];
  return {
    defaultLanguage,
  };
};

export default connect(mapStateToProps, {
  removePost,
  removePostTranslation,
})(withStyles(s)(Events));
