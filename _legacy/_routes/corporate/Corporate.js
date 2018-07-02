import React from 'react';
import cx from 'classnames';

import Page from 'client/components/Page';
import DestinationList from 'components/Content/Destination/DestinationList';
import Heading from 'components/Layout/Heading';
import Banner from 'components/Content/Banner';
import CorporateList from 'components/Content/Corporate/CorporateList';
import { paragraph } from 'mock';

async function action({ client, params, query }) {
    const state = {
        background: 'https://upgrade-it-lab.s3-eu-west-1.amazonaws.com/public/1e6772e6f0ee907c8097b0099c9838ab1507906579509.png',
        heading: {
            subtitle:{
            defaultMessage: 'Corporate',
            id: 'client.banner.subtitle.',
            color: 'lt-blue'
            }
        },
        version: 3,
        gradient: false
    }
  return {
    title: 'Corporates',
    component: (
      <Page template="Default">
        <Banner {...state} />
        <Heading message={{ default: 'a solution for each industry', id: 'id' }} />
        <div className={cx("container")}>
          <div className={cx('row')}>
            <div className={cx('col')}>
                <p>{paragraph}</p>
            </div>
          </div>
        </div>
        <CorporateList />
      </Page>
    ),
  };
}

export default action;
