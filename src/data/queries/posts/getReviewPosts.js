import {
  GraphQLList as List,
  GraphQLString as StringType,
  GraphQLID as ID,
  GraphQLInt as Int,
  GraphQLBoolean as Bool
} from "graphql";
import { Post, Term, TermTaxonomy, Language, MediaLibrary } from "../../models";
import PaginationInput from "../../types/utils/PaginationInput";
import PostType from "../../types/PostType";
import sequelize from '../../sequelize';
import Promise from 'bluebird';

export default {
  type: new List(PostType),
  description: "Get Review Posts",
  args: {
    ids: {
      type: new List(StringType),
    },
    post_ids: {
      type: new List(StringType),
    },
    slugs: {
      type: new List(StringType),
    },
    language_id: {
      type: ID,
    },
    pagination: {
      type: PaginationInput,
    },
    taxonomies: {
      type: new List(StringType), // ['aircraft_category', 'aircraft_manufacturer']
    },
    terms: {
      type: new List(StringType), // ['light-jet', 'bombardier']
    },
    term_name : {
      type: StringType
    },
    relation: {
      type: StringType,
      defaultValue: 'OR', // AND
    },
    featured_homepage: {
      type: Bool
    },
  },
  async resolve(_, { ids, slugs, language_id, pagination, post_ids, taxonomies, terms, relation, term_name, featured_homepage }) {
    try {

      if (!['OR', 'AND'].includes(relation)) {
        throw new Error('The relation must be OR | AND');
      }

      const where = {};
      const taxonomyWhere = {};
      const termWhere = {};

      where.type = 'review'
      if (ids) where.id = { $in: ids };
      if (post_ids) where.post_id = { $in: post_ids };
      if (slugs) where.slug = { $in: slugs }
      if (language_id) where.language_id = language_id;
      if (featured_homepage) where.meta = { featured_homepage: true };
      if (terms) termWhere.slug = { $in: terms }
      if (taxonomies) taxonomyWhere.taxonomy = { $in: taxonomies };
      if (term_name) {
        termWhere.name = term_name;
        termWhere.language_id = language_id
      }
      
      const posts = await Post.model.findAll({
        where,
        ...pagination,
        include: [
          {
            model: Language.model,
            as: 'translation',
          },
          {
            model: Post.model,
            as: 'parent',
          },
          {
            model: MediaLibrary.model,
            as: 'image',
          },
          {
            model: MediaLibrary.model,
            as: 'gallery',
          },
          {
            model: TermTaxonomy.model,
            as: 'taxonomies',
            where: taxonomyWhere,
            required: false,
            include: {
              model: Term.model,
              as: 'term',
              where: termWhere,
              required: false
            }
          }
        ]
      });

      if (relation === 'AND') {
        return posts.filter((post) => (post.taxonomies.length >= taxonomies.length));
      }

      return posts;
    } catch (e) {
      console.error(e);
      return e;
    }
  },
};
