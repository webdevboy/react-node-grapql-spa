
import React from "react";
import Layout from "../../../../components/Layout";
import Team from "./team";


export default {

  path: "/",
  async action({ client, store }) {
    return {
      chunk: "usersList",
      permission: "manage_team",
      component: <Layout><Team /></Layout>,
    };
  },

};
