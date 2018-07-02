import {
  GraphQLString,
  GraphQLNonNull,
  GraphQLBoolean,
} from "graphql";
import React from 'react';
import ReactDOM from 'react-dom/server';
import Promise from 'bluebird';
import jwt from 'jsonwebtoken';
import LoginInput from "../../types/utils/LoginInput";
import LoginType from "../../types/LoginType";
import { User, SFAccount, SFContact } from '../../models';
import { secret_token, hostname, ssl } from "../../../config";

const INVALID_CREDENTIALS = 'Invalid credentials';

const getToken = (val, expires) => jwt.sign(val, secret_token, { expiresIn: expires });

export default {
  type: LoginType,
  name: 'Login',
  args: {
    login: {
      type: LoginInput,
    },
    admin: {
      type: GraphQLBoolean,
      defaultValue: false,
    },
  },
  async resolve({ transporter, defaultEmail }, { login, admin }) {
    try {
      
      const { email, password } = login;

      if (admin) {

        const user = await User.findOne({
          where: { email: email.toLowerCase() },
        });

        // throws error if not found or invalid credentials
        if (!user) throw new Error(INVALID_CREDENTIALS);
        if (user && !user.comparePassword(password)) throw new Error(INVALID_CREDENTIALS);

        const role = await user.getRole();
        // updates the last_login field
        await user.update({ last_login: new Date().toISOString() }, { fields: ["last_login"] });

        // generates JWT token
        return {
          user,
          token: getToken({
            id: user.id,
            role: role && role.name,
            is_admin: true,
          }, 60 * 60 * 24 * 180),
        };

      }

      const contact = await SFContact.findOne({
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

      // throws error if not found or invalid credentials
      if (!contact) throw new Error(INVALID_CREDENTIALS);

      if (contact.activation_token) {
        console.log('REQUIRES ACTIVATION');
        // already registered account but didnt activated it
        return {
          contact: {
            email: contact.email,
          },
          activate: true,
        }
      }

      if (contact.reset_token) {
        console.log('REQUIRED RESET');

        // already request password reset
        return {
          contact: {
            email: contact.email,
          },
          reset_password: true,
        }
      }

      // check if migrated from merito
      if (contact.password.length !== 60 && contact.migrated_from_merito__c && contact.reset_token) {
        // migrated from merito
        // update contact field reset_token
        const reset_token = getToken({
          email: contact.email,
          reset_password: true,
        }, 60 * 60 * 24 );

        await contact.update({ 
          reset_token,
          password: null
        }, {
          fields: ['reset_token', 'password'],
        });

        // dispatch email
        const link = `${ ssl ? 'https:' : 'http:' }//www.${hostname}${__DEV__? ':3000' : ''}/customer-area/new-password?token=${token}`;
        // send subscription confirmation email
        await transporter.sendMail({
          from: defaultEmail, // sender address
          to: contact.email,
          subject: 'Newsletter Subscription Confirmation', // Subject line
          html: ReactDOM.renderToString(
            <div>
              <h1>
                Dear user we've updated our website we need you to change your password
              </h1>
              <p>
                Please follow the link and change your password:
                <a href={link} target="_blank">{link}</a>
              </p>
              <p>
                <small>This link will expire after 24 hours</small>
              </p>
            </div>
          )
        });

        return {
          contact: {
            email: contact.email,
          },
          migrated: contact.migrated_from_merito__c,
        }
        
      }

      // compares the password
      if (contact && !contact.comparePassword(password)) throw new Error(INVALID_CREDENTIALS);
      // updates the last_login field
      await contact.update({ last_login: new Date().toISOString() }, { fields: ['last_login'] });

      return {
        contact,
        token: getToken({
          sfid: contact.sfid,
          role: 'customer',
        }, 60 * 60 * 24 * 60),
      };

    } catch (e) {
      console.error(e);
      return e;
    }
  }
};
