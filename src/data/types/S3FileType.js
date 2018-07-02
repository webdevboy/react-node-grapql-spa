import { lookup } from 'mime-types';
import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
  GraphQLBoolean as BooleanType,
  GraphQLInt as Integer,
} from 'graphql';
import DateType from 'graphql-date';
import MediaType from './MediaType';
import { MediaLibrary } from '../models';

const src = 'https://s3-eu-west-1.amazonaws.com/';
const originalPrefix = 'original/';
const thumbnailsPrefix = 'thumbnails/';

// const thumbnailsPrefix = 'https://s3-eu-west-1.amazonaws.com/upgrade-it-lab/thumbnails/';
// const originalPrefix = 'https://s3-eu-west-1.amazonaws.com/upgrade-it-lab/original/';
// const thumbnailsPrefix = 'https://s3-eu-west-1.amazonaws.com/lnjt-staging/thumbnails/';
// const originalPrefix = 'https://s3-eu-west-1.amazonaws.com/lnjt-staging/original/';

function getFileName(key) {
  const split = key.split('/');
  const filename = split[split.length - 1];
  if (filename.length) {
    return filename;
  }
  return split[split.length - 2];
}

export default new ObjectType({
  name: 'File',
  description: 'Represents a file from s3 bucket',
  fields: () => ({
    ETag: {
      type: StringType,
      resolve(s3) {
        return s3.ETag;
      },
    },
    Key: {
      type: StringType,
      resolve(s3) {
        return s3.Key;
      },
    },
    LastModified: {
      type: DateType,
      resolve(s3) {
        return s3.LastModified;
      },
    },
    Size: {
      type: Integer,
      resolve(s3) {
        return s3.Size;
      },
    },
    fileName: {
      type: StringType,
      resolve(s3) {
        return getFileName(s3.Key);
      },
    },
    path: {
      type: StringType,
      resolve(s3) {
        const split = s3.Key.split('/');
        return `${split.splice(0, split.length - 1).join('/')}/`;
      },
    },
    thumbnail: {
      type: StringType,
      resolve(s3, args, { aws }) {
        const prefix = src + aws.bucket + '/' + thumbnailsPrefix;
        return prefix + getFileName(s3.Key);
      },
    },
    original: {
      type: StringType,
      resolve(s3, args, { aws }) {
        const prefix = src + aws.bucket + '/' + originalPrefix;
        return prefix + getFileName(s3.Key);
      },
    },
    MimeType: {
      type: StringType,
      resolve(s3) {
        return lookup(s3.Key);
      },
    },
    media: {
      type: MediaType,
      resolve(s3) {
        return MediaLibrary.findOne({
          where: {
            key: s3.Key,
          },
        });
      },
    },
  }),
});