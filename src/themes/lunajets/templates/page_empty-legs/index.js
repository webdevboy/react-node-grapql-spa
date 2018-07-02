import React, { Component } from "react";
import { connect } from "react-redux";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import EmptyLegsDescription from "themes/lunajets/components/Content/EmptyLegs/EmptyLegsDescription";
import EmptyLegsSearch from "themes/lunajets/components/Content/EmptyLegs/EmptyLegsSearch";
import Page from '../page';

export class EmptyLegs extends Component {
  render() {
    const { hreflangs, post } = this.props;
    return (
      <Page post={post} hreflangs={hreflangs}>
        <EmptyLegsDescription
          title="FIND OPPORTUNITIES"
          description={`
            An empty leg, also called a ferry flight or an empty leg, is a private jet flying without
            passengers.This happens when an aircraft drops off passengers at their destination and return home
            "empty", or when it flies empty to pick up passengers at another airport.
          `}
        />
        <EmptyLegsSearch />
      </Page>
    );
  }
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(EmptyLegs);
