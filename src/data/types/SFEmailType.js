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
// import ContactType from './ContactType';
// import TripLegType from './SFTripLegType';

export default new ObjectType({
  name: 'EmailType',
  description: 'Represents an email',
  fields: {
    sfid: {
      type: ID,
      resolve(model) {
        return model.sfid;
      }
    },
    relatedtoid: {
      type: ID,
      resolve(model) {
        return model.relatedtoid;
      }
    },
    from_address: {
      type: StringType,
      resolve(model) {
        return model.fromaddress;
      }
    },
    subject: {
      type: StringType,
      resolve(model) {
        return model.subject;
      }
    },
    body: {
      type: StringType,
      resolve(model) {
        return model.textbody;
      }
    },
    to_address: {
      type: StringType,
      resolve(model) {
        return model.toaddress;
      }
    },
  }
});
