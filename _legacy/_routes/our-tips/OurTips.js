import React from 'react';
import cx from 'classnames';
import EventsList from '../../../components/Content/Lists/EventsList';
import OurTips from '../../../components/Content/Lists/OurTips';
import Carousel from '../../../components/Widgets/Carousel';
import gql from 'graphql-tag';
import Page from '../../components/Page';
import queryGetArticlesForOurTips from './queryGetArticlesForOurTips.graphql';
import Banner from '../../../components/Content/Banner';
import Heading from 'components/Layout/Heading';

async function action({ client, params, query }) {
  const state = {
    background: 'https://upgrade-it-lab.s3-eu-west-1.amazonaws.com/public/1e6772e6f0ee907c8097b0099c9838ab1507906579509.png',
    heading: {
      subtitle:{
        defaultMessage: 'Our tips',
        id: 'client.banner.subtitle.',
        color: 'lt-blue'
      }
    },
    version: 3,
    gradient: false
  }
  

  const { data : {categories}} = await client.query({
    query: queryGetArticlesForOurTips,
    variables: {
    	language_id: "d5debdd7-6871-48fa-8080-c95ae377069d",
    	cat_id: "our-tips",
		  limit: 10,
		  offset: 0
    }
  });

  return {
    title: 'Our tips demo page',
    component: (
      <Page template="Default">
      	<Banner {...state} />
        <Heading message={{default:"the expertise of our private aviation advisors", id: "id"}}/>
        <OurTips data={{ categories }} getArticleFct={(value) => {
            return client.query({
              query: queryGetArticlesForOurTips,
              variables: {
                language_id: "d5debdd7-6871-48fa-8080-c95ae377069d",
                cat_id: "our-tips",
                limit: 10,
                offset: value
              }
            });
            }
          }
        />
      </Page>
    ),
  }
}

export default action;
