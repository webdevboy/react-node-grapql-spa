import {
  GraphQLList as List,
  GraphQLString as StringType,
  GraphQLInt as Integer,
  GraphQLID as ID,
} from "graphql";

import { SFAccount } from '../../models';

import AccountType from "../../types/AccountType";

export default {
  type: new List(AccountType),
  name: "GetSfAccount",
  args: {
    accountIds: {
      type: new List(ID)
    },
    search: {
      type: StringType,
    },
    recordTypeId: {
      type: StringType,
    },
    limit: {
      type: Integer
    },
  },
  resolve(_, { accountIds, search, recordTypeId, limit }) {
    try {
      const where = {};

      if (accountIds) {
        where.sfid = {$in: accountIds};
      }
      if (search) {
        where.name = {$iLike: `%${search}%`};
      }

      if (recordTypeId) {
        where.recordtypeid = recordTypeId;
      }

      if (limit) {
        return SFAccount.findAll({ where, limit: limit });
      } else {
        return SFAccount.findAll({ where });
      }

    } catch (e) {
      console.error(e);
      return e;
    }
  },
};
