import React from "react";
import PropTypes from "prop-types";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from "./aircrafts.css";
import Actions from "../../../../components/actions";
import Filters from "../../../../components/filters";
import Inspector from "../../../../components/inspector";
import List from "./list/list";
import InspectorView from "./inspectorView";
import { connect } from "react-redux";
import _ from "lodash";


class Aircrafts extends React.Component {
  constructor(props) {
    super(props);
    this.aircraftsRemoval = this.aircraftsRemoval.bind(this);
    this.removeAircrafts = this.removeAircrafts.bind(this);
    this.setSearch = this.setSearch.bind(this);
    this.setAircraft = this.setAircraft.bind(this);
    this.state = {
      inspectorState: false,
      inspectorEditorState: false,
      aircraftsToRemove: [],
      search: "",
      selected_aircraft: null,
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

  aircraftsRemoval(aircraft) {
    if (this.state.aircraftsToRemove.indexOf(aircraft) === -1) {
      this.setState({
        aircraftsToRemove: [...this.state.aircraftsToRemove, aircraft],
      });
    } else {
      const index = this.state.aircraftsToRemove.indexOf(aircraft);
      const aircraftsToRemove = this.state.aircraftsToRemove;
      aircraftsToRemove.splice(index, 1);
      this.setState({
        aircraftsToRemove,
      });
    }
  }

  removeAircrafts() {
    this.state.aircraftsToRemove.map((index) => {
      this.props.removeAircrafts({ id: index });
    });
    this.setState({
      aircraftsToRemove: [],
    }, () => {});
  }

  setSearch(search) {
    this.setState({
      search,
    });
  }

  setAircraft(aircraft) {
    this.setState({
      selected_aircraft: aircraft,
    });
  }

  render() {
    return (
      <div className={s.container}>
        <div>
          <Actions
            handleClick={this.toggleInspectorState}
            array={this.state.aircraftsToRemove}
            handleSecondClick={this.removeAircrafts}
            first_action="Add aircraft"
            second_action="Remove aircraft"
          />
          <Filters setSearch={this.setSearch} />
        </div>
        <List setUser={this.setAircraft} toggleInspectorEditor={this.toggleInspectorEditor} aircrafts={[]} userRemoval={this.aircraftsRemoval} />
        <Inspector inspectorState={this.state.inspectorState}><InspectorView toggleInspectorState={this.toggleInspectorState} /></Inspector>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  Aircrafts: state.admin.Aircrafts,
  roles: state.admin.roles,
});

export default connect(mapStateToProps, { })(withStyles(s)(Aircrafts));

