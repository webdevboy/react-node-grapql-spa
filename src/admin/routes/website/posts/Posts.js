import React, { Component } from "react";
import { Query } from "react-apollo";
import Filter from "admin/components/Filter";
import Action from "admin/components/Action";
import Page from "admin/components/Page";
import StateTag from "admin/components/StateTag";
import Breadcrumbs from "admin/components/Breadcrumbs";
import NoResultsRow from "admin/components/NoResultsRow";
import LoadingSpinner from "admin/components/LoadingSpinner";
import PropTypes from "prop-types";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from "./Posts.css";
import history from "core/history";
import cx from "classnames";
import { connect } from "react-redux";
import _ from "lodash";
import moment from "moment";
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
import { setFilter, removeFilter, removePost, removePostTranslation } from "admin/actions/posts";
import PostGroupDetail from "./PostGroupDetail";
import queryPostGroupsByType from "admin/queries/queryPostGroupsByType.graphql";
import { PostTypes } from "admin/routes/website/posts/PostTypes";

const getCityNames = post => {
  let cityNames = "";
  if (post.firstCity) {
    cityNames += post.firstCity.name;
  }
  if (post.secondCity) {
    cityNames += ", ";
    cityNames += post.secondCity.name;
  }
  return cityNames;
};

const GroupRow = ({ group, select, isActive, editPost, removePost, viewPost }) => (
  <tr onClick={() => select(group)} className={isActive ? "is-active" : null}>
    <td className="preview-col">
      <Action key="item-action-view" icon="pt-icon-eye-open" action={e => viewPost(e, group.master.id)} tooltip="View Post" />
    </td>
    <td className="id-col">{group.id}</td>
    <td>
      <div>
        <a href="#">{group.master.title}</a>
      </div>
      <div>
        {group.posts.map(post => (
          <StateTag
            onClick={e => editPost(e, post.type, post.id)}
            key={post.id}
            value={post.state}
            selected={post.id === group.master.id}
            text={post.language.locale}
          />
        ))}
      </div>
    </td>
    <td className="summary-col">{group.master.summary}</td>
    <td className="type-col">{group.master.meta ? group.master.meta.template : ""}</td>
    <td>{getCityNames(group.master)}</td>
    <td>{group.master.publish_at ? moment(group.master.publish_at).format("ll") : moment(group.master.created_at).format("ll")}</td>
    <td>
      <Action
        key="item-action-remove"
        icon="pt-icon-remove"
        intent="pt-intent-danger"
        action={e => removePost(e, group.id)}
        tooltip="Remove Post"
      />
    </td>
  </tr>
);

class Posts extends Component {
  static contextTypes = { client: PropTypes.object.isRequired };

  // constructor
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

  // remove post
  toggleTrashBin = () => {
    this.setState({ trash: !this.state.trash });
  };

  alertRemovePost = (e, id) => {
    if (e) {
      e.stopPropagation();
    }
    this.setState({
      removeWarning: true,
      deleteQueue: id,
    });
  };

  confirmRemovePost = async () => {
    await this.props.removePost(this.state.deleteQueue);
    this.setState({
      deleteQueue: undefined,
      removeWarning: false,
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
    await this.props.removePostTranslation(this.state.deleteQueue);

    this.setState({
      deleteQueue: undefined,
      removeWarningTranslation: false,
    });
  };

  closeRemoveWarning = () => {
    this.setState({
      removeWarning: false,
      removeWarningTranslation: false,
    });
  };

  closeSidebar = () => {
    this.setState({ selected: undefined });
  };

  // add Post (redirect)
  addPost = e => {
    e.preventDefault();
    history.push("/website/pages/add");
  };

  // edit Post (redirect)
  editPost = (e, post) => {
    e.stopPropagation();
  };

  // translate Post
  translatePost = async (e, id, lang_id, duplicate = false) => {
    e.preventDefault();
    return history.push(`/website/pages/add/${id}/${lang_id}?duplicate=${String(duplicate)}`);
  };

  changeSearch = e => {
    this.setState({
      search: e.target.value,
    });
  };

  searchFilter = groups => {
    const { search } = this.state;
    let regex;
    let result;
    if (search.charAt(0) === ":") {
      regex = new RegExp(search.substr(1), "i");
      result = groups.filter(group => regex.test(group.id));
    } else {
      regex = new RegExp(search, "i");
      result = groups.filter(group =>
        Object.keys(group.master)
          .map(key => {
            if (key === "published_at" || key === "created_at") {
              return regex.test(moment(group.master[key]).format("ll"));
            }
            if (typeof group.master[key] === "string") {
              return regex.test(group.master[key]);
            }
            return false;
          })
          .includes(true),
      );
    }
    return result;
  };

  // order
  orderBy = posts => _.orderBy(posts, this.state.predicate, this.state.order.map(order => (order ? "desc" : "asc")));

  select = (group) => {
    if (this.state.selected !== group) {
      this.setState({
        selected: group
      });
    }
  };

  filterPost = posts => {
    const filteredPosts = posts.filter(post => {
      return this.state.filterTemplate && post.meta ? post.meta.template === this.state.filterTemplate : true;
    });

    return filteredPosts;
  };

  removeDisplayFilter = () => {
    this.setState({ filterTemplate: undefined });
  };

  filterBy = (field, value) => {
    if (value !== null) {
      this.setState({ filterTemplate: value });
    }
  };

  render() {
    const { currentRoute } = this.props;

    const breadcrumbs = <Breadcrumbs key="breadcrumb" route={currentRoute} />;
    const postOptions = Object.values(PostTypes).filter(type => type.type === "page").map(type => ({
      label: type.name,
      value: type.template
    }));
    const filters = [
      <Filter
        tooltip="Search here, use :<id> to filter by id only"
        key="filter-search"
        type="search"
        label="Search ..."
        search={this.changeSearch}
      />,
      <Filter
        key="filter-template"
        type="select"
        field="template"
        label="Template"
        options={postOptions}
        reset={this.removeDisplayFilter}
        select={this.filterBy}
      />,
    ];

    const actions = [
      <Action key="action-add" icon="pt-icon-add" intent="pt-intent-primary" action={this.addPost} label="Add Post" />,
      // <Action key={`action-toggle-trashbin`} icon="pt-icon-trash" intent="pt-intent-none" action={this.toggleTrashBin} tooltip={'View Trash Bin'} />,
    ];

    return (
      <Query
        query={queryPostGroupsByType}
        variables={{ type: "page" }}
        fetchPolicy="cache-and-network"
      >
        {({ loading, refetch, data, error }) => {
          if (loading) return <LoadingSpinner />;
          if (error) return error;

          let { groups } = data;
          const { filterTemplate } = this.state;
          groups = groups.filter(group => !filterTemplate || group.master.meta.template === filterTemplate);
          groups = this.searchFilter(groups);
          return (
            <Page actions={actions} filters={filters} breadcrumbs={breadcrumbs}>
              <div className={s.posts}>
                {/* Alert delete full post */}
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
                  <span>This will erase the full post, including translations, are you sure?</span>
                </Alert>

                {/* Alert delete selected */}
                <Alert
                  intent={Intent.DANGER}
                  iconName="pt-icon-warning-sign"
                  isOpen={this.state.removeWarningTranslation}
                  confirmButtonText={"I'm sure!"}
                  onConfirm={async () => {
                    await this.confirmRemovePostTranslation();
                    refetch();
                  }}
                  cancelButtonText="Cancel"
                  onCancel={this.closeRemoveWarning}
                >
                  <span>This will delete the selected translation, are you sure?</span>
                </Alert>

                {/* table */}
                <table className="pt-table pt-striped lj-table">
                  <thead>
                    <tr>
                      <th className="preview-col" />
                      <th className="id-col">ID</th>
                      <th>Title</th>
                      <th>Summary</th>
                      <th>Template</th>
                      <th>Cities</th>
                      <th>Published At</th>
                      <th className="single-action-col" />
                    </tr>
                  </thead>
                  <tbody onScroll={this.onScrollToBottom}>
                    {groups.length > 0 ?
                      (groups.map((group) => (
                          <GroupRow
                            key={group.id}
                            group={group}
                            select={this.select}
                            isActive={this.state.selected === group}
                            editPost={this.editPost}
                            removePost={this.alertRemovePost}
                            viewPost={this.viewPost}
                          />
                        )
                      )
                    ) : (
                      <NoResultsRow cols={8} />
                    )}
                  </tbody>
                </table>
              </div>

              <Overlay isOpen={this.state.selected} transitionName="slide" inline onClose={this.closeSidebar}>
                <PostGroupDetail
                  key="sidebar-post"
                  groupId={this.state.selected && this.state.selected.id}
                  editCategory={this.props.editCategory}
                  postGroup={this.state.selected && this.state.selected.posts}
                  removePost={this.alertRemovePostTranslation}
                />
              </Overlay>
            </Page>
          );
        }}
      </Query>
    );
  }
}

const mapStateToProps = () => {
  return {}
};

export default connect(mapStateToProps, {
  setFilter,
  removeFilter,
  removePost,
  removePostTranslation,
})(withStyles(s)(Posts));
