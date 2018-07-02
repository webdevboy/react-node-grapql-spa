import React, { Component } from "react";

class ArticleHeaders extends Component {
  render() {
    return [<th key="category">Category</th>, <th key="featured">Featured</th>];
  }
}

export default ArticleHeaders;
