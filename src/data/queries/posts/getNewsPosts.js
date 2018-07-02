import {
    GraphQLList as List,
    GraphQLString as StringType,
    GraphQLNonNull as NonNull,
    GraphQLInt as Int,
    GraphQLID as ID,
  } from 'graphql';
  import { Post, TermTaxonomy, Term } from '../../models';
  import PostType from '../../types/PostType';
  import TaxonomyType from '../../types/TaxonomyType';
  import TermType from '../../types/TermType';
  
  export default {
    type: new List(TaxonomyType),
    description: "Get Aircrafts",
    args: {
      categories: {
        type: new List(StringType)
      },
      language_id: {
        type: StringType
      },
      year: {
        type: Int
      },
      month: {
        type: Int,
      },
    },
    resolve(_, { year, month, categories, language_id }) {
      try {
  
        const where = {
          taxonomy: {
            $in: ['article_category'],
          },
        };
  
        const termWhere = {
            slug: 'news'
        };

        
        if (year && month) {
            try {
                const from_date = new Date(year, month);
                const to_date = new Date(from_date);
                to_date.setMonth(month + 1);
    
                termWhere.updated_at = { $lte: to_date };
                termWhere.updated_at = { $gte: from_date };
            } catch(e) {

            }
        }

        const postWhere = {
            type: 'article'
        }
  
        if (language_id) {
          postWhere.language_id = language_id;
        }
  
        const query = {
          where,
          include: [
            {
              model: Term.model,
              as: 'term',
              required: true,
              where: termWhere,
            },
            {
              model: Post.model,
              as: 'posts',
              required: true,
              where: postWhere,
            },
          ],
        }
  
  
        return TermTaxonomy.model.findAll(query);
  
      } catch (e) {
        console.error(e);
        return e;
      }
    },
  };
  