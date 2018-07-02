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
	  type: types.EventType,
	  name: 'Event',
	  description: 'Find single event',
	  args: {
	    id: {
	      type: new NonNull(ID)
      },
      language_id: {
        type: new NonNull(ID)
      },
	  },
	  resolve(_, { id }) {
	    return Event.findById(id);
  },
};
