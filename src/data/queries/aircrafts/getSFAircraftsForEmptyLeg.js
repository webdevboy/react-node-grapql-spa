import {
  GraphQLList as List,
  GraphQLString as StringType,
  GraphQLInt as Integer,
} from "graphql";

import { SFAircraftModel } from '../../models';

import SFAircraftModelType from "../../types/SFAircraftModelType";

export default {
  type: new List(SFAircraftModelType),
  name: "GetSFAircraftsForEmptyLeg",
  args: {
    search: {
      type: StringType,
    },
    limit: {
      type: Integer
    },
  },
  resolve(_, { search, limit }) {
    try {
      const where = {};

      if (search) {
        where.name = {$iLike: `%${search}%`};
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
