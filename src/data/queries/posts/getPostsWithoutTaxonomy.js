import { GraphQLList as List, GraphQLString as StringType, GraphQLID as ID, GraphQLInt as Int } from "graphql";
import { Post, Term, TermTaxonomy, Language, MediaLibrary } from "../../models";
import PaginationInput from "../../types/utils/PaginationInput";
import PostType from "../../types/PostType";
import sequelize from '../../sequelize';
import Promise from 'bluebird';

export default {
  type: new List(PostType),
  description: "Get All Posts without taxonomy",
  args: {
    type: {
      type: StringType,
    },
    language_id: {
      type: ID,
    },
	pagination: {
      type: PaginationInput,
    },
  },
  async resolve(_, args) {
    try {
      const where = {};
      if (args.type) where.type = args.type;
      if (args.language_id) where.language_id = args.language_id;

      var posts;
      if (args.pagination) {
        posts = await Post.model.findAll({
          where,
          ...args.pagination,
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
