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
  description: 'Deletes email template translation by id',
  args: {
    id: {
      type: new NonNull(ID)
    },
  },
  resolve(_, args) {
    return new Promise( async (resolve, reject) => {
      try {

        if (!args.id) {
          throw new Error('Missing email template id!');
        }

        const rows = await EmailTemplates.model.destroy({ where: { id: args.id }});
        resolve({
          id: args.id,
          rows: rows
        });

      } catch(e) {
        reject(e);
      }
      
    });

  },
};
