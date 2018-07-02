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
  SFAirportCity
} from '../../models';

import SF_AirportCityType from '../../types/SFAirportCityType';

export default {
  type: SF_AirportCityType,
  name: 'getSFAirportCity',
  description: 'Find single airport city from SF',
  args: {
    sfid: {
      type: new NonNull(ID),
    },
  },
  resolve(_, args) {
    return SFAirportCity.findOne({ where: args });
  },
};