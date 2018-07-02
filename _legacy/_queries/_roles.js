import {
  GraphQLString as StringType,
  GraphQLID as ID,
  GraphQLList as List,
} from "graphql";

import cache from "memory-cache";
import { UserRole } from "../models";
import RoleType from "../types/RoleType";

export const getRoles = {
  type: new List(RoleType),
  args: {
    id: {
      type: ID,
    },
    name: {
      type: StringType,
    },
  },
  resolve(root, args) {
    try {
      return UserRole.findAll({ where: args });
    } catch (e) {
      console.error(e);
      return e;
    }
  },
};

export const getRole = {
  type: RoleType,
  args: {
    id: {
      type: ID,
    },
    name: {
      type: StringType,
    },
  },
  resolve(root, args) {
    try {
      if (typeof args.id === "undefined" && typeof args.name === "undefined") {
        throw new Error("At least one argument id type ID or name StringType must be provided");
      }
      return UserRole.findOne({ where: args });
    } catch (e) {
      console.error(e);
      return e;
    }
  },
};
