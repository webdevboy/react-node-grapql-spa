import React from "react";
import Event from "../../../components/Content/Detail/Event";
import EventBanner from "../../../components/Content/Detail/Event/EventBanner";
import EventDescription from "../../../components/Content/Detail/Event/EventDescription";
import EventRecommended from "../../../components/Content/Detail/Event/EventRecommended";
import EventHelicopter from "../../../components/Content/Detail/Event/EventHelicopter";
import gql from "graphql-tag";
import Page from "../../components/Page";
import NotFound from "../404/NotFound";
import queryGetEventDetail from "./queryGetEventDetail.graphql";

async function action({ client, params, query }) {
  console.log(params, query);

  const { data: { event } } = await client.query({
    query: queryGetEventDetail,
    variables: {
      id: params.id,
      language_id: params.languageId,
    },
  });

  //const filteredArticles = aricles.slice(query.offset, aricles.length);

  return event
    ? {
        title: "Event Detail",
        component: (
          <Page template="Default">
            {<EventBanner data={{ event }} />}
            {<EventDescription data={{ event }} />}
            {<EventRecommended data={{ event }} />}
            {event.display_helicopter_transfer ? <EventHelicopter /> : null}
          </Page>
        ),
      }
    : {
        title: "Page Not Found",
        component: (
          <Page template={"Default"}>
            <NotFound />
          </Page>
        ),
        status: 404,
        description: "Page Not Found",
      };
}

export default action;
