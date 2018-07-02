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
import sequelize from 'sequelize';

import {
  AircraftHeroshotPhoto,
} from '../../models';

import AircraftHeroshotPhotoType from '../../types/AircraftHeroshotPhotoType';

export default {
  type: new List(AircraftHeroshotPhotoType),
  name: 'AircraftHeroshotPhoto',
  description: 'Find multiples heroshotphotoId from aircraft_id',
  args: {
    list_id: {
      type: new List (ID)
    },
  },
  resolve(_, args) {
    const whereQuery = {};
    if (args.list_id && (args.list_id !== null) && (args.list_id.length > 0)) {
      whereQuery.id = { $in: args.list_id };
    }

    return AircraftHeroshotPhoto.findAll({ where: { ...whereQuery }});
},
};
