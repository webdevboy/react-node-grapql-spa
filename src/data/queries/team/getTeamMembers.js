import {
  GraphQLString as StringType,
  GraphQLID as ID,
  GraphQLList as List,
  GraphQLBoolean as BooleanType,
} from 'graphql';

import GraphQLJSON from 'graphql-type-json';
import { TeamMember } from '../../models';
import TeamMemberType from '../../types/TeamMemberType';

export default {
  type: new List(TeamMemberType),
  args: {
    id: {
      type: ID,
    },
    name: {
      type: StringType
    },
    first_name: {
      type: StringType
    },
    last_name: {
      type: StringType
    },
    email: {
      type: StringType
    },
    title: {
      type: StringType
    },
    visible: {
      type: BooleanType
    },
  },
  resolve(root, args) {
    try {
      return TeamMember.findAll({ where: args, order: [['order', 'ASC']] });
    } catch (e) {
      console.error(e);
      return e;
    }
  }
}