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
import sequelize from "sequelize";

import { SFAirport, SFAirportCity, SFCountry } from '../../models';

import SFAirportType from "../../types/SFAirportType";

export default {
  type: new List(SFAirportType),
  description: "Search for the most near airports to the location",
  args: {
    lat: {
      type: new NonNull(FloatType),
    },
    long: {
      type: new NonNull(FloatType),
    },
    limit: {
      type: Integer,
    },
  },
  async resolve(_, args) {
    try {
      const longCast = sequelize.cast(sequelize.col("airport__c.location__longitude__s"), "double precision");
      const latCast = sequelize.cast(sequelize.col("airport__c.location__latitude__s"), "double precision");

      const airports = await SFAirport.model.findAll({
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
          // sequelize.where(
          //   sequelize.fn( "ST_Distance_Sphere",
          //     sequelize.fn( "ST_MakePoint", parseFloat( 53.404375 ), parseFloat( 22.8052951 ) ),
          //     sequelize.col( "distance" )
          helipad__c: false,
        },
        limit: args.limit || 5,
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

      return airports;
    } catch (e) {
      console.error(e);
      return e;
    }
  },
};
