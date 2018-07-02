import {
  GraphQLList as List,
} from 'graphql';
import GraphQLJSON from 'graphql-type-json';

import { Office } from '../../models';
import types from '../../types';

export default {
  type: new List(types.OfficeType),
  async resolve(root, args) {
    try {
      return Office.findAll();
    } catch (e) {
      console.error(e);
      return e;
    }
  }
}

