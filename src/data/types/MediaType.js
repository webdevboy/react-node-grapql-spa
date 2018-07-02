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
import MediaTranslationType from './MediaTranslationType';
import { MediaTranslation } from '../models';

export default new ObjectType({
  name: 'Media',
  fields: {
    id: {
      type: new NonNull(ID),
      resolve(media) {
        return media.id;
      },
    },
    src: {
      type: new NonNull(StringType),
      resolve(media) {
        return media.src;
      },
    },
    thumbnail: {
      type: StringType,
      resolve(media) {
        return media.thumbnail;
      },
    },
    original: {
      type: StringType,
      resolve(media) {
        return media.original;
      },
    },
    key: {
      type: new NonNull(StringType),
      resolve(media) {
        return media.key;
      },
    },
    filename: {
      type: new NonNull(StringType),
      resolve(media) {
        return media.filename;
      },
    },
    mimetype: {
      type: new NonNull(StringType),
      resolve(media) {
        return media.mimetype;
      },
    },
    size: {
      type: new NonNull(Integer),
      resolve(media) {
        return media.size;
      },
    },
    references: {
      type: new List(StringType),
      resolve(media) {
        return media.references;
      },
    },
    created_at: {
      type: new NonNull(DateType),
      resolve(media) {
        return media.created_at;
      },
    },
    translations: {
      type: new List(MediaTranslationType),
      args: {
        language_id: {
          type: ID,
        },
      },
      async resolve(media, { language_id }) {
        
        if (media.translations) {
          return media.translations;
        }
        const where = {};

        if (language_id) {
          where.language_id = language_id;
        }

        return media.getTranslations({ where });
       
      },
    },
  },
});
