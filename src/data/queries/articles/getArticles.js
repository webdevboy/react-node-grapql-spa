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

import {
  Article,
  ArticleCategory,
} from '../../models';

import types from "../../types";

export default {
  type: new List(types.ArticleType),
  name: "Articles",
  description: "Find all articles",
  args: {
    category_id: {
      type: ID,
    },
    language_id: {
      type: ID,
    },
    pagination: {
      type: types.PaginationType
    },
  },
  resolve(_, {pagination}) {
    return Article.findAll({ ...pagination, order: ["publish_at", "created_at", "updated_at"] });
  },
};
