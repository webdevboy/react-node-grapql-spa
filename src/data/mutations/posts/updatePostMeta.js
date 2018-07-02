import Promise from 'bluebird';
import { Post } from '../../models';
import {
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLList as List,
  GraphQLNonNull as NonNull,
  GraphQLObjectType as ObjectType,
} from 'graphql';
import GraphQLJSON from "graphql-type-json";
import PostType from '../../types/PostType';

export default {
  type: PostType,
  description: 'Updates the post meta',
  args: {
    id: {
      type: new NonNull(ID),
    },
    metaValue: {
      type: GraphQLJSON,
    },
  },
  resolve(_, { id, metaValue }) {
    return new Promise( async (resolve, reject) => {
      try {

        if (!id || !metaValue ) {
          throw new Error('Required arguments id, meta value are missing!');
        }

        const postToUpdate = await Post.model.findById(id);
        const meta = {
          ...postToUpdate.meta,
          ...metaValue,
        }
        const post = await postToUpdate.update({ meta });

        resolve(post);

      } catch(e) {
        reject(e);
      }
      
    });

  },
};
