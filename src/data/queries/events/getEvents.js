import {
  GraphQLString as StringType,
  GraphQLID as ID,
  GraphQLList as List,
  GraphQLObjectType as ObjectType,
  GraphQLNonNull as NonNull,
  GraphQLBoolean as BooleanType,
  GraphQLInt as Integer,
  GraphQLInputObjectType as InputType,
} from "graphql";
import DateType from "graphql-date";

import { Event } from '../../models';

import types from "../../types";

export default {
  type: new List(types.EventType),
  name: "Events",
  description: "Find all events",
  args: {
    language_id: {
      type: ID,
    },
    published: {
      type: BooleanType,
    },
    pagination: {
      type: types.PaginationType,
    },
  },
  resolve(_, { language_id, published, pagination }) {
    return Event.findAll({
      where: { language_id: language_id, published: published },
      ...pagination,
      order: ["from_date"],
    });
  },
};
