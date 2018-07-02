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
import { SFAirport, SFAirportCity, SFCountry } from '../../models';
import PaginationInput from "../../types/utils/PaginationInput";
import AirportType from "../../types/SFAirportType";
import sequelize from "sequelize";

export default {
  type: new List(AirportType),
  name: "GetAirports",
  description: "Search for airports",
  args: {
    sfids: {
      type: new List(StringType),
    },
    search: {
      type: StringType,
    },
    pagination: {
      type: PaginationInput,
    },
    helipad: {
      type: BooleanType,
      defaultValue: false,
    },
    lat: {
      type: FloatType,
    },
    long: {
      type: FloatType,
    },
  },
  async resolve(_, { helipad, search, pagination, sfids, lat, long }) {

    try {
      const where = {
        helipad__c: helipad,
      };

      if (search) {
  
        if (search.length <= 4) {
          where.$or = [
            { iata_code__c: { $iLike: `${search}` }},
            { icao_code__c: { $iLike: `${search}` }},
          ];
        } else {
          where.$or = [
            { name__c: { $ilike: `${search}%` }}, // Geneva ...
            { name_it__c: { $ilike: `${search}%` }},
            { name_es__c: { $ilike: `${search}%` }},
            { name_en__c: { $ilike: `${search}%` }},
            { name_de__c: { $ilike: `${search}%` }},
            { name_fr__c: { $ilike: `${search}%` }},
            { name_hu__c: { $ilike: `${search}%` }},
            { name_pl__c: { $ilike: `${search}%` }},
            { name_ru__c: { $ilike: `${search}%` }},
          ];
        }
      }

      if (sfids) {
        where.$and = {
          sfid: { $in: sfids }
        };
      }
      
      const longCast = sequelize.cast(sequelize.col("airport__c.location__longitude__s"), "double precision");
      const latCast = sequelize.cast(sequelize.col("airport__c.location__latitude__s"), "double precision");

      const airports = await SFAirport.model.findAll({
        attributes: (lat && long) ? {
          include: [
            [
              sequelize.fn("ST_Distance_Sphere",
                sequelize.fn("st_makepoint", longCast, latCast), // point A
                sequelize.fn("st_makepoint", long, lat), // point B
              ), // end ST_Distance_Sphere
              "distance", // as 'distance'
            ],
          ],
        } : null,
        where,
        order: (lat && long) ? [sequelize.col("distance")] : null,
        ...pagination,
        include: [
          {
            model: SFAirportCity.model,
            as: 'city',
            // or: false,
            required: true,
            // where: (search.length > 4) ? where,
            include: [{
              model: SFCountry.model,
              as: 'country',
            }],
          },
        ]
      });

      return airports;
    } catch (e) {
      console.error(e);
      return e;
    }
  },
};
