import React from "react";
import { defineMessages, FormattedMessage } from "react-intl";
import PropTypes from "prop-types";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from "../../../../../styles/container.css";
import Actions from "../../../../components/actions";
import Filters from "../../../../components/filters";
import Inspector from "../../../../components/inspector";
import List from "./list/list";
import InspectorView from "./inspectorView";
import { connect } from "react-redux";
import { removeRedirection } from "../../../../../redux/actions/urlManager";
import cx from "classnames";


const messages = defineMessages({
  brand: {
    id: "header.brand",
    defaultMessage: "123Your Company Brand",
    description: "Brand name displayed in header",
  },
  bannerTitle: {
    id: "header.banner.title",
    defaultMessage: "123React",
    description: "Title in page header",
  },
  bannerDesc: {
    id: "header.banner.desc",
    defaultMessage: "123Complex web apps made easy",
    description: "Description in header",
  },
  ola: {
    id: "header.banner.ola",
    defaultMessage: "123Complex web apps made easy",
    description: "Description in header",
  },
});

class EmptyLegsManager extends React.Component {
  constructor(props) {
    super(props);
    // this.userRemoval = this.userRemoval.bind(this);
    this.removeEmptyLeg = this.removeEmptyLeg.bind(this);
    this.emptyLegRemoval = this.emptyLegRemoval.bind(this);
    this.setSearch = this.setSearch.bind(this);
    this.state = {
      inspectorState: false,
      emptyLegsToRemove: [],
    };
    this.toggleInspectorState = this.toggleInspectorState.bind(this);
  }

  toggleInspectorState() {
    this.setState({ inspectorState: !this.state.inspectorState });
  }

  emptyLegRemoval(redirect) {
    if (this.state.emptyLegsToRemove.indexOf(redirect) === -1) {
      this.setState({
        emptyLegsToRemove: [...this.state.emptyLegsToRemove, redirect],
      });
    } else {
      const index = this.state.emptyLegsToRemove.indexOf(redirect);
      const emptyLegsToRemove = this.state.emptyLegsToRemove;
      emptyLegsToRemove.splice(index, 1);
      this.setState({
        emptyLegsToRemove,
      });
    }
  }

  removeEmptyLeg() {
    // this.state.emptyLegsToRemove.map( index => {
    //   this.props.removeRedirection({id: index});
    // });
    this.setState({
      emptyLegsToRemove: [],
    }, () => {});
  }

  setSearch(s) {
    this.setState({
      search: s,
    });
  }

  render() {
    return (
      <div className={cx("container", s.container)}>
        <div>
          <Actions
            handleClick={this.toggleInspectorState}
            array={this.state.emptyLegsToRemove}
            handleSecondClick={this.removeEmptyLeg}
            first_action="Add emptyLeg"
            second_action="Remove emptyLeg"
          />
          <Filters setSearch={this.setSearch} />
        </div>
        <List
          emptyLegRemoval={this.emptyLegRemoval}
          search={this.state.search}
        />
        <Inspector inspectorState={this.state.inspectorState}><InspectorView toggleInspectorState={this.toggleInspectorState} /></Inspector>
      </div>
    );
  }
}

const mapStateToProps = state => ({
});

export default connect(mapStateToProps, { removeRedirection })(withStyles(s)(EmptyLegsManager));

