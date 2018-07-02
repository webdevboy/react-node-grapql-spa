import React, { Component } from "react";
import PropTypes from "prop-types";
import { DraftJS, MegadraftEditor, editorStateFromRaw, editorStateToJSON, createTypeStrategy } from "megadraft";
import megadraft from "megadraft/dist/css/megadraft.css";
import tableCss from "./Plugins/TablePlugin/plugin.scss";
import videoPlugin from "megadraft/lib/plugins/video/plugin";
import imagePlugin from "./Plugins/ImagePlugin/plugin";
import tablePlugin from "./Plugins/TablePlugin/plugin";
import s from "./Editor.css";
//import pageStyle from "../../../client/components/Page/Page.css";
import withStyles from "isomorphic-style-loader/lib/withStyles";

const LinkComponent = ({entityKey, children, contentState}) => {
  const {url} = contentState.getEntity(entityKey).getData();
  return (
    <a className="link" href={url} title={url} target="_blank">
      {children}
    </a>
  );
};

const myDecorator = new DraftJS.CompositeDecorator([
  {
    strategy: createTypeStrategy("LINK"),
    component: LinkComponent,
  },
])

export class Editor extends Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {
      editorState: null,
    };
  }

  onChange = editorState => {
    this.setState({ editorState }, () => {
      this.props.onChange(editorStateToJSON(this.state.editorState),
        editorState.getCurrentContent().getPlainText());
    });
  };

  componentDidMount() {
    let content = null;
    try {
      content = JSON.parse(this.props.value);
    } catch (e) {
      content = null;
    }
    this.setState({
      editorState: editorStateFromRaw(content, myDecorator),
    });
  }

  render() {

    console.log(MegadraftEditor);
    // const customActions = MegadraftEditor.actions.concat([
    //   {type: "block", label: "H2", style: "header-two" },
    // ]);

    return (
      <div className={s.editor} onClick={this.focusEditor}>
        {this.state.editorState && (
          <MegadraftEditor
            editorState={this.state.editorState}
            onChange={this.onChange}
            // actions={customActions}
            plugins={[imagePlugin({currentRoute: this.props.currentRoute}), videoPlugin, tablePlugin]}
          />
        )}
      </div>
    );
  }
}

export default withStyles(megadraft, s, tableCss)(Editor);
