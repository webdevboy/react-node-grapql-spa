import Promise from "bluebird";
import { EmailTemplates, Language } from "../../models";
import EmailTemplatesType from "../../types/EmailTemplatesType";
import emailTemplateArgsType from "./emailTemplateArgsType";
import slugify from "slugify";
import { GraphQLList as List } from "graphql";
import { randomBytes } from "crypto";

export default {
  type: EmailTemplatesType,
  description: "Creates a new email template",
  args: emailTemplateArgsType,
  resolve({ user }, args, context) {
    return new Promise(async (resolve, reject) => {
      try {
        
        const template = Object.assign({}, args, {});
        console.log("DODOOOOOOOOOOOOOOOOO");
        console.log(args);
        let newTemplate;
        if (template.id) {
          newTemplate = await EmailTemplates.findById(template.id);
          if (newTemplate.email_id !== template.email_id){
            const translations = await EmailTemplates.findAll({
              where: {email_id: newTemplate.email_id}
            });
            await Promise.all(
            translations.map( async(translation) => {
              await translation.update({email_id: template.email_id});
            }));
          }
          await newTemplate.update(template);
        } else {
          newTemplate = await EmailTemplates.model.create(template);
        }

        resolve(newTemplate);
      } catch (e) {
        reject(e);
      }
    });
  },
};
