import React, { Component } from "react";
import PropTypes from "prop-types";
import Action from "../../../components/Action";
import s from "./Languages.css";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import { toLower } from "lodash";
import { Classes, Intent, Spinner } from "@blueprintjs/core";

const EditActions = ({ actions }) => (
  <div>
    { actions.map(action => action) }
  </div>
);

const Translation = ({ string }) => {
  if (string && string.length) { return <span>{string}</span>; }
  return <div className="pt-tag pt-minimal pt-intent-warning">Missing Translation</div>;
};

export class StringRow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: false,
      translation: this.props.string.translation || "",
    };
  }

  toggleEditing = (e) => {
    e.preventDefault();
    this.setState({ editing: !this.state.editing });
  }

  save = () => {
    const { message_id, defaultMessage } = this.props.string;
    this.props.editString({ message_id, defaultMessage, translation: this.state.translation });
    this.setState({
      editing: false,
    });
  }

  cancel = () => {
    this.setState({ editing: false });
  }

  handleChange = (e) => {
    e.preventDefault();
    this.setState({
      translation: e.target.value,
    });
  }

  render() {
    const {
      string: {
        message_id,
        description,
        defaultMessage,
        translation,
        isLoading,
      },
      editString,
    } = this.props;

    const save = (<Action
      key="item-action-save"
      icon="pt-icon-tick-circle"
      intent="pt-intent-success"
      action={this.save}
      tooltip="Save"
    />);

    const cancel = (<Action
      key="item-action-cancel"
      icon="pt-icon-undo"
      intent="pt-intent-danger"
      action={this.cancel}
      tooltip="Cancel edit action"
    />);

    const primary = (<Action
      key="item-action-edit"
      icon="pt-icon-edit"
      intent="pt-intent-primary"
      action={this.toggleEditing}
      tooltip="View Language"
    />);

    return (
      <tr>
        <td className={s["message-id"]}><span>{toLower(message_id)}</span></td>
        {/* <td className={s.description}><span>{description}</span></td> */}
        <td><span>{defaultMessage}</span></td>
        <td className={s.translation}>

          { (this.state.editing) ?
            <div className="pt-input-group">
              <textarea className="pt-input pt-intent-primary pt-fill" onChange={this.handleChange} name="translation">
                {this.state.translation}
              </textarea>
            </div>
            : (isLoading) ?
              <Spinner className="pt-small" intent={Intent.PRIMARY} />
              : <Translation string={translation} />
            }

        </td>
        <td className={s.actionCol}>
          { this.state.editing ? <EditActions key="edit-string-actions" actions={[save, cancel]} /> : primary }
        </td>
      </tr>
    );
  }
}

export default withStyles(s)(StringRow);
