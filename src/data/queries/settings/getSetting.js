import {
  GraphQLString as StringType,
  GraphQLID as ID,
} from 'graphql';

import { Settings } from '../../models';
import OptionType from '../../types/OptionType';

export default {
  type: OptionType,
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
      return Settings.findOne({ where: args });
    } catch (e) {
      console.error(e);
      return e;
    }
  },
};
