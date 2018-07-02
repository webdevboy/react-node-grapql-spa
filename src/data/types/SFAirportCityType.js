	import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
  GraphQLBoolean as BooleanType,
  GraphQLList as List,
  GraphQLInt as Integer,
} from 'graphql';

import AirportType from './SFAirportType';
import CountryType from './CountryType';
import { Language } from "../models";

const AirportCityType = new ObjectType({
  name: 'AirportCity',
  description: 'Represents an Airport City',
  fields: () => ({
    sfid: {
      type: ID,
      resolve(city) {
        return city.sfid;
      }
    },
    id: {
      type: Integer,
      resolve(airport) {
        return airport.id;
      },
    },
    name: {
      type: StringType,
      args: {
        language_id: {
          type: ID,
        },
      },
      async resolve(city, { language_id }) {
        const language = await Language.findById(language_id);
        return city[`name_${language && language.locale}__c`] || city.name;
      }
    },
    country_code: {
      type: StringType,
      resolve(city) {
        return city.country__c;
      }
    },
    airports: {
      type: new List(AirportType),
      resolve(city) {
        return city.getAirports();
      }
    },
    name_en: {
      type: StringType,
      resolve(city) {
        return city.name_en__c;
      }
    },
    name_de: {
      type: StringType,
      resolve(city) {
        return city.name_de__c;
      }
    },
    name_it: {
      type: StringType,
      resolve(city) {
        return city.name_it__c;
      }
    },
    name_hu: {
      type: StringType,
      resolve(city) {
        return city.name_hu__c;
      }
    },
    name_es: {
      type: StringType,
      resolve(city) {
        return city.name_es__c;
      }
    },
    name_pl: {
      type: StringType,
      resolve(city) {
        return city.name_pl__c;
      }
    },
    name_ru: {
      type: StringType,
      resolve(city) {
        return city.name_ru__c;
      }
    },
    name_fr: {
      type: StringType,
      resolve(city) {
        return city.name_fr__c;
      }
    },
    // coordinates: {
    //   type: StringType,
    //   async resolve(city) {
    //     const listAirports = await city.getAirports({});
    //     if (listAirports.length > 0) {
    //       return `${listAirports[0].location__latitude__s},${listAirports[0].location__longitude__s}`;
    //     }
    //     return null;
    //   }
    // },
    recommendedAirports: {
      type: new List(StringType),
      async resolve(city) {
        const listAirports = await city.getAirports();
        if (listAirports.length > 0) {
          let listCoordinates = [];
          listAirports.map(airport => {listCoordinates.push(`${airport.location__latitude__s},${airport.location__longitude__s}`)});
          return listCoordinates;
        }
        return null;
      }
    },
    country: {
      type: CountryType,
      resolve(city) {
        if (city.country) {
          return city.country;
        }
        return city.getCountry();
      }
    },
    coordinates: {
      type: StringType,
      resolve(city) {
        return `${city.location__latitude__s},${city.location__longitude__s}`;
      }
    },
  })
});

export default AirportCityType;