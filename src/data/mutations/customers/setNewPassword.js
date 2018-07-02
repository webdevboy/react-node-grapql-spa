import Promise from 'bluebird';

import {
  GraphQLString as StringType,
  GraphQLID as ID,
  GraphQLList as List,
  GraphQLNonNull as NonNull,
  GraphQLInt as Integer,
} from 'graphql';
import DateType from 'graphql-date';
import { SFAccount, SFContact } from '../../models';
import SuccessType from '../../types/utils/SuccessType';
import uuid from 'uuid/v4';
import faker from 'faker';
import jwt from 'jsonwebtoken';
import { secret_token, hostname, ssl } from "../../../config";

export default {
  type: SuccessType,
  description: 'Sets a new Password for customer, token required',
  args: {
    password: {
      type: new NonNull(StringType),
    },
    token: {
      type: new NonNull(StringType),
    },
  },
  resolve({ transporter, defaultEmail }, { token, password }) {
    
    return new Promise(async (resolve, reject) => {
      try {
        if (password && password.length < 8) {
          throw new Error('Password length must be 8 characters at least');
        }

        const decoded = jwt.verify(token, secret_token);

        if (decoded.reset_password !== true) { resolve({ success: false }) }
          
        await SFContact.model.update({
          reset_token: null,
          password: SFContact.model.generateHash(password),
        }, {
          where: {
            email: decoded.email,
            $and: {
              reset_token: token,
            }
          },
          limit: 1,
        });



        // send email with credentials
        await transporter.sendMail({
          from: defaultEmail, // sender address
          to: decoded.email, // list of receivers
          subject: 'Your password was changed', // Subject line
          html: `
            password changed successfully
          ` // html body
        });

        resolve({
          success: true
        });

      } catch(e) {
        reject(e);
      }
      
    });

  },
};
