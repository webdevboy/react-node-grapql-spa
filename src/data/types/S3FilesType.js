import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
  GraphQLBoolean as BooleanType,
  GraphQLInt as Integer,
  GraphQLList as List,
} from 'graphql';
import FileType from './MediaType';
import FolderType from './S3FolderType';

const FilesType = new ObjectType({
  name: 'Files',
  description: 'Represents a list of files from bucket',
  fields: () => ({
    medias: {
      type: new List(FileType),
      resolve(s3) {
        return s3.medias;
      },
    },
    folders: {
      type: new List(FolderType),
      resolve(s3) {
        return s3.folders;
      },
    },
  }),
});

export default FilesType;