import React from 'react';
import ErrorPage from './ErrorPage';

const action = () => ({
  meta: {
    title: 'Error',
  },
  component: <ErrorPage />,
  status: 500,
});

export default action;