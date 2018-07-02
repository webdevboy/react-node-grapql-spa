import {
  GraphQLInputObjectType as InputObjectType,
  GraphQLInt as Integer,
} from 'graphql';
import MinMaxType from './MinMax';

export default new InputObjectType({
  name: 'AircraftFilter',
  fields: {
    seats: {
      type: MinMaxType,
    },
    distance: {
      type: MinMaxType,
    },
    flight_time: {
      type: MinMaxType,
    },
  },
});
