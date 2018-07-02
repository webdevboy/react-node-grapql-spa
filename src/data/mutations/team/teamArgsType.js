import {
  GraphQLString as StringType,
  GraphQLID as ID,
  GraphQLInt as Integer,
  GraphQLNonNull as NonNull,
} from 'graphql';

export default {
  id: {
    type: ID,
  },
  name: {
    type: new NonNull(StringType)
  },
  description: {
    type: new NonNull(StringType)
  },
  order: {
    type: Integer
  }
}