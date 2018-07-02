import {
  GraphQLString as StringType,
  GraphQLID as ID,
  GraphQLList as List,
  GraphQLObjectType as ObjectType,
  GraphQLNonNull as NonNull,
  GraphQLBoolean as BooleanType,
  GraphQLInt as Integer,
  GraphQLInputObjectType as InputType,
  GraphQLFloat as FloatType,
} from "graphql";

import { SFAirport } from '../../models';
import AirportType from "../../types/SFAirportType";

export default {
  type: AirportType,
  name: "getAirport",
  description: "Get a single airport",
  args: {
    sfid: {
      type: StringType,
    },
    iata: {
      type: StringType,
    },
  },
  async resolve(_, { sfid, iata }) {
    try {
      const where = {};
      
      if (sfid) {
        where.sfid = sfid;
      }
      if (iata) {
        where.iata_code__c = iata;
      }

      const [airport, cacheHit] = await SFAirport.findOneCached(`airports:${JSON.stringify(where)}`,{ where });
      return airport;
    } catch (e) {
      console.error(e);
      return e;
    }
  },
};
