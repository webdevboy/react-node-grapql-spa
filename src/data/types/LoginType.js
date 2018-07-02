import {
  GraphQLList as List,
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
  GraphQLUnionType
} from 'graphql';

import UserLoginType from './UserLoginType';
import CustomerLoginType from './CustomerLoginType';

export default new GraphQLUnionType({
  name: 'Login',
  description: 'Authenticate the user',
  types: [CustomerLoginType, UserLoginType],
  resolveType: (login) => {
    return (login.contact) ? CustomerLoginType : UserLoginType;
  }
});
