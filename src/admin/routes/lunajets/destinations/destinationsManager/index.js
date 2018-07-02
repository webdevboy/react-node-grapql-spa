
import React from "react";
import Layout from "../../../../components/Layout";
import Destinations from "./destinations";


export default {

  path: "/",
  async action({ client, store }) {
    return {
      chunk: "destinationsList",
      permission: "manage_destinations",
      component: <Layout><Destinations /></Layout>,
    };
  },

};
