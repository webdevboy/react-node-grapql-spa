import { GraphQLList as List, GraphQLInt as Integer, GraphQLString } from 'graphql';

import AircraftType from '../../types/AircraftType';

import { Aircraft, AircraftManufacturer } from '../../models';

export default {
  type: new List(AircraftType),
  name: 'GetAircraftsByManufacturer',
  args: {
    manufacturer_slug: {
      type: GraphQLString,
    },
    offset: {
      type: Integer,
    },
    limit: {
      type: Integer,
    },
  },
  async resolve(_, { manufacturer_slug, offset, limit }) {
    try {
      const include = [
        {
          model: AircraftManufacturer,
          as: 'Manufacturer',
          where: {
            slug: manufacturer_slug,
          },
        },
      ];
      return Aircraft.findAll({ include, offset, limit });
    } catch (e) {
      console.error(e);
      return e;
    }
  },
};
