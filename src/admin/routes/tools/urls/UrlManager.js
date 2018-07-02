import React, { Component } from "react";
import cx from "classnames";
import PropTypes from "prop-types";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import { connect } from "react-redux";
import moment from "moment/moment";
import _ from "lodash";
import Filter from "../../../components/Filter";
import Action from "../../../components/Action";
import Page from "../../../components/Page";
import NoResultsRow from "../../../components/NoResultsRow";
import s from "./UrlManager.css";
import Breadcrumbs from "../../../components/Breadcrumbs";
import history from "../../../../core/history";
import { Alert, Menu, Switch, ContextMenu, Tooltip, Overlay, MenuItem, MenuDivider, Popover, Intent, Toaster, PopoverInteractionKind, Position } from "@blueprintjs/core";
import RedirectionSidebar from "./RedirectionSidebar";
import { removeRedirection } from '../../../actions/redirections';

const RedirectionRow = ({
  redirection, removeRedirection, select, isActive,
}) => {
  return (
    <tr onClick={() => select(redirection.id)} className={(isActive) ? "is-active" : null}>
      <td>
        <ul style={{ listStyle: 'none', padding: '0', margin: '0' }}>
          { redirection.link.map(redirect => <li><span className="pt-tag pt-minimal">{redirect}</span></li>) }
        </ul>
      </td>
      <td><span className="pt-tag pt-minimal">{redirection.redirect}</span></td>
      <td><span className="pt-tag pt-minimal">{redirection.http_code}</span></td>
      <td>{redirection.description}</td>
      <td className="single-action-col">
        <Action key="item-action-remove" icon="pt-icon-remove" intent="pt-intent-danger" action={e => removeRedirection(e, redirection.id)} tooltip="Remove Redirection" />
      </td>
    </tr>
  );
};

class UrlManager extends Component {
  static contextTypes = { client: PropTypes.object.isRequired };

  constructor(props) {
    super(props);

    this.state = {
      predicate: ["from"],
      order: [true],
      selected: undefined,
      search: "",
      removeWarning: false,
      newRedirection: false,
    };
  }

  alertRemove = (e, id) => {
    e.stopPropagation();
    this.setState({
      removeWarning: true,
      deleteQueue: id,
    });
  }

  confirmRemove = async () => {
    await this.props.removeRedirection(this.state.deleteQueue);
    this.setState({
      deleteQueue: undefined,
      removeWarning: false,
    });
  }

  closeRemoveWarning = () => {
    this.setState({
      removeWarning: false,
    });
  }

  addRedirection = (e) => {
    e.preventDefault();
    this.setState({
      newRedirection: true,
    });
  }

  select = (id) => {
    // e.preventDefault();
    if (this.state.selected !== id) {
      this.setState({ selected: id });
    } else {
      this.setState({ selected: undefined });
    }
  }

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

  filterBy = (field, value) => {
    if (value !== null) {
      this.props.setFilter({ filter: { field, value } });
      this.setState({ selected: [] });
    }
  }

  closeSidebar = () => {
    this.setState({
      selected: undefined,
      newRedirection: false,
    });
  }

  changeSearch = (e) => {
    this.setState({
      search: e.target.value,
    });
  }

  searchFilter = (items) => {
    let search = this.state.search.toLowerCase();

    return items.filter(item => (Object.keys(item).map((key) => {
      if (key === "published_at" || key === "created_at") {
        const val = _.includes(moment(item[key]).format("ll").toString().toLowerCase(), search);
        return val;
      }

      if (typeof item[key] === 'string') {
        if (key === "id") { return false; }
        return _.includes(item[key].toLowerCase(), search);
      }

      if (typeof item[key] === 'object') {
        // if (Array.isArray(item[key])) {
        //   console.log(item[key]);
        //   console.log(_.includes((item[key]).map(val => val.toLowerCase()), search));
        //   return _.includes((item[key]).map(val => val.toLowerCase()), search)
        // }
        return _.includes(_.valuesIn(item[key]).map(val => typeof val === "string" && val.toLowerCase()).join(","), search);
      }
    })).includes(true));

  }

  orderBy = redirections => _.orderBy(redirections, this.state.predicate, this.state.order.map(order => ((order) ? "desc" : "asc")));

  render() {
    const { currentRoute, redirectionsById, redirectionsArray } = this.props;
    const { newRedirection, selected } = this.state;
    const filteredRedirections = this.searchFilter(redirectionsArray); // set filter search
    // const articles = this.orderBy(filteredArticles); // ser order
    // const grouped = _.groupBy(articles, article => article.article_id);


    //console.log(filteredRedirections);
    const breadcrumbs = <Breadcrumbs key="breadcrumb" route={currentRoute} />;

    const filters = [
      <Filter tooltip="Search here" key="filter-search" type="search" label="Search ..." search={this.changeSearch} />,
      // <Action key={`action-toggle-trashbin`} icon="pt-icon-trash" intent="pt-intent-none" action={this.toggleTrashBin} tooltip={'View Trash Bin'} />,
    ];

    const actions = [
      <Action key="action-add" icon="pt-icon-add" intent="pt-intent-primary" action={this.addRedirection} label="New Redirection" />,
      // <Action key={`action-edit`} icon="pt-icon-edit" intent="pt-intent-default" className={(this.state.selected.length !== 1) ? 'pt-disabled' : null} action={this.editUser} tooltip={'Edit User'} />,
    ];

    return (
      <Page actions={actions} filters={filters} breadcrumbs={breadcrumbs}>
        <Alert
          intent={Intent.DANGER}
          iconName="pt-icon-warning-sign"
          isOpen={this.state.removeWarning}
          confirmButtonText={"I'm sure!"}
          onConfirm={this.confirmRemove}
          cancelButtonText="Cancel"
          onCancel={this.closeRemoveWarning}
        >
          <span>This will delete the redirection, are you sure?</span>
        </Alert>

        <div className={s.urls}>
          <table className="pt-table pt-striped lj-table">
            <thead>
              <tr>
                <th onClick={e => this.toggleSortBy(e, ["from"])}>From</th>
                <th onClick={e => this.toggleSortBy(e, ["to"])}>To</th>
                <th >HTTP Code</th>
                <th onClick={e => this.toggleSortBy(e, ["description"])}>Description</th>
                <th className="single-action-col" />
              </tr>
            </thead>
            <tbody onScroll={this.onScrollToBottom}>
              {
                (filteredRedirections.length) ?
                filteredRedirections.map(redirection => {
                    return (
                      <RedirectionRow
                        key={`url-redirection-${redirection.id}`}
                        redirection={redirection}
                        select={this.select}
                        isActive={(selected === redirection.id)}
                      />
                    );
                  })
                : <NoResultsRow cols={5} />
              }
            </tbody>
          </table>
        </div>

        <Overlay isOpen={(selected || newRedirection)} transitionName="slide" inline onClose={this.closeSidebar}>
          <RedirectionSidebar
            key="sidebar-redirection"
            add={newRedirection}
            redirection={(newRedirection) ? null : redirectionsById[selected]}
            editRedirection={this.editRedirection}
            removeRedirection={this.alertRemove}
            closeSidebar={this.closeSidebar}
          />
        </Overlay>

      </Page>
    );
  }
}

const mapStateToProps = (state) => {
  const redirectionsById = state.redirections.byId;
  const redirectionsArray = state.redirections.ids.map(id => redirectionsById[id]);

  return {
    redirectionsById,
    redirectionsArray,
    isLoading: state.redirections.isLoading,
  };
};

const mapDispatchToProps = {
  removeRedirection,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(UrlManager));
