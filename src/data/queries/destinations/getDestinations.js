import { GraphQLString as StringType, GraphQLList as List, GraphQLInt as Integer } from 'graphql';

import { Destination } from '../../models';
import types from '../../types';

export default {
  type: new List(types.DestinationType),
  name: 'Destinations',
  description: 'Find all destinations',
  args: {
    search: {
      type: StringType,
    },
    offset: {
      type: Integer,
    },
    limit: {
      type: Integer,
    },
  },
  resolve(_, { search, offset, limit }) {
    const where = {
      title: {
        $iLike: `%${search}%`,
      },
    };
    return Destination.findAll({ where, offset, limit });
  },
};
