import {
  GraphQLString as StringType,
  GraphQLID as ID,
  GraphQLList as List,
  GraphQLNonNull as NonNull,
} from 'graphql';

import {
  Article,
  ArticleCategory
} from '../../models';

import types from '../../types';

export default {
  type: new List(types.ArticleCategoryType),
  name: 'ArticleCategories',
  description: 'Find all articles categories',
  args: {
    language_id: {
      type: ID
    },
    cat_id: {
    	type: StringType
    }
  },
  resolve(_, args) {
    return ArticleCategory.findAll({ where: args });
  },
};