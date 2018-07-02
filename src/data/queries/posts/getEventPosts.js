import {
    GraphQLList as List,
    GraphQLString as StringType,
    GraphQLNonNull as NonNull,
    GraphQLInt as Int,
    GraphQLID as ID,
  } from 'graphql';
  import { Post } from '../../models';
  import PostType from '../../types/PostType';


  export default {
    type: new List(PostType),
    description: "Get Event based on its datetime",
    args: {
      language_id: {
        type: StringType
      },
      year: {
        type: Int
      },
      month: {
        type: Int,
      },
    },
    resolve(_, { year, month, language_id }) {
      try {
        const where = {};

        where.type = "event";

        if (language_id) {
          where.language_id = language_id;
        }

        if (year && month) {
          try {
            const from_date = new Date(year, month);
            const to_date = new Date(year, month + 1);

            where.updated_at = { $lte: to_date, $gte: from_date };
          } catch(e) {}
        }

        where.state = 'published';

        return Post.model.findAll({ where });
      }
      catch(e) {

      }
    }
  };
