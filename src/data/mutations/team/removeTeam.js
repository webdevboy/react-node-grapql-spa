import {
  GraphQLID as ID,
  GraphQLNonNull as NonNull,
} from 'graphql';
import Promise from 'bluebird';
import { TeamDepartment } from '../../models';
import TeamType from '../../types/TeamType';

export default {
  type: TeamType,
  description: 'Remove a team department',
  args: {
    id: {
      type: new NonNull(ID)
    },
  },
  resolve(_, args) {
    return new Promise( async (resolve, reject) => {
      try {
        await TeamDepartment.destroy({ where: { id: args.id } }); 
        resolve({id: args.id});
      } catch(e) {
        reject(e);
      }
    });
  },
};