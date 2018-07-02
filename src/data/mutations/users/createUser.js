import Promise from "bluebird";

import {
  GraphQLString as StringType,
  GraphQLID as ID,
  GraphQLList as List,
  GraphQLNonNull as NonNull,
  GraphQLInt as Integer,
} from "graphql";
import DateType from "graphql-date";

import { User, UserRole } from '../../models';
import UserType from "../../types/UserType";
import { email } from "../../../config";
import generatePassword from '../../../core/randomPasswordGenerator';
import faker from 'faker';

export default {
  type: UserType,
  description: "creates a new user",
  args: {
    email: {
      type: new NonNull(StringType),
    },
    role_id: {
      type: new NonNull(ID),
    },
    first_name: {
      type: StringType,
    },
    last_name: {
      type: StringType,
    },
    password: {
      type: StringType,
    },
  },
  resolve({ transporter }, args) {

    return new Promise(async (resolve, reject) => {
      
      try {

        if (args.password && args.password.length < 8) {
          throw new Error("Password length must be 8 characters at least");
          reject();
        }

        // check to see if there's already a user with that email
        const count = await User.count({ where: { email: args.email } });
        if (!count) {
          // check if role id exists
          const selectedRole = await UserRole.model.findOne({ where: { id: args.role_id } });

          // if no password, then generates one
          if (!args.password) {
            args.password = generatePassword();
          }

          // creates the user istance
          const newUser = await User.model.create({
            email: args.email.toLowerCase(),
            password: User.model.generateHash(args.password),
            first_name: args.first_name,
            last_name: args.last_name,
            last_login: args.last_login,
            avatar_path: faker.image.avatar(),
            role_id: selectedRole.id,
          });

          // associate to role
          // await newUser.setRole(selectedRole);

          // send email with credentials
          // await transporter.sendMail({
          //   from: email.from, // sender address
          //   to: `"${`${newUser.first_name} ${newUser.last_name}`}" <${newUser.email}>`, // list of receivers
          //   subject: "Your Account has been Created", // Subject line
          //   html: `
          //     <p>
          //       Your account for <a href="http://admin.lunajets.com">http://admin.lunajets.com</a> has been created!
          //     </p>

          //     <p>
          //       <u>Credentials:</u> <br>
          //       Email: ${newUser.email}<br>
          //       Password: ${args.password}<br>
          //     </p>
          //   `, // html body
          // });

          resolve(newUser);
        } else {
          throw new Error("Email provided is already registered");
          reject();
        }
      } catch (e) {
        reject(e);
      }
    });
  },
};
