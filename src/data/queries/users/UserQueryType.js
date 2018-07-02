import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
  GraphQLBoolean as BooleanType,
  GraphQLList as List,
  GraphQLInt as Integer,
  GraphQLInputObjectType as InputType,
} from "graphql";
import DateType from "graphql-date";

const UserQueryType = new InputType({
  name: "UserQueryType",
  fields: {
    id: {
      type: ID,
    },
    email: {
      type: StringType,
    },
    first_name: {
      type: StringType,
    },
    last_name: {
      type: StringType,
    },
    last_login: {
      type: DateType,
    },
    role: {
      type: ID,
    },
  },
});

export default UserQueryType;
