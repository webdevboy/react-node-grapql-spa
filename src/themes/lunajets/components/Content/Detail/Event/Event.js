import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import s from "./Event.css";
import cx from "classnames";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import history from 'core/history';
import {stateToHTML} from 'draft-js-export-html';

class Event extends Component {

  componentDidMount() {
    console.log(this.props);
  }

  render() {
    const { data: { event } } = this.props;

    // console.log(event.body);

    return (
      <div className={s.root}>
        <h2>{event.title}</h2>
        <p>
          {event.summary}
        </p>
      </div>
    );
  }
}

Event.propTypes = {
  data: PropTypes.array,
}

Event.defaultProps = {
  data: {},
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(Event));