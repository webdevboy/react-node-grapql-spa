import Promise from 'bluebird';
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
import { SFContact, Subscriptions } from '../../models';
import uuid from 'uuid/v4';
import faker from 'faker';
import SuccessType from '../../types/utils/SuccessType';
import { secret_token, hostname, ssl } from "../../../config";
import jwt from 'jsonwebtoken';

const getToken = (val) => jwt.sign(val, secret_token, { expiresIn: 60 * 60 * 24 });

export default {
  type: SuccessType,
  description: 'Newsletter Subscription',
  args: {
    email: {
      type: new NonNull(StringType),
    },
  },
  resolve({ defaultEmail, transporter }, { email }) {
    
    return new Promise(async (resolve, reject) => {
      try {

        // check to see if there's already a user with that email
        const contact = await SFContact.model.findOne({
          where: {
            email: email.toLowerCase(),
            type__c: 'Passenger',
          },
        });

        const token = getToken({
          email,
          subscribe_newsletter: true,
        });

        const count = await Subscriptions.model.count({
          where: {
            email: email.toLowerCase(),
          }
        });

        if (count) {
          throw new Error('Email already subscribed');
        } 

        await Subscriptions.model.create({
          email,
          contact_sfid: contact.sfid || null,
          token,
        });

        const link = `${ ssl ? 'https:' : 'http:' }//www.${hostname}${__DEV__? ':3000' : ''}/newsletter/confirm_subscription?token=${token}`;
        // send subscription confirmation email
        await transporter.sendMail({
          from: defaultEmail, // sender address
          to: email,
          subject: 'Newsletter Subscription Confirmation', // Subject line
          html: ReactDOM.renderToString(
            <div>
              <h1>
                Lunajets Newsletter Subscription
              </h1>
              <p>
                To confirm your subscription please confirm here:
                <a href={link} target="_blank">{link}</a>
              </p>
              <p>
                <small>This link will expire after 24 hours</small>
              </p>
            </div>
          )
        });

        resolve({
          success: true,
        })
        
      } catch(e) {
        console.error(e);
        reject(e);
      }
      
    });

  },
};
