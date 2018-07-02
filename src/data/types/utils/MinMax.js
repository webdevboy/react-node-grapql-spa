import {
  GraphQLInt as Integer,
  GraphQLInputObjectType,
} from 'graphql';

export default new GraphQLInputObjectType({
  name: 'MinMax',
  fields: {
    min: {
      type: Integer,
    },
    max: {
      type: Integer,
    },
  },
});