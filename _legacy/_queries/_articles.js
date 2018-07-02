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
} from '../models';
import ArticleType from '../types/ArticleType';
import ArticleCategoryType from '../types/ArticleCategoryType';

export const getAllArticles = {
  type: new List(ArticleType),
  name: 'Articles',
  description: 'Find all articles',
  args: {
    category_id: {
      type: ID
    },
    language_id: {
      type: ID
    }
  },
  resolve(_, args) {
    return Article.findAll({ where: args });
  },
};

export const getSingleArticle = {
  type: ArticleType,
  name: 'Article',
  description: 'Find single articles',
  args: {
    id: {
      type: ID
    }
  },
  resolve(_, args) {
    return Article.findById(args.id);
  },
};

export const getAllArticleCategories = {
  type: new List(ArticleCategoryType),
  name: 'ArticleCategories',
  description: 'Find all articles categories',
  args: {
    language_id: {
      type: ID
    }
  },
  resolve() {
    return ArticleCategory.findAll({where: args});
  },
};


export const getSingleArticleCategory = {
  type: ArticleCategoryType,
  name: 'ArticleCategory',
  description: 'Find single article category',
  args: {
    id: {
      type: ID
    }
  },
  resolve() {
    return ArticleCategory.findById(args.id);
  },
};
