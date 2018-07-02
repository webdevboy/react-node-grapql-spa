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
import SuccessType from '../../types/utils/SuccessType';
import { Subscriptions } from '../../models';

const getToken = (val) => jwt.sign(val, secret_token, { expiresIn: 60 * 60 * 24 });

export default {
  type: SuccessType,
  description: 'Newsletter Unsubscribe',
  args: {
    email: {
      type: new NonNull(StringType),
    },
  },
  resolve({ defaultEmail, transporter }, { email }) {
    
    return new Promise(async (resolve, reject) => {
      try {

        const unsub = await Subscriptions.model.findOne({
          where: {
            email,
            active: true,
            token: null,
          },
        });

        const token = getToken({
          email,
          unsubscribe_newsletter: true,
        });

        if (!unsub) {
          throw new Error('Email not subscribed');
        }

        if (unsub) {
          await unsub.update({
            token,
          });
        
          // send subscription confirmation email
          const link = `${ ssl ? 'https:' : 'http:' }//www.${hostname}${__DEV__? ':3000' : ''}/newsletter/confirm_unsubscription?token=${token}`;

          await transporter.sendMail({
            from: defaultEmail, // sender address
            to: email,
            subject: 'Newsletter Unsubscription Confirmation', // Subject line
            html: ReactDOM.renderToString(
              <div>
                <h1>Confirm Lunajets Newsletter Unsubscription</h1>
                <p>
                  Please clink on the link to remove your subscription
                  <a href={link} target="_blank">{link}</a>
                </p>
              </div>
            )
          });

          resolve({
            success: true,
          })
        }
        
      } catch(err) {

        reject(err);
      }
      
    });

  },
};
