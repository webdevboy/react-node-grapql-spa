import React from 'react';
import PropTypes from 'prop-types'
import { MegadraftEditor, editorStateFromRaw, editorStateToJSON, editorStateToHtml  } from "megadraft";
import megadraft from 'megadraft/dist/css/megadraft.css';
import s from './ContentEditor.css';
import withStyles from "isomorphic-style-loader/lib/withStyles";

class ContentEditor extends React.Component {

  static propTypes = {
  }

  constructor(props) {
    super(props);
    this.state = {
      editorState: null
    };
  }

  componentDidMount() {
    let content = null;
    try {
      content = JSON.parse(this.props.value)
    } catch(e) {
      content = null
    }
    this.setState({
      editorState: editorStateToHtml(this.props.value),
    });
  }

  render() {
    return (
        <div>
        { 
          this.state.editorState && 
          <MegadraftEditor
            editorState={this.state.editorState}
            readOnly={true}
            /> 
        }
        </div>
    )
  }
}

export default (withStyles(megadraft, s)(ContentEditor));
