import React from "react";
import Layout from "admin/components/Layout";
import Offices from "./Offices";
import Office from "./Office";
import { fetchOffices, fetchOffice } from "admin/actions/offices";
import { fetchUser } from "admin/actions/users";

export default {

  path: "/offices",

  children: [
    {
      path: "",
      name: "Offices",
      async action({
        client, store, query, route,
      }) {
        return {
          permission: "manage_offices",
          title: route.name,
          component: (<Layout currentPath={route}><Offices currentRoute={route} /></Layout>),
        };
      },
    },
    {
      path: "/add",
      name: "Add Office",
      async action({
        client, store, query, route,
      }) {
        return {
          permission: "manage_offices",
          title: route.name,
          component: (<Layout currentPath={route}><Office add currentRoute={route} /></Layout>),
        };
      },
    },
    {
      path: "/edit/:id",
      name: "Edit Office",
      async action({
        client, store, query, route, params,
      }) {
        const office = await store.getState().offices.byId[params.id];
        if (!office) {
          await store.dispatch(fetchOffice(params.id));
        }
        return {
          permission: "manage_offices",
          title: route.name,
          component: <Layout><Office edit id={params.id} currentRoute={route} /></Layout>,
        };
      },
    },

  ],

  async action({ next, store }) {
    const offices = await store.getState().offices.ids;

    if (!offices.length) {
      console.log("Try to fetch Offices");
      await store.dispatch(fetchOffices());
    }

    return await next();
  },

};

