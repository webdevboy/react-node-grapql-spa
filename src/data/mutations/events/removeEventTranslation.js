import Promise from 'bluebird';
import { Event } from '../../models';
import {
  GraphQLString as StringType,
  GraphQLID as ID,
  GraphQLList as List,
  GraphQLNonNull as NonNull,
} from 'graphql';
import RemoveRecordsType from "../../types/RemoveRecordsType";

export default {
  type: RemoveRecordsType,
  description: 'Deletes event translation by event id',
  args: {
    id: {
      type: new NonNull(ID)
    },
  },
  resolve(_, args) {
    return new Promise( async (resolve, reject) => {
      try {

        if (!args.id) {
          throw new Error('Missing event id!');
        }

        const rows = await Event.destroy({ where: { id: args.id }});
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
