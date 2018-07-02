import { GraphQLList as List, GraphQLString as StringType, GraphQLID as ID, GraphQLInt as Int } from "graphql";
import { Post } from "../../models";
import PostType from "../../types/PostType";

export default {
  type: new List(PostType),
  description: "Get All Posts by type",
  args: {
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
  async resolve(_, { type, language_id, limit }) {
    try {
      const where = {
        type,
        language_id
      };
      return Post.findAll({
        attributes: ["id", "title", "type", "post_id"],
        where,
        limit
      });
    } catch (e) {
      console.error(e);
      return e;
    }
  },
};
