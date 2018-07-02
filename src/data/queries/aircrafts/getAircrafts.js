import {
  GraphQLList as List,
  GraphQLInt as Integer,
  GraphQLID as ID,
  GraphQLString as StringType,
} from 'graphql';
import AircraftFilterInput from '../../types/utils/AircraftFilterInput';
import PaginationInput from '../../types/utils/PaginationInput';
import PostType from '../../types/PostType';
import { Post, Term, TermTaxonomy } from '../../models';
import TaxonomyType from '../../types/TaxonomyType';

export default {
  type: new List(TaxonomyType),
  name: 'getAircrafts',
  args: {
    categories: {
      type: new List(StringType),
    },
    manufacturers: {
      type: new List(StringType),
    },
    language_id: {
      type: ID,
    },
    filter: {
      type: AircraftFilterInput,
    },
    title: {
      type: StringType
    },
    pagination: {
      type: PaginationInput
    }
  },
  async resolve(_, { filter, categories, manufacturers, pagination, language_id, title }) {
    try {
      const post_where = {
        type: 'aircraft',
      };

      if (filter) {

        post_where.meta = { details: {} };

        if (filter.seats) {
          post_where.meta.details.seats = {
            $between: [filter.seats.min, filter.seats.max],
          };
        }
        if (filter.distance) {
          post_where.meta.details.distance = {
            $between: [filter.distance.min, filter.distance.max],
          };
        }
        if (filter.flight_time) {
          post_where.meta.details.flight_time = {
            $between: [filter.flight_time.min, filter.flight_time.max],
          };
        }
        
      }

      const taxonomy_where = {
        taxonomy: {
          $in: ['aircraft_category', 'aircraft_manufacturer'],
        },
      };

      if (language_id) {
        post_where.language_id = language_id;
      }

      if (title) {
        post_where.title = {
          $iLike: `${title}%`
        }
      }

      const term_where = {};
      if (categories && manufacturers) {
        term_where.slug = {
          $in: [
            ...categories,
            ...manufacturers
          ],
        };
      } else {
        if (categories && !manufacturers) {
          taxonomy_where.taxonomy = 'aircraft_category';
          term_where.slug = {
            $in: categories,
          };
        }
        if (manufacturers && !categories) {
          taxonomy_where.taxonomy = 'aircraft_manufacturer';
          term_where.slug = {
            $in: manufacturers,
          };
        }
      }

      const posts = await TermTaxonomy.model.findAll({
        where: taxonomy_where,
        include: [
          {
            model: Term.model,
            as: 'term',
            where: term_where,
            required: true,
          },
          {
            model: Post.model,
            as: 'posts',
            where: post_where,
            required: true,
          },
        ],
      });

      return posts;

    } catch (e) {
      console.error(e);
      return e;
    }
  },
};


/**
 *
obter avioes de uma categoria
{
  categories: getAircrafts(category: "super-midsize-jet") {
    taxonomy
    term {
      slug
      name
      meta
    }
    fleet: posts {
      __typename
      ... on PostInterface {
        slug
      }
    }
  }
}
 */