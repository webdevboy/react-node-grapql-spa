import {
  GraphQLID as ID,
  GraphQLNonNull as NonNull,
} from 'graphql';
import Promise from 'bluebird';
import { TeamMember } from '../../models';
import TeamMemberType from '../../types/TeamMemberType';

export default {
  type: TeamMemberType,
  description: 'Remove a team member',
  args: {
    id: {
      type: new NonNull(ID)
    },
  },
  resolve(_, args) {
    return new Promise( async (resolve, reject) => {
      try {
        await TeamMember.destroy({ where: { id: args.id } }); 
        resolve({id: args.id});
      } catch(e) {
        reject(e);
      }
    });
  },
};