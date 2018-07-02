import {
  GraphQLString as StringType,
  GraphQLID as ID,
  GraphQLList as List,
  GraphQLObjectType as ObjectType,
  GraphQLNonNull as NonNull,
} from 'graphql';
import jwt from 'jsonwebtoken';
import CustomerLoginType from '../../types/CustomerLoginType';

import { SFAccount } from '../../models';
import { secret_token, jwt_expires } from '../../../config';

export default {
  type: CustomerLoginType,
  args: {
    email: {
      type: new NonNull(StringType),
    },
    password: { 
      type: new NonNull(StringType),
    },
  },
  async resolve(_, { email, password }) {

    try {
      const account = await SFAccount.findOne({
        where: { account_email__c: email.toLowerCase() },
      });

      // console.log(account);

      if (!account && !account.comparePassword(password)) {
        throw new Error('Invalid credentials');
      }

      const token = jwt.sign({
        email: account.account_email__c,
        // role: role.name,
      }, secret_token, { expiresIn: jwt_expires });
      
      const customer = await account.getOwner();

      return {
        customer,
        token,
      };
    } catch (e) {
      console.error(e);
      return e;
    }
  },
};

