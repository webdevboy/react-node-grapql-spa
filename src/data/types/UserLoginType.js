import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
} from 'graphql';
import LoginType from './LoginType';
import UserType from './UserType';

export default new ObjectType({
  name: 'UserLogin',
  description: 'Represents a user with backoffice privileges',
  fields: () => ({
    user: {
      type: new NonNull(UserType),
      resolve(login) {
        return login.user;
      },
    },
    token: {
      type: StringType,
      resolve(login) {
        return login.token;
      },
    },
  }),
});