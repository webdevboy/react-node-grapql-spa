import {
  GraphQLString as StringType,
  GraphQLID as ID,
  GraphQLList as List,
  GraphQLNonNull as NonNull,
} from 'graphql';

import { Rate, Currency } from '../../models';
import RateType from '../../types/RateType';

export default {
  type: new List(RateType),
  args: {
    id: {
      type: ID,
    },
  },
  resolve(root, args) {
    try {
      return Rate.findAll({ where: args.id });
    } catch (e) {
      console.error(e);
      return e;
    }
  }
}