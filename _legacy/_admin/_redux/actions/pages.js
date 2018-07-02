import {  
    ADD_PAGE,
    CREATE_PAGE,
    UPDATE_PAGE,
    SET_PAGES,
} from '../constants';

import queryGetPages from './queries/pages.graphql';
import mutationCreatePage from './mutations/createPage.graphql';
import mutationUpdatePage from './mutations/updatePage.graphql';
import mutationUpdateOrCreateMeta from './mutations/updateOrCreateMeta.graphql';
import { capitalize } from 'lodash';

const setPages = function(data) {

  return async (dispatch, getState, { client }) => {

    const { data } = await client.query({
      query: queryGetPages,
    });

    const { getPages } = data; 
    const pages = getPages.reduce((pages, page) => {
      pages[page.id] = page // eslint-disable-line no-param-reassign
      return pages;
    }, {});

    // if has errors
    if (Object.keys(pages).length) {

      return dispatch({
        type: SET_PAGES,
        payload: pages
      });

    }   
    
  }; 

}


const createPage = function({ title, path, template, owner, body }) {

  return async (dispatch, getState, { client, history }) => {

    try {

      const pagePath = path.startsWith('/') ? path : path.replace(/^/, '/');



      const { data } = await client.networkInterface.query({
        query: mutationCreatePage,
        variables: { title: capitalize(title), path: pagePath , template, body,  owner },
      });

      const { createPage } = data;

      dispatch({
        type: CREATE_PAGE,
        payload: createPage
      });

    } catch(e) {

      const errors = [{
        key: 'general',
        message: 'Unexpected server error'
      }];

    }

  };
}

const updatePage = function({id, body, path, title, query, external_scripts, custom_script, state}) {
  console.log(id, body, path, title, query, external_scripts, custom_script, state)
  return async (dispatch, getState, { client, history }) => {

    try {

      const { data } = await client.networkInterface.query({
        query: mutationUpdatePage,
        variables: { id, body, title, path, query, external_scripts, custom_script, state },
      });

      const updatePage = data.updatePage;

        dispatch({
          type: UPDATE_PAGE,
          payload: updatePage,
        });
        
    } catch(e) {

      const errors = [{
        key: 'general',
        message: 'Unexpected server error'
      }];

    }

  };
}


const updateOrCreateMeta = (state) => {
  return async (dispatch, getState, { client }) => {

    const { data } = await client.networkInterface.query({
      query: mutationUpdateOrCreateMeta,
      variables: state
    });
  }; 
}


export { setPages, createPage, updatePage, updateOrCreateMeta }