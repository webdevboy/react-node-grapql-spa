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
    title: {
      type: StringType
    },
    categories: {
      type: new List(StringType)
    },
    manufacturers: {
      type: new List(StringType)
    },
    language_id: {
      type: ID,
    },
  },
  resolve(_, { categories, manufacturers, title, language_id }) {
    try {

      const where = {
        taxonomy: {
          $in: ['aircraft_category', 'aircraft_manufacturer'],
        },
      };

      const termWhere = {};
      if (categories && manufacturers) {
        termWhere.slug = {
          $in: [...categories, ...manufacturers],
        };
      } else {
        if (categories && !manufacturers) {
          where.taxonomy = 'aircraft_category';
          termWhere.slug = {
            $in: categories,
          };
        }
        if (manufacturers && !categories) {
          where.taxonomy = 'aircraft_manufacturer';
          termWhere.slug = {
            $in: manufacturers,
          };
        }
      }
      
      if (termWhere.slug && !termWhere.slug.$in.length) {
        delete termWhere.slug;
      }

      const postWhere = {
        type: 'aircraft'
      }

      if (language_id) {
        postWhere.language_id = language_id;
      }
      
      if (title) {
        postWhere.title = {
          $iLike: `${title}%`
        }
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
