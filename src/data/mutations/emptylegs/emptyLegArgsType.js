import {
  GraphQLString as StringType,
  GraphQLID as ID,
  GraphQLList as List,
  GraphQLNonNull as NonNull,
  GraphQLInt as Integer,
  GraphQLFloat as Float,
  GraphQLObjectType as ObjectType,
  GraphQLBoolean as BooleanType,
  GraphQLEnumType as EnumType,
} from "graphql";
import GraphQLDate from "graphql-date";
import GraphQLJSON from "graphql-type-json";
import PostState from "../../types/utils/PostState";

export default {
  id: {
    type: ID,
  },
  from_date: {
    type: GraphQLDate
  },
  until_date: {
    type: GraphQLDate,
  },
  price: {
    type: Float,
  },
  featured: {
    type: BooleanType,
  },
  published: {
    type: BooleanType,
  },
  aircraft_sfid: {
    type: ID,
  },
  from_airport_sfid: {
    type: ID,
  },
  to_airport_sfid: {
    type: ID,
  },
  details: {
    type: GraphQLJSON,
  },
  currency_id: {
    type: ID,
  },
};
