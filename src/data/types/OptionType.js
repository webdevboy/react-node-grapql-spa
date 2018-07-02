import {
  GraphQLID as ID,
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
  GraphQLList as List,
  GraphQLBoolean as Boolean,
} from 'graphql';

export default new ObjectType({
  name: 'Option',
  fields: {
    id: { 
      type: new NonNull(ID),
      resolve(settings) {
        return settings.id;
      }
    },
    option: { 
      type: new NonNull(StringType),
      resolve(settings) {
        return settings.option;
      }
    },
    value: { 
      type: StringType,
      resolve(settings) {
        return settings.value;
      }
    },
    description: {
      type: StringType,
      resolve(settings) {
        return settings.description;
      }
    }
  },
});
