import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
  GraphQLBoolean as BooleanType,
  GraphQLList as List,
  GraphQLInt as Integer,
  GraphQLFloat as FloatType
} from 'graphql';
import DateType from 'graphql-date';
import ContactType from './ContactType';
import TripLegType from './SFTripLegType';
import EmailType from './SFEmailType';

const OpportunityType = new ObjectType({
  name: 'Opportunity',
  description: 'Represents an opportunity',
  fields: () => ({
    sfid: {
      type: StringType,
      resolve(model) {
        return model.sfid;
      }
    },
    contact: {
      type: ContactType,
      resolve(model) {
        return model.getContact();
      }
    },
    vendor: {
      type: ContactType,
      resolve(model) {
        return model.getVendor();
      }
    },
    departure: {
      type: DateType,
      resolve(model) {
        return model.departure_date_and_time__c;
      }
    },
    price: {
      type: FloatType,
      resolve(model) {
        return model.trip_legs_amount__c
      }
    },
    language: {
      type: StringType,
      resolve(model) {
        return model.communication_language__c;
      }
    },
    flight_time: {
      type: FloatType,
      resolve(model) {
        return model.total_flight_time_minutes__c
      }
    },
    legs: {
      type: new List(TripLegType),
      resolve(model) {
        return model.getLegs();
      }
    },
    emails: {
      type: new List(EmailType),
      resolve(model) {
        return model.getEmails();
      }
    }
  })
});

export default OpportunityType;
