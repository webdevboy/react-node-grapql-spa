import {MegadraftIcons} from "megadraft";
import React, { Component } from "react";

import Button from "./Button";
import Block from "./Block";
import constants from "./constants";


export default (options) => ({
  title: constants.PLUGIN_NAME,
  type: constants.PLUGIN_TYPE,
  buttonComponent: (props) => (<Button {...props} {...options}/>),
  blockComponent: Block,
  options: {
    defaultDisplay: "medium",
    displayOptions: [
      {"key": "small", "icon": MegadraftIcons.MediaSmallIcon, "label": "SMALL"},
      {"key": "medium", "icon": MegadraftIcons.MediaMediumIcon, "label": "MEDIUM"},
      {"key": "big", "icon": MegadraftIcons.MediaBigIcon, "label": "BIG"}
    ],
  },
});
