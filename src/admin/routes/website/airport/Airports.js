import React, { Component } from "react";
import Filter from "admin/components/Filter";
import Action from "admin/components/Action";
import Page from "admin/components/Page";
import NoResultsRow from "admin/components/NoResultsRow";
import PropTypes from "prop-types";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from "./Airport.css";
import Breadcrumbs from "admin/components/Breadcrumbs";
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
import _ from "lodash";
import { removePost, removePostTranslation } from "admin/actions/posts";
import GroupRow from "./GroupRow";
import PostGroupDetail from "../posts/PostGroupDetail";

class Fleets extends Component {
  static contextTypes = { client: PropTypes.object.isRequired };

  constructor(props) {
    super(props);

    this.state = {
      predicate: ["updated_at", "created_at", "publish_at"],
      order: {},
      selected: undefined,
      search: "",
      removeWarning: false,
      removeWarningTranslation: false,
    };
  }

  closeRemoveWarning = () => {
    this.setState({
      removeWarning: false,
      removeWarningTranslation: false,
    });
  };

  alertRemoveAirportTranslation = (e, id) => {
    e.stopPropagation();
    this.setState({
      removeWarningTranslation: true,
      deleteQueue: id,
    });
  };

  confirmRemoveAirportTranslation = async () => {
    const { deleteQueue, postGroup } = this.state;
    const newPostGroup = postGroup.filter(p =>
      Array.isArray(deleteQueue) ? deleteQueue.indexOf(p.id) === -1 : p.id !== deleteQueue);

    await this.props.removePostTranslation(deleteQueue);
    this.setState({
      deleteQueue: undefined,
      removeWarningTranslation: false,
      postGroup: newPostGroup
    });

    if (!newPostGroup.length) this.closeSidebar();
  };

  addAirport = e => {
    e.preventDefault();
    history.push("/website/airports/add");
  };

  editAirport = (e, id) => {
    e.stopPropagation();
    history.push(`/website/airports/edit/${id}`);
  };

  select = (id, group) => {
    if (this.state.selected !== id) {
      this.setState({
        selected: id,
        postGroup: group,
      });
    }
  };

  toggleSortBy = (e, field) => {
    e.preventDefault();

    this.setState(prevState => ({
      order: {
        [field]: !prevState.order[field],
      },
    }));
  };

  alertRemoveAirport = (e, ids) => {
    e.stopPropagation();
    this.setState({
      removeWarning: true,
      deleteQueue: ids || this.state.selected,
    });
  };

  confirmRemoveAirport = async () => {
    const { deleteQueue, postGroup } = this.state;
    const newPostGroup = postGroup.filter(p =>
      Array.isArray(deleteQueue) ? deleteQueue.indexOf(p.id) === -1 : p.id !== deleteQueue);

    await this.props.removePost(deleteQueue);
    this.setState({
      deleteQueue: undefined,
      removeWarning: false,
      postGroup: newPostGroup
    });

    if (!newPostGroup.length) this.closeSidebar();
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
      search: e.target.value,
    });
  };

  translateAirport = async (e, id, lang_id, duplicate = false) => {
    e.preventDefault();
    return history.push(`/website/airports/add/${id}/${lang_id}?duplicate=${String(duplicate)}`);
  };

  orderBy = airports => {
    const predicate = _.uniq([..._.keys(this.state.order), "updated_at", "created_at", "publish_at"]);
    const order = predicate.map(field => (this.state.order[field] ? "asc" : "desc"));

    console.log(predicate, order);

    return _.orderBy(airports, predicate, order);
  };

  toggleFeatured = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  render() {
    const { currentRoute, baseLang, languagesById, airports } = this.props;

    const ordered = this.orderBy(airports); // ser order
    const grouped = _.groupBy(ordered, "post_id");

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
        action={this.addAirport}
        label="Create Airport"
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
          onConfirm={this.confirmRemoveAirport}
          cancelButtonText="Cancel"
          onCancel={this.closeRemoveWarning}
        >
          <span>This will erase the full airport, including translations, are you sure?</span>
        </Alert>

        <Alert
          intent={Intent.DANGER}
          iconName="pt-icon-warning-sign"
          isOpen={this.state.removeWarningTranslation}
          confirmButtonText={"I'm sure!"}
          onConfirm={this.confirmRemoveAirportTranslation}
          cancelButtonText="Cancel"
          onCancel={this.closeRemoveWarning}
        >
          <span>This will delete the selected translation, are you sure?</span>
        </Alert>

        <div className={s.airports}>
          <table className="pt-table pt-striped lj-table">
            <thead>
              <tr>
                <th className="preview-col" />
                <th onClick={e => this.toggleSortBy(e, "post_id")} className="id-col">
                  ID
                </th>
                <th onClick={e => this.toggleSortBy(e, "title")}>Title</th>
                <th onClick={e => this.toggleSortBy(e, "iata")}>IATA</th>
                <th onClick={e => this.toggleSortBy(e, "icao")}>ICAO</th>
                <th onClick={e => this.toggleSortBy(e, "city")}>City</th>
                <th onClick={e => this.toggleSortBy(e, "publish_at")}>Published At</th>
                <th className="single-action-col" />
              </tr>
            </thead>
            <tbody onScroll={this.onScrollToBottom}>
              {Object.keys(grouped).length ? (
                Object.keys(grouped).map((key, index) => {
                  const group = grouped[key];
                  const master = _.find(group, function (i) {
                    return (i.language.locale === baseLang.locale);
                  }) || group[0];

                  return (
                    <GroupRow
                      id={key}
                      key={`airport-group-${key}`}
                      airports={group}
                      languagesById={languagesById}
                      master={master}
                      baseLang={baseLang}
                      select={this.select}
                      isActive={this.state.selected === key}
                      editAirport={this.editAirport}
                      removeAirport={this.alertRemoveAirport}
                      toggleFeatured={this.toggleFeatured}
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
            key="sidebar-article"
            postGroup={this.state.postGroup}
            removePost={this.alertRemoveAirportTranslation}
          />
        </Overlay>
      </Page>
    );
  }
}

const mapStateToProps = (state) => {
  const { availableLocales, defaultLocale } = state.runtime;
  const defaultLanguage = availableLocales[defaultLocale];
  const filtered = Object.values(state.posts.byId).filter(post => post.type === "airport");
  const sfAirports = state.airports.list;
  const airports = filtered.map(post => {
    let sfAirport = _.find(sfAirports, { sfid: post.meta.airport_sfid });
    if (!sfAirport) {
      sfAirport = { city: {} };
    }

    return {
      ...post,
      ...sfAirport,
    };
  });

  return {
    baseLang: defaultLanguage,
    airports,
  };
};

export default connect(mapStateToProps, {
  removePost,
  removePostTranslation,
})(withStyles(s)(Fleets));
