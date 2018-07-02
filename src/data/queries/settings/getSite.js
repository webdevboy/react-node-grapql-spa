import {
  GraphQLString as StringType,
  GraphQLID as ID,
  GraphQLList as List,
} from 'graphql';

import { Settings } from '../../models';
import OptionType from '../../types/OptionType';

export default {
  type: new List(OptionType),
  async resolve() {
    try {
      return Settings.findAll({
        where: {
          option: {
            $iLike: 'site_%',
          },
        },
      });
    } catch (e) {
      console.error(e);
      return e;
    }
  },
};
