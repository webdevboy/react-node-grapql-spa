import {
  GraphQLList as List,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
  GraphQLID as ID,
} from 'graphql';
import { Post } from '../../models';
import PostType from '../../types/PostType';

export default {
  type: PostType,
  description: "Get Single Post",
  args: {
    id: {
      type: ID,
    },
    slug: {
      type: StringType,
    },
    type: {
      type: StringType,
    },
    language_id: {
      type: ID,
    },
    state: {
      type: StringType
    }
  },
  async resolve(_, { id, slug, type, language_id, state }) {
    try {

      if (id) {
        const postById = await Post.findById(id);;
        return postById;
      }

      if (!slug) {
        throw new Error('Missing slug argument');
      }
      if (!type) {
        throw new Error('Missing type argument');
      }
      if (!language_id) {
        throw new Error('Missing language_id argument');
      }

      const where = {
        slug: slug,
        type: type,
        language_id,
        state: 'published'
      };

      if (_.user && _.user.is_admin) {
        delete where.state;
      }

      const post = await Post.model.findOne({
        where,
      });

      return post;
    } catch (e) {
      console.error(e);
      return e;
    }
  },
};
