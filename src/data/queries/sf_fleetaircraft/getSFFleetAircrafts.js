import {
  GraphQLList as List,
  GraphQLString as StringType,
  GraphQLInt as Integer,
} from "graphql";

import { SFFleetAircraft } from '../../models';

import SFFleetAircraftType from "../../types/SFFleetAircraftType";

export default {
  type: new List(SFFleetAircraftType),
  name: "getSFFleetAircrafts",
  args: {
    search: {
      type: StringType,
    },
    account_sfid: {
      type: StringType
    },
    limit: {
      type: Integer
    },
  },
  resolve(_, { search, account_sfid, limit }) {
    try {
      const where = {};
      if (search) {
        where.name = {$iLike: `%${search}%`};
      }

      if (account_sfid) {
        where.operator__c = account_sfid;
      }

      if (search || account_sfid) {
        if (limit) {
          return SFFleetAircraft.findAll({ where, limit: limit });
        }
        return SFFleetAircraft.findAll({ where });
      }

      if (limit) {
        return SFFleetAircraft.findAll({ limit: limit });
      }

      return SFFleetAircraft.findAll();
    } catch (e) {
      console.error(e);
      return e;
    }
  },
};
