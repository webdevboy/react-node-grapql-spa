import Promise from 'bluebird';
import { EmailTemplates } from '../../models';
import {
  GraphQLString as StringType,
  GraphQLID as ID,
  GraphQLList as List,
  GraphQLNonNull as NonNull,
} from 'graphql';
import OutputRemove from "../../types/utils/OutputRemove";

export default {
  type: OutputRemove,
  description: 'Deletes email templates by email_id',
  args: {
    email_id: {
      type: new NonNull(StringType)
    },
  },
  resolve(_, args) {
    return new Promise( async (resolve, reject) => {
      try {

        if (!args.email_id) {
          throw new Error('Missing email template email id');
        }

        const ids = await EmailTemplates.findAll({ attributes: ['id'], where: { email_id: args.email_id }, raw: true });
        const rows = await EmailTemplates.model.destroy({ where: { email_id: args.email_id }});

        resolve({
          id: args.name,
          ids: ids.map(({id}) => id),
          rows: rows
        });

      } catch(e) {
        reject(e);
      }
      
    });

  },
};
