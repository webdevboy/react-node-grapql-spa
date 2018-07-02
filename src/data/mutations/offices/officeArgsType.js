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

export default {
  id: {
    type: ID
  },
  name: {
    type: StringType
  },
  address: {
    type: StringType
  },
  postal_code: {
    type: StringType
  },
  location: {
    type: StringType
  },
  country: {
    type: StringType
  },
  phone: {
    type: StringType
  },
  alt_phone: {
    type: StringType
  },
  fax: {
    type: StringType
  },
  email: {
    type: StringType
  },
  coordinates: {
    type: GraphQLJSON
  },
  primary: {
    type: BooleanType
  },
  order: {
    type: Integer
  }
}