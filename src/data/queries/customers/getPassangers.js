import {
  GraphQLString as StringType,
  GraphQLID as ID,
  GraphQLList as List,
  GraphQLBoolean as BooleanType,
  GraphQLNonNull as NonNull,
} from 'graphql';

import { SFAccount } from '../../models';
import CustomerType from '../../types/CustomerType';

export default {
  type: new List(CustomerType),
  args: {
    id: {
      type: new NonNull(ID),
    },
  },
  async resolve(_, args) {
    try {
      if (!args.id) {
        throw new Error('Id must be specified')
      }
      const account = await SFAccount.findOne({where: { sfid: args.id }});
      return await account.getContacts({ where: { $is: { type__c: 'Passenger' } } });
    } catch (e) {
      console.error(e);
      return e;
    }
    
  }
}