import Promise from "bluebird";

import {
  GraphQLString as StringType,
  GraphQLID as ID,
  GraphQLList as List,
  GraphQLNonNull as NonNull,
  GraphQLInt as Integer,
} from "graphql";

import { UserRole } from "../models";
import RoleType from "../types/RoleType";

export const addRole = {
  type: RoleType,
  description: "creates a new user",
  args: {
    name: {
      type: new NonNull(StringType),
    },
    description: {
      type: StringType,
    },
    permissions: {
      type: new List(ID),
    },
  },
  resolve(root, args) {
    return new Promise(async (resolve, reject) => {
      try {
        const newRole = await UserRole.create({
          name: args.name,
          description: args.description,
        });

        if (args.permissions && args.permissions.length) {
          await newRole.addPermissions(permissions);
        }

        resolve(newRole);
      } catch (e) {
        console.error(e);
        return e;
      }
    });
  },
};
