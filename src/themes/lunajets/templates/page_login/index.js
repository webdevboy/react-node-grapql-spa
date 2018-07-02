import React, { Component } from "react";
import { connect } from "react-redux";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import Login from "themes/lunajets/components/Content/Login";

class LoginPage extends Component {
  render() {
    return (<Login />);
  }
};

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
