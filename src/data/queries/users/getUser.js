import {
  GraphQLID as ID,
  GraphQLNonNull as NonNull,
} from "graphql";
import { User } from "../../models";
import UserType from "../../types/UserType";

export default {
  type: UserType,
  name: 'getUser',
  args: {
    id: {
      type: new NonNull(ID),
    },
  },
  async resolve(_, { id }) {
    try {
      return User.findById(id);
    } catch (e) {
      console.error(e);
      return e;
    }
  },
};
