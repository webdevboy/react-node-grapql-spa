import {
  GraphQLID as ID,
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
  GraphQLList as List,
  GraphQLBoolean as BooleanType,
} from 'graphql';

export default new ObjectType({
  name: 'Permission',
  fields: {
    id: { 
      type: new NonNull(ID),
      resolve(permission) {
        return permission.id;
      }
    },
    action: { 
      type: StringType,
      resolve(permission) {
        return permission.action;
      }
    },
    description: { 
      type: StringType,
      resolve(permission) {
        return permission.description;
      }
    },
    isAllowed: {
      type: BooleanType,
      resolve(permission) {
        return permission.isAllowed;
      }
    }
  },
});
