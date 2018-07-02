import {
  GraphQLList as List,
  GraphQLString as StringType
} from "graphql";

import { SFAircraftManufacturer } from '../../models';
import SFAircraftManufacturerType from "../../types/SFAircraftManufacturerType";

export default {
  type: new List(SFAircraftManufacturerType),
  name: "GetSFAircraftManufacturers",
  args: {
    search: {
      type: StringType,
    },
  },
  resolve(_, { search }) {
    try {
      if (search) {
        return SFAircraftManufacturer.findAll({ where: { $iLike: { name: `%${search}%` } } });
      } else {
        return SFAircraftManufacturer.findAll();
      }
      
    } catch (e) {
      console.error(e);
      return e;
    }
  },
};
