import React from 'react';
import PageUnavailable from './503';

const action = () => ({
  meta: {
    title: '503 - Service Unavailable',
  },
  component: <PageUnavailable />,
  status: 503,
});

export default action;
