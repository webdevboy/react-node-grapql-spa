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
  description: 'Define the office as Primary',
  args: {
    id: {
      type: new NonNull(ID)
    },
  },
  resolve(_, args) {
    return new Promise( async (resolve, reject) => {
      try {

        const offices = await Office.findAll({ where: { primary: true }});
        offices.forEach(async (office) => {
          await office.update({ primary: false })
        });

        const office = await Office.findOne({ where: { id: args.id } });
        await office.update({ primary: true });

        resolve({id: args.id});
      }  catch(e) {
        console.log('error in mutation');
        reject(e);
      }
    });
  },
};