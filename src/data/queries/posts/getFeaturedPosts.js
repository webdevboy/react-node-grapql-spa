import {
  GraphQLString as StringType,
  GraphQLID as ID,
  GraphQLList as List,
  GraphQLObjectType as ObjectType,
  GraphQLNonNull as NonNull,
  GraphQLBoolean as BooleanType,
  GraphQLInt as Integer,
  GraphQLInputObjectType as InputType
} from "graphql";
import DateType from "graphql-date";
import sequelize from "sequelize";
import { Post, Language, TermTaxonomy, Term } from "../../models";

import PostType from "../../types/PostType";

export default {
  type: new List(PostType),
  description: "Find all featured posts",
  args: {
    language_id: {
      type: ID
    },
    type: {
      type: StringType,
    }
  },
  resolve(_, { language_id, type}) {
    return new Promise(async (resolve, reject) => {
      try {
        const where = {};
        where.language_id = language_id;
        where.meta = {
          featured: true
        };
        where.type = type;
        where.state = "published";
        const result = await Post.findAll({
          where,
          limit: 1
        });
        resolve(result);
      } catch (e) {
        reject(e);
      }
    });
  }
};
