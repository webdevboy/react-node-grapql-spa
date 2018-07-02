import Promise from 'bluebird';
import { Post } from '../../models';
import {
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLList as List,
  GraphQLNonNull as NonNull,
  GraphQLObjectType as ObjectType,
} from 'graphql';
import PostType from '../../types/PostType';

export default {
  type: PostType,
  description: 'Updates the post slug',
  args: {
    id: {
      type: new NonNull(ID),
    },
    slug: {
      type: new NonNull(StringType),
    },
  },
  resolve(_, { slug, id }) {
    return new Promise( async (resolve, reject) => {
      try {

        if (!id || !slug ) {
          throw new Error('Required arguments id, slug are missing!');
        }

        const postToUpdate = await Post.model.findById(id);
        const post = await postToUpdate.update({ slug });

        resolve(post);

      } catch(e) {
        reject(e);
      }
      
    });

  },
};
