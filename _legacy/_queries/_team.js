import {
  GraphQLString as StringType,
  GraphQLID as ID,
  GraphQLList as List,
  GraphQLBoolean as BooleanType,
} from 'graphql';

import GraphQLJSON from 'graphql-type-json';
import { Team, TeamMember } from '../models';
import TeamType from '../types/TeamType';
import TeamMemberType from '../types/TeamMemberType';


const ArgsType = {
  id: {
     type: ID,
  },

  name: {
    type: StringType
  },

  description: {
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

  bio: {
    type: StringType
  },

  visible: {
    type: BooleanType
  },

  override: {
    type: BooleanType
  },
};

export const getTeam = {
  type: new List(TeamType),
  args: ArgsType,
  resolve(root, args) {
    try {
      return Team.findAll({ where: args, order: [['order', 'ASC']] });
    } catch (e) {
      console.error(e);
      return e;
    }
    
  }
}

export const getTeamMembers = {
  type: new List(TeamMemberType),
  args: ArgsType,
  resolve(root, args) {
    try {
      return TeamMember.findAll({ where: args, order: [['order', 'ASC']] });
    } catch (e) {
      console.error(e);
      return e;
    }
  }
}

