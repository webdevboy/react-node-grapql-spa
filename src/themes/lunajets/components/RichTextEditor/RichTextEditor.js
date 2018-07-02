import React, { Component } from "react";
import PropTypes from "prop-types";
import { MegadraftEditor, editorStateFromRaw, editorStateToJSON } from "megadraft";
import megadraft from "megadraft/dist/css/megadraft.css";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import pageStyle from "../../theme.css";
import s from "./RichTextEditor.css";

export class RichTextEditor extends Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {
      editorState: null,
    };
  }

  onChange = editorState => {
    this.setState({ editorState }, () => {
      this.props.onChange(editorStateToJSON(this.state.editorState));
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
      editorState: editorStateFromRaw(content),
    });
  }

  render() {
    return (
      <div className={s.editor} >
        {this.state.editorState && (
          <MegadraftEditor
            editorState={this.state.editorState}
            onChange={this.onChange}
            plugins={[]}
          />
        )}
      </div>
    );
  }
}

export default withStyles(megadraft, pageStyle, s)(RichTextEditor);