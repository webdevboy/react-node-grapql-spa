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
  Event
} from '../../models';

import types from '../../types';

export default {
  type: new List(types.EventType),
  name: 'Events',
  description: 'Find all events',
  args: {
    language_id: {
      type: ID
    },
  },
  resolve(_, args) {
    return Event.findAll({ where: args , order: ['created_at','updated_at'] });
  },
};
