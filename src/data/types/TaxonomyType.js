import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
  GraphQLBoolean as BooleanType,
  GraphQLList as List,
  GraphQLInt as Integer,
} from 'graphql';

import TermType from './TermType';
import PostType from './PostType';
import PaginationInput from './utils/PaginationInput';

const TaxonomyType = new ObjectType({
  name: 'TaxonomyType',
  description: 'Represents a taxonomy',
  fields: () => ({
    id: {
      type: ID,
      resolve(taxonomy) {
        return taxonomy.id;
      },
    },
    taxonomy: {
      type: StringType,
      resolve(taxonomy) {
        return taxonomy.taxonomy;
      },
    },
    parent_id: {
      type: ID,
      resolve(taxonomy) {
        return taxonomy.parent_id;
      },
    },
    parent: {
      type: TermType,
      resolve(taxonomy) {
        return taxonomy.getParent();
      },
    },
    description: {
      type: StringType,
      resolve(taxonomy) {
        return taxonomy.description;
      },
    },
    term_id: {
      type: ID,
      resolve(taxonomy) {
        return taxonomy.term_id;
      },
    },
    term: {
      type: TermType,
      resolve(taxonomy, args) {
        if (taxonomy.term) {
          return taxonomy.term;
        }
        return taxonomy.getTerm();
      },
    },
    posts: {
      type: new List(PostType),
      args: {
        pagination: {
          type: PaginationInput,
        },
        sortBy: {
          type: new List(new List(StringType)), // [['created_at','ASC']]
          defaultValue: [
            ['created_at', 'ASC'],
          ],
          /**
           * example
           * [
           *  ['updated_at', 'ASC'],
           *  ['created_at', 'ASC'],
           * ]
           */
        },
        type: {
          type: StringType,
        },
      },
      resolve(taxonomy, args, context, info) {

        if (taxonomy.posts) {
          return taxonomy.posts;
        }

        const { pagination, sortBy, type } = args;
        const where = {
          type: {
            $not: 'page',
          }
        };

        if (type) {
          where.$and = {
            type: type
          }
        }
        
        return taxonomy.getPosts({
          ...pagination,
          order: sortBy,
          where,
        });
      },
    },
  }),
});

export default TaxonomyType;
