import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
  GraphQLBoolean as BooleanType,
  GraphQLInt as Integer,
  GraphQLFloat as FloatType
} from 'graphql';

import AircraftModelType from './SFAircraftModelType';
import AccountType from './AccountType';

export default new ObjectType({
  name: 'FleetAircraftType',
  description: 'Represents a fleet aircraft model on the salesforce schema',
  fields: {
    sfid: {
      type: StringType,
      resolve(model) {
        return model.sfid;
      }
    },
    name: {
      type: StringType,
      resolve(model) {
        return model.name;
      }
    },
    aircraft: {
      type: AircraftModelType,
      resolve(model) {
        if (model.aircraft) {
          return model.aircraft;
        }
        return model.getAircraft();
      }
    },
    operator__c: {
      type: StringType,
      resolve(model) {
        return model.operator__c;
      }
    },
    // operator: {
    //   type: AccountType,
    //   resolve(model) {
    //     if (model.operator) {
    //       return model.operator;
    //     }
    //     return model.getOperator();
    //   }
    // },
   }
});
