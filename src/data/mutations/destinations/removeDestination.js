import Promise from 'bluebird';
import { Destination } from '../../models';
import {
  GraphQLString as StringType,
  GraphQLID as ID,
  GraphQLList as List,
  GraphQLNonNull as NonNull,
} from 'graphql';
import RemoveRecordsType from "../../types/RemoveRecordsType";

export default {
  type: RemoveRecordsType,
  description: 'Deletes destinations by destination_id',
  args: {
    destination_id: {
      type: new NonNull(StringType)
    },
  },
  resolve(_, args) {
    return new Promise( async (resolve, reject) => {
      try {

        if (!args.destination_id) {
          throw new Error('Missing event id!');
        }

        const ids = await Destination.findAll({ attributes: ['id'], where: { destination_id: args.destination_id }, raw: true });
        const rows = await Destination.destroy({ where: { destination_id: args.destination_id }});

        resolve({
          id: args.destination_id,
          ids: ids.map(({id}) => id),
          rows: rows
        });

      } catch(e) {
        reject(e);
      }
      
    });

  },
};
