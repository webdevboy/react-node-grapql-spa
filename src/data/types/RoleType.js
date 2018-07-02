import {
  GraphQLID as ID,
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
  GraphQLList as List,
  GraphQLBoolean as BooleanType,
  GraphQLInt as Integer,
} from 'graphql';

import UserType from './UserType';
import PermissionType from './PermissionType';

export default new ObjectType({
  name: 'Role',
  fields: () => ({
    id: { 
      type: new NonNull(ID),
      resolve(role) {
        return role.id;
      }
    },
    name: { 
      type: new NonNull(StringType),
      resolve(role) {
        return role.name;
      }
    },
    description: { 
      type: StringType,
      resolve(role) {
        return role.description;
      }
    },
    protected: {
      type: BooleanType,
      resolve(role) {
        return role.protected;
      }
    },
    total_users: {
      type: Integer,
      resolve(role) {
        return role.countUsers();
      }
    },
    users: {
      type: new List(UserType),
      resolve(role) {
        return role.getUsers();
      }
    },
    permissions: {
      type: new List(PermissionType),
      resolve(role) {
        return role.getPermissions();
      }
    }    
  }),
});
