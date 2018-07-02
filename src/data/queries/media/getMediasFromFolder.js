import _ from 'lodash';
import {
  GraphQLString as StringType,
  GraphQLID as ID,
  GraphQLList as List,
  GraphQLNonNull as NonNull,
} from 'graphql';

import { MediaLibrary } from '../../models';
import MediaType from '../../types/MediaType';

export default {
  type: new List(MediaType),
  args: {
    order: {
      type: StringType,
    },
    mimetype: {
      type: StringType,
    },
	  path: {
      type: StringType,
    },
  },
  resolve(_, { order = 'DESC', mimetype, path}) {
    try {
	    const prefix = path + '%';
      return MediaLibrary.findAll({
        where: {
          mimetype: { $iLike: mimetype },
		      key: { $iLike: prefix },
        },
        order: [['created_at', order]],
      });
    } catch (e) {
      console.error(e);
      return e;
    }
  },
};