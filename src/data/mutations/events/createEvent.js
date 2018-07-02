import {
  GraphQLList as List
} from 'graphql';
import Promise from 'bluebird';
import { randomBytes } from 'crypto';
import { Event, Language, User, MediaLibrary, SFAirportCity } from '../../models';
import EventType from '../../types/EventType';
import eventArgsType from './eventArgsType';

export default {
  type: new List(EventType),
  description: 'Creates a new event',
  args: eventArgsType,
  resolve({ req }, args) {
    return new Promise(async (resolve, reject) => {
      try {
        if (!args.event_id) {
          const total = await Event.count();
          args.event_id = String(total) + randomBytes(2).toString('hex');
          console.log('group event id => ', args.event_id);
        }

        const userId = req.user && req.user.id  || args.user_id || await jwt.verify(args.token, auth.jwt.secret).id || false;
        if (!userId) {
          throw new Error('Please sign in first!');
        }

        const user = await User.findById(userId);
        if (!user) {
          throw new Error('User not found!');
        }

        const lang = await Language.findById(args.language_id);
        if (!lang) {
          throw new Error('Language not found!');
        }
        const originalLang = lang.id;

        const city = await SFAirportCity.findOne({ where: { sfid: args.city_id }});
        if (!city) {
          throw new Error('Airport City not found!');
        }

        if (args.media_id) {
          const media = await MediaLibrary.findById(args.media_id);
          if (!media) {
	          throw new Error('Media not found!');
	        }
        }

        if (args.duplicate) {

          const langs = await Language.findAll({ where: { enabled: true }});
          delete args.duplicate;
          delete args.language_id;

          const duplication = await Promise.all(langs.map(async (lang) => {

            const { locale } = await lang.getLocale();

            const duplicateArgs = Object.assign({}, args, {
              title: (originalLang !== lang.id) ? `${args.title} - ${locale}` : args.title,
              published: (originalLang !== lang.id) ? 0 : args.published
            });

            return {
              ...duplicateArgs,
              language_id: lang.id,
              user_id: user.id,
              airport_city_sfid: city.sfid
            }

          }));          

          const duplicatedEvents = await Event.bulkCreate(duplication);
          resolve(duplicatedEvents)

        } else {

          const newEvent = await Event.create(args);
          await newEvent.setAuthor(user);
          await newEvent.setCity(city);

          resolve([newEvent]);
        }

      } catch(e) {
        reject(e);
      }
      
    });

  },
};
