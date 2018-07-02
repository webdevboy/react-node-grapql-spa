import React, { Component } from 'react';
import { connect } from 'react-redux';
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import Search from 'themes/lunajets/components/Content/Lists/Search';
import Page from '../page';

export class SearchPage extends Component {
  render() {
    const {hreflangs, search_query} = this.props;
   
    return (
      <Page hreflangs={hreflangs} >
        <Search search_query={search_query} />
      </Page>
    );
  }
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
