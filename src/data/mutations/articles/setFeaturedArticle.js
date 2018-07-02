import Promise from 'bluebird';
import { Article, ArticleCategory } from '../../models';
import ArticleType from '../../types/ArticleType';
import articleArgsType from './articleArgsType';
import { auth } from "../../../config";
import jwt from 'jsonwebtoken';
import slugify from 'slugify';
import {
  GraphQLString as StringType,
  GraphQLID as ID,
  GraphQLList as List,
  GraphQLNonNull as NonNull,
  GraphQLInt as Integer,
  GraphQLObjectType as ObjectType,
  GraphQLBoolean as BooleanType
} from 'graphql';

export default {
  type: new List(ArticleType),
  description: 'Edit a featured state of article post',
  args: {
    article_id: {
      type: StringType
    },
    featured: {
      type: BooleanType
    }
  },
  resolve(_, args) {

    return new Promise( async (resolve, reject) => {

      try {

        if (!args.article_id) {
          throw new Error('Missing Article id!');
        }

        const editArticle = await Article.update(
          { featured: args.featured },
          { where: { article_id: args.article_id }}
        );

        const articlesUpdated = await Article.findAll({ where: { article_id: args.article_id } });
        resolve(articlesUpdated);

      } catch(e) {
        reject(e);
      }
      
    });

  },
};
