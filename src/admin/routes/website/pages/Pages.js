import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment/moment";
import _ from "lodash";
import { Alert, Menu, Switch, ContextMenu, Tooltip, Overlay, MenuItem, MenuDivider, Popover, Intent, Toaster, PopoverInteractionKind, Position } from "@blueprintjs/core";
import cx from "classnames";
import PropTypes from "prop-types";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from "./Pages.css";
import Filter from "../../../components/Filter";
import Action from "../../../components/Action";
import Page from "../../../components/Page";
import StateTag from "../../../components/StateTag";
import NoResultsRow from "../../../components/NoResultsRow";
import Breadcrumbs from "../../../components/Breadcrumbs";
import history from "../../../../core/history";
import PageSidebar from "./PageSidebar";

// import { setFilter, removeFilter, resetFilter, toggleFeatured, editCategory, removePage, removePageTranslation } from "admin/actions/articles";
// import PageSidebar from "./PageSidebar";

const PageRow = ({ id, page, select, isActive, viewPage, editPage, removePage }) => (
  <tr onClick={() => select(id)} className={(isActive) ? "is-active" : null}>
    <td className="preview-col">
      <Action key="item-action-view" icon="pt-icon-eye-open" action={e => viewPage} />
    </td>
    <td>{ page.title }</td>
    <td>
      <ul className={s.paths}>
        { page.path.map((pagePath, index) =>
          <li key={`path-${index}`}><span className="pt-tag pt-default pt-minimal">{pagePath}</span></li>
        )}
      </ul>
    </td>
    <td>
      <StateTag value={page.state} />
    </td>
    <td className="action-col">
      <Action key="item-action-edit" icon="pt-icon-edit" intent="pt-intent-primary" action={e => editPage(e, id)} tooltip="Edit Page" />
      <Action key="item-action-remove" icon="pt-icon-remove" intent="pt-intent-danger" action={e => removePage(e, id)} tooltip="Remove Page" />
    </td>
  </tr>
);
PageRow.propTypes = {
  id: PropTypes.string.isRequired,
  page: PropTypes.object, // eslint-disable-line 
  isActive: PropTypes.bool.isRequired,
  viewPage: PropTypes.func.isRequired,
  editPage: PropTypes.func.isRequired,
  removePage: PropTypes.func.isRequired,
  select: PropTypes.func.isRequired,
};

class Pages extends Component {
  static contextTypes = { client: PropTypes.object.isRequired };

  constructor(props) {
    super(props);

    this.state = {
      predicate: ["created_at"],
      order: [true],
      selected: undefined,
      search: "",
      removeWarning: false,
      isAdding: false
    };
  }

  alertRemovePage = (e, id) => {
    e.stopPropagation();
    this.setState({
      removeWarning: true,
      deleteQueue: id,
    });
  }

  confirmRemovePage = async () => {
    await this.props.removePage(this.state.deleteQueue);
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

  createPage = (e) => {
    e.preventDefault();
    this.setState({
      selected: undefined,
      isAdding: true,
    });
  }

  editPage = (e, id) => {
    e.stopPropagation();

    if (id) {
      return history.push(`/website/pages/edit/${id}`);
    }

    if (!id && this.state.selected.length === 1) {
      return history.push(`/website/pages/edit/${this.state.selected[0]}`);
    }

    return false;
  }

  select = (id) => {
    // e.preventDefault();
    if (this.state.selected !== id) {
      this.setState({ selected: id });
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
    this.setState({ selected: undefined });
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
      return items.filter(item => (Object.keys(item).map(key => _.includes(item.article_id.toLowerCase(), search.toLowerCase()))).includes(true));
    }
    return items.filter(item => (Object.keys(item).map((key) => {
      if (key === "published_at" || key === "created_at") {
        const val = _.includes(moment(item[key]).format("ll").toString().toLowerCase(), search);
        return val;
      }

      switch (typeof item[key]) {
        case "string":
          if (key === "article_id") { return false; }
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

  orderBy = articles => _.orderBy(articles, this.state.predicate, this.state.order.map(order => ((order) ? "desc" : "asc")));

  viewPage = (e, id, cat_id) => {
    e.preventDefault();
    e.stopPropagation();
    const { pagesById } = this.props;
    window.open(`${window.App.website}/${pagesById[this.state.selected].path[0]}`);
  }

  render() {
    const {
      currentRoute, baseLang, languagesById, pagesArray, pagesBydId,
    } = this.props;

    // const filteredPages = this.searchFilter(articlesArray); // set filter search
    // const articles = this.orderBy(filteredPages);             // ser order
    // const grouped = _.groupBy(articles, article => article.article_id);

    const breadcrumbs = <Breadcrumbs key="breadcrumb" route={currentRoute} />;

    const filters = [
      <Filter tooltip="Search here, use :<id> to filter by id only" key="filter-search" type="search" label="Search ..." search={this.changeSearch} />,
      // <Action key={`action-toggle-trashbin`} icon="pt-icon-trash" intent="pt-intent-none" action={this.toggleTrashBin} tooltip={"View Trash Bin"} />,
    ];

    const actions = [
      <Action key="action-add" icon="pt-icon-add" intent="pt-intent-primary" action={this.createPage} label="Create Page" />,
      // <Action key={`action-edit`} icon="pt-icon-edit" intent="pt-intent-default" className={(this.state.selected.length !== 1) ? "pt-disabled" : null} action={this.editUser} tooltip={"Edit User"} />,
    ];

    return (
      <Page actions={actions} filters={filters} breadcrumbs={breadcrumbs}>
        <Alert
          intent={Intent.DANGER}
          iconName="pt-icon-warning-sign"
          isOpen={this.state.removeWarning}
          confirmButtonText={"I'm sure!"}
          onConfirm={this.confirmRemovePage}
          cancelButtonText="Cancel"
          onCancel={this.closeRemoveWarning}
        >
          <span>This will delete the page, completely! are you sure?</span>
        </Alert>

        <div className={s.pages}>
          <table className="pt-table pt-striped lj-table">
            <thead>
              <tr>
                <th className="preview-col" />
                <th onClick={e => this.toggleSortBy(e, ["title"])}>Title</th>
                <th>Path<sub>(s)</sub></th>
                <th>Status</th>
                <th className="action-col" />
              </tr>
            </thead>
            <tbody onScroll={this.onScrollToBottom}>
              { pagesArray.length ?
                pagesArray.map(page => (
                  <PageRow
                    id={page.id}
                    key={`pages-${page.id}`}
                    page={page}
                    languagesById={languagesById}
                    select={this.select}
                    isActive={(this.state.selected === page.id)}
                    editPage={this.editPage}
                    removePage={this.alertRemovePage}
                    viewPage={this.viewPage}
                  />
                )) : <NoResultsRow cols={5} />
              }
            </tbody>
          </table>
        </div>

        <Overlay isOpen={(this.state.selected || this.state.isAdding)} transitionName="slide" inline onClose={this.closeSidebar}>

          <PageSidebar
            isAdding={this.state.isAdding || false}
            key="sidebar-page"
            pageId={this.state.selected}
            editPage={this.editPage}
            createPage={this.createPage}
            removePage={this.alertRemovePageTranslation}
            viewPage={this.viewPage}
            translatePageMeta={this.translatePageMeta}
          />

        </Overlay>

      </Page>
    );
  }
}

// const getVisibles = (items, filter) => {
//   if (!filter) { return items; }

//   console.log(filter);

//   if (Array.isArray(filter)) {
//     filter.forEach(({ field, value }) => {
//       items = items.filter(item => item[field] === value);
//     });
//   } else {
//     return items.filter(item => item[filter.field] === filter.value);
//   }

//   return items;
// };

const mapStateToProps = (state) => {

  const defaultLocale = state.intl.locale || 'en';
  const languagesById = state.languages.byId;

  const locale = _.find(languagesById, { locale: defaultLocale });

  const allPages = state.pages.ids.map(id => state.pages.byId[id]) || [];
  // const posts = getVisibles(allPosts, state.pages.visibilityFilter);

  return {
    defaultLocale,
    baseLang: language.id,
    languagesById,
    languages: Object.values(state.languages.ids) || [],
    pagesArray: allPages,
    pagesById: state.pages.byId,
  }
};

export default connect(mapStateToProps, { })(withStyles(s)(Pages));
