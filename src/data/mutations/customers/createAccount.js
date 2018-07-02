import Promise from 'bluebird';
import {
  GraphQLString as StringType,
  GraphQLID as ID,
  GraphQLList as List,
  GraphQLNonNull as NonNull,
  GraphQLInt as Integer,
} from 'graphql';
import DateType from 'graphql-date';
import uuid from 'uuid/v4';
import { SFAccount, SFContact } from '../../models';
import SuccessType from '../../types/utils/SuccessType';
import AccountInputType from '../../types/utils/AccountInput';
import OptionsType from '../../types/utils/OptionsType';

import { secret_token, hostname, ssl } from "../../../config";

import jwt from 'jsonwebtoken';

const getToken = (val) => jwt.sign(val, secret_token, { expiresIn: 60 * 60 * 24 });

export default {
  type: SuccessType,
  description: 'Creates a new customer account',
  args: {
    account: {
      type: AccountInputType,
    },
    options: {
      type: OptionsType,
    }
  },
  resolve({ transporter, defaultEmail }, { account: args, options }) {
    
    return new Promise(async (resolve, reject) => {
      try {

        if (args.password && args.password.length < 8) {
          throw new Error('Password length must be 8 characters at least');
        }

        // check to see if there's already a user with that email
        const count = await SFContact.model.count({
          where: {
            email: args.email.toLowerCase(),
            type__c: 'Passenger',
          },
          include: [
            {
              model: SFAccount.model,
              as: 'account',
              required: true,
              where: {
                account_email__c: args.email.toLowerCase(),
              }
            }
          ],
        });

        if (count) {
          throw new Error('Email provided is already registered');
        }
        
        const id = (uuid()).split('-');
        const token = getToken({
          email: args.email.toLowerCase(),
          activate: true,
        });

        // creates the customer istance
        const newAccount = await SFAccount.model.create({
          account_email__c: args.email.toLowerCase(),
          name: `${args.firstName} ${args.lastName}`,
          isdeleted: false,
          externalid__c: id[id.length - 1],
          createddate: new Date(),
        });

          
        const newContact = await SFContact.model.create({
          type__c: 'Passenger', // strict
          firstname: args.firstName,
          lastname: args.lastName,
          phone: args.phone,
          password: SFContact.model.generateHash(args.password),
          email: newAccount.account_email__c,
          salutation: args.title || 'Mr',
          account__externalid__c: id[id.length - 1],
          created_on: new Date(),
          registered_on_website__c: options.website || false,
          registered_on_app__c: options.app || false,
          activation_token: token,
        });

        const link = `${ ssl ? 'https:' : 'http:' }//www.${hostname}/customer-area/activate?token=${token}`;

        // send email with credentials
        await transporter.sendMail({
          from: defaultEmail, // sender address
          to: `"${newContact.firstname + ' ' + newContact.lastname}" <${newContact.email}>`, // list of receivers
          subject: 'Your Account has been Created', // Subject line
          html: `
            <p>
              Your account for <a href="http://lunajets.com">http://lunajets.com</a> has been created!
              Please confirm your account here:
              <a href="${link}">${link}</a>
            </p>
            <p>
              
            </p>
          ` // html body
        });

        resolve({ success: true });

      } catch(e) {
        reject(e);
      }
      
    });

  },
};
