import {
  GraphQLString as StringType,
  GraphQLID as ID,
  GraphQLList as List,
  GraphQLNonNull as NonNull,
} from 'graphql';

import { MediaLibrary, MediaReference } from '../../models';
import MediaType from '../../types/MediaType';

export default {
  type: new List(MediaType),
  args: {
    id: {
      type: new List(ID),
    }
  },
  resolve(_, args) {
    try {
	  const where = {};
	  if (args.id) {
        where.id = args.id;
      }

      return MediaLibrary.findAll({
        where,
      });
    } catch (e) {
      console.error(e);
      return e;
    }
  },
};
