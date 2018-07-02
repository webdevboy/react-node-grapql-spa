import {
  GraphQLString as StringType,
  GraphQLID as ID,
  GraphQLList as List,
  GraphQLObjectType as ObjectType,
  GraphQLNonNull as NonNull,
  GraphQLBoolean as BooleanType,
  GraphQLFloat as FloatType,
  GraphQLInt as Integer,
  GraphQLInputObjectType as InputType
} from "graphql";

import sequelize from "sequelize";

import {
  EmptyLeg,
  SFAirport,
  SFAirportCity,
  SFCountry,
  SFAircraftModel,
  SFAircraftCategory,
  SFAircraftManufacturer,
  Currency
} from "../../models";

import EmptyLegType from "../../types/EmptyLegType";
import PaginationInput from "../../types/utils/PaginationInput";

export default {
  type: new List(EmptyLegType),
  name: "EmptyLegs",
  description: "Find all emptylegs nearby a departure point",
  args: {
    long: {
      type: FloatType
    },
    lat: {
      type: FloatType
    },
    limit: {
      type: Integer
    }
  },
  async resolve(_, args) {
    const where = {};
    where.published = true;
    if (!args.long || !args.lat) {
      where.featured = true;
      const legs = await EmptyLeg.model.findAll({
        where,
        limit: args.limit || 5
      });
      return legs;
    } else {
      const include = [
        {
          model: Currency.model,
          as: "currency",
          required: true
        },
        {
          model: SFAirport.model,
          as: "fromAirport",
          required: true,
          include: [
            {
              model: SFAirportCity.model,
              as: "city",
              include: [
                {
                  model: SFCountry.model,
                  as: "country"
                }
              ]
            }
          ]
        },
        {
          model: SFAirport.model,
          as: "toAirport",
          required: true,
          include: [
            {
              model: SFAirportCity.model,
              as: "city",
              include: [
                {
                  model: SFCountry.model,
                  as: "country"
                }
              ]
            }
          ]
        },
        {
          model: SFAircraftModel.model,
          as: "aircraft",
          required: true,
          include: [
            {
              model: SFAircraftCategory.model,
              as: "category"
            },
            {
              model: SFAircraftManufacturer.model,
              as: "manufacturer"
            }
          ]
        }
      ];

      const longCast = sequelize.cast(sequelize.col("fromAirport.location__longitude__s"), "double precision");
      const latCast = sequelize.cast(sequelize.col("fromAirport.location__latitude__s"), "double precision");

      // fidn all empty legs first
      const legs = await EmptyLeg.model.findAll({
        attributes: {
          include: [
            [
              sequelize.fn(
                "ST_Distance_Sphere",
                sequelize.fn("st_makepoint", longCast, latCast), // point A
                sequelize.fn("st_makepoint", args.long, args.lat) // point B
              ), // end ST_Distance_Sphere
              "distance" // as 'distance'
            ]
          ]
        },
        order: [sequelize.col("distance")],
        where,
        include,
        limit: args.limit || 5
      });
      return legs;
    }
  }
};
