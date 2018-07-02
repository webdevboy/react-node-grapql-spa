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

export default {
  type: UserType,
  description: "edits a user",
  args: {
    id: {
      type: new NonNull(ID),
    },
    email: {
      type: StringType,
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
    role_id: {
      type: ID,
    },
  },
  resolve(_, args) {
    
    return new Promise(async (resolve, reject) => {

      try {

        if (args.password && args.password.length < 8) {
          throw new Error("Password length must be 8 characters at least");
          reject();
        }

        const user = await User.model.findOne({ where: { id: args.id } });
        

        Object.keys(args).forEach((field) => {
          console.log(field, ' WITH => ', args[field]);

          if (args[field] && args[field] !== null && field !== "id" && field !== "role_id" && field !== "password") {
            user[field] = args[field];
            console.log('UPDATED FIELD => ', user[field])
          }

        });

        if (args.password) {
          user.password = User.model.generateHash(args.password);
        }

        if (args.role_id && args.role_id !== user.role_id) {
          const role = await UserRole.findOne({ where: { id: args.role_id } });

          if (!role) {
            throw new Error("The provided role id was not found");
          }

          await user.setRole(role);
        }

        const updatedUser = await user.save();
        resolve(updatedUser);

      } catch (e) {
        console.error(e);
        reject(e);
      }
    });
  },
};
