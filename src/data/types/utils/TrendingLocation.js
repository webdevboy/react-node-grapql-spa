import {
  GraphQLID as ID,
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
  GraphQLList as List,
  GraphQLInt as Integer,  
  GraphQLBoolean as Boolean,
} from 'graphql';

import GraphQLJSON from 'graphql-type-json';

export default new ObjectType({
  name: 'TrendingLocation',
  description: 'Trending Location on HomePage',
  fields: {
    cityName: {
      type: StringType,
    },
    pathUrl: {
      type: StringType,
    },
    teaser: {
      type: StringType,
    },
    image_id: {
      type: ID,
    },
    image_src: {
      type: StringType,
    },
    events: {
      type: GraphQLJSON,
    },
  }
});