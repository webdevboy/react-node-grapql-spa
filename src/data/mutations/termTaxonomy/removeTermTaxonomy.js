import Promise from 'bluebird';
import { Term, TermTaxonomy,Post } from '../../models';
import {
  GraphQLString as StringType,
  GraphQLID as ID,
  GraphQLList as List,
  GraphQLNonNull as NonNull,
} from 'graphql';
import OutputRemove from "../../types/utils/OutputRemove";

export default {
  type: OutputRemove,
  description: 'Deletes term taxonomy by id',
  args: {
    id: {
      type: ID
    },
    name: {
      type: StringType
    }
  },
  resolve(_, args) {
    return new Promise( async (resolve, reject) => {
      try {
        if (!args.id && !args.name) {
          throw new Error('Missing argument!');
        }
        const where = {};
        if (args.id) {
          where.id = args.id;
        }
        if (args.name){
          where.name = args.name;
        }
        const ids = await Term.findAll({ attributes: ['id'], where, raw: true });
        const idList = ids.map(id => id.id);
        const rowsTaxonomy = await TermTaxonomy.model.destroy({ where: { term_id: { $in: idList } }});
	    const rowsTerm = await Term.model.destroy({ where, });

        resolve({
          id: args.id ? args.id : ids[0],
          ids: ids.map(({id}) => id),
          rows: rowsTerm
        });

      } catch(e) {
        reject(e);
      }
      
    });

  },
};
