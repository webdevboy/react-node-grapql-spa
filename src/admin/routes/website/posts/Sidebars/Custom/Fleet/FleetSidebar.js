import React, { Component } from "react";
import PropTypes from "prop-types";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import cx from "classnames";
import { SortableContainer, SortableElement, arrayMove } from "react-sortable-hoc";
import TooltipLabel from "admin/components/TooltipLabel";
import LoadingSpinner from "admin/components/LoadingSpinner";
import _ from "lodash";
import queryAircrafts from "./queryAircrafts.graphql";
import queryAircraftsByPostIds from "./queryAircraftsByPostIds.graphql";
import s from "./FleetSidebar.css";

const SortableItem = SortableElement(({ value }) => <div className={cx(s["item"])}>{value}</div>);

const SortableList = SortableContainer(({ items }) => {
  return (
    <div className={cx(s["list-wrapper"])}>
      {items.map((value, index) => <SortableItem key={value.id} index={index} value={value.title} />)}
    </div>
  );
});

class FleetSidebar extends Component {
  state = {
    postsByPostId: [],
    loading: true
  }
  componentDidMount = async () => {
    const { client } = this.context;
    const { post } = this.props;
    let {
      meta: { displayedFirstOrder },
    } = post;
    if (!displayedFirstOrder) {
      const {
        data: { posts },
      } = await client.query({
        query: queryAircrafts,
        variables: {
          language_id: post.language.id,
        },
      });
      displayedFirstOrder = this.initDisplayedFirstOrder(posts);
    }
    const {
      data: { posts },
    } = await client.query({
      query: queryAircraftsByPostIds,
      variables: {
        post_ids: displayedFirstOrder,
        language_id: post.language.id,
      },
    });
    this.setState({
      postsByPostId: _.keyBy(posts, "post_id"),
      loading: false
    });
  };

  initDisplayedFirstOrder = posts => {
    const { handlePostChange, post } = this.props;
    const displayedFirstOrder = posts.map(item => item.post_id);
    handlePostChange({
      ...post,
      meta: {
        ...post.meta,
        displayedFirstOrder,
      },
    });
    return displayedFirstOrder;
  };

  onSortEnd = ({ oldIndex, newIndex }) => {
    const { handlePostChange, post } = this.props;
    const {
      meta: { displayedFirstOrder },
    } = post;
    const newDisplayedFirstOrder = arrayMove(displayedFirstOrder, oldIndex, newIndex);
    handlePostChange({
      ...post,
      meta: {
        ...post.meta,
        displayedFirstOrder: newDisplayedFirstOrder,
      },
    });
  };

  render() {
    const { post } = this.props;
    const {
      meta: { displayedFirstOrder = [] },
    } = post;
    const { postsByPostId, loading } = this.state;
    const sortedPosts = displayedFirstOrder.map(postId => postsByPostId[postId]);
    return (
      <div className={cx(s["category-select"])}>
        <div className={cx("pt-form-group", s["articles-table"])}>
          <label className="pt-label" htmlFor="ordering">
            <TooltipLabel label="Displayed-First Aircrafts" tooltip="Order of the aircraft list" />
          </label>
          {!loading ? (
            <SortableList items={sortedPosts} onSortEnd={this.onSortEnd} />
          ) : (
            <div className={cx(s["list-wrapper-none"], "py-5 justify-content-center d-flex")}>
              <LoadingSpinner />
            </div>
          )}
        </div>
      </div>
    );
  }
}

FleetSidebar.contextTypes = {
  client: PropTypes.object.isRequired,
};

export default withStyles(s)(FleetSidebar);
