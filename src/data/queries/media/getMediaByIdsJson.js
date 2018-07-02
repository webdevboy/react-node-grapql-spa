import {
  GraphQLString as StringType,
  GraphQLID as ID,
  GraphQLList as List,
  GraphQLNonNull as NonNull,
} from 'graphql';

import GraphQLJSON from "graphql-type-json";
import { MediaLibrary, MediaReference } from '../../models';
import MediaType from '../../types/MediaType';

export default {
  type: new List(MediaType),
  args: {
    listId: {
      type: GraphQLJSON,
    }
  },
  resolve(_, args) {
    try {
	  if (!args.listId) {
      return [];
    }
    let photoIds = [];
    args.listId.map(elem => elem.id && photoIds.push(elem.id));
    if (photoIds && photoIds.length && photoIds.length > 0){
      const where = {};
      where.id = photoIds;
      return MediaLibrary.findAll({
        where,
      });
    }else {
      return [];
    }
    } catch (e) {
      console.error(e);
      return e;
    }
  },
};
