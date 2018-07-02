import {
  GraphQLID as ID,
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
  GraphQLList as List,
} from 'graphql';
import GraphQLJSON from 'graphql-type-json';
import LanguageType from './LanguageType';

const EmailTemplatesType = new ObjectType({
  name: 'EmailTemplates',
  fields: {
    id: {
      type: ID,
    },
    name: {
      type: StringType,
    },
    description: {
      type: StringType,
    },
    content_html: {
      type: StringType,
    },
    subject: {
      type: StringType,
    },
    email_to: {
      type: new List(StringType),
    },
    email_id: {
      type: StringType,
    },
    content_json: {
      type: GraphQLJSON,
      resolve(emailTemplate) {
        return emailTemplate.content_json;
      },
    },
    language_id: {
      type: ID,
      resolve(emailTemplate) {
        return emailTemplate.language_id;
      },
    },
    language: {
      type: LanguageType,
      resolve(emailTemplate) {
        return emailTemplate.getLanguage();
      },
    },
  },
});

export default EmailTemplatesType;

