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
  type: types.ArticleCategoryType,
  name: 'ArticleCategory',
  description: 'Find single article category',
  args: {
    id: {
      type: new NonNull(ID)
    },
  },
  resolve(_, { id }) {
    return ArticleCategory.findById(id);
  },
};
