import {
  GraphQLSchema as Schema,
  GraphQLObjectType as ObjectType,
} from "graphql";
import {
  GraphQLIncludeDirective,
  GraphQLSkipDirective
} from 'graphql/type/directives';
// import types from "./types";
import queries from "./queries"; // queries
import mutations from './mutations'; // mutations
// import subscriptions from './subscriptions';  //subscriptions

const schema = new Schema({
  directives: [
    GraphQLIncludeDirective,
    GraphQLSkipDirective,
  ],
  query: new ObjectType({
    name: "Query",
    fields: queries,
  }),
  mutation: new ObjectType({
    name: 'Mutation',
    fields: mutations,
  }),
  // types,
  // subscription: new ObjectType({
  //   name: 'Subscription',
  //   fields: subscriptions
  // }),
});

export default schema;
