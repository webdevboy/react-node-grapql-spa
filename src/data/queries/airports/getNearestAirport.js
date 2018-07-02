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

import { SFAirport, SFAirportCity, SFCountry } from '../../models';

import SFAirportType from "../../types/SFAirportType";

export default {
  type: SFAirportType,
  description: 'Search on SFAirports table for the closest airport',
  args: {
    lat: {
      type: new NonNull(FloatType),
    },
    long: {
      type: new NonNull(FloatType),
    },
  },
  async resolve(_, args) {
    try {
      const longCast = sequelize.cast(sequelize.col("airport__c.location__longitude__s"), "double precision");
      const latCast = sequelize.cast(sequelize.col("airport__c.location__latitude__s"), "double precision");

      const airport = await SFAirport.findOne({
        attributes: {
          include: [
            [
              sequelize.fn("ST_Distance_Sphere",
                sequelize.fn("st_makepoint", longCast, latCast), // point A
                sequelize.fn("st_makepoint", args.long, args.lat), // point B
              ), // end ST_Distance_Sphere
              "distance", // as 'distance'
            ],
          ],
        },
        order: [sequelize.col("distance")],
        where: {
          helipad__c: false,
        },
        limit: 1,
        include: [
          {
            model: SFAirportCity.model,
            as: 'city',
            include: [
              {
                model: SFCountry.model,
                as: 'country'
              }
            ]
          }
        ]
      });

      return airport;
    } catch (e) {
      console.error(e);
      return e;
    }
  },
};
