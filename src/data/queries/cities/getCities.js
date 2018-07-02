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

import { SFAirportCity } from '../../models';

import AirportCityType from '../../types/SFAirportCityType';

export default {
  type: new List(AirportCityType),
  name: 'AirportCity',
  description: 'Find all airport cities',
  args: {
    search: {
      type: StringType,
    },
    sf_id: {
      type: StringType
    },
    sfids: {
      type: new List(StringType),
    },
  },
  resolve(_, args) {
    const where = {};

    if (args.search) {
      where.name = { $ilike: `${args.search}%` }
    }
    if (args.sf_id) {
      where.sfid = args.sf_id;
    }

    if (args.sfids) {
      where.sfid = { $in : args.sfids};
    }

    const query = Object.keys(where).length ? { where } : { limit: 20 };

    return SFAirportCity.findAll(query);
  },
};
