import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
} from 'graphql';
import DateType from 'graphql-date';
import RoleType from './RoleType';

const UserType = new ObjectType({
  name: 'User',
  description: 'Represents a User',
  fields: {
    id: {
      type: ID,
      resolve(user) {
        return user.id;
      }
    },
    email: {
      type: StringType,
      resolve(user) {
        return user.email;
      }
    },
    first_name: {
      type: StringType,
      resolve(user) {
        return user.first_name;
      }
    },
    last_name: {
      type: StringType,
      resolve(user) {
        return user.last_name;
      }
    },
    avatar_path: {
      type: StringType,
      resolve(user) {
        return user.avatar_path;
      }
    },
    created_at:{
      type: DateType,
      resolve(user) {
        return user.created_at;
      }
    },
    last_login:{
      type: DateType,
      resolve(user) {
        return user.last_login;
      }
    },
    role: {
      type: RoleType,
      resolve(user) {
        return user.getRole();
      }
    }
  }
});

export default UserType;