import React, {Component} from "react";

import {MegadraftPlugin, MegadraftIcons} from "megadraft";


const {BlockContent, BlockData, BlockInput, CommonBlock} = MegadraftPlugin;


export default class Block extends Component {
  constructor(props) {
    super(props);

    this.actions = [
      {"key": "delete", "icon": MegadraftIcons.DeleteIcon, "action": this.props.container.remove}
    ];
  }

  _handleAltChange = (event) => {
    this.props.container.updateData({alt: event.target.value});
  }

  _handleTitleChange = (event) => {
    this.props.container.updateData({title: event.target.value});
  }

  render(){
    return (
      <CommonBlock {...this.props} actions={this.actions}>
        <BlockContent>
          <img src={this.props.data.src} width="400" height="300" />
        </BlockContent>

        <BlockData>
		  <BlockInput
            placeholder="Title"
            value={this.props.data.title}
            onChange={this._handleTitleChange} />
          <BlockInput
            placeholder="Alt"
            value={this.props.data.alt}
            onChange={this._handleAltChange} />
        </BlockData>
      </CommonBlock>
    );
  }
}
