import Promise from 'bluebird';

import {
  GraphQLString as StringType,
  GraphQLID as ID,
  GraphQLList as List,
  GraphQLNonNull as NonNull,
  GraphQLInt as Integer,
  GraphQLObjectType as ObjectType,
  GraphQLBoolean as BooleanType,
} from 'graphql';

import GraphQLJSON from 'graphql-type-json';
import { Team, TeamMember } from '../models';
import TeamType from '../types/TeamType';
import TeamMemberType from '../types/TeamMemberType';


const teamArgs = {
    id: {
      type: ID,
    },
    name: {
      type: (StringType)
    },
    description: {
      type: (StringType)
    },
    order: {
      type: Integer
    }
  }

const teamMembersArgs = {
    id: {
      type: ID,
    },
    first_name: {
      type: (StringType)
    },
    last_name: {
      type: (StringType)
    },
    email: {
      type: (StringType)
    },
    title: {
      type: (StringType)
    },
    bio: {
      type: (StringType)
    },
    visible: {
      type: (BooleanType)
    },
    override: {
      type: (BooleanType)
    },
    order: {
      type: Integer
    }
  }

export const createTeam = {
  type: TeamType,
  description: 'creates a team department',
  args: teamArgs,
  resolve({ transporter }, args) {
    return new Promise( async (resolve, reject) => {
      try {
          const newTeam = await Team.create({...args});
          resolve(newTeam);     
      } catch(e) {
        reject(e);
      }  
    });
  },
};


export const createTeamMember = {
  type: TeamMemberType,
  description: 'creates a new team member',
  args: teamMembersArgs,
  resolve({ transporter }, args) {
    return new Promise( async (resolve, reject) => {
      try {
          const newTeamMember = await TeamMember.create({
            first_name: args.first_name,
            last_name: args.last_name,
            email: args.email,
            title: args.title,
            bio: args.bio,
            visible: args.visible,
            override: args.override,
            });
          const team = await Team.findOne({where: {id: args.id}});
          newTeamMember.setTeam(team);
          resolve(newTeamMember);     
      } catch(e) {
        reject(e);
      }  
    });
  },
};



export const updateTeam = {
  type: TeamType,
  description: 'updates a team department',
  args: teamArgs, 
  resolve({ transporter }, args) {
    return new Promise( async (resolve, reject) => {

      try {

          const team = await Team.findById(args.id);

          const updatedTeam = await team.update(args);

          resolve(updatedTeam);     

      } catch(e) {
        reject(e);
      }
      
    });
  }
}

export const updateTeamMember = {
  type: TeamMemberType,
  description: 'updates a team member',
  args: teamMembersArgs, 
  resolve({ transporter }, args) {
    return new Promise( async (resolve, reject) => {

      try {

          const teamMember = await TeamMember.findById(args.id);

          const updatedTeamMember = await teamMember.update(args);

          resolve(updatedTeamMember);     

      } catch(e) {
        reject(e);
      }
      
    });
  }
}

export const removeTeam = {
  type: TeamType,
  description: 'remove an team',
  args: {
  id: {
    type: new NonNull(ID)
  },
},
resolve({ transporter }, args) {
  return new Promise( async (resolve, reject) => {
    try {
      await Team.destroy({  
        where: { id: args.id }
      }); 
      resolve({id: args.id});
    } 
    catch(e) {
      console.log('error in mutation');
      reject(e);
      }
    });
  },
};

