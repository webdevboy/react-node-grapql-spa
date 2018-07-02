	import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
  GraphQLBoolean as BooleanType,
  GraphQLList as List,
  GraphQLInt as Integer,
} from 'graphql';

import AirportCity from './SFAirportCityType';
import { Language } from "../models";

const CountryType = new ObjectType({
  name: 'Country',
  description: 'Represents an Country',
  fields: () => ({
    sfid: {
      type: ID,
      resolve(country) {
        return country.sfid;
      }
    },
    id: {
      type: Integer,
      resolve(country) {
        return country.id;
      }
    },
    name: {
      type: StringType,
      args: {
        language_id: {
          type: ID,
        },
      },
      async resolve(country, { language_id }) {
        const language = await Language.findById(language_id);
        return country[`name_${language && language.locale}__c`] || country.name;
      }
    },
    countryCode: {
      type: StringType,
      resolve(country) {
        return country.country_code__c.toLowerCase();
      }
    },
    diallingCode: {
      type: StringType,
      resolve(country) {
        return country.country_dialling_code__c
      }
    },
    cities: {
      type: new List(AirportCity),
      resolve(country) {
        country.getCities();
      }
    }
  })
});

export default CountryType;