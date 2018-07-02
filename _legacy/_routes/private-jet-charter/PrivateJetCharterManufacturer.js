import React from 'react';

import Page from '../../components/Page';
import Header from '../../../components/Layout/Header';
import RequestFlight from '../../../components/Forms/RequestFlight';
import background from '../home/gfx/background.jpg';
import CharterDescription from 'components/Content/Detail/Charter/CharterDescription';
import CharterVsEmptyLeg from 'components/Content/Detail/Charter/CharterVsEmptyLeg';
import { AircraftsByManufacturer } from 'components/Content/Detail/Charter/FleetGrid';

async function action({ client, params, query }) {
  console.info(params);
  const heading = {
    subtitle: {
      defaultMessage: 'Private Jet Charter',
      id: 'client.banner.subtitle.',
      color: 'lt-blue',
    },
    paragraph_line1: {
      defaultMessage: 'FLY PRIVATE AT THE',
      id: 'client.charter.param.title1',
    },
    paragraph_line2: {
      defaultMessage: 'BEST PRICE',
      id: 'client.charter.param.title2',
    },
  };
  return {
    title: 'Private Jet Charter',
    component: (
      <Page template="Default">
        <Header background={background}>
          <RequestFlight />
        </Header>
        <CharterDescription heading={heading} />
        <AircraftsByManufacturer manufacturer_slug={params.manufacturer_slug} />
        <CharterVsEmptyLeg />
      </Page>
    ),
  };
}

export default action;
