import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
} from 'graphql';

export default new ObjectType({
  name: 'Folder',
  description: 'Represents a folder from s3 bucket',
  fields: {
    path: {
      type: StringType,
      resolve(s3) {
        return s3.path;
      },
    },
    name: {
      type: StringType,
      resolve(s3) {
        return s3.name;
      },
    },
  },
});
