import {
  GraphQLID as ID,
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
} from 'graphql';

import GraphQLJSON from "graphql-type-json";

const RichTextTranslation = new ObjectType({
  name: 'RichTextTranslation',
  fields: {
    id: {
      type: new NonNull(ID),
    },
    message_id: {
      type: StringType,
    },
    translation: {
      type: GraphQLJSON,
    },
  },
});

export default RichTextTranslation;