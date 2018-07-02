import {
  GraphQLID as ID,
  GraphQLNonNull as NonNull,
} from "graphql";

import { SFAircraftManufacturer } from '../../models';
import AircraftManufacturerType from "../../types/SFAircraftManufacturerType";

export default {
  type: AircraftManufacturerType,
  name: 'getSfAircraftManufacturer',
  args: {
    id: {
      type: new NonNull(ID),
    },
  },
  resolve(_, args) {
    try {
      return SFAircraftManufacturer.findOne({ where: { sfid: args.id } });
    } catch (e) {
      console.error(e);
      return e;
    }
  },
};
