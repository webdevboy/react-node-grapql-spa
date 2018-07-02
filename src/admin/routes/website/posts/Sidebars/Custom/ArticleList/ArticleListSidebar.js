import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import cx from "classnames";
import s from "./ArticleList.css";
import { connect } from "react-redux";
import { Toaster, Position, Intent, MenuItem, Button } from "@blueprintjs/core";
import { Suggest, MultiSelect } from "@blueprintjs/labs";
import { SortableContainer, SortableElement, arrayMove } from "react-sortable-hoc";
import TooltipLabel from "admin/components/TooltipLabel";
import LoadingSpinner from "admin/components/LoadingSpinner";
import Loading from "react-loading-animation";
import _ from "lodash";
import { graphql } from "react-apollo";
import getArticlePosts from "./getArticlePosts.gql";
import fetchTermTaxonomies from "./fetchTermTaxonomies.graphql";
import Sidebar from "admin/components/Sidebar";
import Editor from "admin/components/Editor";
import getPostByPostIds from "./getPostByPostIds.graphql";

const SortableItem = SortableElement(({ value }) => <div className={cx(s["item"])}>{value}</div>);

const SortableList = SortableContainer(({ items }) => {
  return (
    <div className={cx(s["list-wrapper"])}>
      {items.map((value, index) => <SortableItem key={`item-${index}`} index={index} value={value.title} />)}
    </div>
  );
});

class ArticleListSidebar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      suggestEdited: false,
      categories: [],
      category: undefined,
      items: [],
    };
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    let postsArray = arrayMove(this.state.items, oldIndex, newIndex);
    this.setState({
      items: postsArray,
    });
    this.props.onMetaChange({
      ...this.props.post.meta,
      displayOrder: postsArray.map(post => post.post_id),
    });
  };

  componentDidMount() {}

  async componentWillReceiveProps(nextProps) {
    if (nextProps.categories) {
      let categories = [];
      let chosenCategory = undefined;
      nextProps.categories.map(category => {
        if (category && category.term && category.term.name && category.term.id) {
          categories.push({
            id: category.term.id,
            name: category.term.name,
          });
          if (nextProps.post && nextProps.post.meta && nextProps.post.meta.category) {
            if (category.term.name === nextProps.post.meta.category) {
              chosenCategory = {
                id: category.term.id,
                name: category.term.name,
              };
            }
          }
        }
      });
      this.setState({
        ...this.state,
        categories: categories,
        category: chosenCategory,
      });

      if (
        nextProps.isEdit &&
        nextProps.post &&
        nextProps.post.meta &&
        nextProps.post.meta.displayOrder &&
        this.state.items.length === 0
      ) {
        let postsArray = await this.fetchArticlePostsByPostIds(nextProps.post.meta.displayOrder);
        if (postsArray && postsArray.length > 0) {
          let sortArray = [];
          nextProps.post.meta.displayOrder.map(post_id => {
            postsArray.map(post => {
              if (post.post_id === post_id) {
                sortArray.push(post);
              }
            });
          });
          this.setState({
            ...this.state,
            items: sortArray,
          });
        }
      }
    }
  }

  fetchArticlePostsByPostIds = post_ids => {
    const { client } = this.context;

    return new Promise((resolve, reject) => {
      client
        .query({
          query: getPostByPostIds,
          variables: {
            post_ids: post_ids,
            language_id: this.props.post.language.id,
          },
        })
        .then(({ data }) => {
          resolve(data.posts);
        });
    });
  };

  fetchArticlePosts = categoryName => {
    const { client } = this.context;

    return new Promise((resolve, reject) => {
      client
        .query({
          query: getArticlePosts,
          variables: {
            term_name: categoryName,
            language_id: this.props.post.language.id,
            limit: 10,
          },
        })
        .then(({ data }) => {
          resolve(data.getArticlePosts[0].posts);
        });
    });
  };

  renderMenuItem = ({ handleClick, item, isActive }) => (
    <MenuItem className={cx(isActive ? s.isActive : null)} key={item.id} text={item.name} onClick={handleClick} />
  );

  addCategory = async category => {
    if ((this.state.category === undefined)
     || (this.state.category && category && category.name !== this.state.category.name)) {
      this.setState({
        ...this.state,
        category: category,
      });

      this.props.onMetaChange({
        ...this.props.post.meta,
        category: category.name,
      });

      const postsArray = await this.fetchArticlePosts(category.name);

      if (postsArray && postsArray.length > 0) {
        this.setState({
          ...this.state,
          items: postsArray,
        });
        this.props.onMetaChange({
          ...this.props.post.meta,
          displayOrder: postsArray.map(post => post.post_id),
        });
      }
    }
  };

  filterCategory = (query, item, index) => item.name.toLowerCase().indexOf(query.toLowerCase()) >= 0;

  render() {
    const { onMetaChange, post, isEdit, isTranslate, isDuplicate } = this.props;
    const { categories, category, suggestEdited } = this.state;

    return (
      <Fragment>
        <div className={cx(s["category-select"])}>
          {/* Categories */}
          <div className={cx("pt-form-group")}>
            <label className="pt-label" htmlFor="category">
              <TooltipLabel label="Category" required tooltip="Select the category for article list" />
            </label>
            <Suggest
              name="Category"
              inputProps={
                isEdit && !suggestEdited
                  ? {
                      value: category ? category.name : "",
                      onChange: e => {
                        this.setState({ suggestEdited: true });
                      },
                    }
                  : {}
              }
              items={categories}
              popoverProps={{ className: s.suggester }}
              itemRenderer={this.renderMenuItem}
              className="pt-fill"
              onItemSelect={this.addCategory}
              itemPredicate={this.filterCategory}
              resetOnSelect
              inputValueRenderer={({ name }) => `${name}`}
              noResults={<MenuItem iconName="pt-icon-issue" text="No Results" intent={Intent.WARNING} />}
            />
          </div>

          {/* articles table */}
          <div className={cx("pt-form-group", s["articles-table"])}>
            <label className="pt-label" htmlFor="ordering">
              <TooltipLabel label="Ordering table" tooltip="Order of the articles list" />
            </label>
            {this.state.category ? (
              this.state.items <= 0 ? (
                <div className={cx(s["list-wrapper-none"], "py-5 justify-content-center d-flex")}>
                  <LoadingSpinner />
                </div>
              ) : (
                <SortableList items={this.state.items} onSortEnd={this.onSortEnd} />
              )
            ) : (
              <div className={cx(s["list-wrapper-none"], "py-5 justify-content-center d-flex")}>
                <span>List empty</span>
              </div>
            )}
          </div>
        </div>
      </Fragment>
    );
  }
}

ArticleListSidebar.contextTypes = {
  fetch: PropTypes.func.isRequired,
  client: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => {};

export default connect(mapStateToProps)(
  withStyles(s)(
    graphql(fetchTermTaxonomies, {
      options: ownProps => ({
        variables: {
          taxonomy: "article_category",
        },
        notifyOnNetworkStatusChange: true,
      }),
    })(ArticleListSidebar)
  )
);
