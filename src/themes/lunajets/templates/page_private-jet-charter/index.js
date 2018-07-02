import React, { Component } from "react";
import { connect } from "react-redux";
import { Query, graphql } from "react-apollo";
import gql from "graphql-tag";
import Header from "themes/lunajets/components/Layout/Header";
import RequestFlight from "themes/lunajets/components/Forms/RequestFlight";
import background from "../home/gfx/background.jpg";
import SectionDescription from "themes/lunajets/components/Content/Detail/SectionDescription";
import CharterVsEmptyLeg from "themes/lunajets/components/Content/Detail/Charter/CharterVsEmptyLeg";
import { Aircrafts } from "themes/lunajets/components/Content/Detail/Charter/FleetGrid";
import Page from "../page";

import GET_AIRCRAFTS from '../../queries/getAircrafts.gql';

export class PrivateJetCharter extends Component {
  render() {
    const post = this.props.post;

    let jsonBody;
    let jsonBodySub;

    const body = (post.body && post.body.main) ? post.body.main : '';
    const sub = (post.body && post.body.sub) ? post.body.sub : '';

    if (typeof body === "string") {
      jsonBody = body;
    } else {
      jsonBody = JSON.stringify(body);
    }

    if (typeof sub === "string") {
      jsonBodySub = sub;
    } else {
      jsonBodySub = JSON.stringify(sub);
    }

    const heading = {
      subtitle: {
        defaultMessage: "Private Jet Charter",
        id: "client.pjc.subtitle",
        color: "lt-blue"
      },
      title: {
        defaultMessage: "Charter your Private jet at the best price",
        id: "client.pjc.title"
      },
      content: {
        defaultMessage: jsonBody,
      },
    };

    const ids = (post.meta.aircraft_list || []).map(value => value.post_uuid).slice(0, 9);
    
    return (
      <Page post={post} header={{request_flight: false}}>
        <Header background={ (post.media && post.media.src) || background} alt={post.title.toUpperCase()}>
          <RequestFlight />
        </Header>
        <SectionDescription section={heading} />
        <Query query={GET_AIRCRAFTS} variables={{ ids: ids, language_id: post.language.ids }}>
          {({ loading, error, data }) => {
            if (loading) return null;
            if (error) return `Error!: ${error}`;
            
            return <Aircrafts aircrafts={data.posts ? data.posts : []} />;
          }}
        </Query>
        {/*<CharterVsEmptyLeg sub={jsonBodySub}/>*/}
      </Page>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PrivateJetCharter);
