
import React from "react";
import Layout from "../../../../components/Layout";
import Aircrafts from "./aircrafts";


export default {

  path: "/",
  async action({ client, store }) {
    return {
      chunk: "aircraftsList",
      permission: "manage_aircrafts",
      component: <Layout><Aircrafts /></Layout>,
    };
  },

};
