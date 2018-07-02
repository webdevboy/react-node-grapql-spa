import {
  GraphQLString as StringType,
  GraphQLID as ID,
  GraphQLList as List,
  GraphQLBoolean as BooleanType,
} from 'graphql';

import GraphQLJSON from 'graphql-type-json';
import { TeamDepartment } from '../../models';
import TeamType from '../../types/TeamType';

export default {
  type: new List(TeamType),
  async resolve(root) {
    try {
      return TeamDepartment.findAll({ order: [['order', 'ASC']] });
    } catch (e) {
      console.error(e);
      return e;
    }
  }
}

