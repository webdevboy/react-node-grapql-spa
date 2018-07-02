import React from "react";
import Layout from "../../components/Layout";
import Destinations from "./Destinations";
import Destination from "./Destination";
import { fetchDestinations } from "admin/actions/destinations";
import { fetchCities } from "admin/actions/cities";

export default {

  path: "/destinations",
  name: "Destinations",

  children: [
    {
      path: "/",
      name: "Manage Destinations",
      async action({
        client, store, query, route,
      }) {
        return {
          chunk: "destinations",
          permission: "manage_destinations",
          name: "Destinations",
          title: "Manage destinations",
          component: (<Layout currentPath={route}><Destinations currentRoute={route} /></Layout>),
        };
      },
    },
    {
      path: "/add",
      name: "Add Destination",
      async action({
        client, store, query, route,
      }) {
        return {
          chunk: "destinations",
          permission: "manage_destinations",
          name: "Add Destination",
          title: "Add Destination",
          component: (<Layout currentPath={route}><Destination add currentRoute={route} /></Layout>),
        };
      },
    },
    {
      path: "/edit/:id",
      name: "Edit Destination",
      async action({
        client, store, query, route, params,
      }) {
        // let destination = await store.getState().destinations.byId[params.id];
        // if (!destination) {
        //   await store.dispatch(fetchDestination(params.id));
        // }
        return {
          chunk: "destinations",
          permission: "manage_destinations",
          name: "Edit Destination",
          title: "Edit Destination",
          component: <Layout><Destination edit id={params.id} currentRoute={route} /></Layout>,
        };
      },
    },

  ],

  async action({ next, store }) {
    const defaultLocale = await store.getState().intl.defaultLocale;
    const localesById = await store.getState().translations.locales.byId;
    const languagesById = await store.getState().translations.languages.byId;

    const cities = await store.getState().cities.ids;
    if (!cities.length) {
      await store.dispatch(fetchCities());
    }

    const destinations = await store.getState().destinations.ids;

    if (!destinations.length) {
      console.log("Try to fetch Destinations");
      await store.dispatch(fetchDestinations());
    }

    return await next();
  },

};

