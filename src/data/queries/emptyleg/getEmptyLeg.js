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
  EmptyLeg,
} from '../../models';

import EmptyLegType from '../../types/EmptyLegType';

export default {
  type: EmptyLegType,
  name: 'EmptyLeg',
  description: 'Find single emptyleg',
  args: {
    id: {
      type: new NonNull(Integer)
    },
  },
  resolve(_, { id }) {
    return EmptyLeg.findById(id);
},
};
