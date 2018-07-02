import queryAddSuscriber from './mutations/addSubscriber.graphql';

const addSubscriber = function(email) {

  return async (dispatch, getState, { client }) => {
    const { data } =  await client.networkInterface.query({
      query: queryAddSuscriber,
      variables: { email },
    });
    // if has errors
  }; 

}



export { addSubscriber }
