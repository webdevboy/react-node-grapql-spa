import React, { Component } from "react";
import moment from "moment/moment";
import Action from "../../../../../components/Action";
import StateTag from "../../../../../components/StateTag";
import PostTypes from "admin/routes/website/posts/PostTypes";

class TableRows extends Component {
  getCustomRows = () => {
    const {
      group: { master },
    } = this.props;
    const CustomRows = PostTypes[master.type].rowsComponent;
    return <CustomRows post={master} />;
  };
  render() {
    const { group, selectGroup, isActive, previewPost, editPost, removeGroup } = this.props;
    const { master, posts } = group;
    return (
      <tr onClick={e => selectGroup(group)} className={isActive ? "is-active" : null}>
        <td className="preview-col">
          <Action
            key="item-action-view"
            icon="pt-icon-eye-open"
            action={e => previewPost(e, master)}
            tooltip="View Aircraft"
          />
        </td>
        <td className="id-col">{group.id}</td>
        <td>
          <div>
            <a href="#">{master.title}</a>
          </div>
          <div>
            {posts.map(post => (
              <StateTag
                onClick={e => editPost(e, post.id)}
                key={`tag-locale-${post.language.id}`}
                value={post.state}
                text={post.language.locale}
              />
            ))}
          </div>
        </td>
        {this.getCustomRows()}
        <td>
          {master.published_at ? moment(master.published_at).format("ll") : moment(master.created_at).format("ll")}
        </td>
        <td className="single-action-col">
          <Action
            key="item-action-remove"
            icon="pt-icon-remove"
            intent="pt-intent-danger"
            action={e => removeGroup(e, group.id)}
            tooltip="Remove Aircraft"
          />
        </td>
      </tr>
    );
  }
}

export default TableRows;
