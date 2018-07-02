import Promise from 'bluebird';
import { Article, Language, ArticleCategory } from '../../models';
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
    category_id: {
      type: ID
    }
  },
  resolve(_, args) {

    return new Promise( async (resolve, reject) => {

      try {

        if (!args.article_id) {
          throw new Error('Missing Article id!');
        }

        const cat = await ArticleCategory.findById(args.category_id);
        if (!cat) {
          throw new Error('Category not found!');
        }

        const articles = await Article.findAll({ where: { article_id: args.article_id }});

        const updatedArticles = await Promise.all(
          articles.map(async (article) => {
            const updatedCategory = await ArticleCategory.findOne({ where: { $and: { cat_id: cat.cat_id, language_id: article.language_id } } });
            const updated = await article.update({ category_id: updatedCategory.id });
            return updated;
          })
        );

        resolve(updatedArticles);

      } catch(e) {
        reject(e);
      }
      
    });

  },
};
