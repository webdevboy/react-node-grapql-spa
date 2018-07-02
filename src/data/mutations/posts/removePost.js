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
  description: 'Deletes posts by post_id',
  args: {
    post_id: {
      type: new NonNull(StringType)
    },
  },
  resolve(_, args) {
    return new Promise( async (resolve, reject) => {
      try {

        if (!args.post_id) {
          throw new Error('Missing post id!');
        }

        const ids = await Post.findAll({ attributes: ['id'], where: { post_id: args.post_id }, raw: true });
        const rows = await Post.model.destroy({ where: { post_id: args.post_id }});

        resolve({
          id: args.post_id,
          ids: ids.map(({id}) => id),
          rows: rows
        });

      } catch(e) {
        reject(e);
      }
      
    });

  },
};
