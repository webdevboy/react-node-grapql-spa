import React from "react";

import Fleet from "./Fleet";

async function action({ params, query }) {
  return {
    title: "Fleet",
    component: <Fleet />,
  };
}

export default action;
