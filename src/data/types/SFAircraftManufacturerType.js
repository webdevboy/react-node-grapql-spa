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

export default new ObjectType({
  name: 'AircraftManufacturer',
  description: 'Represents a aircraft manufacturer from salesforce',
  fields: () => ({
    sfid: {
      type: StringType,
      resolve(manufacturer) {
        return manufacturer.sfid;
      }
    },
    name: {
      type: StringType,
      resolve(manufacturer) {
        return manufacturer.name;
      }
    },
    order: {
      type: Float,
      resolve(manufacturer) {
        return manufacturer.w_order__c;
      }
    }
    
  })
});
