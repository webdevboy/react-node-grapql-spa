import { GraphQLList as List, GraphQLString as StringType, GraphQLID as ID, GraphQLInt as Int } from "graphql";
import { Post, Term, TermTaxonomy, Language, MediaLibrary } from "../../models";
import PaginationInput from "../../types/utils/PaginationInput";
import PostType from "../../types/PostType";
import sequelize from '../../sequelize';
import Promise from 'bluebird';

export default {
  type: new List(PostType),
  description: "Get All Posts by title",
  args: {
    search: {
      type: StringType,
    },
    type: {
      type: StringType,
    },
    language_id: {
      type: ID,
    },
    limit: {
      type: Int,
    }
  },
  async resolve(_, { search, type, language_id, limit }) {
    try {

      const where = {};

      if (search) where.title = { $iLike:  `%${search}%` };
      if (type) where.type = type;
      if (language_id) where.language_id = language_id;

      var posts;
      if (limit) {
        posts = await Post.model.findAll({
          where,
          limit: limit
        });
      } else {
        posts = await Post.model.findAll({
          where
        });
      }

      return posts;
    } catch (e) {
      console.error(e);
      return e;
    }
  },
};
