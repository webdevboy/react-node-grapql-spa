import React, { Component } from "react";
import { Query } from "react-apollo";
import Filter from "admin/components/Filter";
import Action from "admin/components/Action";
import Page from "admin/components/Page";
import NoResultsRow from "admin/components/NoResultsRow";
import PropTypes from "prop-types";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from "./PostManager.css";
import Breadcrumbs from "admin/components/Breadcrumbs";
import PostGroupDetail from "../PostGroupDetail";
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
import QUERY_POSTS_BY_TYPE from "../../../../queries/fetchPosts.graphql";
import LoadingSpinner from "admin/components/LoadingSpinner";
import PostGroupRow from "../PostGroupRow/PostGroupRow";
import getUrlFromPost from "utils/getUrlFromPost";

class PostList extends Component {
  static contextTypes = { client: PropTypes.object.isRequired };

  constructor(props) {
    super(props);

    this.state = {
      predicate: ["updated_at", "created_at", "publish_at"],
      order: [true, false, false],
      selected: undefined,
      filter: undefined,
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

  alertRemovePostTranslation = (e, id) => {
    e.stopPropagation();
    this.setState({
      removeWarningTranslation: true,
      deleteQueue: id,
    });
  };

  confirmRemovePostTranslation = async () => {
    const { deleteQueue, postGroup } = this.state;
    const newPostGroup = postGroup.filter(
      p => (Array.isArray(deleteQueue) ? deleteQueue.indexOf(p.id) === -1 : p.id !== deleteQueue),
    );

    await this.props.removePostTranslation(deleteQueue);
    this.setState({
      deleteQueue: undefined,
      removeWarningTranslation: false,
      postGroup: newPostGroup,
    });

    if (!newPostGroup.length) this.closeSidebar();
  };

  addPost = e => {
    e.preventDefault();
    history.push(`/website/${this.props.type}s/add`);
  };

  editPost = (e, id) => {
    e.stopPropagation();
    history.push(`/website/${this.props.type}s/edit/${id}`);
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

  alertRemovePosts = (e, ids) => {
    e.stopPropagation();
    this.setState({
      removeWarning: true,
      deleteQueue: ids || this.state.selected,
    });
  };

  confirmRemovePosts = async () => {
    const { deleteQueue, postGroup } = this.state;
    const newPostGroup = postGroup.filter(
      p => (Array.isArray(deleteQueue) ? deleteQueue.indexOf(p.id) === -1 : p.id !== deleteQueue),
    );

    await this.props.removePosts(deleteQueue);
    this.setState({
      deleteQueue: undefined,
      removeWarning: false,
      postGroup: newPostGroup,
    });

    if (!newPostGroup.length) this.closeSidebar();
  };

  filterBy = (field, value) => {
    if (value !== null) {
      this.setState({ selected: undefined, filter: { field: field, value: value } });
    }
  };

  removeFilter = () => {
    this.setState({ selected: undefined, filter: undefined });
  };

  closeSidebar = () => {
    this.setState({ selected: undefined });
  };

  changeSearch = e => {
    this.setState({
      search: e.target.value,
    });
  };

  translatePost = async (e, id, lang_id, duplicate = false) => {
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

  viewPost = (e, aircraft) => {
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
    const { currentRoute, languages, baseLang, languagesById, type, withTaxonomies } = this.props;
    const { search } = this.state;
    const breadcrumbs = <Breadcrumbs key="breadcrumb" route={currentRoute} />;
    const filters = [
      <Filter
        tooltip="Search here, use :<id> to filter by id only"
        key="filter-search"
        type="search"
        label="Search ..."
        search={this.changeSearch}
      />,
      <Filter
        key="filter-language"
        type="select"
        field="language"
        label="Language"
        options={Object.keys(languages).map(locale => ({
          label: languages[locale].language,
          value: languages[locale].id,
        }))}
        reset={this.removeFilter}
        select={this.filterBy}
      />,
    ];

    const actions = [
      <Action
        key="action-add"
        icon="pt-icon-add"
        intent="pt-intent-primary"
        action={this.addPost}
        label={`Create ${type.replace("-", " ")}`}
      />,
      // <Action key={`action-edit`} icon="pt-icon-edit" intent="pt-intent-default" className={(this.state.selected.length !== 1) ? 'pt-disabled' : null} action={this.editUser} tooltip={'Edit User'} />,
    ];
    return (
      <Query
        query={QUERY_POSTS_BY_TYPE}
        variables={{ type, withTaxonomies: withTaxonomies }}
        fetchPolicy="cache-and-network"
      >
        {({ loading, data, refetch, error }) => {
          if (loading) return <LoadingSpinner />;
          if (error) return error.message;

          const loweredQuery = search ? search.toLowerCase() : "";
          const filteredPosts = data.posts.filter(post => {
            return (
              (this.state.filter ? post[this.state.filter.field].id == this.state.filter.value : true) &&
              _.toLower(post.post_id.concat(" ", post.title)).includes(loweredQuery)
            );
          });

          // const posts = data.posts.filter(post => {
          //   const category = post.taxonomies && (post.taxonomies.length > 0) && post.taxonomies.map((tax,index) => {
          //     if (tax.taxonomy === 'article_category'){
          //       return tax.term.name;
          //     }
          //   });
          //   const cat = category ? category.toString() : " ";
          //   return _.toLower(post.post_id.concat(" ", post.title, " ", cat)).includes(loweredQuery);
          // });

          const posts = this.orderBy(filteredPosts); // ser order
          const grouped = _.groupBy(posts, post => post.post_id);

          return (
            <Page actions={actions} filters={filters} breadcrumbs={breadcrumbs}>
              <Alert
                intent={Intent.DANGER}
                iconName="pt-icon-warning-sign"
                isOpen={this.state.removeWarning}
                confirmButtonText={"I'm sure!"}
                onConfirm={async () => {
                  await this.confirmRemovePost();
                  refetch();
                }}
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
                onConfirm={async () => {
                  await this.confirmRemovePostTranslation();
                  refetch;
                }}
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
                      <th>Category</th>
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
                          return (i.language.locale === baseLang.locale);
                        }) || group[0];

                        return (
                          <PostGroupRow
                            id={key}
                            key={`aircraft-group-${key}`}
                            aircrafts={group}
                            languagesById={languagesById}
                            master={master}
                            baseLang={baseLang}
                            select={this.select}
                            isActive={this.state.selected === key}
                            editPost={this.editPost}
                            removePost={this.alertRemovePosts}
                            viewPost={this.viewPost}
                            toggleFeatured={this.toggleFeatured}
                          />
                        );
                      })
                    ) : (
                      <NoResultsRow cols={8} />
                    )}
                    {Object.keys(grouped).length > 0 && (
                      <tr>
                        <td colSpan="8">Total: {Object.keys(grouped).length}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <Overlay isOpen={this.state.selected} transitionName="slide" inline onClose={this.closeSidebar}>
                <PostGroupDetail
                  key="sidebar-aircraft"
                  postGroup={this.state.postGroup}
                  removePost={this.alertRemovePostTranslation}
                  viewPost={this.viewPost}
                />
              </Overlay>
            </Page>
          );
        }}
      </Query>
    );
  }
}

PostList.propTypes = {
  withTaxonomies: PropTypes.bool,
};

PostList.defaultProps = {
  withTaxonomies: false,
};

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

const mapStateToProps = state => {
  const { availableLocales, defaultLocale } = state.runtime;
  return {
    baseLang: availableLocales[defaultLocale],
    languages: availableLocales,
  };
};

export default connect(mapStateToProps, {
  removePost,
  removePostTranslation,
})(withStyles(s)(PostList));
