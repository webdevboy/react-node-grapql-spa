import { GraphQLList as List, GraphQLString as StringType, GraphQLID as ID } from "graphql";
import { EmailTemplates } from "../../models";
import EmailTemplatesType from "../../types/EmailTemplatesType";

export default {
  type: new List(EmailTemplatesType),
  description: "Get all email templates",
  args: {
    id: {
      type: ID,
    },
  },
  resolve(_, args) {
    return EmailTemplates.model.findAll();
  },
};
