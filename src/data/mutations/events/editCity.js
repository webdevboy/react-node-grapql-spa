import Promise from 'bluebird';
import { Event, Language, SFAirportCity } from '../../models';
import EventType from '../../types/EventType';
import eventArgsType from './eventArgsType';

import {
  GraphQLString as StringType,
  GraphQLID as ID,
  GraphQLList as List,
  GraphQLNonNull as NonNull,
  GraphQLInt as Integer,
  GraphQLObjectType as ObjectType,
  GraphQLBoolean as BooleanType
} from 'graphql';

export default {
  type: new List(EventType),
  description: 'Changes the city of an event',
  args: {
    event_id: {
      type: StringType
    },
    city_id: {
      type: StringType
    }
  },
  resolve(_, args) {
    return new Promise( async (resolve, reject) => {
      try {

        if (!args.event_id) {
          throw new Error('Missing event id!');
        }

        if (args.city_id) {
          const city = await SFAirportCity.findOne({ where: { sfid: args.city_id }});
          if (!city) {
            throw new Error('Airport City not found!');
          }
        }

        await Event.update({ airport_city_sfid: args.city_id }, { where: { event_id: args.event_id } });
        const eventsUpdated = await Event.findAll({ where: { event_id: args.event_id } });

        resolve(eventsUpdated);

      } catch(e) {
        reject(e);
      }
      
    });

  },
};
