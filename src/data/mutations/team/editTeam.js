import Promise from 'bluebird';
import { TeamDepartment } from '../../models';
import TeamType from '../../types/TeamType';
import teamArgsType from './teamArgsType';

export default {
  type: TeamType,
  description: 'Updates a Team department',
  args: teamArgsType, 
  resolve(_, args) {
    return new Promise( async (resolve, reject) => {

      try {

        const team = await TeamDepartment.findById(args.id);
        const updatedTeam = await team.update(args);
        resolve(updatedTeam);     

      } catch(e) {
        reject(e);
      }
      
    });
  }
}