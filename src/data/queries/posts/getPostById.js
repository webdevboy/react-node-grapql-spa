import { GraphQLList as List, GraphQLString as StringType, GraphQLID as ID } from "graphql";
import { Post } from "../../models";
import PostType from "../../types/PostType";

export default {
  type: PostType,
  description: "Get A Single Post By Id",
  args: {
    id: {
      type: ID,
    },
  },
  resolve(_, args) {
    return Post.model.findById(args.id);
  },
};
