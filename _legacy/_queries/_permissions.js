import {
  GraphQLString as StringType,
  GraphQLID as ID,
  GraphQLList as List,
  GraphQLBoolean as Boolean,
} from 'graphql';

import { UserPermission } from '../models';
import PermissionType from '../types/PermissionType';

export const getPermissions = {
  type: new List(PermissionType),
  args: {
    id: {
      type: ID,
    },
    action: {
      type: StringType
    },
    isAllowed: {
      type: Boolean
    }
  },
  resolve(root, args) {
    try {
      return UserPermission.findAll({ where: args });
    } catch (e) {
      console.error(e);
      return e;
    }
    
  }
}

export const getPermission = {
  type: PermissionType,
  args: {
    id: {
      type: ID,
    },
    action: {
      type: StringType
    },
    isAllowed: {
      type: Boolean
    }
  },
  resolve(root, args) {
    try {
      return UserPermission.findOne({ where: args });
    } catch (e) {
      console.error(e);
      return e;
    }
  }
}
