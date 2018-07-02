import React from "react";
import Layout from "../../../components/Layout";
import Team from "../../../components/Team";
import { setTeams } from "../../../../redux/actions/team";

export default {

  path: "/team",

  // Keep in mind, routes are evaluated in order
  children: [
    {
      path: "/",
      async action({ client, store, fetch }) {
        // if(!store.getState().teams)
        await store.dispatch(setTeams());

        return {
          chunk: "departmentTable",
          permission: "manage_team",
          component: <Layout><Team /></Layout>,
        };
      },

    },
    {
      path: "/:department",
      async action({ client, store }, context) {
        // await store.dispatch(setTranslations(context.locale));
        await store.dispatch(setTeams());
        return {
          chunk: "teamTable",
          permission: "manage_team",
          component: <Layout><Team department={context.department} /></Layout>,
        };
      },
    },
  ],

  async action({ next }) {
    const route = await next();
    // check if token is present or redirect to /login

    // Provide default values for title, description etc.
    route.title = "Team Manager";
    route.description = route.description || "";

    return route;
  },

};
