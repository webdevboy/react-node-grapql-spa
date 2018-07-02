import {
  GraphQLID as ID,
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
  GraphQLInt as Integer,
  GraphQLList as List, 
} from 'graphql';
import DateType from 'graphql-date';
import FileType from './S3FileType';

import MediaType from './MediaType';
import { MediaReference, MediaLibrary } from '../models';

export default new ObjectType({
  name: 'MediaReference',
  fields: {
    id: { 
      type: new NonNull(ID),
      resolve(media) {
        return media.id;
      },
    },
    media_id: { 
      type: new NonNull(StringType),
      resolve(media) {
        return media.media_id;
      },
    },
    media_library_id: {
      type: ID,
      resolve(media) {
        return media.media_library_id;
      },
    },
    media: {
      type: MediaType,
      resolve(media) {
        return MediaLibrary.findOne({
          where: {
            id: media.media_library_id,
          },
        });
      },
    }
  }
});
