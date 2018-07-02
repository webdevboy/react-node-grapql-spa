import { GraphQLList as List, GraphQLString as StringType, GraphQLID as ID } from "graphql";
import { Post } from "../../models";
import PostType from "../../types/PostType";

export default {
  type: new List(PostType),
  description: "Get Posts By PostId and LanguageId",
  args: {
    post_ids: {
      type: new List(StringType),
    },
    language_id: {
      type: ID
    },
  },
  resolve(_, args) {
    let where = {};
    where.post_id = { $in: args.post_ids };
    where.language_id = args.language_id;
    return Post.model.findAll({where});
  },
};
