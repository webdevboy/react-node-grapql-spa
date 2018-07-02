import Promise from 'bluebird';
import { Article, Language, ArticleCategory, User, MediaLibrary } from '../../models';
import ArticleType from '../../types/ArticleType';
import articleArgsType from './articleArgsType';
import { auth } from "../../../config";
import jwt from 'jsonwebtoken';
import slugify from 'slugify';
import {
  GraphQLList as List
} from 'graphql';
import { randomBytes } from 'crypto';

export default {
  type: new List(ArticleType),
  description: 'Creates a new article post',
  args: articleArgsType,
  resolve({ req }, args) {

    return new Promise( async (resolve, reject) => {

      try {

        if (!args.article_id) {
          const total = await Article.count();
          args.article_id = String(total) + randomBytes(2).toString('hex');
          console.log('group article id => ',args.article_id);
        }

        const userId = req.user && req.user.id  || args.user_id || await jwt.verify(args.token, auth.jwt.secret).id || false;
        if (!userId) {
          throw new Error('Please sign in first!');
        }

        const user = await User.findById(userId);
        if (!user) {
          throw new Error('User not found!');
        }

        const lang = await Language.findById(args.language_id);
        if (!lang) {
          throw new Error('Language not found!');
        }
        const originalLang = lang.id;

        const cat = await ArticleCategory.findById(args.category_id);
        if (!cat) {
          throw new Error('Category not found!');
        }

        if (args.media_id) {
          const media = await MediaLibrary.findById(args.media_id);
          if (!media) {
	          throw new Error('Media not found!');
	        }
        }

        if (args.duplicate) {

          const langs = await Language.findAll({ where: { enabled: true }});
          delete args.duplicate;
          delete args.language_id;
          delete args.category_id;

          const duplication = await Promise.all(langs.map(async (lang) => {

            const { locale } = await lang.getLocale();

            const duplicateCat = await ArticleCategory.findOne({ where: { $and: { cat_id: cat.cat_id, language_id: lang.id } } });
            const duplicateArgs = Object.assign({}, args, {
              title: (originalLang !== lang.id) ? `${args.title} - ${locale}` : args.title,
              slug: slugify((originalLang !== lang.id) ? `${args.title} - ${locale}` : args.title, { lower: true, remove: /[$*^`´|_§#€?&$+~.%=()'"!,\\/\:@]/i }),
              state: (originalLang !== lang.id) ? 'draft' : args.state,
              publish_at: (originalLang !== lang.id) ? null : args.publish_at,
              media_id: (args.media_id) ? args.media_id : null
            });

            return {
              ...duplicateArgs,
              category_id: duplicateCat.id,
              language_id: lang.id,
              user_id: user.id,
            }

          }));          

          const duplicatedArticles = await Article.bulkCreate(duplication);
          resolve(duplicatedArticles)

        } else {

          const newArticle = await Article.create(Object.assign({}, args, { slug: slugify(args.title, { lower: true, remove: /[$*_+~.()'"!\-:@]/g }) }));
          await newArticle.setAuthor(user);

          resolve([newArticle]);
        }

        
      } catch(e) {
        reject(e);
      }
      
    });

  },
};
