import {
  GraphQLList as List,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
  GraphQLID as ID,
} from 'graphql';
import { Post, TermTaxonomy, Term } from '../../models';
import PostType from '../../types/PostType';
import TaxonomyType from '../../types/TaxonomyType';
import TermType from '../../types/TermType';

export default {
  type: new List(TaxonomyType),
  description: "Get Taxonomies",
  args: {
    taxonomies: {
      type: new List(StringType),
    },
    slugs: {
      type: new List(StringType),
    },
    language_id: {
      type: ID,
    },
	taxonomy: {
      type: StringType,
    },
  },
  resolve(_, { taxonomies, slugs, language_id, taxonomy }) {
    try {

      const term_where = {};
      if (slugs) {
        term_where.slug = {
        $in: slugs,
        };
      }
      if (language_id) {
        term_where.language_id = language_id;
      }

      const where = {}
      if (taxonomies) {
        where.taxonomy = {
          $in: taxonomies, // the taxonomy
        }
      }
	  
	  if (taxonomy) {
        where.taxonomy = taxonomy;
      }

      return TermTaxonomy.model.findAll({
        where,
        include: [{
          model: Term.model,
          required: true,
          as: 'term',
          where: term_where,
        }],
      });

    } catch (e) {
      console.error(e);
      return e;
    }
  },
};
