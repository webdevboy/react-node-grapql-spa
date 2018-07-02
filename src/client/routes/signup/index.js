/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import gql from 'graphql-tag';
import Signup from './signup';

async function action({ client, params, next }) {

  return {
    title: 'signup',
    chunks: ['client-signup'],
    name: 'signup',
    status: 200,
    component: <Signup />,
  };

};	

export default action;