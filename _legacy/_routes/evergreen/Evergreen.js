import React from "react";
import EventsList from "../../../components/Content/Lists/EventsList";
import LatestNews from "../../../components/Content/Lists/LatestNews";
import Slider from "../../../components/Widgets/Slider";
import gql from "graphql-tag";
import Page from "../../components/Page";
import queryGetArticlesForEvergreen from "./queryGetArticlesForEvergreen.graphql";
import queryGetEventsForEvergreen from "./queryGetEventsForEvergreen.graphql";

async function action({ client, params, query }) {
  console.log(params, query);

  const { data: { articles } } = await client.query({
    query: queryGetArticlesForEvergreen,
    variables: {
      language_id: params.languageId,
      cat_id: "news",
      pagination: {
        limit: 5,
        offset: 0,
      },
    },
  });

  const { data: { events } } = await client.query({
    query: queryGetEventsForEvergreen,
    variables: {
      language_id: params.languageId,
      published: true,
      pagination: { offset: 0, limit: 3 },
    },
  });

  const slides = [
    {
      image:
        "https://images.duckduckgo.com/iu/?u=https%3A%2F%2Fimage.pbs.org%2Fposter_images%2Fcollections%2FGREAT_JOB_poster.png.resize.710x399.png&f=1",
      description: "slider 1 descritpion",
    },
    {
      image:
        "https://images.duckduckgo.com/iu/?u=https%3A%2F%2Fimage.pbs.org%2Fposter_images%2Fcollections%2FGREAT_JOB_poster.png.resize.710x399.png&f=1",
      description: "slide 2 description",
    },
  ];

  //const filteredEvents = events.slice(query.offset, events.length);
  //TODO: get category_id with news and language then passe the category_id to queryGetArticlesForEvergreen

  return {
    title: "Evergreen demo page",
    component: (
      <Page template="Default">
        <Slider slides={slides} />
        <LatestNews
          data={{ articles }}
          getArticleFct={value => {
            return client.query({
              query: queryGetArticlesForEvergreen,
              variables: {
                language_id: params.languageId,
                cat_id: "news",
                pagination: {
                  limit: 5,
                  offset: value,
                },
              },
            });
          }}
          locale={params.locale}
        />
        <EventsList
          data={{ events }}
          getEventFct={value => {
            return client.query({
              query: queryGetEventsForEvergreen,
              variables: { language_id: params.languageId, pagination: { offset: value, limit: 4 } },
            });
          }}
          locale={params.locale}
        />
      </Page>
    ),
  };
}

export default action;
