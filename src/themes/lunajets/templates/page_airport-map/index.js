import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import AirportHeader from "themes/lunajets/components/Content/Detail/Airport/AirportHeader";
import background from "../home/gfx/map.png";
import SectionDescription from "themes/lunajets/components/Content/Detail/SectionDescription";
import AirportGrid from "themes/lunajets/components/Content/Detail/Airport/AirportGrid";
import Page from "../page";

import { Query, graphql } from 'react-apollo';
import GET_AIRPORT_BY_POSTS from 'themes/lunajets/queries/getAirportByPosts.gql';

export class AirportMap extends Component {
  render() {
    const post = this.props.post;
    const { hreflangs } = this.props;
    
    let jsonBody;
    const body = post.body ? post.body.main : '';
    if (typeof body === "string") {
      jsonBody = body;
    } else {
      jsonBody = JSON.stringify(body);
    }

    const heading = {
      subtitle: {
        defaultMessage: "AIRPORT MAP",
        id: "client.airportMap.subtitle",
        color: "lt-blue",
      },
      title: {
        defaultMessage: post.title.toUpperCase(),
      },
      content: {
        defaultMessage: jsonBody,
      },
    };

    const post_ids = post.meta.airport_list.map(post => post.post_uuid);
    
    return (
      <Page post={post} hreflangs={hreflangs}>
        <Query query={GET_AIRPORT_BY_POSTS} variables={{ post_ids }}>
          {({ loading, error, data }) => {
            if (loading) return null;
            if (error) return `Error!: ${error}`;
            
            return (
              <Fragment>
                <AirportHeader airports={data.airports || []} alt={post.title.toUpperCase()} />
                <SectionDescription section={heading} />
                <AirportGrid airports={data.airports || []} />
              </Fragment>
            );
          }}
        </Query>
      </Page>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AirportMap);
