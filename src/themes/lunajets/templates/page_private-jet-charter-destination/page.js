import React, { Component } from 'react';
import { connect } from 'react-redux';
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import Header from 'themes/lunajets/components/Layout/Header';
import RequestFlight from 'themes/lunajets/components/Forms/RequestFlight';
import background from '../home/gfx/background.jpg';
import SectionDescription from 'themes/lunajets/components/Content/Detail/SectionDescription';
import CharterVsEmptyLeg from 'themes/lunajets/components/Content/Detail/Charter/CharterVsEmptyLeg';
import FleetGrid from 'themes/lunajets/components/Content/Detail/Charter/FleetGrid';
import MapListAirport from 'themes/lunajets/components/Content/Map/MapListAirport';
import EventHelicopter from 'themes/lunajets/components/Content/Detail/Event/EventHelicopter';

export class Page extends Component {
  render() {
    const post = this.props.post;
  
    const cityName = "WASHINGTON";
  
    const heading = {
      subtitle: {
        defaultMessage: 'Private Jet Charter Destination',
        id: 'client.pjcDestination.page.subtitle',
        color: 'lt-blue',
      },
      title: {
        defaultMessage: post.title.toUpperCase(),
      },
    };
    const flyToDestinationButton = {
        defaultMessage: 'FLY TO '+ cityName,
        id: 'client.flyTo.'+cityName+'.button',     
    };
    
    return [
	    <Header background={background}>
        <RequestFlight />
      </Header>,
      <SectionDescription section={heading} />,
      <FleetGrid data={{ fleets }} buttonName={flyToDestinationButton} />,
      <CharterVsEmptyLeg />,
      <MapListAirport
        data={{ cityName }}
        defaultTitle={'Recommended Airports'}
        titleId={'client.eventDetail.recomendedAirports.sectionTitle'}
        captionBackgroundColor={'dk-grey-bg'}
      />,
      <MapListAirport
        data={{ cityName }}
        defaultTitle={'Recommended Heliports'}
        titleId={'client.eventDetail.recomendedHeliports.sectionTitle'}
        captionBackgroundColor={'dk-blue-bg'}
      />
	];
  }
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(Page);
