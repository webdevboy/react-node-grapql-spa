import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from "graphql-tag";
import { connect } from "react-redux";
import _ from "lodash";

import Header from 'themes/lunajets/components/Layout/Header';
import JetCostDescription from 'themes/lunajets/components/Content/Detail/JetCost/JetCostDescription';
import JetCostEstimation from 'themes/lunajets/components/Content/Detail/JetCost/JetCostEstimation';
import background from '../home/gfx/background.jpg';
import Page from '../page';
import JetCostDestinations from 'themes/lunajets/components/Content/Detail/JetCost/JetCostDestinations';

import GET_DETAILS from '../../queries/queryForDestination.gql';

class JetCostDestination extends Component {

  getData(airports) {
    const data = [
      {
        from: 'LBG',
        to: 'GVA',
        duration: {
          hour: 1,
          minute: 0
        },
        aircraft_category: 'Very light jet',
        aircraft_type: 'Citation Mustang',
        price: 4450.00
      },
      {
        from: 'LBG',
        to: 'NCE',
        duration: {
          hour: 1,
          minute: 35
        },
        aircraft_category: 'Super midsize jet',
        aircraft_type: 'Citation X',
        price: 10000
      },
      {
        from: 'LTN',
        to: 'LBG',
        duration: {
          hour: 0,
          minute: 45
        },
        aircraft_category: 'Light jet',
        aircraft_type: 'Citation CJ2+',
        price: 6850.00
      },
      {
        from: 'LTN',
        to: 'NCE',
        duration: {
          hour: 1,
          minute: 45
        },
        aircraft_category: 'Light jet',
        aircraft_type: 'Falcon 2000',
        price: 18650.00
      },
      {
        from: 'GVA',
        to: 'LTN',
        duration: {
          hour: 1
        },
        aircraft_category: 'Very light jet',
        aircraft_type: 'LearJet 75',
        price: 10400.00
      },
      {
        from: 'GVA',
        to: 'NCE',
        duration: {
          hour: 1,
          minute: 15
        },
        aircraft_category: 'Super light jet',
        aircraft_type: 'Phenom 100',
        price: 5250.00
      },
      {
        from: 'LTN',
        to: 'TEB',
        duration: {
          hour: 7,
          minute: 0
        },
        aircraft_category: 'Ultra long range',
        aircraft_type: 'Global Express',
        price: 98500.00
      },
      {
        from: 'SVO',
        to: 'NCE',
        duration: {
          hour: 3,
          minute: 40
        },
        aircraft_category: 'Light jet',
        aircraft_type: 'Legacy 600',
        price: 4450.00
      }
    ];

    return data.map(item => ({
      ...item,
      from_airport: _.find(airports, { iata: item.from }),
      to_airport: _.find(airports, {iata: item.to})
    }))
  }

  render() {
    const { hreflangs, post, data: { sfAirports, other_destinations, city } } = this.props;
    const estimations = this.getData(sfAirports);
    let otherDestinationPosts = [];

    try {
      otherDestinationPosts = other_destinations.map(post => ({
        city: post.city,
        ...JSON.parse(post.post || '{}')
      }));
    } catch(e) {

    }

    return (
      <Page post={post} hreflangs={hreflangs}>
        <Header background={(post.media && post.media.src) || post.metbackground}/>
        <JetCostDescription
          city={city ? city.name : post.title}
          title={post.title}
          description={post.body ? post.body.main : {}}
          showSaveColumns={false}
        />
        <JetCostEstimation data={estimations} city={city} showLength={5} locale={post.language.locale} showEnquire/>
        <JetCostDestinations destinations={otherDestinationPosts}/>
      </Page>
    );
  }
}

const PageJetCostDestination = ({ post, hreflangs }) => {
  const other_destinations = ((post.meta && post.meta.other_destinations) || []).map(item => item.post_uuid);
  const city_id = post.meta ? post.meta.city_sfid : '';
  const iataCodes = ['GVA', 'LBG', 'NCE', 'TEB', 'LTN', 'SVO'];
  
  return (
    <Query query={GET_DETAILS} variables={{
      iata: iataCodes,
      other_destinations,
      city_id
    }}>
      {({ loading, error, data }) => {
        if (loading) return null;
        if (error) return `Error!: ${error}`;
        return <JetCostDestination {...{ post, hreflangs, data }} />;
      }}
    </Query>
  );
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PageJetCostDestination);
