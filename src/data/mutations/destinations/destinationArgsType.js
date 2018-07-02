import {
  GraphQLString as StringType,
  GraphQLID as ID,
  GraphQLList as List,
  GraphQLNonNull as NonNull,
  GraphQLInt as Integer,
  GraphQLObjectType as ObjectType,
  GraphQLBoolean as BooleanType
} from 'graphql';
import GraphQLJSON from 'graphql-type-json';
import GraphQLDate from 'graphql-date';

export default {
  id: {
    type: ID
  },
  destination_id: {
    type: StringType
  },
  title: {
    type: StringType
  },
  summary: {
    type: StringType
  },
  body: {
    type: GraphQLJSON
  },
  city_id: {
    type: StringType
  },
  language_id: {
    type: ID
  },
  user_id: {
    type: ID
  },
  published: {
    type: BooleanType
  },
  duplicate: {
    type: BooleanType
  },
}