import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import cx from "classnames";
import s from "./Testimonial.css";
import { connect } from "react-redux";
import { Toaster, Position, Intent, MenuItem, Button } from "@blueprintjs/core";
import { Suggest, MultiSelect } from "@blueprintjs/labs";
import TooltipLabel from "admin/components/TooltipLabel";
import { toLower } from 'lodash';

import { fetchPosts } from "admin/actions/posts";
import Sidebar from "admin/components/Sidebar";
import Editor from "admin/components/Editor";

class TestimonialSidebar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedPosts: [],
      posts: [],
      postFetched: false
    }
  }

  componentDidMount() {
    const { posts, post: { meta: { review_list } } } = this.props;
    if (this.filterOriginalPosts(posts, review_list).length === 0) {
      this.props.fetchPosts({
        type: 'review'
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { posts, post: { meta: { review_list } } } = nextProps;
    this.setState({
      posts: nextProps.posts,
    });

    if (!this.state.postFetched && nextProps.posts.length) {
      this.setState({
        postFetched: true,
        selectedPosts: this.filterOriginalPosts(posts, review_list)
      });
    }
  }

  renderPostItem = ({ handleClick, item, isActive }) => (
    <MenuItem
      className={cx(isActive ? s.isActive : null)}
      key={item.id}
      text={item.title}
      onClick={handleClick}
    />
  );

  renderPostTag = item => item.slug;

  addPost = item => {
    let selectedPosts = this.state.selectedPosts;
    if (this.getSelectedPostIndex(item) !== -1) {
      selectedPosts = selectedPosts.filter((post, i) => i !== this.getSelectedPostIndex(item));
    } else {
      selectedPosts = [...selectedPosts, item];
    }
    this.setState({ selectedPosts });
    this.props.onMetaChange({
      ...this.props.post.meta,
      review_list: selectedPosts.map(post => ({ post_uuid: post.id }))
    });
  };

  filterPost = (query, item, index) => {
    const entry = toLower(`${item.title}`);
    const loweredQuery = query.toLowerCase();
    return String(entry).includes(loweredQuery);
  };

  handleClear = () => {
    this.setState({ selectedPosts: [] });
    this.props.onMetaChange({
      ...this.props.post.meta,
      review_list: []
    });
  };

  handleTagRemove = (_tag, index) => {
    let selectedPosts = this.state.selectedPosts;
    selectedPosts = this.state.selectedPosts.filter((post, i) => i !== index);
    this.setState({ selectedPosts });
    this.props.onMetaChange({
      ...this.props.post.meta,
      review_list: selectedPosts
    });
  };

  getSelectedPostIndex(post) {
    return this.state.selectedPosts.indexOf(post);
  }

  filterOriginalPosts = (posts, review_list) =>
    posts.filter(v =>
      (review_list || []).map(_v => _v.post_uuid).indexOf(v.id) !== -1)



  render() {
    const { handleChange, post, categories } = this.props;
    const { postFetched } = this.state;

    const Loading = (
      <MenuItem
        className={s.menuloader}
        text="Fetching Models ..."
        label={<Button type="button" className={cx("pt-button pt-fill pt-minimal")} loading />}
      />
    );

    const NoResults = <MenuItem iconName="pt-icon-issue" text="No Results" intent={Intent.WARNING} />;
    const getTagProps = (_value, index) => ({
      intent: Intent.NONE,
      minimal: false
    });
    const clearButton =
      this.state.selectedPosts.length > 0 ? (
        <Button iconName="pt-icon-cross" minimal onClick={this.handleClear} />
      ) : null;

    return (
      <div className="pt-form-group">
        <label className="pt-label" htmlFor="selectedPosts">
          <TooltipLabel label="Review Lists" required tooltip="Please select posts" />
          <MultiSelect
            name="review_list"
            items={this.state.posts}
            popoverProps={{ className: s.suggester }}
            itemRenderer={this.renderPostItem}
            tagRenderer={this.renderPostTag}
            onItemSelect={this.addPost}
            itemPredicate={this.filterPost}
            selectedItems={this.state.selectedPosts}
            tagInputProps={{ tagProps: getTagProps, onRemove: this.handleTagRemove, rightElement: clearButton }}
            noResults={NoResults}
          />
        </label>
      </div>
    );
  }
}

TestimonialSidebar.contextTypes = {
  fetch: PropTypes.func.isRequired,
  client: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  return {    
    posts: (Object.values(state.posts.byId) || [])
      .filter(
        post => post.type === 'review' && 
        (ownProps.post && ownProps.post.language ? post.language.id === ownProps.post.language.id :
        post.language.id === state.runtime.availableLocales[state.runtime.defaultLocale].id))
  }
};

export default connect(mapStateToProps, { fetchPosts })(
  withStyles(s)(TestimonialSidebar)
);
