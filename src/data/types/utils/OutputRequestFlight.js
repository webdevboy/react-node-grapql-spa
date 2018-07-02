import {
  GraphQLID as ID,
  GraphQLBoolean as BooleanType,
  GraphQLList as List,
  GraphQLString as StringType,
  GraphQLObjectType as ObjectType
} from 'graphql';

export default new ObjectType({
  name: 'RequestFlight',
  fields: {
    sfid: {
      type: ID,
      resolve(response) {
        return response.id;
      },
    },
    success: {
      type: BooleanType,
    },
    errors: {
      type: new List(StringType),
    },
  },
});
