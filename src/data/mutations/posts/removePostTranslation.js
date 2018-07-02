import Promise from 'bluebird';
import { Post } from '../../models';
import {
  GraphQLString as StringType,
  GraphQLID as ID,
  GraphQLList as List,
  GraphQLNonNull as NonNull,
} from 'graphql';
import OutputRemove from "../../types/utils/OutputRemove";

export default {
  type: OutputRemove,
  description: 'Deletes post translation by post id',
  args: {
    id: {
      type: new NonNull(ID)
    },
  },
  resolve(_, args) {
    return new Promise( async (resolve, reject) => {
      try {

        if (!args.id) {
          throw new Error('Missing post id!');
        }

        const rows = await Post.model.destroy({ where: { id: args.id }});
        resolve({
          id: args.id,
          rows: rows
        });

      } catch(e) {
        reject(e);
      }
      
    });

  },
};
