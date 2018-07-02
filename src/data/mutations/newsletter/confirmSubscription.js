import Promise from 'bluebird';
import jwt from 'jsonwebtoken';
import React from 'react';
import ReactDOM from "react-dom/server";
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
import { secret_token, hostname, ssl } from "../../../config";
import { Subscriptions } from '../../models';
import SuccessType from '../../types/utils/SuccessType';

export default {
  type: SuccessType,
  description: 'Confirm Newsletter Subscription',
  args: {
    token: {
      type: new NonNull(StringType),
    },
  },
  resolve({ defaultEmail, transporter }, { token }) {
    
    return new Promise(async (resolve, reject) => {
      try {

        const decoded = jwt.verify(token, secret_token);
          
        if (decoded && decoded.subscribe_newsletter === true) {
          // token is valid
          await Subscriptions.model.update({
            active: true,
            token: null,
          }, {
            where: {
              active: false,
              email: decoded.email,
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
