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

import { SFAirportCity } from '../../models';

import AirportCityType from '../../types/SFAirportCityType';

export default {
  type: new List(AirportCityType),
  name: 'AirportCity',
  description: 'Find all airport cities',
  args: {},
  resolve(_, args) {
    return SFAirportCity.findAll();
  },
};
