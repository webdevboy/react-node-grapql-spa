import Promise from 'bluebird';
import { Team, TeamMember } from '../../models';
import TeamMemberType from '../../types/TeamMemberType';
import teamMemberArgsType from './teamMemberArgsType';

import {
  GraphQLID as ID
} from 'graphql';

export default {
  type: TeamMemberType,
  description: 'Updates a team member',
  args: teamMemberArgsType,
  resolve(_, args) {
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