import React from "react";
import { MegadraftIcons, MegadraftPlugin } from "megadraft";

const { BlockContent, BlockData, BlockInput, CommonBlock } = MegadraftPlugin;

export default class SectionTitleBlock extends React.Component {
  onChange = e => {
    this.props.container.updateData({ textId: e.target.value });
  };
  render() {
    const blockActions = [
      {
        key: "delete",
        icon: MegadraftIcons.DeleteIcon,
        action: this.props.container.remove,
      },
    ];
    return (
      <CommonBlock actions={blockActions} {...this.props}>
        <BlockContent>
          <h1>{this.props.data.textId}</h1>
        </BlockContent>

        <BlockData>
          <BlockInput placeholder="Enter text id for your title" onChange={this.onChange} />
        </BlockData>
      </CommonBlock>
    );
  }
}
