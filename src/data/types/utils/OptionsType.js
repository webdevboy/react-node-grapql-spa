import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLInputObjectType,
} from 'graphql';

export default new GraphQLInputObjectType({
  name: 'OptionsInput',
  fields: {
    locale: {
      type: GraphQLString,
    },
    website: {
      type: GraphQLBoolean,
    },
    app: {
      type: GraphQLBoolean,
    },
  }
});

