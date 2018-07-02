import React, { Component } from "react";
import { Query } from "react-apollo";
import Filter from "admin/components/Filter";
import Action from "admin/components/Action";
import Page from "admin/components/Page";
import StateTag from "admin/components/StateTag";
import NoResultsRow from "admin/components/NoResultsRow";
import PropTypes from "prop-types";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from "./CategoryManager.css";
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
import CategoryDetailBar from "./CategoryDetailBar";
import QUERY_GET_TERM_TAXONOMY from "./fetchTermTaxonomies.graphql";

const GroupRow = ({ name, categories, master, parent, select, isActive, editCategory, removeCategory }) => {
  return (
    <tr onClick={() => select(name, categories)} className={isActive ? "is-active" : null}>
      <td>
        {master.parent ? "---- " : ""}
        {name}
      </td>
      <td>
        <div>
          {categories.map(category => (
            <StateTag
              key={`tag-locale-${category.term.language.id}`}
              value={"published"}
              text={category.term.language.language}
            />
          ))}
        </div>
      </td>
      <td>{master.parent ? master.parent.name : ""}</td>

      <td className="single-action-col">
        {master.parent && (
          <Action
            key="item-action-remove"
            icon="pt-icon-remove"
            intent="pt-intent-danger"
            action={e => removeCategory(e, name)}
            tooltip="Remove Category"
          />
        )}
      </td>
    </tr>
  );
};

class CategoryManager extends Component {
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
      removeWarningTranslation: false,
      isAdding: false,
      cat: {
        taxonomy: this.props.type,
        name: "",
        meta: { displayName: "" },
        language_id: this.props.defaultLanguage.id,
        parent_id: ""
      }
    };
  }

  alertRemoveCategory = (e, name) => {
    e.stopPropagation();
    this.setState({
      removeWarning: true,
      deleteQueue: name
    });
  };

  confirmRemoveCategory = async () => {
    await this.props.removeTermTaxonomy({ name: this.state.deleteQueue });
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

  alertRemoveCategoryTranslation = (e, id) => {
    e.stopPropagation();
    this.setState({
      removeWarningTranslation: true,
      deleteQueue: id
    });
  };

  confirmRemoveCategoryTranslation = async () => {
    await this.props.removeTermTaxonomy({ id: this.state.deleteQueue });
    this.setState({
      deleteQueue: undefined,
      removeWarningTranslation: false
    });
  };

  addCategory = e => {
    e.preventDefault();
    this.setState({ isAdding: true });
    //history.push("/website/aircrafts/add");
  };

  editCategory = (e, id) => {
    e.stopPropagation();
    //history.push(`/website/aircrafts/edit/${id}`);
  };

  select = (id, group) => {
    if (this.state.selected !== id) {
      this.setState({
        selected: id,
        categoryGroup: group
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

  translateAircraft = async (e, id, lang_id, duplicate = false) => {
    e.preventDefault();
    //return history.push(`/website/aircrafts/add/${id}/${lang_id}?duplicate=${String(duplicate)}`);
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
      cat: {
        ...this.state.cat,
        name: e.target.value
      }
    });
  };

  handleChangeParent = e => {
    this.setState({
      cat: {
        ...this.state.cat,
        parent_id: e.target.value
      }
    });
  };

  handleChangeDisplayName = e => {
    this.setState({
      cat: {
        ...this.state.cat,
        meta: { displayName: e.target.value }
      }
    });
  };

  saveCategory = async () => {
    const data = await this.props.addTermTaxonomy(this.state.cat);
    this.setState({
      isAdding: false,
      cat: {
        taxonomy: this.props.type,
        name: "",
        meta: { displayName: "" },
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
    const { searchValue, isAdding, cat } = this.state;

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
        action={this.addCategory}
        label="Create Category"
      />
    ];

    return (
      <Query query={QUERY_GET_TERM_TAXONOMY} variables={{ taxonomy: type }} fetchPolicy="cache-and-network">
        {({ loading, data, refetch, error }) => {
          if (loading) return <LoadingSpinner />;
          if (error) return error.message;
		  const loweredQuery = searchValue ? searchValue.toLowerCase() : "";
          const originalTax = data.taxonomies.filter(tax => _.toLower(tax.term.name).includes(loweredQuery));
          const parentTax = originalTax.filter(tax => !tax.parent && tax.term.language.id === defaultLanguage.id);
          const allParentTax = originalTax.filter(tax => !tax.parent);
          const groupedParent = _.groupBy(allParentTax, tax => tax.term.name);
		  const originalChildTax = originalTax.filter(tax => tax.parent );
		  let restChildTax = originalChildTax;
          let grouped = {};
          _.map(groupedParent, (value, key) => {
            const childTax = originalTax.filter(tax => tax.parent && tax.parent.name === key);
			restChildTax = restChildTax.filter(tax => tax.parent.name !== key);
            const groupedChild = _.groupBy(childTax, tax => tax.term.name);
            grouped[key] = value;
            grouped = {
              ...grouped,
              ...groupedChild
            };
          });
		  const restGroupedChild = _.groupBy(restChildTax, tax => tax.term.name);
		  grouped = {
			...grouped,
            ...restGroupedChild  
		  };
          //const posts = this.getVisiblePosts(data, this.state.filter);
          //const grouped = _.groupBy(originalTax, tax => tax.term.name);
          return (
            <Page actions={actions} filters={filters} breadcrumbs={breadcrumbs}>
              <Alert
                intent={Intent.DANGER}
                iconName="pt-icon-warning-sign"
                isOpen={this.state.removeWarning}
                confirmButtonText={"I'm sure!"}
                onConfirm={async () => {
                  await this.confirmRemoveCategory();
                  refetch();
                }}
                cancelButtonText="Cancel"
                onCancel={this.closeRemoveWarning}
              >
                <span>This will erase the full category, including translations, are you sure?</span>
              </Alert>

              <Alert
                intent={Intent.DANGER}
                iconName="pt-icon-warning-sign"
                isOpen={this.state.removeWarningTranslation}
                confirmButtonText={"I'm sure!"}
                onConfirm={async () => {
                  await this.confirmRemoveCategoryTranslation();
                  refetch();
                }}
                cancelButtonText="Cancel"
                onCancel={this.closeRemoveWarning}
              >
                <span>This will delete the selected translation, are you sure?</span>
              </Alert>

              {isAdding && (
                <div className="pt-form-group">
                  <label className="pt-label" htmlFor="Parent Category">
                    <TooltipLabel label="Category Parent" required tooltip="Please choose parent category" />
                    <div className="pt-select pt-inline">
                      <select className={cx("pt-fill")} name="parent_id" onChange={this.handleChangeParent}>
                        <option key="empty" value="" />
                        {parentTax.map(tax => {
                          return (
                            <option key={tax.term.id} value={tax.term.id}>
                              {tax.term.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </label>
                  <label className="pt-label" htmlFor="Category ID">
                    <TooltipLabel
                      label="Category ID"
                      required
                      tooltip="Category ID, same value on every language"
                    />
                    <input
                      maxLength={20}
                      type="text"
                      name="name"
                      className="pt-input pt-large pt-fill pt-bold"
                      id="name"
                      value={cat.name}
                      onChange={this.handleChangeName}
                      placeholder="Type"
                    />
                  </label>
                  <label className="pt-label" htmlFor="Category Translated Name">
                    <TooltipLabel
                      label="Category Translated Name"
                      required
                      tooltip="Category translated name, depending on language"
                    />
                    <input
                      maxLength={20}
                      type="text"
                      name="displayName"
                      className="pt-input pt-large pt-fill pt-bold"
                      id="name"
                      value={cat.meta.displayName}
                      onChange={this.handleChangeDisplayName}
                      placeholder="Type"
                    />
                  </label>
                  <label className="pt-label" htmlFor="language">
                    <span>Language</span>
                    <input
                      maxLength={80}
                      type="text"
                      name="language"
                      className="pt-input pt-large pt-fill pt-bold"
                      id="language"
                      value={defaultLanguage.language}
                      disabled
                    />
                  </label>
                  <Button
                    className={cx("pt-button pt-minimal")}
                    onClick={async () => {
                      await this.saveCategory();
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
              <div className={s.categories}>
                <table className="pt-table pt-striped lj-table">
                  <thead>
                    <tr>
                      <th>Category ID</th>
                      <th>Language</th>
                      <th>Parent</th>
                      <th className="single-action-col" />
                    </tr>
                  </thead>
                  <tbody onScroll={this.onScrollToBottom}>
                    {Object.keys(grouped).length ? (
                      Object.keys(grouped).map((key, index) => {
                        const group = grouped[key];
                        const master = _.find(group, { language: defaultLanguage }) || group[0];

                        return (
                          <GroupRow
                            name={key}
                            key={`category-group-${key}`}
                            categories={group}
                            master={master}
                            select={this.select}
                            isActive={this.state.selected === key}
                            editCategory={this.editCategory}
                            removeCategory={this.alertRemoveCategory}
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
                <CategoryDetailBar
                  key="sidebar-category"
                  group={this.state.categoryGroup && grouped[this.state.categoryGroup[0].term.name]}
                  parent={allParentTax}
                  refresh={refetch}
                  refreshAndClose={() => {
                    this.closeSidebar();
                    refetch();
                  }}
                  removeCategory={this.alertRemoveCategoryTranslation}
                  defaultLanguage={defaultLanguage}
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
})(withStyles(s)(CategoryManager));
