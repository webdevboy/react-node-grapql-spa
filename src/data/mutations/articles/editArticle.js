import Promise from 'bluebird';
import { Article, Language, ArticleCategory, User, MediaLibrary } from '../../models';
import ArticleType from '../../types/ArticleType';
import articleArgsType from './articleArgsType';
import { auth } from "../../../config";
import jwt from 'jsonwebtoken';
import slugify from 'slugify';

export default {
  type: ArticleType,
  description: 'Edit a new article post',
  args: articleArgsType,
  resolve(_, args) {

    return new Promise( async (resolve, reject) => {

      try {

        const article = await Article.findById(args.id);

        if (!article) {
          throw new Error('Article not found!');
        }

        if (args.language_id) {
          const lang = await Language.findById(args.language_id);
          if (!lang) {
            throw new Error('Language not found!');
          }
        }
        
        if (args.category_id) {
          const cat = await ArticleCategory.findById(args.category_id);
          if (!cat) {
            throw new Error('Category not found!');
          }
        }

        if (args.media_id) {
	        const media = await MediaLibrary.findById(args.media_id);
	        if (!media) {
	          throw new Error('Media not found!');
	        }
	      }

        const editArticle = await article.update(Object.assign({}, args, { slug: slugify(args.title, { lower: true, remove: /[$*^`´|_§#€?&$+~.%=()'"!,\\/\:@]/i }) }));

        resolve(editArticle);

      } catch(e) {
        reject(e);
      }
      
    });

  },
};
