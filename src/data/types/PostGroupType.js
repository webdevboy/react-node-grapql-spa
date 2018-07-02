import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLNonNull as NonNull,
  GraphQLList as List,
} from "graphql";
import PostType from "./PostType";

export default new ObjectType({
  name: "PostGroup",
  description: "Represents a group of posts having the same post_id",
  fields: () => ({
    id: {
      type: new NonNull(ID),
      resolve(group) {
        return group.post_id;
      },
    },
    posts: {
      type: new List(PostType),
      resolve(group) {
        return group.posts;
      }
    },
    master: {
      type: PostType,
      resolve(group) {
        return group.master;
      }
    }
  })
});
