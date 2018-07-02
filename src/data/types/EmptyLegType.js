import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
  GraphQLBoolean as BooleanType,
  GraphQLList as List,
  GraphQLInt as Integer,
  GraphQLFloat as Float,
} from 'graphql';
import DateType from 'graphql-date';
import GraphQLJSON from 'graphql-type-json';
import AircraftModelType from '../types/SFAircraftModelType';
import CurrencyType from '../types/CurrencyType';
import AirportType from '../types/SFAirportType';
import MediaType from '../types/MediaType';
import StringTranslationType from '../types/StringTranslationType';

import { Post, SFAirport, StringTranslation } from '../models';

export default new ObjectType({
  name: 'EmptyLeg',
  description: 'Represents a Empty Leg',
  fields: () => ({
    id: {
      type: Integer,
      resolve(emptyleg) {
        return emptyleg.id;
      },
    },
    price: {
      type: Float,
      resolve(emptyleg) {
        return emptyleg.price;
      },
    },
    from_date: {
      type: DateType,
      resolve(emptyleg) {
        return emptyleg.from_date;
      },
    },
    until_date: {
      type: DateType,
      resolve(emptyleg) {
        return emptyleg.until_date;
      },
    },
    details: {
      type: GraphQLJSON,
      resolve(emptyleg) {
        return emptyleg.details;
      },
    },
    featured: {
      type: BooleanType,
      resolve(emptyleg) {
        return emptyleg.featured || false;
      },
    },
    published: {
      type: BooleanType,
      resolve(emptyleg) {
        return emptyleg.published;
      },
    },
    created_at: {
      type: DateType,
      resolve(emptyleg) {
        return emptyleg.created_at;
      },
    },
    updated_at: {
      type: DateType,
      resolve(emptyleg) {
        return emptyleg.updated_at;
      },
    },
    currency_id: {
      type: ID,
      resolve(emptyleg) {
        return emptyleg.currency_id;
      }
    },
    currency: {
      type: CurrencyType,
      resolve(emptyleg) {
        if (emptyleg.currency) {
          return emptyleg.currency;
        }
        return emptyleg.getCurrency();
      },
    },
    aircraft_sfid: {
      type: ID,
      resolve(emptyleg) {
        return emptyleg.aircraft_sfid;
      }
    },
    aircraft: {
      type: AircraftModelType,
      resolve(emptyleg) {
        if (emptyleg.aircraft) {
          return emptyleg.aircraft;
        }
        return emptyleg.getAircraft();
      },
    },
    gallery: {
      type: new List(MediaType),
      async resolve(emptyleg) {
        const post = await Post.findOne({ where: { meta: { details: { aircraft_model_sfid: emptyleg.aircraft.sfid } } } });
        const gallery = await aircraft.getGallery();
        return gallery;
      }
    },
    from_airport_sfid: {
      type: ID,
      resolve(emptyleg) {
        return emptyleg.from_airport_sfid;
      }
    },
    from_airport: {
      type: AirportType,
      resolve(emptyleg) {

        if (emptyleg.fromAirport) {
          return emptyleg.fromAirport;
        }

        return emptyleg.getFromAirport();

      },
    },
    to_airport_sfid: {
      type: ID,
      resolve(emptyleg) {
        return emptyleg.to_airport_sfid;
      }
    },
    to_airport: {
      type: AirportType,
      resolve(emptyleg) {
        if (emptyleg.toAirport) {
          return emptyleg.toAirport;
        }

        return emptyleg.getToAirport();
      },
    },
    translations: {
      type: new List(StringTranslationType),
      resolve() {
        return StringTranslation.findAll({ where: { message_id: 'url.emptyLegFlights.emptyLeg' } });
      }
    },
  }),
});
