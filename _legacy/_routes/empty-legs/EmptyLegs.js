import React from "react";
import Page from "../../components/Page";
import EmptyLegsDescription from "../../../components/Content/EmptyLegs/EmptyLegsDescription";
import EmptyLegsSearch from "../../../components/Content/EmptyLegs/EmptyLegsSearch";

async function action({ client, params, query }) {
  return {
    title: "Empty Leg",
    component: (
      <Page template="Default">
        <EmptyLegsDescription />
        <EmptyLegsSearch />
      </Page>
    ),
  };
}

export default action;
