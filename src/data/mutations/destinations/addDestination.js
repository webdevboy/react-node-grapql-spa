import Promise from 'bluebird';
import { Destination, Language, User, SFAirportCity } from '../../models';

import DestinationType from '../../types/DestinationType';
import destinationArgsType from './destinationArgsType';
import jwt from 'jsonwebtoken';
import slugify from 'slugify';
import {
  GraphQLList as List
} from 'graphql';
import { randomBytes } from 'crypto';

export default {
  type: new List(DestinationType),
  description: 'Adds a new destination',
  args: destinationArgsType,
  resolve({ req }, args) {
    return new Promise( async (resolve, reject) => {
      try {

        if (!args.destination_id) {
          const total = await Destination.count();
          args.destination_id = String(total) + randomBytes(2).toString('hex');
          console.log('group destination id => ',args.destination_id);
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

        if (args.duplicate) {

          const langs = await Language.findAll({ where: { enabled: true }});
          delete args.duplicate;
          delete args.language_id;

          const duplication = await Promise.all(langs.map(async (lang) => {

            const { locale } = await lang.getLocale();

            const duplicateArgs = Object.assign({}, args, {
              title: (originalLang !== lang.id) ? `${args.title} - ${locale}` : args.title,
              slug: slugify((originalLang !== lang.id) ? `${args.title} - ${locale}` : args.title, { lower: true, remove: /[$*^`´|_§#€?&$+~.%=()'"!,\\/\:@]/i }),
              published: (originalLang !== lang.id) ? 0 : args.published
            });

            return {
              ...duplicateArgs,
              language_id: lang.id,
              user_id: user.id,
              airport_city_sfid: city.sfid
            }

          }));          

          const duplicatedDestinations = await Destination.bulkCreate(duplication);
          resolve(duplicatedDestinations)

        } else {

          const newDestination = await Destination.create(Object.assign({}, args, { slug: slugify(args.title, { lower: true, remove: /[$*^`´|_§#€?&$+~.%=()'"!,\\/\:@]/i }) }));
          await newDestination.setAuthor(user);
          await newDestination.setCity(city);

          resolve([newDestination]);
        }

      } catch(e) {
        reject(e);
      }
      
    });

  },
};
