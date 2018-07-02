import React from "react";
import { slides } from "mock";

import Page from "client/components/Page";
import DestinationList from "components/Content/Destination/DestinationList";
import Slider from "components/Widgets/Slider";
import Heading from "components/Layout/Heading";
import SectionTitle from "components/Layout/SectionTitle";

async function action({ client, params, query }) {
  return {
    title: "Destinations",
    component: (
      <Page template="Default">
        <Slider slides={slides} />
        <div className="pt-5">
          <SectionTitle textId="title.destinationList" />
          <Heading textId="heading.allDestinations" />
        </div>
        <DestinationList />
      </Page>
    ),
  };
}

export default action;
