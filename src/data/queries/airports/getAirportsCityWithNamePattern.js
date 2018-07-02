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
import DateType from "graphql-date";
import sequelize from "sequelize";

import { SFAirport } from "../../models";
import AirportType from "../../types/SFAirportType";

export default {
  type: new List(AirportType),
  name: "getAirportsCityWithNamePattern",
  description: "Get airports and city whose name contains input text",
  args: {
    name: {
      type: new List(StringType),
    },
  },
  async resolve(_, args) {
    try {
      const whereQuery = {
        $or: [
          { name: { $iLike: { $any: args.name } } },
          { iata_code__c: { $iLike: { $any: args.name } } },
          { icao_code__c: { $iLike: { $any: args.name } } },
        ],
      };

      const sortCriteria = ['name'];
      const airport = await SFAirport.findAll({ where: { ...whereQuery }, order: sortCriteria });
      return airport;
    } catch (e) {
      console.log(e);
      return e;
    }
  },
};
