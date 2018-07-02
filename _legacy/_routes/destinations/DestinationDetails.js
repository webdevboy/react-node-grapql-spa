import React from "react";

async function action({ client, params, query }) {
  return {
    title: "Destination Details",
    component: (
      <h1>Destination Details</h1>
    ),
  };
}

export default action;
