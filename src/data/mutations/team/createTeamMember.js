import Promise from 'bluebird';
import { TeamDepartment, TeamMember } from '../../models';
import TeamMemberType from '../../types/TeamMemberType';
import teamMemberArgsType from './teamMemberArgsType';

export default {
  type: TeamMemberType,
  description: 'Creates a new team member',
  args: teamMemberArgsType,
  resolve(_, args) {
    return new Promise( async (resolve, reject) => {
      try {
        const newTeamMember = await TeamMember.create(args);
        const team = await TeamDepartment.findOne({where: { id: args.team_id }});
        await newTeamMember.setTeamDepartment(team);

        resolve(newTeamMember);     
      } catch(e) {
        reject(e);
      }  
    });
  },
};
