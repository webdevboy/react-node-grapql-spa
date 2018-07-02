import Promise from 'bluebird';
import { TeamMember } from '../../models';
import TeamType from '../../types/TeamType';
import teamArgsType from './teamArgsType';

export default {
  type: TeamType,
  description: 'Creates a team department',
  args: teamArgsType,
  resolve(_, args) {
    return new Promise( async (resolve, reject) => {
      try {
        const newTeam = await TeamMember.create({ ...args });
        resolve(newTeam);     
      } catch(e) {
        reject(e);
      }  
    });
  },
};