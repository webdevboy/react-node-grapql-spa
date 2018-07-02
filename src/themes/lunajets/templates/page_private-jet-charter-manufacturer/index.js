import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Query, graphql } from "react-apollo";
import Promise from "bluebird";
import gql from "graphql-tag";
import Header from 'themes/lunajets/components/Layout/Header';
import RequestFlight from 'themes/lunajets/components/Forms/RequestFlight';
import background from '../home/gfx/background.jpg';
import SectionDescription from 'themes/lunajets/components/Content/Detail/SectionDescription';
import { Aircrafts } from 'themes/lunajets/components/Content/Detail/Charter/FleetGrid';
import Page from '../page';

import GET_AIRCRAFTS from '../../queries/getAircrafts.gql';
import GET_CITY_NAME_BYID from '../../queries/getCityNameByid.gql';

class PrivateJetCharterManufacturer extends Component {

  render() {
    const {post, hreflangs} = this.props;   
    
    let jsonBody;

    const body = (post.body && post.body.main) ? post.body.main : '';

    if (typeof body === "string") {
      jsonBody = body;
    } else {
      jsonBody = JSON.stringify(body);
    }

    const heading = {
      subtitle: {
        defaultMessage: 'Private Jet Charter Manufacturer',
        id: 'client.pjcManufacturer.subtitle',
        color: 'lt-blue',
      },
      title: {
        defaultMessage: post.title.toUpperCase(),
      },
      content: {
        defaultMessage: jsonBody,
      },
    };

    const flyToButton = {
        defaultMessage: 'CHARTER',
        id: 'client.flyTo.'+post.meta.manufacturer_sfid+'.button',     
    };

    const ids = (post.meta.aircraft_list || []).map(value => value.post_uuid).slice(0, 9);

    return (
      <Page post={post} hreflangs={hreflangs} header={{request_flight: false}}>
        <Header background={ (post.media && post.media.src) || background} alt={post.title.toUpperCase()}>
          <RequestFlight />
        </Header>
        <SectionDescription section={heading} />
        <Query query={GET_AIRCRAFTS} variables={{ ids: ids, language_id: post.language.id }}>
          {({ loading, error, data }) => {
            if (loading) return null;
            if (error) return `Error!: ${error}`;
            
            return <Aircrafts aircrafts={data.posts ? data.posts : []} buttonName={flyToButton} />;
          }}
        </Query>
      </Page>            
    );
  }
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(PrivateJetCharterManufacturer);
