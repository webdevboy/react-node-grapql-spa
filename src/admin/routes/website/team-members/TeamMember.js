import React from "react";
import ReactDOM from "react-dom";
import { defineMessages, FormattedMessage } from "react-intl";
import PropTypes from "prop-types";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from "./TeamMembers.css";
import { Menu, Switch, ContextMenu, Tooltip, Overlay, MenuItem, MenuDivider, Popover, Intent, Toaster, PopoverInteractionKind, Position } from "@blueprintjs/core";
import Breadcrumbs from "admin/components/Breadcrumbs";
import Filter from "admin/components/Filter";
import Action from "admin/components/Action";
import Page from "admin/components/Page";
import cx from "classnames";
import { connect } from "react-redux";
import { addTeamMember, editTeamMember } from "admin/actions/teamMembers";
import history from "core/history";

import { random, times } from "lodash";


const Collapsed = ({ saveTeamMember, cancel }) => (
  <Menu>
    <MenuItem
      iconName="pt-icon-confirm"
      onClick={e => saveTeamMember}
      intent={Intent.SUCCESS}
      text="Save"
      className={cx(s.menuItem)}
    />
    <MenuItem
      iconName="pt-icon-undo"
      onClick={e => cancel}
      text="Cancel"
      intent={Intent.NONE}
      className={cx(s.menuItem)}
    />
  </Menu>
);

class TeamMember extends React.Component {
  refHandlers = {
    toaster: ref => this.toaster = ref,
  };

  static propTypes = {
  };

  static contextTypes = {
    fetch: PropTypes.func.isRequired,
    client: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);


    const state = {
      first_name: "",
      last_name: "",
      email: "",
      title: "",
      bio: "",
      flags: [],
    };

    this.state = (this.props.edit) ? Object.assign(state, this.props.teamMember) : state;

    this.originalState = this.state;
  }

  editTeamMember = async () => {
    this.toaster.clear();

    const teamMember = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      title: this.state.title,
      bio: this.state.bio,
      flags: this.state.flags,
    };

    Object.keys(teamMember).forEach((field) => {
      if (this.props.teamMember[field] === teamMember[field]) {
        delete teamMember[field];
      }
    });

    if (Object.keys(teamMember).length) {
      await this.props.editTeamMember(this.props.teamMember.id, teamMember);

      // check for errors
      this.toaster.show(this.props.errors ? {
        message: this.props.errors.graphQLErrors[0].message || null,
        timeout: 3000,
        intent: Intent.DANGER,
        iconName: "pt-icon-error",
      } : {
        message: "Team Member edited successfully!",
        timeout: 3000,
        intent: Intent.SUCCESS,
        iconName: "pt-icon-success",
        action: {
          text: "Ok",
          onClick: this.cancel,
        },
      });
    } else {
      return this.toaster.show({
        message: "You have to change something!",
        timeout: 3000,
        intent: Intent.DANGER,
        iconName: "pt-icon-error",
      });
    }
  }

  saveTeamMember = async () => {
    this.toaster.clear();

    const teamMember = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      title: this.state.title,
      bio: this.state.bio,
      flags: this.state.flags,
    };

    Object.keys(teamMember).forEach((field) => {
      if (field === "name" && !teamMember[field]) {
        this.toaster.show({
          message: `${_.capitalize(field)} is required!`,
          timeout: 3000,
          intent: Intent.DANGER,
          iconName: "pt-icon-error",
        });
      }
    });

    await this.props.addTeamMember(teamMember);

    this.setState(this.originalState);

    // check for errors
    this.toaster.show(this.props.errors ? {
      message: this.props.errors.graphQLErrors[0].message || null,
      timeout: 3000,
      intent: Intent.DANGER,
      iconName: "pt-icon-error",
    } : {
      message: "Team member created successfully!",
      timeout: 3000,
      intent: Intent.SUCCESS,
      iconName: "pt-icon-success",
      action: {
        text: "Ok",
        onClick: this.cancel,
      },
    });
  }

  cancel = () => {
    if (!history.length) {
      history.push("/team-members");
    } else {
      history.goBack();
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }


  render() {
    const { edit, currentRoute, isLoading } = this.props;

    const breadcrumbs = <Breadcrumbs route={currentRoute} />;

    const actions = [
      <Action key="action-confirm" icon="pt-icon-confirm" loading={isLoading} intent="pt-intent-success" action={(this.props.edit) ? this.editTeamMember : this.saveTeamMember} label="Save" />,
      <Action key="action-cancel" icon="pt-icon-undo" intent="pt-intent-default" action={this.cancel} label="Close" />,
    ];

    const actionPopover = <Collapsed save={this.saveTeamMember} cancel={this.cancel} />;

    return (
      <Page actions={actions} actionPopover={actionPopover} breadcrumbs={breadcrumbs}>
        <div className={s.teamMember}>

          <Toaster position={Position.TOP} ref={this.refHandlers.toaster} />

          <form onSubmit={e => e.preventDefault()} className={s["teammembers-form"]}>

            <div className={s["avatar-placeholder"]}>

              <div className={cx(s["avatar-upload"], (this.state.image) ? s.isFilled : null)}>
                { this.state.image ? <img src={this.state.image} /> : null }
                <input type="file" ref="file" onChange={this.addedFile} accept="image/*" />
              </div>

              <span className={s["avatar-label"]}>Drop here or click to chose the user avatar</span>

            </div>

            <div className={s["lj-form"]}>
              <div className="pt-form-group pt-inline">
                <label className="pt-label" style={{ flex: "1" }}>
                  First Name
                  <span className="pt-text-muted">(required)</span>
                  <input name="first_name" onChange={this.handleChange} className="pt-input pt-fill" type="text" value={this.state.first_name} placeholder="First Name" dir="auto" />
                </label>

                <label className="pt-label" style={{ flex: "1" }}>
                  Last Name
                  <span className="pt-text-muted">(required)</span>
                  <input name="last_name" onChange={this.handleChange} className="pt-input pt-fill" type="text" value={this.state.last_name} placeholder="Last Name" dir="auto" />
                </label>
              </div>

              <div className="pt-form-group pt-inline">
                <label className="pt-label" style={{ flex: "1" }}>
                  Email
                  <span className="pt-text-muted">(required)</span>
                  <input name="email" onChange={this.handleChange} className="pt-input pt-fill" type="text" value={this.state.email} placeholder="Email" dir="auto" />
                </label>

                <label className="pt-label" style={{ flex: "1", margin: "0" }}>
                  Title
                  <span className="pt-text-muted">(required)</span>
                  <input name="title" onChange={this.handleChange} className="pt-input pt-fill" type="text" value={this.state.title} placeholder="Title" dir="auto" />
                </label>
              </div>

              <div className="pt-form-group">
                <label className="pt-label" style={{ flex: "1" }}>
                  Bio
                  <span className="pt-text-muted">(required)</span>
                  <textarea name="bio" onChange={this.handleChange} className="pt-input pt-fill" dir="auto">
                    {this.state.bio}
                  </textarea>
                </label>
              </div>
              <div className="pt-form-group">
                <label className="pt-label" style={{ flex: "1", margin: "0" }}>
                  Flags
                  <span className="pt-text-muted">(required)</span>
                  <input name="email" onChange={this.handleChange} className="pt-input pt-fill" type="text" value={this.state.email} placeholder="Email" dir="auto" />
                </label>
              </div>
            </div>
          </form>

        </div>
      </Page>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  /* isLoading: state.teamMembers.isLoading,
    errors: state.teamMembers.errors,
    office: state.teamMembers.byId[ownProps.id] || null */
});


export default connect(mapStateToProps, { addTeamMember, editTeamMember })(withStyles(s)(TeamMember));

