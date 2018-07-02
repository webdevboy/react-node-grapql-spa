import {
  GraphQLString as StringType,
  GraphQLID as ID,
  GraphQLList as List,
} from 'graphql';

import { Settings } from '../../models';
import OptionType from '../../types/OptionType';
import { generateCacheKey } from '../../cache';

export default {
  type: new List(OptionType),
  args: {
    id: {
      type: ID,
    },
    option: {
      type: StringType,
    },
  },
  async resolve(root, args) {
    try {
      const where = { ...args };
      const settings = await Settings.model.findAll({ where });
      return settings;
    } catch (e) {
      console.error(e);
      return e;
    }
  },
};
