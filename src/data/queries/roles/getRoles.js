import {
  GraphQLString as StringType,
  GraphQLID as ID,
  GraphQLList as List,
} from "graphql";

import { UserRole } from "../../models";
import RoleType from "../../types/RoleType";

export default {
  type: new List(RoleType),
  args: {
    id: {
      type: ID,
    },
    name: {
      type: StringType,
    },
  },
  async resolve(root, args) {
    try {
      return UserRole.findAll({ where: { ...args, $and: { protected: { $not: true } } } });
    } catch (e) {
      console.error(e);
      return e;
    }
  },
};
