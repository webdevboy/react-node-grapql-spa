import {
  GraphQLString as StringType,
  GraphQLID as ID,
  GraphQLList as List,
  GraphQLNonNull as NonNull,
  GraphQLInt as Integer,
  GraphQLObjectType as ObjectType,
  GraphQLBoolean as BooleanType
} from 'graphql';
import Promise from 'bluebird';
import GraphQLDate from 'graphql-date';
import { Event } from '../../models';
import EventType from '../../types/EventType';

export default {
  type: new List(EventType),
  description: 'Changes the date of an event',
  args: {
    event_id: {
      type: StringType,
    },
    from_date: {
      type: GraphQLDate,
    },
    until_date: {
      type: GraphQLDate,
    },
  },
  resolve(_, args) {
    return new Promise(async (resolve, reject) => {
      try {
        if (!args.event_id) {
          throw new Error('Missing event id!');
        }
        await Event.update({ from_date: args.from_date, until_date: args.until_date }, { where: { event_id: args.event_id } });
        const eventsUpdated = await Event.findAll({ where: { event_id: args.event_id } });

        resolve(eventsUpdated);
      } catch (e) {
        reject(e);
      }
    });
  },
};
