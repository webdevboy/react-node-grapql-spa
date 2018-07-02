import React from "react";
import * as Icon from "react-feather";
import { insertDataBlock } from "megadraft";

export default class SectionTitleBlock extends React.Component {
  onClick = e => {
    e.preventDefault();
    const data = { type: "section-title" };
    this.props.onChange(insertDataBlock(this.props.editorState, data));
  };
  render() {
    return (
      <button className={this.props.className} type="button" onClick={this.onClick} title={this.props.title}>
        <Icon.Code color="white" className="sidemenu__button__icon" />
      </button>
    );
  }
}
