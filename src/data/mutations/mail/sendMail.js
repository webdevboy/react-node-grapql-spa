import {
  GraphQLString as StringType,
  GraphQLID as ID,
  GraphQLList as List,
  GraphQLNonNull as NonNull,
  GraphQLInt as Integer,
  GraphQLObjectType as ObjectType,
  GraphQLBoolean as BooleanType,
  GraphQLEnumType as EnumType,
} from "graphql";
import GraphQLJSON from "graphql-type-json";
import { EmailTemplates, Language } from "../../models";
import { SITE_DEFAULT_EMAIL, SITE_SUBSCRIBE_EMAIL } from "fixtures";
import getSettings from "shared/helpers/getSettings";

export default {
  type: BooleanType,
  description: "Send email",
  args: {
    email: {
      type: StringType,
    },
    template_name: {
      type: StringType,
    },
    values: {
      type: GraphQLJSON,
    },
    language_id: {
      type: ID,
    },
  },
  async resolve({ transporter }, { email, template_name, language_id, values }) {
    if (!email || !template_name || !language_id){
      return {
        result: false,
      };
    }
    const template = await EmailTemplates.findOne({ where: {
      name: template_name,
      language_id: language_id,
    }});
    if (!template){
      return {
        result: false,
      };
    }
    let content = template.content_html;
    values && Object.keys(values).length && 
      Object.keys(values).map((key, index) => {
        const re = new RegExp(`{${key}}`, 'g');
        content = content.replace(re,values[key]);
      });
    const settings = await getSettings([SITE_DEFAULT_EMAIL, SITE_SUBSCRIBE_EMAIL]);
    await transporter.sendMail({
      from: settings[SITE_DEFAULT_EMAIL],
      to: email,
      subject: template.subject,
      html: content,
    });
    return {
      result: true,
    };
  },
};
