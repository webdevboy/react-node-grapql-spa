import {
  GraphQLList as List,
  GraphQLString as StringType,
  GraphQLID as ID,
  GraphQLInt as Int
} from "graphql";
import { Post, Term, TermTaxonomy, Language, MediaLibrary } from "../../models";
import PaginationInput from "../../types/utils/PaginationInput";
import PostType from "../../types/PostType";
import sequelize from '../../sequelize';
import Promise from 'bluebird';

export default {
  type: new List(PostType),
  description: "Get All Posts",
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
    slug: {
      type: StringType,
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
  },
  async resolve(_, { ids, type, slugs, slug, language_id, pagination, post_ids, taxonomies, terms, relation, term_name }) {
    try {

      if (!['OR', 'AND'].includes(relation)) {
        throw new Error('The relation must be OR | AND');
      }

      const where = {};
      const taxonomyWhere = {};
      const termWhere = {};

      if (ids) where.id = { $in: ids };
      if (post_ids) where.post_id = { $in: post_ids };
      if (type) where.type = type;
      if (slugs) where.slug = { $in: slugs };
      if (slug) where.slug = slug;
      if (language_id) where.language_id = language_id;
      if (terms) termWhere.slug = { $in: terms }
      if (taxonomies) taxonomyWhere.taxonomy = { $in: taxonomies };
      if (term_name) {
        termWhere.name = term_name;
        termWhere.language_id = language_id
      }

      // console.log('====>  ', termWhere, taxonomyWhere)

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
            // required: true,

            // where: {
            //   taxonomy: { $in: ['aircraft_manufacturer'] }
            // },

            // include: [
            //   {
            //     model: Term.model,
            //     as: 'term',
            //   }
            // ]
            // },
            // include: [
            //   {
            //     // duplicating: false,
            //     required: true,
            //     model: Term.model,
            //     as: 'term',
            //     where: {
            //       [(tax_query.relation === 'OR') ? '$or' : '$and']: tax_query.taxonomies.map(({ taxonomy, field, terms }) => ({
            //         // taxonomy: sequelize.where(sequelize.col('taxonomies.taxonomy'), taxonomy),
            //         [field]: {
            //           $in: terms
            //         },
            //       })),
            //     },
            //     // include: [
            //     //   {
            //     //     model: TermTaxonomy.model,
            //     //     as: 'taxonomies',
            //     //     required: true,
            //     //     where: {
            //     //       taxonomy: {
            //     //         $or: tax_query.taxonomies.map(({ taxonomy }) => taxonomy)
            //     //       }
            //     //     },
            //     //   }
            //     // ]

            //   },
          //   ]
          // }
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