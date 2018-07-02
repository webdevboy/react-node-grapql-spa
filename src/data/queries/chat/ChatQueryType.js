import {
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLBoolean as BooleanType,
  GraphQLInputObjectType as InputType,
} from "graphql";

const ChatQueryType = new InputType({
  name: "ChatArguments",
  fields: {
    color: {
      type: StringType,
    },
    blocked: {
      type: BooleanType,
    },
    archived: {
      type: BooleanType,
    },
    account_id: {
      type: ID,
    },
  },
});

export default ChatQueryType;