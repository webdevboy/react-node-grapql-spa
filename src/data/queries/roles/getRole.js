import {
  GraphQLString as StringType,
  GraphQLID as ID,
  GraphQLNonNull as NonNull,
} from "graphql";

import { UserRole } from "../../models";
import RoleType from "../../types/RoleType";

export default {
  type: RoleType,
  args: {
    id: {
      type: new NonNull(ID),
    },
  },
  async resolve(_, { id }) {
    try {
      return UserRole.findOne({ where: { id: args.id, $and: { protected: { $not: true } } } });
    } catch (e) {
      console.error(e);
      return e;
    }
  },
};
