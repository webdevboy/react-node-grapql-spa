import {
  GraphQLString as StringType,
  GraphQLList as List,
} from 'graphql';

import CustomerType from '../../types/CustomerType';
import { SFContact } from '../../models';

export default {
  type: new List(CustomerType),
  name: 'Find All Customers',
  description: 'query Customers',
  args: {
    email: {
      type: StringType,
    },
    firstname: {
      type: StringType,
    },
    lastname: {
      type: StringType,
    },
  },
  async resolve(_, args) {
    return SFContact.findAll({ where: { ...args, type__c: 'Passenger' } });
  },
};
