import Promise from 'bluebird';
import { Office } from '../../models';
import OfficeType from '../../types/OfficeType';
import officeArgsType from './officeArgsType';

export default {
  type: OfficeType,
  description: 'Creates a new office contact',
  args: officeArgsType,
  resolve(_, args) {
    return new Promise( async (resolve, reject) => {
      try {
        const newContact = await Office.create(args);
        resolve(newContact);     
      } catch(e) {
        reject(e);
      }
      
    });

  },
};
