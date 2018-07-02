import {
  GraphQLID as ID,
  GraphQLNonNull as NonNull,
} from "graphql";

import PostType from "../../types/PostType";
import { Post } from '../../models';

export default {
  type: PostType,
  name: 'getAircraftById',
  args: {
    id: {
      type: new NonNull(ID),
    },
  },
  async resolve(_, { id }) {
    try {
      return Post.findById(id);
    } catch (e) {
      console.error(e);
      return e;
    }
  },
};
