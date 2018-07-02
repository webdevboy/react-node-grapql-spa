import React from "react";
import Layout from "admin/components/Layout";
import FourOhFour from "./404";

function action() {
  return {
    title: "Page Not Found",
    component: (<Layout><FourOhFour /></Layout>),
    status: 404,
  };
}

export default action;
