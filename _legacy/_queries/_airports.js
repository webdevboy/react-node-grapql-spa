import {
  GraphQLString as StringType,
  GraphQLID as ID,
  GraphQLList as List,
  GraphQLObjectType as ObjectType,
  GraphQLNonNull as NonNull,
  GraphQLBoolean as BooleanType,
  GraphQLInt as Integer,
  GraphQLInputObjectType as InputType,
  GraphQLFloat as FloatType
} from 'graphql';
import DateType from 'graphql-date';
import sequelize from 'sequelize';

import { SF_Airport } from '../models/salesforce';

import AirportType from '../types/AirportType';

export const getAllAirports = {
  type: new List(AirportType),
  name: 'Airports',
  description: 'Find all airports',
  args: {
    search: {
      type: StringType
    },
    lat: {
      type: FloatType
    },
    long: {
      type: FloatType
    }
  },
  async resolve(_, args) {

    const longCast = sequelize.cast(sequelize.col('location__longitude__s'), 'double precision');
    const latCast = sequelize.cast(sequelize.col('location__latitude__s'), 'double precision');

    const airports = await SF_Airport.findAll({
      attributes: { 
        include: [
          [
            sequelize.fn('ST_Distance_Sphere',
              sequelize.fn('st_makepoint', longCast, latCast),      // point A
              sequelize.fn('st_makepoint', args.long, args.lat)     // point B
            ), // end ST_Distance_Sphere
            'distance', // as 'distance'
          ],
        ],
      },
      order: 'distance',
      where: {
        helipad__c: false,
        // $or: [
        //   {
        //     name: { $iLike: `${args.search}%` }
        //   },
        //   {
        //     iata_code__c: { $iLike: `${args.search}%` }
        //   },
        // ]
      },
      limit: 5
    });

    console.log('================== AIPORTS =>');
    console.log(airports);
    return airports;

  },
};

export const getNearestAirport = {
  type: AirportType,
  name: 'Airport',
  description: 'Find nearby airport',
  args: {
    lat: {
      type: FloatType
    },
    long: {
      type: FloatType
    }
  },
  async resolve(_, args) {

    const longCast = sequelize.cast(sequelize.col('location__longitude__s'), 'double precision');
    const latCast = sequelize.cast(sequelize.col('location__latitude__s'), 'double precision');

    const airport = await SF_Airport.findOne({
      attributes: { 
        include: [
          [
            sequelize.fn('ST_Distance_Sphere',
              sequelize.fn('st_makepoint', longCast, latCast),      // point A
              sequelize.fn('st_makepoint', args.long, args.lat)     // point B
            ), // end ST_Distance_Sphere
            'distance', // as 'distance'
          ],
        ],
      },
      order: 'distance',
      limit: 1
    });

    console.log('================== AIPORT =>');
    console.log(airport);
    return airport;

  },
};