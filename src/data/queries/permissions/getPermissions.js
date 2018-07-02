import {
  GraphQLString as StringType,
  GraphQLID as ID,
  GraphQLList as List,
  GraphQLBoolean as BooleanType,
} from 'graphql';

import { UserPermission } from '../../models';
import PermissionType from '../../types/PermissionType';

export default {
  type: new List(PermissionType),
  async resolve() {
    try {
      return await UserPermission.findAll({
        where: { 
          isAllowed: true,
        }
      });
    } catch (e) {
      console.error(e);
      return e;
    }
    
  }
}