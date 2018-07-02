import {
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
  GraphQLObjectType as ObjectType,
  GraphQLBoolean as BooleanType
} from 'graphql';

export default new ObjectType({
  name: 'SuccessType',
  fields: {
    success: {
      type: new NonNull(BooleanType),
    },
  }
});