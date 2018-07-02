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
    search: {
      type: StringType,
    },
    language_id: {
      type: ID,
    },
  },
  resolve(_, args) {
    try {
      const where = {};

      if (args.language_id) {
        where.language_id = args.language_id;
      }
      if (args.search) {
        where.meta = { search_content : {$iLike: `%${args.search.toLowerCase()}%`}};
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
