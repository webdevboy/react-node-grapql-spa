import React from 'react';
import Page from '../../components/Page';
import Header from '../../../components/Layout/Header';
import RequestFlight from '../../../components/Forms/RequestFlight';
import background from '../home/gfx/background.jpg';
import CharterDescription from '../../../components/Content/Detail/Charter/CharterDescription';
import CharterVsEmptyLeg from '../../../components/Content/Detail/Charter/CharterVsEmptyLeg';
import { Aircrafts } from '../../../components/Content/Detail/Charter/FleetGrid';
import MapListAirport from 'components/Content/Map/MapListAirport';
import EventHelicopter from '../../../components/Content/Detail/Event/EventHelicopter';

async function action({ client, params, query }) {
  console.log(params, query);

  const fleets = [
    {
      id: '12344567',
      image:
        'https://www.toulouse-tourisme.com/sites/www.toulouse-tourisme.com/files/styles/incontournable_hp/public/thumbnails/image/incontournables_0.jpg',
      name: 'Aircraft 1',
      alt: 'test',
      title: 'test',
    },
    {
      id: '12344567',
      image:
        'https://www.toulouse-tourisme.com/sites/www.toulouse-tourisme.com/files/styles/incontournable_hp/public/thumbnails/image/incontournables_0.jpg',
      name: 'Aircraft 2',
      alt: 'test',
      title: 'test',
    },
    {
      id: '12344567',
      image:
        'https://www.toulouse-tourisme.com/sites/www.toulouse-tourisme.com/files/styles/incontournable_hp/public/thumbnails/image/incontournables_0.jpg',
      name: 'Aircraft 3',
      alt: 'test',
      title: 'test',
    },
    {
      id: '12344567',
      image:
        'https://www.toulouse-tourisme.com/sites/www.toulouse-tourisme.com/files/styles/incontournable_hp/public/thumbnails/image/incontournables_0.jpg',
      name: 'Aircraft 4',
      alt: 'test',
      title: 'test',
    },
    {
      id: '12344567',
      image:
        'https://www.toulouse-tourisme.com/sites/www.toulouse-tourisme.com/files/styles/incontournable_hp/public/thumbnails/image/incontournables_0.jpg',
      name: 'Aircraft 5',
      alt: 'test',
      title: 'test',
    },
    {
      id: '12344567',
      image:
        'https://www.toulouse-tourisme.com/sites/www.toulouse-tourisme.com/files/styles/incontournable_hp/public/thumbnails/image/incontournables_0.jpg',
      name: 'Aircraft 6',
      alt: 'test',
      title: 'test',
    },
    {
      id: '12344567',
      image:
        'https://www.toulouse-tourisme.com/sites/www.toulouse-tourisme.com/files/styles/incontournable_hp/public/thumbnails/image/incontournables_0.jpg',
      name: 'Aircraft 7',
      alt: 'test',
      title: 'test',
    },
    {
      id: '12344567',
      image:
        'https://www.toulouse-tourisme.com/sites/www.toulouse-tourisme.com/files/styles/incontournable_hp/public/thumbnails/image/incontournables_0.jpg',
      name: 'Aircraft 8',
      alt: 'test',
      title: 'test',
    },
    {
      id: '12344567',
      image:
        'https://www.toulouse-tourisme.com/sites/www.toulouse-tourisme.com/files/styles/incontournable_hp/public/thumbnails/image/incontournables_0.jpg',
      name: 'Aircraft 9',
      alt: 'test',
      title: 'test',
    },
  ];

  const cityName = params.toDestination.toUpperCase();

  const heading = {
    subtitle: {
      defaultMessage: 'Private Jet Charter',
      id: 'client.banner.subtitle.',
      color: 'lt-blue',
    },
    paragraph_line1: {
      defaultMessage: 'CHARTER YOUR PRIVATE',
      id: 'client.charter.destination.param.title1',
    },
    paragraph_line2: {
      defaultMessage: 'JET TO ' + cityName,
      id: 'client.charter.destination.param.title2',
    },
  };
  const flyToDestinationButton = {
      defaultMessage: 'FLY TO '+ cityName,
      id: 'client.flyTo.'+cityName+'.button',     
  };
  return {
    title: 'Private Jet Charter',
    component: (
      <Page template="Default">
        <Header background={background}>
          <RequestFlight />
        </Header>
        <CharterDescription heading={heading} />
        <Aircrafts data={{ fleets }} buttonName={flyToDestinationButton} />
        <CharterVsEmptyLeg />
        <MapListAirport
          data={{ cityName }}
          defaultTitle={'Recommended Airports'}
          titleId={'client.eventDetail.recomendedAirports.sectionTitle'}
          captionBackgroundColor={'dk-grey-bg'}
        />
        <MapListAirport
          data={{ cityName }}
          defaultTitle={'Recommended Heliports'}
          titleId={'client.eventDetail.recomendedHeliports.sectionTitle'}
          captionBackgroundColor={'dk-blue-bg'}
        />
      </Page>
    ),
  };
}

export default action;
