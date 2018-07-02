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
import DateType from 'graphql-date';

import {
  SFAirport
} from '../../models';

import SF_AirportType from '../../types/SFAirportType';

export default {
  type: new List(SF_AirportType),
  name: 'getSFAirports',
  description: 'Find airports from SF',
  args: {
    list_sfid: {
      type: new List(StringType),
    },
    limit: {
      type: Integer
    },
    search: {
      type: StringType
    },
    iata: {
      type: new List(StringType)
    }
  },
  resolve(_, args) {
    const options = { where: { $and: [] } };
    console.log('====> ', args.iata)
    if (args.list_sfid) {
      options.where.$and.push({sfid: {$in: args.list_sfid} });
    }
    if (args.iata) {
      options.where.$and.push({iata_code__c: args.iata});
    }
    if (args.search) {
      let $or = [
        {iata_code__c: { $iLike: `${args.search}` }},
        {icao_code__c: { $iLike: `${args.search}` }},
        {name: { $ilike: `% ${args.search}%` }},
        {name: { $ilike: `${args.search}%` }},
      ];
      options.where.$and.push({ $or });
    }
    if (options.where.$and.length === 0) {
      delete options.where;
    } else if (options.where.$and.length === 1) {
      options.where = options.where.$and[0];
    }
    if (args.limit) {
      options.limit = args.limit;
    }
    console.log('getSFAirport options', options);
    return SFAirport.findAll(options);
  },
};