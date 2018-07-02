import { 
    ADD_COMPONENT,
    UPDATE_COMPONENT,
} from '../constants';

import queryGetComponents from './queries/components.graphql';
import mutationUpdateComponent from './mutations/updateComponent.graphql';
import mutationCreateComponent from './mutations/createComponent.graphql';



const getComponents = function() {

  return async (dispatch, getState, { client }) => {

    const { data } = await client.query({
      query: queryGetComponents,
    });

    const { components } = data;
    // if has errors
    if (components.length) {
        components.map(component => {
          return dispatch({
            type: ADD_COMPONENT,
            component
          });
        });
      }   
    }; 
  }

const createComponent = function(name, category, body, dependencies) {
  return async (dispatch, getState, { client, history }) => {

    try {
      const { data } = await client.networkInterface.query({
        query: mutationCreateComponent,
        variables: { name: name, category: category, body: body, dependencies: dependencies },
      });
      const { createComponent } = data;
      dispatch({
        type: ADD_COMPONENT,
        component: createComponent
      });

    } catch(e) {

      const errors = [{
        key: 'general',
        message: 'Unexpected server error'
      }];

    }

  };
}


const updateComponent = function({id, body}) {

  return async (dispatch, getState, { client, history }) => {

    try {

      const { data } = await client.networkInterface.query({
        query: mutationUpdateComponent,
        variables: { id, body },
      });

      const updateComponent = data.updateComponent;

        dispatch({
          type: UPDATE_COMPONENT,
          component: updateComponent,
        });
        
    } catch(e) {

      const errors = [{
        key: 'general',
        message: 'Unexpected server error'
      }];

    }

  };
}

export { getComponents, updateComponent, createComponent }