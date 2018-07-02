import React, { Component } from "react";

import Action from "admin/components/Action";

class ArticleRows extends Component {
  render() {
    const { post } = this.props;
    return [
      <td key="category">{post.taxonomies[0] && post.taxonomies[0].term.name}</td>,
      <td key="featured">
        <Action
          key="item-action-remove"
          icon={post.meta.featured ? "pt-icon-star" : "pt-icon-star-empty"}
          intent="pt-intent-primary"
          action={e => console.log("Toggle feature click")}
          tooltip="Toggle Featured state on Aircraft"
        />
      </td>,
    ];
  }
}

export default ArticleRows;
