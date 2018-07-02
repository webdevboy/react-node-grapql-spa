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
  type: AircraftHeroshotPhotoType,
  name: 'AircraftHeroshotPhoto',
  description: 'Find single heroshotphotoId from aircraft_id',
  args: {
    id: {
      type: new NonNull(ID)
    },
  },
  resolve(_, { id }) {
    return AircraftHeroshotPhoto.findById(id);
  },
};
