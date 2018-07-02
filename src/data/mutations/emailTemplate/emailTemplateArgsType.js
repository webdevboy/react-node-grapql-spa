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
  name: {
    type: StringType
  },
  description: {
    type: StringType,
  },
  subject: {
    type: StringType,
  },
  content_json: {
    type: GraphQLJSON,
  },
  content_html: {
    type: StringType,
  },
  email_to: {
    type: new List(StringType),
  },
  email_id: {
    type: StringType,
  },
  language_id: {
    type: ID,
  },
};
