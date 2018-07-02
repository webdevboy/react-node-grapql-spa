import { GraphQLList as List, GraphQLString as StringType, GraphQLID as ID } from "graphql";
import { Post } from "../../models";
import PostType from "../../types/PostType";

export default {
  type: PostType,
  description: "Get A Single Post By PostId and LanguageId",
  args: {
    post_id: {
      type: StringType,
    },
    language_id: {
      type: ID
    },
  },
  resolve(_, args) {
    let where = {};
    where.post_id = args.post_id;
    where.language_id = args.language_id;
    return Post.model.findOne({where});
  },
};
