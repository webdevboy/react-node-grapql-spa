import React from "react";
import Layout from "../../../components/Layout";
import Contacts from "../../../components/Contacts";
import { setOffices } from "../../../../redux/actions/offices";

export default {

  path: "/offices",

  // Keep in mind, routes are evaluated in order
  children: [
    {
      path: "/",
      async action({ client, store, fetch }) {
        // if(!store.getState().offices)
        await store.dispatch(setOffices());

        return {
          chunk: "officesTable",
          permission: "manage_contacts",
          component: <Layout><Contacts /></Layout>,
        };
      },

    },
  ],

  async action({ next }) {
    const route = await next();
    // check if token is present or redirect to /login

    // Provide default values for title, description etc.
    route.title = "Contacts Manager";
    route.description = route.description || "";

    return route;
  },

};
