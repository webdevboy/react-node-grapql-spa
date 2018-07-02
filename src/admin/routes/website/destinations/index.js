import React from "react";
import Layout from "admin/components/Layout";
import Destinations from "./Destinations";
import Destination from "./Destination";
import { fetchDestinations } from "admin/actions/destinations";
import { fetchCities } from "admin/actions/cities";
import { showLoading, hideLoading } from "react-redux-loading-bar";

export default {

  path: "/destinations",

  children: [
    {
      path: "",
      name: "Destinations",
      async action({
        client, store, query, route,
      }) {
        return {
          permission: "manage_destinations",
          title: route.name,
          component: (
            <Layout currentPath={route}>
              <Destinations currentRoute={route} />
            </Layout>
          ),
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
          permission: "manage_destinations",
          title: route.name,
          component: (
            <Layout currentPath={route}>
              <Destination add currentRoute={route} />
            </Layout>
          ),
        };
      },
    },
    {
      path: "/add/:id/:langId",
      name: "Add Translation for Destination",
      async action({
        client, store, params, route, query,
      }) {
        return {
          permission: "manage_events",
          title: route.name,
          component: (<Layout currentPath={route}><Destination add translate duplicate={(query.duplicate == "true")} langId={params.langId} id={params.id} currentRoute={route} /></Layout>),
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
          permission: "manage_destinations",
          title: route.name,
          component: <Layout><Destination edit id={params.id} currentRoute={route} /></Layout>,
        };
      },
    },

  ],

  async action({ next, store }) {
    await store.dispatch(showLoading());
    const defaultLocale = await store.getState().intl.locale;
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

    await store.dispatch(hideLoading());

    return await next();
  },

};

