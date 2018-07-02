import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
  GraphQLBoolean as BooleanType,
  GraphQLList as List,
  GraphQLInt as Integer,
} from 'graphql';
import GraphQLJSON from 'graphql-type-json';
import DateType from 'graphql-date';
import { SFAirport, Post, SFAirportCity, SFCountry } from '../models';
import MediaType from '../types/MediaType';
import UserType from '../types/UserType';
import LanguageType from '../types/LanguageType';
import PostState from '../types/utils/PostState';
import TaxonomyType from './TaxonomyType';
import PostInterface from './utils/PostInterface';
import PostType from './PostType';

export default new ObjectType({
  name: 'Airport',
  description: 'Represents a airport page',
  interfaces: () => [PostInterface],
  fields: () => ({
    id: {
      type: new NonNull(ID),
      resolve(post) {
        return post.id;
      },
    },
    title: {
      type: StringType,
      resolve(post) {
        return post.title;
      },
    },
    slug: {
      type: new NonNull(StringType),
      resolve(post) {
        return post.slug;
      },
    },
    body: {
      type: GraphQLJSON,
      resolve(post) {
        return post.body;
      },
    },
    meta: {
      type: GraphQLJSON,
      resolve(post) {
        return post.meta;
      },
    },
    summary: {
      type: StringType,
      resolve(post) {
        return post.summary;
      },
    },
    publish_at: {
      type: DateType,
      resolve(post) {
        return post.publish_at;
      },
    },
    created_at: {
      type: DateType,
      resolve(post) {
        return post.created_at;
      },
    },
    updated_at: {
      type: DateType,
      resolve(post) {
        return post.updated_at;
      },
    },
    media: {
      type: MediaType,
      resolve(post) {
        return post.getImage();
      },
    },
    gallery: {
      type: new List(MediaType),
      resolve(post) {
        return post.getGallery();
      },
    },
    state: {
      type: PostState,
      resolve(post) {
        return post.state;
      },
    },
    author_id: {
      type: ID,
      resolve(post) {
        return post.user_id;
      },
    },
    author: {
      type: UserType,
      resolve(post) {
        return post.getAuthor();
      },
    },
    language: {
      type: LanguageType,
      resolve(post) {
        if (post.translation) {
          return post.translation;
        }
        return post.getTranslation();
      },
    },
    language_id: {
      type: ID,
      resolve(post) {
        return post.language_id;
      },
    },
    type: {
      type: new NonNull(StringType),
      resolve(post) {
        return post.type;
      },
    },
    parent_id: {
      type: ID,
      resolve(post) {
        return post.parent_id;
      },
    },
    parent: {
      type: ID,
      resolve(post) {
        return post.getParent();
      },
    },
    post_id: {
      type: new NonNull(ID),
      resolve(post) {
        return post.post_id;
      },
    },
    ancestors: {
      type: new List(PostType),
      resolve(post) {
        return post.getAncestors();
      },
    },
    translations: {
      type: new List(PostType),
      args: {
        state: {
          type: StringType,
          defaultValue: 'published'
        },
      },
      resolve(post, args) {
        return Post.findAll({
          where: {
            post_id: post.post_id,
            type: post.type,
            state: args.state,
            id: { $not: post.id },
          },
        });
      },
    },
    details: {
      type: GraphQLJSON,
      async resolve(post) {
        if (post.meta.airport_sfid) {
          // const model = await SFAirport.findOne({
          //   where: {
          //     sfid: post.meta.airport_sfid
          //   },
          //   raw: true
          // });
          const model = await SFAirport.findOne({
            where: {
              sfid: post.meta.airport_sfid
            },
            include:[
              {
                model: SFAirportCity.model,
                as: 'city',
                include: [{
                  model: SFCountry.model,
                  as: 'country'
                }]
              }
            ],
            raw: true
          });
          return model;
        }
        return null;
      },
    },
    taxonomies: {
      type: new List(TaxonomyType),
      args: {
        taxonomy: {
          type: StringType,
        },
      },
      resolve(post, args) {
        const where = {};
        if (args.taxonomy) where.taxonomy = args.taxonomy;

        return post.getTaxonomies({ where });
      },
    },
  }),
  isTypeOf: data => !!(data.type === 'airport')
});