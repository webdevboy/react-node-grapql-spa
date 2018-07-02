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
  Article,
  ArticleCategory
} from '../../models';

import types from '../../types';

export default {
  type: types.ArticleType,
  name: 'Article',
  description: 'Find single articles',
  args: {
    slug: {
      type: new NonNull(StringType)
    },
    language_id: {
      type: new NonNull(ID),
    },
  },
  resolve(_, args) {
    return Article.findOne({ where: args });
  },
};