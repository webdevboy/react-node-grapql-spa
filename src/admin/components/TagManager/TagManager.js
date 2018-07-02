import React, { Component } from "react";
import { Query } from "react-apollo";
import Filter from "admin/components/Filter";
import Action from "admin/components/Action";
import Page from "admin/components/Page";
import StateTag from "admin/components/StateTag";
import NoResultsRow from "admin/components/NoResultsRow";
import PropTypes from "prop-types";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from "./TagManager.css";
import Breadcrumbs from "admin/components/Breadcrumbs";
import TooltipLabel from "admin/components/TooltipLabel";
import history from "core/history";
import cx from "classnames";
import { connect } from "react-redux";
import {
  Alert,
  Button,
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
  Position
} from "@blueprintjs/core";
import moment from "moment/moment";
import _ from "lodash";
import { fetchTermTaxonomy, addTermTaxonomy, removeTermTaxonomy } from "admin/actions/termTaxonomy";
import LoadingSpinner from "admin/components/LoadingSpinner";
import TagDetailBar from "./TagDetailBar";
import QUERY_GET_TERM_TAXONOMY from "./fetchTermTaxonomies.graphql";

const GroupRow = ({ id, tag, select, isActive, removeTag }) => {
  return (
    <tr onClick={() => select(id, tag)} className={isActive ? "is-active" : null}>
      <td>
        {tag.term.name}
      </td>
      <td className="single-action-col">
          <Action
            key="item-action-remove"
            icon="pt-icon-remove"
            intent="pt-intent-danger"
            action={e => removeTag(e, id)}
            tooltip="Remove Tag"
          />
      </td>
    </tr>
  );
};

class TagManager extends Component {
  static contextTypes = {
    client: PropTypes.object.isRequired,
    locale: PropTypes.string
  };

  constructor(props) {
    super(props);

    this.state = {
      predicate: ["updated_at", "created_at", "publish_at"],
      order: [true, false, false],
      selected: undefined,
      search: "",
      removeWarning: false,
      isAdding: false,
      tag: {
        taxonomy: this.props.type,
        name: "",
        language_id: this.props.defaultLanguage.id,
        parent_id: ""
      }
    };
  }

  alertRemoveTag = (e, id) => {
    e.stopPropagation();
    this.setState({
      removeWarning: true,
      deleteQueue: id
    });
  };

  confirmRemoveTag = async () => {
    await this.props.removeTermTaxonomy({ id: this.state.deleteQueue });
    this.setState({
      deleteQueue: undefined,
      removeWarning: false
    });
  };

  closeRemoveWarning = () => {
    this.setState({
      removeWarning: false,
      removeWarningTranslation: false
    });
  };

  addTag = e => {
    e.preventDefault();
    this.setState({ isAdding: true });
    //history.push("/website/aircrafts/add");
  };

  select = (id, tag) => {
    if (this.state.selected !== id) {
      this.setState({
        selected: id,
        tag: tag
      });
    }
  };

  toggleSortBy = (e, predicate) => {
    e.preventDefault();

    if (this.state.predicate.every((pred, i) => pred === predicate[i])) {
      this.setState({
        order: predicate.map((predicate, index) => !this.state.order[index] || false)
      });
    } else {
      this.setState({
        predicate,
        order: predicate.map((predicate, index) => this.state.order[index] || false)
      });
    }
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
      searchValue: e.target.value
    });
  };

  searchFilter = items => {
    let search = this.state.search.toLowerCase();

    if (search.charAt(0) === ":") {
      search = search.substr(1);
      return items.filter(item =>
        Object.keys(item)
          .map(key => _.includes(item.id.toLowerCase(), search.toLowerCase()))
          .includes(true)
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
              search
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
                search
              );
          }
        })
        .includes(true)
    );
  };

  orderBy = aircrafts =>
    _.orderBy(aircrafts, this.state.predicate, this.state.order.map(order => (order ? "desc" : "asc")));

  handleChangeName = e => {
    this.setState({
      tag: {
        ...this.state.tag,
        name: e.target.value
      }
    });
  };

  saveTag = async () => {
    const data = await this.props.addTermTaxonomy(this.state.tag);
    this.setState({
      isAdding: false,
      tag: {
        taxonomy: this.props.type,
        name: "",
        language_id: this.props.defaultLanguage.id,
        parent_id: ""
      }
    });
  };

  cancelAdd = () => {
    this.setState({ isAdding: false });
  };

  render() {
    const { currentRoute, languages, defaultLanguage, type } = this.props;
    const { searchValue, isAdding, tag } = this.state;
    
    const breadcrumbs = <Breadcrumbs key="breadcrumb" route={currentRoute} />;

    const filters = [
      <Filter
        tooltip="Search for title here"
        key="filter-search"
        type="search"
        label="Search ..."
        search={this.changeSearch}
      />
    ];

    const actions = [
      <Action
        key="action-add"
        icon="pt-icon-add"
        intent="pt-intent-primary"
        action={this.addTag}
        label="Create Tag"
      />
    ];

    return (
      <Query query={QUERY_GET_TERM_TAXONOMY} variables={{ taxonomy: type }} fetchPolicy="cache-and-network">
        {({ loading, data, refetch, error }) => {
          if (loading) return <LoadingSpinner />;
          if (error) return error.message;
          const loweredQuery = searchValue ? searchValue.toLowerCase() : "";
          const tags = data.taxonomies.filter(tax => _.toLower(tax.term.name).includes(loweredQuery));

          return (
            <Page actions={actions} filters={filters} breadcrumbs={breadcrumbs}>
              <Alert
                intent={Intent.DANGER}
                iconName="pt-icon-warning-sign"
                isOpen={this.state.removeWarning}
                confirmButtonText={"I'm sure!"}
                onConfirm={async () => {
                  await this.confirmRemoveTag();
                  refetch();
                }}
                cancelButtonText="Cancel"
                onCancel={this.closeRemoveWarning}
              >
                <span>This will erase the tag, are you sure?</span>
              </Alert>

              {isAdding && (
                <div className="pt-form-group">
                  <label className="pt-label" htmlFor="name">
                    <TooltipLabel
                      label="Name"
                      required
                      tooltip="Tag name, Maximum length of 20 Characters"
                    />
                    <input
                      maxLength={20}
                      type="text"
                      name="name"
                      className="pt-input pt-large pt-fill pt-bold"
                      id="name"
                      value={tag.name}
                      onChange={this.handleChangeName}
                      placeholder="Name"
                    />
                  </label>
                  <Button
                    className={cx("pt-button pt-minimal")}
                    onClick={async () => {
                      await this.saveTag();
                      refetch();
                    }}
                  >
                    Save
                  </Button>
                  <Button className={cx("pt-button pt-minimal")} onClick={this.cancelAdd}>
                    Cancel
                  </Button>
                </div>
              )}
              <div className={s.tags}>
                <table className="pt-table pt-striped lj-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th className="single-action-col" />
                    </tr>
                  </thead>
                  <tbody onScroll={this.onScrollToBottom}>
                    {tags.length ? (
                      tags.map((tag, index) => {

                        return (
                          <GroupRow
                            id={tag.term.id}
                            key={`tag-group-${tag.id}`}
                            tag={tag}
                            select={this.select}
                            isActive={this.state.selected === tag.term.id}
                            removeTag={this.alertRemoveTag}
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
                <TagDetailBar
                  key="sidebar-tag"
                  tag={tags.find(tag => {return tag.term.id === this.state.selected})}
                  refreshAndClose={() => {
                    this.closeSidebar();
                    refetch();
                  }}
                />
              </Overlay>
            </Page>
          );
        }}
      </Query>
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

const mapStateToProps = (state, ownProps) => {
  const availableLocales = state.runtime.availableLocales;
  const languages = _.keyBy(Object.values(availableLocales), "id");
  const defaultLanguage = availableLocales[state.runtime.defaultLocale];
  return {
    languages,
    defaultLanguage
  };
};

export default connect(mapStateToProps, {
  addTermTaxonomy,
  removeTermTaxonomy
})(withStyles(s)(TagManager));
