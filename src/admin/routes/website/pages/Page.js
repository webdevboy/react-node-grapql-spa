import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

export class Page extends Component {
  static propTypes = {
    prop: PropTypes,
  }

  render() {
    return (
      <div>
        Page
      </div>
    );
  }
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(Page);
