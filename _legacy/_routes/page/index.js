import React from 'react';
import gql from 'graphql-tag';
import Page from '../../components/Page';
import Composer from '../../components/Composer';
import _ from 'lodash';
import queryGetPage from './queryGetPage.graphql';
import queryChildPage from './queryChildPage.graphql';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { setLocale } from '../../../shared/actions/intl';

export const action = async ({ route, params, client, next, intl, store }) => {

    const { data: { getPage: page } } = await client.query({
      query: queryGetPage,
      variables: {
        id: route.id,
        locale: params.locale || store.getState().intl.locale
      }
    });
  
    if (!page) {
      return await next()
    }
    
    // const site_title = getSingleSettings.value || '';
    // const page = getPage || null;
    // console.log('page => ',page);
    // const meta = page.meta && getPage.meta ? _.find(getPage.meta , (meta, index) => {
    //   if( meta && meta.language && meta.language.locale.locale == context.intl.locale){
    //     return meta
    //   } 
    // }) : null;

    const template = page.body['ROOT'].template;
    console.log('TEMPLATE => ', template);

    const { data = null } = await client.query({
      query: gql`${page.query}`,
      variables: params
    });

    const props = {
      id: 'ROOT',
      body: page.body,
      params: params,
      data: data
    }

    return {
      name: 'page',
      status: 200,
      component: (
        <Page template={template}>
          <Composer {...props} />
        </Page>
      ),
      // style: page.body[0].styleSheet,
      meta: page.meta || {},
      type: 'website',
    }
  
  }
