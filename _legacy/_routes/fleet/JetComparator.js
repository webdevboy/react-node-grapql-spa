import React from 'react';

async function action({ params, query }) {
  console.log(params, query); // eslint-disable-line no-console

  return {
    title: "Jet Comparator",
    component: (
      <h1>Jet Comparator</h1>
    ),
  };
}

export default action;
