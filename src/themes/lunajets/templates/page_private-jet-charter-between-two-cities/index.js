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

class JetCharterBetweenDestinations extends Component {

  render() {
    const { post } = this.props;

    let jsonBody;

    const body = (post.body && post.body.main) ? post.body.main : '';

    if (typeof body === "string") {
      jsonBody = body;
    } else {
      jsonBody = JSON.stringify(body);
    }

    const { firstCity, secondCity } = post;
    const firstCityName = firstCity ? firstCity.name : "";
    const firstCityCountryName = firstCity ? firstCity.country.name : "";
    const secondCityName = secondCity ? secondCity.name : "";

    let firstAirportIds = [],
        secondAirportIds = [],
        heliportIds = [];
    post.meta.recommended_firstairports ? post.meta.recommended_firstairports.map(airport => (
      firstAirportIds.push(airport.post_uuid)
    )) : null;
    post.meta.recommended_secondairports ? post.meta.recommended_secondairports.map(airport => (
      secondAirportIds.push(airport.post_uuid)
    )) : null;
    post.meta.recommended_heliports ? post.meta.recommended_heliports.map(heliport => (
      heliportIds.push(heliport.post_uuid)
    )) : null;

    const heading = {
      subtitle: {
        defaultMessage: 'Private Jet Charter Between Destinations',
        id: 'client.pjcBetweenDestinations.subtitle',
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
        defaultMessage: 'FLY TO '+ firstCityName,
        id: 'client.flyTo.'+firstCityName+'.button',
    };

    const ids = (post.meta.aircraft_list || []).map(value => value.post_uuid).slice(0, 9);
    
    const flyToValue= firstCity ? {
      __typename: "LocationType",
      label: firstCityName + ", " + firstCityCountryName,
      value: firstCityName + ", " + firstCityName,
      countryCode: (firstCity && firstCity.country) ? firstCity.country.countryCode : "",
      geometry: {
        location:{
          lat : firstCity.coordinates.split(',')[0],
          lng : firstCity.coordinates.split(',')[0],
        }
      }
    } : null;

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
          airportIds={ firstAirportIds }
          defaultTitle={'Recommended Airports in '}
          titleId={'client.pjc2d.recomendedFirstAirports.sectionTitle'}
          fixedText={firstCityName}
          lastTextId={'client.pjc2d.recomendedFirstAirports.sectionTitle.lastText'}
          lastTextDefault={'N/A'}
          captionBackgroundColor={'dk-grey-bg'}
        />
        <MapListAirport
          airportIds={ secondAirportIds }
          defaultTitle={'Recommended Airports in '}
          titleId={'client.pjc2d.recomendedSecondAirports.sectionTitle'}
          fixedText={secondCityName}
          lastTextId={'client.pjc2d.recomendedFirstAirports.sectionTitle.lastText'}
          lastTextDefault={'N/A'}
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

export default JetCharterBetweenDestinations;
