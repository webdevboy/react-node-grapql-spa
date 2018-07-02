import { GraphQLID as ID } from 'graphql';
import GraphQLJSON from 'graphql-type-json';

import { Office } from '../../models';
import types from '../../types';
import OfficeQueryType from './OfficeQueryType';

export default {
  type: types.OfficeType,
  args: {
    id: {
      type: ID
    }
  },
  async resolve(root, args) {
    try {
      return Office.findOne({ where: args });
    } catch (e) {
      console.error(e);
      return e;
    }
  }
}

