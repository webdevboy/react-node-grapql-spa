import Promise from "bluebird";

import {
  GraphQLString as StringType,
  GraphQLID as ID,
  GraphQLList as List,
  GraphQLNonNull as NonNull,
  GraphQLInt as Integer,
} from "graphql";
import DateType from "graphql-date";

import { UserRole } from '../../models';
import RoleType from "../../types/RoleType";
import { email } from "../../../config";

export default {
  type: RoleType,
  description: "edits a user",
  args: {
    id: {
      type: new NonNull(ID),
    },
    name: {
      type: StringType,
    },
    description: {
      type: StringType,
    },
    permissions: {
      type: new List(ID),
    },
  },
  resolve(_, args) {
    
    return new Promise(async (resolve, reject) => {

      try {

        if (args.name && !args.name.length) {
          throw new Error("Name must be provided");
          reject();
        }

        const role = await UserRole.model.findOne({ where: { id: args.id } });
        
        Object.keys(args).forEach((field) => {
          console.log(field, ' WITH => ', args[field]);

          if (args[field] && args[field] !== null && field !== "id" && field !== "role_id" && field !== "password") {
            role[field] = args[field];
          }

        });

        if (args.permissions && args.permissions.length) {
          await role.setPermissions(args.permissions);
        }

        // console.log('BEFORE SAVE => ', role);

        const updatedRole = await role.save();
        resolve(updatedRole);

      } catch (e) {
        console.error(e);
        reject(e);
      }
    });
  },
};
