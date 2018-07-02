import Promise from 'bluebird';

import {
  GraphQLString as StringType,
  GraphQLID as ID,
  GraphQLList as List,
  GraphQLNonNull as NonNull,
  GraphQLInt as Integer,
} from 'graphql';
import DateType from 'graphql-date';

import { SFAccount, SFContact } from '../models';
import AccountType from '../types/AccountType';
import AccountInputType from '../types/utils/AccountInput';
import uuid from 'uuid/v4';
import faker from 'faker';
import { email } from '../../config';

export default {
  type: AccountType,
  description: 'creates a new user',
  args: {
    account: {
      type: AccountInputType,
    },
  },
  resolve({ transporter }, { account: args }) {
    
    return new Promise(async (resolve, reject) => {
      try {
        if (args.password && args.password.length < 6) {
          throw new Error('Password length must be 6 characters at least');
          reject();
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

        console.log('COUNT', count);

        if (!count) {
          
          const id = (uuid()).split('-');

          // creates the customer istance
          const newAccount = await SFAccount.model.create({
            account_email__c: args.email.toLowerCase(),
            name: `${args.firstName} ${args.lastName}`,
            isdeleted: false,
            externalid__c: id[id.length - 1],
            createddate: new Date(),
          });

          if (newAccount) {
            
            const newContact = await SFContact.model.create({
              type__c: 'Passenger', // strict
              firstname: args.firstName,
              lastname: args.lastName,
              phone: args.phone,
              password: SFContact.model.generateHash(args.password),
              email: newAccount.account_email__c,
              salutation: args.title || 'Mr',
              account__externalid__c: id[id.length - 1]
            });

            // await newContact.setAccount(newAccount);
          }

          // send email with credentials
          // await transporter.sendMail({
          //   from: email.from, // sender address
          //   to: `"${newContact.firstname + ' ' + newContact.lastname}" <${newContact.email}>`, // list of receivers
          //   subject: 'Your Account has been Created', // Subject line
          //   html: `
          //     <p>
          //       Your account for <a href="http://lunajets.com">http://lunajets.com</a> has been created!
          //     </p>

          //     <p>
          //       <u>Credentials:</u> <br>
          //       Email: ${newContact.email}<br>
          //       Password: ${args.password}<br>
          //     </p>
          //   ` // html body
          // });
          resolve(newAccount);
         
        } else {
          throw new Error('Email provided is already registered');
          reject();
        }
        

      } catch(e) {
        reject(e);
      }
      
    });

  },
};
