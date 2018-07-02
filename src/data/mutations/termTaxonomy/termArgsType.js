import {
  GraphQLString as StringType,
  GraphQLID as ID,
  GraphQLList as List,
  GraphQLNonNull as NonNull,
  GraphQLInt as Integer,
  GraphQLObjectType as ObjectType,
  GraphQLBoolean as BooleanType,
  GraphQLEnumType as EnumType,
} from 'graphql';
import GraphQLDate from 'graphql-date';
import GraphQLJSON from 'graphql-type-json';

export default {
  id: {
    type: ID
  },
  name: {
    type: StringType
  },
  oldName: {
    type: StringType
  },
  slug: {
    type: StringType
  },
  meta: {
    type: GraphQLJSON
  },
  language_id: {
    type: ID
  },
}