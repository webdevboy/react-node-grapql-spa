import {
  GraphQLID as ID,
  GraphQLList as List,
  GraphQLString as StringType
} from "graphql";

import { SFAircraftModel } from '../../models';

import SFAircraftModelType from "../../types/SFAircraftModelType";

export default {
  type: new List(SFAircraftModelType),
  name: "GetSFAircrafts",
  args: {
    manufacturer_sfid: {
      type: ID,
    },
  },
  resolve(_, args) {
	try {
      const where = {}
      if (args.manufacturer_sfid) {
        where.manufacturer__c = args.manufacturer_sfid;
		return SFAircraftModel.findAll({
          where,
        });
      }
	  else {
		return [];
	  }

    } catch (e) {
      console.error(e);
      return e;
    }
  },
};
