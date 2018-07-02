import {
  GraphQLString as StringType,
  GraphQLID as ID,
  GraphQLList as List,
  GraphQLBoolean as BooleanType,
} from 'graphql';

import { SFAccount } from '../../models';
import AccountType from '../../types/AccountType';

export default {
  type: new List(AccountType),
  async resolve({ user }) {
    try {
      // console.log('USER => ', user);
      return await SFAccount.findAll({ where: { active__c: true } });
    } catch (e) {
      console.error(e);
      return e;
    }
  }
}