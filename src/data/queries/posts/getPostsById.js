import {
  GraphQLList as List,
  GraphQLString as StringType,
  GraphQLID as ID,
} from 'graphql';
import { Post } from '../../models';
import PostType from '../../types/PostType';

export default {
  type: new List(PostType),
  description: "Get All Posts",
  args: {
    ids: {
      type: new List(ID),
    },
    slugs: {
      type: new List(StringType),
    },
    type: {
      type: StringType,
    },
    language_id: {
      type: ID,
    },
  },
  resolve(_, args) {
    try {
      const where = {};

      if (args.ids) {
        where.id = { $in: args.ids };
      }
      if (args.type) {
        where.type = args.type;
      }
      if (args.slugs) {
        where.slug = { $in: args.slugs };
      }
      if (args.language_id) {
        where.language_id = args.language_id;
      }

      where.state = 'published';

      console.log('Query: ', {
        where,
      });

      return Post.model.findAll({
        where,
      });
    } catch (e) {
      console.error(e);
      return e;
    }
  }
}