import {
  GraphQLString as StringType,
  GraphQLID as ID,
  GraphQLList as List,
  GraphQLObjectType as ObjectType,
  GraphQLNonNull as NonNull,
  GraphQLBoolean as BooleanType,
  GraphQLInt as Integer,
  GraphQLInputObjectType as InputType,
} from 'graphql';

import sequelize from "sequelize";
import { SFAirportCity } from '../../models';
import { SFCountry } from '../../models';

import AirportCityType from '../../types/SFAirportCityType';
import CountryType from '../../types/CountryType';

export default {
  type: new List(AirportCityType),
  name: 'AirportCity',
  description: 'Search airport cities',
  args: {
    search: {
      type: StringType,
    },
    limit: {
      type: Integer,
    },
  },
  async resolve(_, args) {
    /*const where = sequelize.where(sequelize.fn("concat",
      sequelize.col("SFAirportCity.name"),
      sequelize.col("country.name")), {
        like: `%${args.search}%`
      }
    );*/
    const where = {};
    if (args.search){
    where.$or = [
          {name: { $iLike: `%${args.search}%` }},
          {'$country.name$' : { $iLike: `%${args.search}%` }},
        ];
    }
    const cities = await SFAirportCity.model.findAll({
      where,
      limit: args.limit ? args.limit : 100,
      include: {
        model: SFCountry.model,
        as: 'country',
        required: false,
      }
    });
    return cities;
  },
};
