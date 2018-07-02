import React, { Component } from "react";

import PostTypes from "admin/routes/website/posts/PostTypes";

class TableHeaders extends Component {
  getCustomHeaders = () => {
    const { type } = this.props;
    const CustomHeaders = PostTypes[type].headersComponent;
    return <CustomHeaders />;
  };
  render() {
    return (
      <tr>
        <th className="preview-col" />
        <th className="id-col">ID</th>
        <th>Title</th>
        {this.getCustomHeaders()}
        <th>Date</th>
        <th className="single-action-col" />
      </tr>
    );
  }
}

export default TableHeaders;
