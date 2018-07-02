import {
  GraphQLID as ID,
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
} from 'graphql';

const StringTranslationType = new ObjectType({
  name: 'StringTranslation',
  fields: {
    id: {
      type: ID,
    },
    message_id: {
      type: StringType,
    },
    description: {
      type: StringType,
    },
    defaultMessage: {
      type: StringType,
    },
    translation: {
      type: StringType,
    },
    url: {
      type: StringType
    },
    language_id: {
      type: ID,
    },
  },
});

export default StringTranslationType;
