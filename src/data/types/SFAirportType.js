import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
  GraphQLBoolean as BooleanType,
  GraphQLList as List,
  GraphQLInt as Integer,
  GraphQLFloat as FloatType,
} from 'graphql';

import AirportCity from './SFAirportCityType';

export default new ObjectType({
  name: 'SFAirport',
  description: 'Represents an Airport',
  fields: () => ({
    sfid: {
      type: ID,
      resolve(airport) {
        return airport.sfid;
      },
    },
    id: {
      type: Integer,
      resolve(airport) {
        return airport.id;
      },
    },
    full_name: {
      type: StringType,
      resolve(airport) {
        return airport.name;
      },
    },
    name: {
      type: StringType,
      resolve(airport) {
        return airport.name__c;
      },
    },
    icao: {
      type: StringType,
      resolve(airport) {
        return airport.icao_code__c;
      },
    },
    time_to_utc: {
      type: StringType,
      resolve(airport) {
        return airport.time_to_utc__c;
      },
    },
    iata: {
      type: StringType,
      resolve(airport) {
        return airport.iata_code__c;
      },
    },
    helipad: {
      type: BooleanType,
      resolve(airport) {
        return airport.helipad__c;
      },
    },
    coordinates: {
      type: StringType,
      resolve(airport) {
        return `${airport.location__latitude__s},${airport.location__longitude__s}`;
      },
    },
    distance: {
      type: StringType,
      resolve(airport) {
        return airport.get('distance');
      },
    },
    city: {
      type: AirportCity,
      resolve(airport) {
        if (airport.city) {
          return airport.city;
        }
        return airport.getCity();
      },
    },
    post: {
      type: StringType,
      resolve(airport) {
        return airport.post;
      },
    }
  }),
});
