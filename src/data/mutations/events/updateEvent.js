import Promise from 'bluebird';
import { Event, Language, MediaLibrary, SFAirportCity } from '../../models';
import EventType from '../../types/EventType';
import eventArgsType from './eventArgsType';

export default {
  type: EventType,
  description: 'Updates a event',
  args: eventArgsType,
  resolve(_, args) {
    return new Promise(async (resolve, reject) => {
      try {

        const event = await Event.findById(args.id);

        if (!event) {
          throw new Error('Event not found!');
        }

        if (args.language_id) {
          const lang = await Language.findById(args.language_id);
          if (!lang) {
            throw new Error('Language not found!');
          }
        }

        if (args.media_id) {
	        const media = await MediaLibrary.findById(args.media_id);
	        if (!media) {
	          throw new Error('Media not found!');
	        }
	      }

        if (args.city_id) {
          const city = await SFAirportCity.findOne({ where: { sfid: args.city_id }});
          if (!city) {
            throw new Error('Airport City not found!');
          } else {
            event.setCity(city);
            delete args.city_id;
          }
        }

        const updateEvent = await event.update(args);
        resolve(updateEvent);

      } catch(e) {
        reject(e);
      }
      
    });

  },
};
