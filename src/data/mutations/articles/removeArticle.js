import Promise from 'bluebird';
import { Article } from '../../models';
import {
  GraphQLString as StringType,
  GraphQLID as ID,
  GraphQLList as List,
  GraphQLNonNull as NonNull,
} from 'graphql';
import RemoveRecordsType from "../../types/RemoveRecordsType";

export default {
  type: RemoveRecordsType,
  description: 'Deletes articles by article_id',
  args: {
    article_id: {
      type: new NonNull(StringType)
    },
  },
  resolve(_, args) {
    return new Promise( async (resolve, reject) => {
      try {

        if (!args.article_id) {
          throw new Error('Missing article id!');
        }

        const ids = await Article.findAll({ attributes: ['id'], where: { article_id: args.article_id }, raw: true });
        const rows = await Article.destroy({ where: { article_id: args.article_id }});

        resolve({
          id: args.article_id,
          ids: ids.map(({ id }) => id),
          rows,
        });

      } catch(e) {
        reject(e);
      }
      
    });

  },
};
