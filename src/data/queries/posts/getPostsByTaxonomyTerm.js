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
    description: "Get a list of posts based on taxonomy and term",
    args: {
      language_id: {
        type: StringType
      },
      year: {
        type: Int
      },
      month: {
        type: Int,
      },
      term_name: {
        type: StringType
      },
      postType : {
        type: StringType
      },
      taxonomy: {
        type: StringType
      }
    },
    resolve(_, { year, month, language_id, term_name, taxonomy, postType }) {
      try {
  
        const where = {
          taxonomy: {
            $in: [taxonomy],
          },
        };
  
        const termWhere = {};

        const postWhere = {
          type: postType
        }
        
        if (year && month) {
            try {
                const from_date = new Date(year, month);
                const to_date = new Date(year, month + 1);
    
                postWhere.updated_at = { $lte: to_date, $gte: from_date };
            } catch(e) {

            }
        }

        if (term_name) {
          termWhere.name = term_name;
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
  
        // console.log('==== > taxonomy query', JSON.stringify(query))
        return TermTaxonomy.model.findAll(query);
  
      } catch (e) {
        console.error(e);
        return e;
      }
    },
  };
  