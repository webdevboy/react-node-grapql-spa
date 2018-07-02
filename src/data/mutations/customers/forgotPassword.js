import Promise from 'bluebird';
import React from 'react';
import ReactDOM from 'react-dom/server';
import {
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
} from 'graphql';
import jwt from 'jsonwebtoken';
import { secret_token, hostname, ssl } from "../../../config";
import { SFAccount, SFContact } from '../../models';
import SuccessType from '../../types/utils/SuccessType';

const getToken = (val) => jwt.sign(val, secret_token, { expiresIn: 60 * 60 * 24 });

export default {
  type: SuccessType,
  description: 'Dispatch an email for password reset',
  args: {
    email: {
      type: new NonNull(StringType),
    },
  },
  resolve({ transporter, defaultEmail }, { email }) {
    
    return new Promise(async (resolve, reject) => {
      try {
       
        // check to see if there's already a user with that email
        const contact = await SFContact.model.findOne({
          where: {
            email: email.toLowerCase(),
            type__c: 'Passenger',
          },
          include: [
            {
              model: SFAccount.model,
              as: 'account',
              required: true,
              where: {
                account_email__c: email.toLowerCase(),
              }
            }
          ],
        });

        if (!contact) {
          throw new Error('Account not found!');
        }

        const token = getToken({
          email: contact.email,
          reset_password: true,
        });

        const link = `${ ssl ? 'https:' : 'http:' }//www.${hostname}/customer-area/new-password?token=${token}`;
        await contact.update({
          reset_token: token,
        });
      
        // send email reset link
        await transporter.sendMail({
          from: defaultEmail, // sender address
          to: email,
          subject: 'Forgot Password Request', // Subject line
          html: ReactDOM.renderToString(
            <div>
              <h1>
                Reset your password
              </h1>
              <p>
                You told us you forgot your password. <br/>
                If you really did, click here to choose a new one:
                <a href={link}>{link}</a>
              </p>
              <p>
                If you didn’t mean to reset your password, then you can just ignore this email; your password will not change.
              </p>
            </div>
          )
        });

        resolve({ success: true });
        
      } catch(e) {
        console.error(e);
        reject(e);
      }
      
    });

  },
};
