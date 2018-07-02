import React, { Component } from 'react';
import { Query } from "react-apollo";
import Header from 'themes/lunajets/components/Layout/Header';
import RequestFlight from 'themes/lunajets/components/Forms/RequestFlight';
import background from '../home/gfx/background.jpg';
import SectionDescription from 'themes/lunajets/components/Content/Detail/SectionDescription';
import { Aircrafts } from 'themes/lunajets/components/Content/Detail/Charter/FleetGrid';
import MapListAirport from 'themes/lunajets/components/Content/Map/MapListAirport';
import Page from '../page';

import GET_AIRCRAFTS from '../../queries/getAircrafts.gql';

class JetCharterDestination extends Component {

  render() {
    const { post } = this.props;

    let jsonBody;

    const body = (post.body && post.body.main) ? post.body.main : '';

    if (typeof body === "string") {
      jsonBody = body;
    } else {
      jsonBody = JSON.stringify(body);
    }

    const { city } = post;
    const cityName = city ? city.name : "";
    const countryName = city && city.country ? city.country.name : "";
    const countryCode = city && city.country ? city.country.countryCode : "";
    let airportIds = [],
        heliportIds = [];
    post.meta.recommended_airports ? post.meta.recommended_airports.map(airport => (
      airportIds.push(airport.post_uuid)
    )) : null;
    post.meta.recommended_heliports ? post.meta.recommended_heliports.map(heliport => (
      heliportIds.push(heliport.post_uuid)
    )) : null;

    const flyToValue={
      __typename: "LocationType",
      label: cityName + ", " + countryName,
      value: cityName + ", " + countryName,
      countryCode,
      geometry: {
        location:{
          lat : city && city.coordinates.split(',')[0],
          lng : city && city.coordinates.split(',')[0],
        }
      }
    }

    const heading = {
      subtitle: {
        defaultMessage: 'Private Jet Charter Destination',
        id: 'client.pjcDestination.subtitle',
        color: 'lt-blue',
      },
      title: {
        defaultMessage: post.title.toUpperCase(),
      },
      content: {
        defaultMessage: jsonBody,
      },
    };

    const flyToDestinationButton = {
        defaultMessage: 'FLY TO '+ cityName,
        id: 'client.flyTo.'+cityName+'.button',
    };

    const ids = (post.meta.aircraft_list || []).map(value => value.post_uuid).slice(0, 9);

    return (
      <Page post={post} header={{request_flight: false}}>
        <Header background={ (post.media && post.media.src) || background} alt={post.title.toUpperCase()}>
          <RequestFlight />
        </Header>
        <SectionDescription section={heading} />
        <Query query={GET_AIRCRAFTS} variables={{ ids }}>
          {({ loading, error, data }) => {
            if (loading) return null;
            if (error) return `Error!: ${error}`;

            return <Aircrafts aircrafts={data.posts ? data.posts : []} buttonName={flyToDestinationButton} flyToValue={flyToValue} />;
          }}
        </Query>
        <MapListAirport
          data={{ airportIds }}
          defaultTitle={'Recommended Airports'}
          titleId={'client.eventDetail.recomendedAirports.sectionTitle'}
          captionBackgroundColor={'dk-grey-bg'}
        />
        <MapListAirport
          data={{ heliportIds }}
          defaultTitle={'Recommended Heliports'}
          titleId={'client.eventDetail.recomendedHeliports.sectionTitle'}
          captionBackgroundColor={'dk-blue-bg'}
        />
      </Page>
    );
  }
}

export default JetCharterDestination;
