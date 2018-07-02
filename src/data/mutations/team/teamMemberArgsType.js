import {
  GraphQLString as StringType,
  GraphQLID as ID,
  GraphQLInt as Integer,
  GraphQLBoolean as BooleanType,
  GraphQLNonNull as NonNull,
  GraphQLList as List,
} from 'graphql';

export default {
  id: {
    type: ID
  },
  team_id: {
    type: ID,
  },
  first_name: {
    type: StringType
  },
  last_name: {
    type: StringType
  },
  email: {
    type: StringType
  },
  title: {
    type: StringType
  },
  bio: {
    type: StringType
  },
  visible: {
    type: BooleanType
  },
  override: {
    type: BooleanType
  },
  order: {
    type: Integer
  },
  flags: {
    type: new List(StringType)
  },
  visible: {
    type: BooleanType
  }
}