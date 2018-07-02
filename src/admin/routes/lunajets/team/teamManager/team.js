import React from "react";
import PropTypes from "prop-types";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from "./team.css";
import Actions from "../../../../components/actions";
import Filters from "../../../../components/filters";
import Inspector from "../../../../components/inspector";
import List from "./list/list";
import InspectorView from "./inspectorView";
import { connect } from "react-redux";
import { removeUser } from "../../../../../redux/actions/user";
import _ from "lodash";


class Team extends React.Component {
  constructor(props) {
    super(props);
    this.teamMemberRemoval = this.teamMemberRemoval.bind(this);
    this.removeTeamMembers = this.removeTeamMembers.bind(this);
    this.setSearch = this.setSearch.bind(this);
    this.setTeamMember = this.setTeamMember.bind(this);
    this.state = {
      inspectorState: false,
      inspectorEditorState: false,
      teamMembersToRemove: [],
      search: "",
      selected_teamMember: null,
    };
    this.toggleInspectorState = this.toggleInspectorState.bind(this);
    this.toggleInspectorEditor = this.toggleInspectorEditor.bind(this);
  }

  toggleInspectorState() {
    this.setState({ inspectorState: !this.state.inspectorState });
    this.setState({ inspectorEditorState: false });
  }

  toggleInspectorEditor(state) {
    this.setState({ inspectorEditorState: state });
  }

  teamMemberRemoval(teamMember) {
    if (this.state.teamMembersToRemove.indexOf(user) === -1) {
      this.setState({
        teamMembersToRemove: [...this.state.teamMembersToRemove, user],
      });
    } else {
      const index = this.state.teamMembersToRemove.indexOf(user);
      const teamMembersToRemove = this.state.teamMembersToRemove;
      teamMembersToRemove.splice(index, 1);
      this.setState({
        teamMembersToRemove,
      });
    }
  }

  removeTeamMembers() {
    this.state.usersToRemove.map((index) => {
      this.props.removeUser({ id: index });
    });
    this.setState({
      teamMembersToRemove: [],
    }, () => {});
  }

  setSearch(search) {
    this.setState({
      search,
    });
  }

  setTeamMember(teamMember) {
    this.setState({
      selected_teamMember: teamMember,
    });
  }

  render() {
    return (
      <div className={s.container}>
        <div>
          {/* <Actions
                        handleClick = {this.toggleInspectorState}
                        array={this.state.teamMembersToRemove}
                        handleSecondClick={this.removeTeamMembers}
                        first_action = {'Add team member'}
                        second_action = {'Remove team member'}
                    />
                    <Filters setSearch={this.setSearch}/> */}
        </div>
        <List setUser={this.setTeamMember} toggleInspectorEditor={this.toggleInspectorEditor} users={[]} userRemoval={this.teamMemberRemoval} />
        <Inspector inspectorState={this.state.inspectorState}><InspectorView toggleInspectorState={this.toggleInspectorState} /></Inspector>
      </div>
    );
  }
}

const mapStateToProps = state => ({

});

export default connect(mapStateToProps, { removeUser })(withStyles(s)(Team));

