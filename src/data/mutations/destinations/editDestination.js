import Promise from 'bluebird';
import { Destination, Language, SFAirportCity } from '../../models';
import DestinationType from '../../types/DestinationType';
import destinationArgsType from './destinationArgsType';

export default {
  type: DestinationType,
  description: 'Edits a destination',
  args: destinationArgsType,
  resolve(_, args) {
    return new Promise( async (resolve, reject) => {
      try {

        const destination = await Destination.findById(args.id);

        if (!destination) {
          throw new Error('Destination not found!');
        }

        if (args.language_id) {
          const lang = await Language.findById(args.language_id);
          if (!lang) {
            throw new Error('Language not found!');
          }
        }

        if (args.city_id) {
          const city = await SFAirportCity.findOne({ where: { sfid: args.city_id }});
          if (!city) {
            throw new Error('Airport City not found!');
          } else {
            destination.setCity(city);
            delete args.city_id;
          }
        }

        const updateDestination = await destination.update(args);
        resolve(updateDestination);

      } catch(e) {
        reject(e);
      }
      
    });

  },
};
