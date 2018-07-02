import React from "react";
import Page from "../../components/Page";
import Homepage from "./Homepage";

// import gql from 'graphql-tag';
// import Composer from '../../components/Composer';
// import queryHomePage from './queryHomePage.graphql';
// import { setLocale } from "../../../shared/actions/intl";
function action({ route, params, client, next, intl, store }) {
  // if (params.locale) {
  //   await store.dispatch(setLocale({ locale: params.locale }));
  //   console.log('HERE');
  // }

  // const { data } = await client.query({
  //   query: queryHomePage,
  // });

  // const homepage = data.getHomepage || null;

  // if (!homepage) {
  //   const route = await next();
  //   return route;
  // }

  let currentLocale = store.getState().intl.locale;
  let title = store.getState().intl.messages[currentLocale]["client.siteTitle"];
  let description = store.getState().intl.messages[currentLocale]["client.siteDescription"];
  return {
    title: title,
    description: description,
    component: (
      <Page template="Default">
        <Homepage />
      </Page>
    ),
  };
}

export default action;
