import React, { Component } from 'react';
import { Query } from 'react-apollo';
import _ from "lodash";
import Header from 'themes/lunajets/components/Layout/Header';
import JetCostCompare from 'themes/lunajets/components/Content/Detail/JetCost/JetCostCompare';
import JetCostDescription from 'themes/lunajets/components/Content/Detail/JetCost/JetCostDescription';
import JetCostMap from 'themes/lunajets/components/Content/Detail/JetCost/JetCostMap';
import JetCostEstimation from 'themes/lunajets/components/Content/Detail/JetCost/JetCostEstimation';
import Page from '../page';
import GET_AIRPORTS from './getSFAirports.graphql';

const iataCodes = ['GVA', 'LBG', 'NCE', 'TEB', 'LTN', 'SVO'];

class JetCost extends Component {

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
    const { hreflangs, post, data: { city, sfAirports } } = this.props;

    const estimations = this.getData(sfAirports);
  
    return (
      <Page post={post} hreflangs={hreflangs}>
        <Header background={post.media.src}/>
        <JetCostDescription
          description={post.body ? post.body.main : {}}
          title={post.title}
        />
        <JetCostEstimation data={estimations} showLength={5} locale={post.language.locale} showEnquire/>
        <JetCostMap />
        <JetCostCompare />
      </Page>
    );
  }
}

const PageJetCost = ({ post, hreflangs }) =>
  (<Query query={GET_AIRPORTS} variables={{ iata: iataCodes }}>
    {({ loading, error, data }) => {      
      if (loading) return null;
      if (error) return `Error!: ${error}`;
      return <JetCost {...{ post, hreflangs, data }} />;
    }}
   </Query>);

export default PageJetCost;
