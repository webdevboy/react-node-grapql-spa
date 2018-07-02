import React from 'react';

async function action({ params, query }) {
  console.log(params, query); // eslint-disable-line no-console

  return {
    title: "Aircraft Manufacturer",
    component: (
      <h1>Manufacturer</h1>
    ),
  };
}

export default action;
