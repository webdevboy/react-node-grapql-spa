import React from 'react';
import PageNotFound from './404';

const action = () => ({
  meta: {
    title: '404 - Page Not Found',
  },
  component: <PageNotFound />,
  status: 404,
});

export default action;
