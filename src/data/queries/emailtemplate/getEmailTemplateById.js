import { GraphQLList as List, GraphQLString as StringType, GraphQLID as ID } from "graphql";
import { EmailTemplates } from "../../models";
import EmailTemplatesType from "../../types/EmailTemplatesType";

export default {
  type: EmailTemplatesType,
  description: "Get A Single email template By Id",
  args: {
    id: {
      type: ID,
    },
  },
  resolve(_, args) {
    return EmailTemplates.model.findById(args.id);
  },
};
