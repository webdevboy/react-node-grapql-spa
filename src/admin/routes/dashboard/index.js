import React from "react";
import Dashboard from "./Dashboard";
import Layout from "../../components/Layout";

function action({ route }) {
  return {
    title: "Dashboard",
    component: (
      <Layout currentRoute={route}>
        <Dashboard currentRoute={route} />
      </Layout>
    ),
  };
}

export default action;
