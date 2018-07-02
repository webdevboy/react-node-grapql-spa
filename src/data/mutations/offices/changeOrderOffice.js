import Promise from 'bluebird';
import {
  GraphQLID as ID,
  GraphQLNonNull as NonNull,
  GraphQLInt as Integer,
} from 'graphql';
import GraphQLJSON from 'graphql-type-json';

import { Office } from '../../models';
import OfficeType from '../../types/OfficeType';

export default {
  type: OfficeType,
  description: 'Changes the order',
  args: {
    id: {
      type: new NonNull(ID)
    },
    order: {
      type: new NonNull(Integer)
    }
  },
  resolve(_, args) {
    return new Promise( async (resolve, reject) => {
      try {
        const office = await Office.findOne({ where: { id: args.id } });
        await office.update({ order: args.order });
        
        resolve({ id: args.id });
      }  catch(e) {
        console.log('error in mutation');
        reject(e);
      }
    });
  },
};