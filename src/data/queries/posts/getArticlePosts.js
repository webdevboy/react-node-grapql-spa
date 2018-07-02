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
    description: "Get Article based on its category",
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
      term_name: {
        type: StringType
      },
      limit: {
        type: Int
      }
    },
    resolve(_, { year, month, categories, language_id, term_name, limit }) {
      try {

        const where = {
          taxonomy: {
            $in: ['article_category'],
          },
        };

        const termWhere = {};

        const postWhere = {
          type: 'article',
          state: 'published'
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

        var query;

        if (limit) {
            query = {
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
                order: ['publish_at']
              },
            ],
            limit: limit
          }
        } else {
          query = {
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
                order: ['publish_at']
              },
            ]
          }
        }

        // console.log('==== > taxonomy query', JSON.stringify(query))

        return TermTaxonomy.model.findAll(query);

      } catch (e) {
        console.error(e);
        return e;
      }
    },
  };
