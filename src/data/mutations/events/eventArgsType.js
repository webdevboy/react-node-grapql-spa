import {
  GraphQLString as StringType,
  GraphQLID as ID,
  GraphQLList as List,
  GraphQLNonNull as NonNull,
  GraphQLInt as Integer,
  GraphQLObjectType as ObjectType,
  GraphQLBoolean as BooleanType,
} from "graphql";
import GraphQLJSON from "graphql-type-json";
import GraphQLDate from "graphql-date";

export default {
  id: {
    type: ID,
  },
  event_id: {
    type: StringType,
  },
  title: {
    type: StringType,
  },
  summary: {
    type: StringType,
  },
  body: {
    type: GraphQLJSON,
  },
  from_date: {
    type: GraphQLDate,
  },
  until_date: {
    type: GraphQLDate,
  },
  language_id: {
    type: ID,
  },
  user_id: {
    type: ID,
  },
  city_id: {
    type: StringType,
  },
  published: {
    type: BooleanType,
  },
  duplicate: {
    type: BooleanType,
  },
  media_id: {
    type: ID
  },
  url: {
    type: StringType,
  },
  display_helicopter_transfer: {
    type: BooleanType,
  },
};
