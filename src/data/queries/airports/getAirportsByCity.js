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

import { SFAirport, SFAirportCity } from '../../models';

import types from "../../types";

export default {
  type: new List(types.AirportType),
  name: "GetAirportsByCity",
  description: "Search for airports by city",
  args: {
    city_name: {
      type: StringType,
    },
  },
  async resolve(_, args) {
    return SFAirport.findAll({
      include: [{
        model: SFAirportCity,
        as: 'City',
        where: {
          name: args.city_name,
        }
      }]
    });
  },
};
