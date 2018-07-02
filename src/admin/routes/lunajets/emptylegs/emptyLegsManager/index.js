
import React from "react";
import Layout from "../../../../components/Layout";
import EmptyLegsManager from "./emptyLegsManager";


export default {

  path: "/",
  async action({ client, store }) {
    return {
      chunk: "emptyLegsManager",
      permission: "manage_emptylegs",
      component: <Layout><EmptyLegsManager /></Layout>,
    };
  },

};
