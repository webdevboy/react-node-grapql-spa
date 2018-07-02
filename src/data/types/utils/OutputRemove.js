import {
  GraphQLID as ID,
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
  GraphQLList as List,
  GraphQLInt as Integer,  
  GraphQLBoolean as Boolean,
} from 'graphql';

export default new ObjectType({
  name: 'Remove',
  description: 'Output object of remove',
  fields: {
    keys: {
      type: new List(StringType),
    },
    ids: {
      type: new List(ID),
    },
    key: {
      type: StringType,
    },
    id: {
      type: ID,
    },
    rows: {
      type: Integer,
    },
  }
});