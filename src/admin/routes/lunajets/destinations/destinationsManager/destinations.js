import React from "react";
import PropTypes from "prop-types";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from "./destinations.css";
import Actions from "../../../../components/actions";
import Filters from "../../../../components/filters";
import Inspector from "../../../../components/inspector";
import List from "./list/list";
import InspectorView from "./inspectorView";
import { connect } from "react-redux";
import { removeUser } from "../../../../../redux/actions/user";
import _ from "lodash";


class Destinations extends React.Component {
  constructor(props) {
    super(props);
    this.destinationRemoval = this.destinationRemoval.bind(this);
    this.removeDestinations = this.removeDestinations.bind(this);
    this.setSearch = this.setSearch.bind(this);
    this.setDestination = this.setDestination.bind(this);
    this.state = {
      inspectorState: false,
      inspectorEditorState: false,
      destinationsToRemove: [],
      search: "",
      selected_destination: null,
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

  destinationRemoval(destination) {
    if (this.state.destinationsToRemove.indexOf(destination) === -1) {
      this.setState({
        destinationsToRemove: [...this.state.destinationsToRemove, destination],
      });
    } else {
      const index = this.state.destinationsToRemove.indexOf(destination);
      const destinationsToRemove = this.state.destinationsToRemove;
      destinationsToRemove.splice(index, 1);
      this.setState({
        destinationsToRemove,
      });
    }
  }

  removeDestinations() {
    this.state.destinationsToRemove.map((index) => {
      this.props.removeDestination({ id: index });
    });
    this.setState({
      destinationsToRemove: [],
    }, () => {});
  }

  setSearch(search) {
    this.setState({
      search,
    });
  }

  setDestination(destination) {
    this.setState({
      selected_destination: destination,
    });
  }

  render() {
    return (
      <div className={s.container}>
        <div>
          <Actions
            handleClick={this.toggleInspectorState}
            array={this.state.destinationsToRemove}
            handleSecondClick={this.removeDestinations}
            first_action="Add destination"
            second_action="Remove destination"
          />
          <Filters setSearch={this.setSearch} />
        </div>
        <List setDestination={this.setDestination} toggleInspectorEditor={this.toggleInspectorEditor} users={[]} destinationRemoval={this.destinationRemoval} />
        <Inspector inspectorState={this.state.inspectorState}><InspectorView toggleInspectorState={this.toggleInspectorState} /></Inspector>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  users: [],
});

export default connect(mapStateToProps, { removeUser })(withStyles(s)(Destinations));

