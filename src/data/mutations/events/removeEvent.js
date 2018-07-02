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
  description: 'Deletes events by event_id',
  args: {
    event_id: {
      type: new NonNull(StringType)
    },
  },
  resolve(_, args) {
    return new Promise( async (resolve, reject) => {
      try {

        if (!args.event_id) {
          throw new Error('Missing event id!');
        }

        const ids = await Event.findAll({ attributes: ['id'], where: { event_id: args.event_id }, raw: true });
        const rows = await Event.destroy({ where: { event_id: args.event_id }});

        resolve({
          id: args.event_id,
          ids: ids.map(({id}) => id),
          rows: rows
        });

      } catch(e) {
        reject(e);
      }
      
    });

  },
};
