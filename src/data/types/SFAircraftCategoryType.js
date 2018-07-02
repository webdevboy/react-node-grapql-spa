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
  name: 'AircraftCategory',
  description: 'Represents a aircraft category from salesforce',
  fields: () => ({
    sfid: {
      type: StringType,
      resolve(category) {
        return category.sfid;
      }
    },
    name: {
      type: StringType,
      resolve(category) {
        return category.name;
      }
    },
    order: {
      type: Float,
      resolve(category) {
        return category.w_order__c;
      }
    }
  })
});
