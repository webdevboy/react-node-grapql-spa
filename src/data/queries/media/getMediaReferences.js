import {
  GraphQLString as StringType,
  GraphQLID as ID,
  GraphQLList as List,
  GraphQLNonNull as NonNull,
} from 'graphql';

import { MediaReference } from '../../models';
import MediaReferenceType from '../../types/MediaReferenceType';

export default {
  type: new List(MediaReferenceType),
  resolve(_, args) {
    try {
      return MediaReference.findAll();
    } catch (e) {
      console.error(e);
      return e;
    }
  },
};