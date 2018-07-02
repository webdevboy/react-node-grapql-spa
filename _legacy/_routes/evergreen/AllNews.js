import React from 'react';
import Event from '../../../components/Content/Detail/Event';
import gql from 'graphql-tag';
import Page from '../../components/Page';

async function action({ client, params, query }) {
  
  console.log(params, query);

  const { data: { events } } = await client.query({
    query: gql`
      {
        events: getEvents {
          id,
          title
        }
      }
    `
  });

  const filteredEvents = events.slice(query.offset, events.length);

  return {
    title: 'All Events',
    component: (
      <Page template="Default">
        {
          filteredEvents.map(event => <Event data={{ event }} />)
        }       
      </Page>
    ),
  }
}

export default action;
