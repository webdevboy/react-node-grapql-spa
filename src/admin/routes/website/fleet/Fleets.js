import React, { Component } from "react";
import Filter from "admin/components/Filter";
import Action from "admin/components/Action";
import Page from "admin/components/Page";
import StateTag from "admin/components/StateTag";
import NoResultsRow from "admin/components/NoResultsRow";
import PropTypes from "prop-types";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from "./Fleet.css";
import Breadcrumbs from "admin/components/Breadcrumbs";
import PostGroupDetail from "../posts/PostGroupDetail";
import history from "core/history";
import cx from "classnames";
import { connect } from "react-redux";
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
import moment from "moment/moment";
import _ from "lodash";
import { removePost, removePostTranslation } from "admin/actions/posts";
import getUrlFromPost from "utils/getUrlFromPost";
import { sortPostByLanguage } from "utils/sortPostByLanguage";

const GroupRow = ({
  id,
  aircrafts,
  master,
  select,
  isActive,
  viewAicraft,
  editAircraft,
  toggleFeatured,
  removeAircraft,
  defaultLanguage,
}) => {
  return (
    <tr onClick={() => select(id, aircrafts)} className={isActive ? "is-active" : null}>
      <td className="preview-col">
        <Action
          key="item-action-view"
          icon="pt-icon-eye-open"
          action={e => viewAicraft(e, master)}
          tooltip="View Aircraft"
        />
      </td>
      <td className="id-col">{id}</td>
      <td>
        <div>
          <a href="#">{master.title}</a>
        </div>
        <div>
          {sortPostByLanguage(aircrafts, defaultLanguage).map(aircraft => (
            <StateTag
              onClick={e => editAircraft(e, aircraft.id)}
              key={`tag-locale-${aircraft.language.id}`}
              value={aircraft.state}
              text={aircraft.language.locale}
            />
          ))}
        </div>
      </td>
      <td>{master.meta.order}</td>

      <td>{master.published_at ? moment(master.published_at).format("ll") : moment(master.created_at).format("ll")}</td>

      <td>
        <Action
          key="item-action-remove"
          icon={master.meta.featured ? "pt-icon-star" : "pt-icon-star-empty"}
          intent="pt-intent-primary"
          action={e => console.log("Toggle feature click")}
          tooltip="Toggle Featured state on Aircraft"
        />
      </td>

      {/* <td>{`${master.author.first_name || null} ${master.author.last_name || null}`}</td> */}
      <td className="single-action-col">
        <Action
          key="item-action-remove"
          icon="pt-icon-remove"
          intent="pt-intent-danger"
          action={e => removeAircraft(e, id)}
          tooltip="Remove Aircraft"
        />
      </td>
    </tr>
  );
};

class Fleets extends Component {
  static contextTypes = {
    client: PropTypes.object.isRequired,
    locale: PropTypes.string,
  };

  constructor(props) {
    super(props);

    this.state = {
      predicate: ["updated_at", "created_at", "publish_at"],
      order: [true, false, false],
      selected: undefined,
      search: "",
      removeWarning: false,
      removeWarningTranslation: false,
    };
  }

  alertRemoveAircraft = (e, id) => {
    e.stopPropagation();
    this.setState({
      removeWarning: true,
      deleteQueue: id,
    });
  };

  confirmRemoveAircraft = async () => {
    await this.props.removePost(this.state.deleteQueue);
    this.setState({
      deleteQueue: undefined,
      removeWarning: false,
    });
    this.props.refetch();
  };

  closeRemoveWarning = () => {
    this.setState({
      removeWarning: false,
      removeWarningTranslation: false,
    });
  };

  alertRemoveAircraftTranslation = (e, id) => {
    e.stopPropagation();
    this.setState({
      removeWarningTranslation: true,
      deleteQueue: id,
    });
  };

  confirmRemoveAircraftTranslation = async () => {
    await this.props.removePostTranslation(this.state.deleteQueue);
    this.setState({
      deleteQueue: undefined,
      removeWarningTranslation: false,
    });
    this.props.refetch();
  };

  addAircraft = e => {
    e.preventDefault();
    history.push("/website/aircrafts/add");
  };

  editAircraft = (e, id) => {
    e.stopPropagation();
    history.push(`/website/aircrafts/edit/${id}`);
  };

  select = (id, group) => {
    if (this.state.selected !== id) {
      this.setState({
        selected: id,
        postGroup: group,
      });
    }
  };

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
  };

  alertRemoveAircrafts = (e, ids) => {
    e.stopPropagation();
    this.setState({
      removeWarning: true,
      deleteQueue: ids || this.state.selected,
    });
  };

  confirmRemoveAircrafts = async () => {
    await this.props.removeAircrafts(this.state.deleteQueue);
    this.setState({
      selected: [],
      deleteQueue: undefined,
      removeWarning: false,
    });
  };

  filterBy = (field, value) => {
    if (value !== null) {
      this.props.setFilter({ filter: { field, value } });
      this.setState({ selected: [] });
    }
  };

  closeSidebar = () => {
    this.setState({ selected: undefined });
  };

  changeSearch = e => {
    this.setState({
      ...this.state,
      searchValue: e.target.value,
    });
  };

  translateAircraft = async (e, id, lang_id, duplicate = false) => {
    e.preventDefault();
    return history.push(`/website/aircrafts/add/${id}/${lang_id}?duplicate=${String(duplicate)}`);
  };

  searchFilter = items => {
    let search = this.state.search.toLowerCase();

    if (search.charAt(0) === ":") {
      search = search.substr(1);
      return items.filter(item =>
        Object.keys(item)
          .map(key => _.includes(item.id.toLowerCase(), search.toLowerCase()))
          .includes(true),
      );
    }
    return items.filter(item =>
      Object.keys(item)
        .map(key => {
          if (key === "published_at" || key === "created_at") {
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
              if (key === "aircraft_id") {
                return false;
              }
              return _.includes(item[key].toLowerCase(), search);

            case "object":
              if (Array.isArray(item[key])) {
                return _.includes(item[key].map(val => val.toLowerCase()), search);
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

  orderBy = aircrafts =>
    _.orderBy(aircrafts, this.state.predicate, this.state.order.map(order => (order ? "desc" : "asc")));

  viewAircraft = (e, aircraft) => {
    e.preventDefault();
    e.stopPropagation();
    const port = __DEV__ ? `:${window.App.port}` : "";
    const subDomain = __DEV__ ? "" : "www.";
    const basePath = `https://${subDomain}${window.App.hostname}${port}`;
    const aircraftUrl = basePath + getUrlFromPost(aircraft.language.locale, aircraft);
    window.open(`${aircraftUrl}`);
  };

  toggleFeatured = (e, id, featured) => {
    e.preventDefault();
    e.stopPropagation();
    //this.props.toggleFeatured(id, !featured);
  };

  getClassName (sort) {
    const { predicate, order } = this.state;

    let cn = "sort-by";
    predicate.map((pred, i) => {
      if(pred === sort) {
        if(order[i]) {
          cn += " sorted-up";
        } else {
          cn += " sorted-down";
        }
      }
    })

    return cn;
  }

  render() {
    const { currentRoute, defaultLanguage, aircraftsArray } = this.props;
    const { searchValue } = this.state;
    const loweredQuery = searchValue ? searchValue.toLowerCase() : "";
    const filteredAircrafts = aircraftsArray.filter(aircraft =>
      _.toLower(aircraft.post_id.concat(" ", aircraft.title)).includes(loweredQuery),
    );
    const aircrafts = this.orderBy(filteredAircrafts); // ser order
    const grouped = _.groupBy(aircrafts, aircraft => aircraft.post_id);

    const breadcrumbs = <Breadcrumbs key="breadcrumb" route={currentRoute} />;

    const filters = [
      <Filter
        tooltip="Search for title here"
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
        action={this.addAircraft}
        label="Create Aircraft"
      />,
      // <Action key={`action-edit`} icon="pt-icon-edit" intent="pt-intent-default" className={(this.state.selected.length !== 1) ? 'pt-disabled' : null} action={this.editUser} tooltip={'Edit User'} />,
    ];

    return (
      <Page actions={actions} filters={filters} breadcrumbs={breadcrumbs}>
        <Alert
          intent={Intent.DANGER}
          iconName="pt-icon-warning-sign"
          isOpen={this.state.removeWarning}
          confirmButtonText={"I'm sure!"}
          onConfirm={this.confirmRemoveAircraft}
          cancelButtonText="Cancel"
          onCancel={this.closeRemoveWarning}
        >
          <span>This will erase the full aircraft, including translations, are you sure?</span>
        </Alert>

        <Alert
          intent={Intent.DANGER}
          iconName="pt-icon-warning-sign"
          isOpen={this.state.removeWarningTranslation}
          confirmButtonText={"I'm sure!"}
          onConfirm={this.confirmRemoveAircraftTranslation}
          cancelButtonText="Cancel"
          onCancel={this.closeRemoveWarning}
        >
          <span>This will delete the selected translation, are you sure?</span>
        </Alert>

        <div className={s.aircrafts}>
          <table className="pt-table pt-striped lj-table">
            <thead>
              <tr>
                <th className="preview-col" />
                <th className="id-col" onClick={e => this.toggleSortBy(e, ["post_id"])}><span className={this.getClassName("post_id")}>ID</span></th>
                <th onClick={e => this.toggleSortBy(e, ["title"])}><span className={this.getClassName("title")}>Title</span></th>
                <th onClick={e => this.toggleSortBy(e, ["meta.order"])}><span className={this.getClassName("meta.order")}>Order</span></th>
                <th onClick={e => this.toggleSortBy(e, ["date"])}><span className={this.getClassName("date")}>Date</span></th>
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

                  return (
                    <GroupRow
                      id={key}
                      key={`aircraft-group-${key}`}
                      aircrafts={group}
                      master={master}
                      select={this.select}
                      isActive={this.state.selected === key}
                      editAircraft={this.editAircraft}
                      removePost={this.alertRemoveAircraft}
                      viewPost={this.viewAircraft}
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
          <PostGroupDetail
            key="sidebar-aircraft"
            groupId={this.state.selected}
            postGroup={this.state.postGroup}
            removePost={this.alertRemoveAircraftTranslation}
            viewPost={this.viewAircraft}
          />
        </Overlay>
      </Page>
    );
  }
}

const getVisibles = (items, filter) => {
  if (!filter) {
    return items;
  }

  if (Array.isArray(filter)) {
    filter.forEach(({ field, value }) => {
      items = items.filter(item => item[field] === value);
    });
  } else {
    return items.filter(item => item[filter.field] === filter.value);
  }

  return items;
};

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
})(withStyles(s)(Fleets));
