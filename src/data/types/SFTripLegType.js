import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
  GraphQLBoolean as BooleanType,
  GraphQLInt as Integer,
  GraphQLFloat as FloatType
} from 'graphql';
import DateType from 'graphql-date';
import ContactType from './ContactType';
import AirportType from './SFAirportType';

export default new ObjectType({
  name: 'TripLeg',
  description: 'Represents an Trip Leg',
  fields: () => ({
    sfid: {
      type: StringType,
      resolve(model) {
        return model.sfid;
      }
    },
    departure_airport: {
      type: AirportType,
      resolve(model) {
        return model.getDepartureAirport();
      }
    },
    arrival_airport: {
      type: AirportType,
      resolve(model) {
        return model.getArrivalAirport();
      }
    },
    departure_date: {
      type: DateType,
      resolve(model) {
        return model.departure_date__c;
      }
    },
    arrival_date: {
      type: DateType,
      resolve(model) {
        return model.arrival_date__c;
      }
    },
    total_flight_time: {
      type: FloatType,
      resolve(model) {
        return model.totalflighttime__c;
      }
    },
    flight_time: {
      type: FloatType,
      resolve(model) {
        return model.total_flight_time_minutes__c
      }
    },
  })
});
