import {
  GraphQLString as StringType,
  GraphQLID as ID,
  GraphQLList as List,
  GraphQLNonNull as NonNull,
} from 'graphql';

import { Rate, Currency } from '../models';
import RateType from '../types/RateType';

export const getRates = {
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

export const getRate = {
  type: RateType,
  args: {
    id: {
      type: ID,
    },
    currency_from_id:{
      type: ID,
    },
    currency_to_id:{
      type: ID
    }
  },
  async resolve(root, args) {
    try {
      return Rate.findOne({ where: args});
    } catch (e) {
      console.error(e);
      return e;
    }
  }
}