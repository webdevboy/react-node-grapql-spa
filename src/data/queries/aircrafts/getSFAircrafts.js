import {
  GraphQLList as List,
  GraphQLString as StringType,
  GraphQLInt as Integer,
} from "graphql";

import { SFAircraftModel } from '../../models';

import SFAircraftModelType from "../../types/SFAircraftModelType";

export default {
  type: new List(SFAircraftModelType),
  name: "GetSFAircrafts",
  args: {
    search: {
      type: StringType,
    },
    catId: {
      type: StringType,
    },
    mfId: {
      type: StringType,
    },
    limit: {
      type: Integer
    },
  },
  resolve(_, { search, catId, mfId, limit }) {
    try {
      const where = {};

      if (search) {
        where['$iLike'] = { name: `%${search}%` };
      }
      if (catId) {
        where['aircraft_categories__c'] = catId;
      }
      if (mfId) {
        where['manufacturer__c'] = mfId;
      }
      if (limit) {
        return SFAircraftModel.findAll({ where, limit: limit });
      }
      if (search) {
        return SFAircraftModel.findAll({ where });
      }
      return SFAircraftModel.findAll();
    } catch (e) {
      console.error(e);
      return e;
    }
  },
};
