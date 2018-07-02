import { GraphQLInt, GraphQLString } from 'graphql';

import { Destination } from '../../models';

export default {
  type: GraphQLInt,
  name: 'Destinations',
  description: 'Find all destinations',
  args: {
    search: {
      type: GraphQLString,
    },
  },
  resolve(_, { search }) {
    const where = {
      title: {
        $iLike: `%${search}%`,
      },
    };
    return Destination.count({ where });
  },
};
