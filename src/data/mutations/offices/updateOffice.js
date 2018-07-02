import Promise from 'bluebird';
import {
  GraphQLString as StringType,
  GraphQLID as ID,
  GraphQLList as List,
  GraphQLNonNull as NonNull,
  GraphQLInt as Integer,
  GraphQLObjectType as ObjectType,
  GraphQLBoolean as BooleanType,
} from 'graphql';
import GraphQLJSON from 'graphql-type-json';

import { Office } from '../../models';
import OfficeType from '../../types/OfficeType';
import officeArgsType from './officeArgsType';

export default {
  type: OfficeType,
  description: 'Update an office',
  args: officeArgsType,
  resolve(_, args) {
    
    return new Promise( async (resolve, reject) => {

      try {

        const office = await Office.findById(args.id);
        const updatedOffice = await office.update(args);
        resolve(updatedOffice);     

      } catch(e) {
        reject(e);
      }
      
    });
  }
}