import Promise from 'bluebird';
import jwt from 'jsonwebtoken';
import React from 'react';
import ReactDOM from "react-dom/server";
import {
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
} from 'graphql';
import { secret_token, hostname, ssl } from "../../../config";
import { SFContact, SFAccount } from '../../models';
import SuccessType from '../../types/utils/SuccessType';

export default {
  type: SuccessType,
  description: 'Activate account',
  args: {
    token: {
      type: new NonNull(StringType),
    },
  },
  resolve({ defaultEmail, transporter }, { token }) {
    
    return new Promise(async (resolve, reject) => {
      try {

        const decoded = jwt.verify(token, secret_token);
          
        if (decoded && decoded.activate === true) {
          // token is valid
          // check to see if there's already a user with that email
          const contact = await SFContact.model.findOne({
            where: {
              email: decoded.email.toLowerCase(),
              type__c: 'Passenger',
            },
            include: [
              {
                model: SFAccount.model,
                as: 'account',
                required: true,
                where: {
                  account_email__c: decoded.email.toLowerCase(),
                }
              }
            ],
          });

          if (!contact) {
            throw new Error('Account not found!');
          }

          await contact.update({
            activation_token: null,
          });

          // send subscription confirmation email
          await transporter.sendMail({
            from: defaultEmail, // sender address
            to: decoded.email,
            subject: 'Activation sucessfull', // Subject line
            html: ReactDOM.renderToString(
              <div>
                <h1>
                  Thank you for registering on lunajets
                </h1>
              </div>
            ),
          });

          resolve({
            success: true,
          });

        } else {
          throw new Error('Token mismatch');
        }
        
      } catch(err) {
        reject(err);
      }
      
    });

  },
};
