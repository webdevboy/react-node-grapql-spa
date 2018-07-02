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
  description: "Get Posts By Template",
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
    type: {
      type: StringType,
    },
    language_id: {
      type: ID,
    },
    pagination: {
      type: PaginationInput,
    },
    taxonomies: {
      type: new List(StringType), 
    },
    terms: {
      type: new List(StringType), 
    },
    term_name : {
      type: StringType
    },
    relation: {
      type: StringType,
      defaultValue: 'OR', // AND
    },
    template: {
      type: StringType
    },
    parentId: {
      type: StringType
    },
  },
  async resolve(_, { ids, slugs, type, language_id, pagination, post_ids, taxonomies, terms, relation, term_name, template, parentId }) {
    try {

      if (!['OR', 'AND'].includes(relation)) {
        throw new Error('The relation must be OR | AND');
      }

      const where = {};
      where.state = "published";
      const taxonomyWhere = {};
      const termWhere = {};

      if (ids) where.id = { $in: ids };
      if (post_ids) where.post_id = { $in: post_ids };
      if (slugs) where.slug = { $in: slugs }
      if (type) where.type = type;
      if (language_id) where.language_id = language_id;
      if (template) where.meta = { template: template };
      if (parentId) where.meta = {
        ...where.meta,
        pathUrl: {
          [parentId]: { $ne : null}
        }
      };
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
            model: MediaLibrary.model,
            as: 'image',
          },
          {
            model: MediaLibrary.model,
            as: 'gallery',
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
