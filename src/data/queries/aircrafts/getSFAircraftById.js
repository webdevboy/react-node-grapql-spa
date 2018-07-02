import {
  GraphQLID as ID,
  GraphQLList as List,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
} from "graphql";

import { SFAircraftModel } from '../../models';

import SFAircraftModelType from "../../types/SFAircraftModelType";

export default {
  type: SFAircraftModelType,
  name: "GetSFAircraft",
  args: {
    aircraft_sfid: {
      type: ID,
    },
  },
  resolve(_, args) {
	try {
      const where = {}
      if (args.aircraft_sfid) {
        where.sfid = args.aircraft_sfid;
		return SFAircraftModel.findOne({
          where,
        });
      }
	  else {
		return null;
	  }

    } catch (e) {
      console.error(e);
      return e;
    }
  },
};
