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
    category_sfids: {
      type: new List(StringType),
    },
    manufacturer_sfids: {
      type: new List(StringType),
    },
    language_id: {
      type: ID,
    },
  },
  resolve(_, args) {
    try {
      
      const where = {
        type: "aircraft"
      };

      if (args.category_sfids) {
        where.meta = { category: {
          $in: args.category_sfids 
          }
        }
      };
      /*
      if (args.manufacturer_sfids) {
        where.meta = { manufacturer: {
          $in: args.manufacturer_sfids}
        }
      };
      */
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