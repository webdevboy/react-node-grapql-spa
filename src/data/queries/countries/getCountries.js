import {
  GraphQLString as StringType,
  GraphQLID as ID,
  GraphQLList as List,
  GraphQLObjectType as ObjectType,
  GraphQLNonNull as NonNull,
  GraphQLBoolean as BooleanType,
  GraphQLInt as Integer,
  GraphQLInputObjectType as InputType,
} from 'graphql';

import { SFCountry } from '../../models';

import CountryType from '../../types/CountryType';

export default {
  type: new List(CountryType),
  name: 'CountryType',
  description: 'Find all Countries',
  args: {
    search: {
      type: StringType,
    },
    sf_id: {
      type: StringType
    }
  },
  resolve(_, args) {

    const where = { };

    if (args.search) {
      where.name = { $ilike: `${args.search}%` }
      delete where.limit;
    }
    if (args.sf_id) {
      where.sfid = args.sf_id;
      delete where.limit;
    }

    return SFCountry.findAll({ where });
  }
};
