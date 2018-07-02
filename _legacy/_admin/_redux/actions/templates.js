import {  
    ADD_TEMPLATE,
    CREATE_TEMPLATE,
    UPDATE_TEMPLATE,
    SET_TEMPLATES,
} from '../constants';

import queryGetTemplates from './queries/templates.graphql';
import mutationCreateTemplate from './mutations/createTemplate.graphql';
import mutationUpdateTemplate from './mutations/updateTemplate.graphql';

const setTemplates = function(data) {

  return async (dispatch, getState, { client }) => {

    const { data } = await client.query({
      query: queryGetTemplates,
    });

    const { getTemplates } = data; 
    const Templates = getTemplates.reduce((Templates, Template) => {
      Templates[Template.id] = Template // eslint-disable-line no-param-reassign
      return Templates;
    }, {});

    // if has errors
    if (Object.keys(Templates).length) {

      return dispatch({
        type: SET_TEMPLATES,
        payload: Templates
      });

    }   
    
  }; 

}


const createTemplate = function({ name, body }) {
  console.log(name, body)
  return async (dispatch, getState, { client, history }) => {

    try {

      const { data } = await client.networkInterface.query({
        query: mutationCreateTemplate,
        variables: { name, body },
      });

      const { createTemplate } = data;

      dispatch({
        type: CREATE_TEMPLATE,
        payload: createTemplate
      });

    } catch(e) {

      const errors = [{
        key: 'general',
        message: 'Unexpected server error'
      }];

    }

  };
}

const updateTemplate = function({id, body}) {

  return async (dispatch, getState, { client, history }) => {

    try {

      const { data } = await client.networkInterface.query({
        query: mutationUpdateTemplate,
        variables: { id, body },
      });

      const updateTemplate = data.updateTemplate;

        dispatch({
          type: UPDATE_TEMPLATE,
          payload: updateTemplate,
        });
        
    } catch(e) {

      const errors = [{
        key: 'general',
        message: 'Unexpected server error'
      }];

    }

  };
}



export { setTemplates, createTemplate, updateTemplate }