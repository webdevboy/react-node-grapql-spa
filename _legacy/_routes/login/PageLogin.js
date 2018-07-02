import React from "react";
import Page from "../../components/Page";
import Login from './Login';

async function action({ client, params, query }) {
  console.log(params, query);

  return {
    title: "login page",
    component: (
      <Page template="Default">
        <Login />
      </Page>
    ),
  };
}

export default action;
