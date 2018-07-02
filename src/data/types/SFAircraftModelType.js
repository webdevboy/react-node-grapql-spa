import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
  GraphQLBoolean as BooleanType,
  GraphQLInt as Integer,
  GraphQLFloat as FloatType
} from 'graphql';

import AircraftCategoryType from './SFAircraftCategoryType';
import AircraftManufacturerType from './SFAircraftManufacturerType';

export default new ObjectType({
  name: 'AircraftModel',
  description: 'Represents a aircraft model on the salesforce schema',
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
    image_id: {
      type: StringType,
      resolve(model) {
        return model.image_id__c
      }
    },
    cabin_width: {
      type: FloatType,
      resolve(model) {
        return model.w_cabin_width__c
      }
    },
    cabin_height: {
      type: FloatType,
      resolve(model) {
        return model.w_cabin_height__c
      }
    },
    cabin_length: {
      type: FloatType,
      resolve(model) {
        return model.w_cabin_length__c
      }
    },
    speed: {
      type: FloatType,
      resolve(model) {
        return model.w_speed__c
      }
    },
    luggage_standard: {
      type: FloatType,
      resolve(model) {
        return model.capacity_luggage_standard__c
      }
    },
    luggage_small: {
      type: FloatType,
      resolve(model) {
        return model.capacity_luggage_small__c
      }
    },
    luggage_m3: {
      type: FloatType,
      resolve(model) {
        return model.w_luggage_cap_m3__c
      }
    },
    range: {
      type: FloatType,
      resolve(model) {
        return model.w_range_nm__c
      }
    },
    seats: {
      type: FloatType,
      resolve(model) {
        return model.normal_passenger_seats__c
      }
    },
    category_id: {
      type: StringType,
      resolve(model) {
        return model.aircraft_categories__c
      }
    },
    manufacturer_id: {
      type: StringType,
      resolve(model) {
        return model.manufacturer__c
      }
    },
    category: {
      type: AircraftCategoryType,
      resolve(model) {
        if (model.category) {
          return model.category;
        }
        return model.getCategory();
      }
    },
    manufacturer: {
      type: AircraftManufacturerType,
      resolve(model) {
        if (model.manufacturer) {
          return model.manufacturer;
        }
        return model.getManufacturer();
      }
    },
    // http://lunajets.force.com/flightoffer/servlet/servlet.FileDownload?file=
    // image: {
    //   type: StringType,
    //   resolve(model) {
    //     if (model.manufacturer) {
    //       return model.manufacturer;
    //     }
    //     return model.getManufacturer();
    //   }
    // },
  }
});
