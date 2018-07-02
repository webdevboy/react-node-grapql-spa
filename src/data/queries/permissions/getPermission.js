import {
  GraphQLString as StringType,
  GraphQLID as ID,
  GraphQLList as List,
  GraphQLBoolean as BooleanType,
} from 'graphql';

import { UserPermission } from '../../models';
import PermissionType from '../../types/PermissionType';

export default {
  type: PermissionType,
  args: {
    id: {
      type: ID,
    },
    action: {
      type: StringType
    }
  },
  async resolve(root, args) {
    try {
      return UserPermission.findOne({ where: args });
    } catch (e) {
      console.error(e);
      return e;
    }
  }
}
