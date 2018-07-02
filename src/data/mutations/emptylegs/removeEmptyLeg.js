import Promise from 'bluebird';
import { EmptyLeg } from '../../models';
import {
  GraphQLString as StringType,
  GraphQLID as ID,
  GraphQLList as List,
  GraphQLNonNull as NonNull,
} from 'graphql';
import OutputRemove from "../../types/utils/OutputRemove";

export default {
  type: OutputRemove,
  description: 'Delete empty leg by id',
  args: {
    id: {
      type: ID
    },
  },
  resolve(_, args) {
    return new Promise( async (resolve, reject) => {
      try {

        if (!args.id) {
          throw new Error('Missing id!', args);
        }

        const id = await EmptyLeg.findOne({ attributes: ['id'], where: { id: args.id }, raw: true });
        const rows = await EmptyLeg.model.destroy({ where: { id: args.id }});

        resolve({
          id: args.id,
          id: id,
          rows: rows
        });

      } catch(e) {
        reject(e);
      }

    });

  },
};
