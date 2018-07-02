import {
  GraphQLString as StringType,
  GraphQLID as ID,
  GraphQLList as List,
  GraphQLNonNull as NonNull,
  GraphQLInt as Integer,
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
  post_id: {
    type: StringType,
  },
  title: {
    type: StringType,
  },
  slug: {
    type: StringType,
  },
  summary: {
    type: StringType,
  },
  body: {
    type: GraphQLJSON,
  },
  meta: {
    type: GraphQLJSON,
  },
  type: {
    type: StringType,
  },
  publish_at: {
    type: GraphQLDate,
  },
  state: {
    type: PostState,
  },
  language_id: {
    type: ID,
  },
  media_id: {
    type: ID,
  },
  featured: {
    type: BooleanType,
  },
  term_taxonomy_id: {
    type: ID,
  },
  taxonomies: {
    type: new List(ID),
  },
  parent_id: {
    type: ID,
  },
  linkUrl: {
    type: StringType,
  },
};
