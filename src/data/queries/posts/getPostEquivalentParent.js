import {
  GraphQLString as StringType,
  GraphQLID as ID,
  GraphQLList as List,
  GraphQLNonNull as NonNull,
  GraphQLInt as Integer,
  GraphQLObjectType as ObjectType,
  GraphQLBoolean as BooleanType,
  GraphQLEnumType as EnumType
} from "graphql";
import GraphQLDate from "graphql-date";
import GraphQLJSON from "graphql-type-json";
import { Post } from "../../models";
import PostType from "../../types/PostType";

export default {
  type: GraphQLJSON,
  description: "Get translation parent",
  args: {
    pathUrl: {
      type: GraphQLJSON
    },
    language_id: {
      type: ID
    },
    old_language_id: {
      type: ID
    }
  },
  resolve(_, { pathUrl, language_id, old_language_id }) {
    return new Promise(async (resolve, reject) => {
      try {
        let result = {};
        if (language_id !== old_language_id) {
          const listIds = Object.keys(pathUrl);
          if (listIds.length > 0) {
            await Promise.all(
              listIds.map(async id => {
                const post = await Post.model.findById(id);
                if (!post) {
                  resolve({});
                }
                const postTranslation = await Post.model.findOne({
                  where: {
                    post_id: post.post_id,
                    language_id: language_id
                  }
                });
                if (!postTranslation) {
                  resolve({});
                }
                result[postTranslation.id] = {
                  url: postTranslation.slug,
                  order: pathUrl[id].order
                };
              })
            );
          }
          resolve(result);
        } else {
          resolve(pathUrl);
        }
      } catch (e) {
        reject(e);
      }
    });
  }
};
