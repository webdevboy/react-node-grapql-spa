import { GraphQLList as List, GraphQLInt as Integer, GraphQLString } from 'graphql';

import AircraftType from '../../types/AircraftType';

import { Aircraft, AircraftCategory } from '../../models';

export default {
  type: new List(AircraftType),
  name: 'GetAircraftsByCategory',
  args: {
    category_slug: {
      type: GraphQLString,
    },
    offset: {
      type: Integer,
    },
    limit: {
      type: Integer,
    },
  },
  async resolve(_, { category_slug, offset, limit }) {
    try {
      const include = [
        {
          model: AircraftCategory,
          as: 'Category',
          where: {
            slug: category_slug,
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
