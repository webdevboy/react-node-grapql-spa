import Promise from 'bluebird';
import {
  GraphQLID as ID,
  GraphQLNonNull as NonNull,
} from 'graphql';
import GraphQLJSON from 'graphql-type-json';

import { Office } from '../../models';
import OfficeType from '../../types/OfficeType';

export default {
  type: OfficeType,
  description: 'Deletes an office',
  args: {
    id: {
      type: new NonNull(ID)
    },
  },
  resolve({ transporter }, args) {
    return new Promise( async (resolve, reject) => {
      try {
        await Office.destroy({  
          where: { id: args.id }
        }); 
        resolve({id: args.id});
      }  catch(e) {
        console.log('error in mutation');
        reject(e);
      }
    });
  },
};