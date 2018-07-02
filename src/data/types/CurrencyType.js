import {
  GraphQLID as ID,
  GraphQLObjectType as ObjectType,
  GraphQLNonNull as NonNull,
  GraphQLString as StringType,
  GraphQLBoolean 
} from 'graphql';

export default new ObjectType({
  name: 'Currency',
  fields: {
    id: { 
      type: new NonNull(ID),
    },
    currency: { 
      type: new NonNull(StringType),
    },
    base: { 
      type: GraphQLBoolean,
    }
  },
});
