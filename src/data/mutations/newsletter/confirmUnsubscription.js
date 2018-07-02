import Promise from 'bluebird';
import React from 'react';
import ReactDOM from 'react-dom/server';
import {
  GraphQLString as StringType,
  GraphQLID as ID,
  GraphQLList as List,
  GraphQLNonNull as NonNull,
  GraphQLInt as Integer,
  GraphQLObjectType as ObjectType,
  GraphQLBoolean as BooleanType
} from 'graphql';
import DateType from 'graphql-date';
import uuid from 'uuid/v4';
import faker from 'faker';
import jwt from 'jsonwebtoken';
import { Subscriptions } from '../../models';
import { secret_token, hostname, ssl } from "../../../config";
import SuccessType from '../../types/utils/SuccessType';

export default {
  type: SuccessType,
  description: 'Confirm Newsletter Unsubscription',
  args: {
    token: {
      type: new NonNull(StringType),
    },
  },
  resolve({ defaultEmail, transporter }, { token }) {
    
    return new Promise(async (resolve, reject) => {
      try {
        const decoded = jwt.verify(token, secret_token);
        if (decoded && decoded.unsubscribe_newsletter === true) {
          
          // token is valid
          await Subscriptions.model.update({
            active: false,
            token: null,
          }, {
            where: {
              email: decoded.email,
              active: true,
              token,
            },
            limit: 1,
          });

          // send subscription confirmation email
          await transporter.sendMail({
            from: defaultEmail, // sender address
            to: decoded.email,
            subject: 'Newsletter Subscription Confirmation', // Subject line
            html: ReactDOM.renderToString(
              <div>
                <h1>
                  Thank you for subscribing lunajets newsletter
                </h1>
              </div>
            )
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
