import {
  GraphQLInputObjectType as InputObjectType,
  GraphQLInt,
} from 'graphql';

export default new InputObjectType({
  name: 'Pagination',
  fields: {
    offset: {
      type: GraphQLInt,
      defaultValue: 0,
    },
    limit: {
      type: GraphQLInt,
      defaultValue: 5,
    },
  },

});
