import {
  GraphQLList as List,
} from "graphql";
import { User, UserRole } from "../../models";
import UserType from "../../types/UserType";
import PaginationInput from "../../types/utils/PaginationInput";
import UserQueryType from "./UserQueryType";

export default {
  type: new List(UserType),
  name: 'getUsers',
  args: {
    query: {
      type: UserQueryType,
    },
    pagination: {
      type: PaginationInput,
    },
  },
  async resolve(_, { query, pagination }) {
    try {
      const godRole = await UserRole.findOne({ where: { name: 'God' } });
      return User.findAll({ where: { ...query, role_id: { $not: godRole.id }}, ...pagination });
    } catch (e) {
      console.error(e);
      return e;
    }
  },
};
