import Button from "./Button";
import TableBlock from "./Block";
import constants from "./constants";


export default {
  title: "Table",
  type: constants.PLUGIN_TYPE,
  buttonComponent: Button,
  blockComponent: TableBlock,
  options: {
    displayOptions: [],
    defaultDisplay: null
  }
};
