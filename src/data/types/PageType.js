import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
  GraphQLBoolean as BooleanType,
  GraphQLList as List,
  GraphQLInt as Integer,
} from "graphql";
import GraphQLJSON from "graphql-type-json";
import DateType from "graphql-date";
import { Post, SFAirportCity } from "../models";

import MediaType from "../types/MediaType";
import UserType from "../types/UserType";
import LanguageType from "../types/LanguageType";
import PostState from "../types/utils/PostState";
import TaxonomyType from "./TaxonomyType";
import PostInterface from "./utils/PostInterface";
import PostType from "./PostType";
import SFAirportCityType from "./SFAirportCityType";

export default new ObjectType({
  name: "Page",
  description: "Represents a page",
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
        return post.language || post.getTranslation()
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
      async resolve(post) {
        const ancestors = await post.getAncestors();
        return ancestors;
      },
    },
    translations: {
      type: new List(PostType),
      args: {
        state: {
          type: StringType,
          defaultValue: "published",
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
    taxonomies: {
      type: new List(TaxonomyType),
      args: {
        taxonomy: {
          type: StringType,
        },
      },
      resolve(post, args) {
        return [];
      },
    },
    first_city: {
      type: SFAirportCityType,
      resolve(post) {
        return SFAirportCity.findOne({
          where: {
            sfid: post.meta.first_city_sfid,
          },
        });
      },
    },
    second_city: {
      type: SFAirportCityType,
      resolve(post) {
        return SFAirportCity.findOne({
          where: {
            sfid: post.meta.second_city_sfid,
          },
        });
      },
    },
    city: {
      type: SFAirportCityType,
      resolve(post) {
        if (!post.meta.city_sfid) return null;
        return SFAirportCity.findOne({
          where: {
            sfid: post.meta.city_sfid,
          },
        });
      },
    },
    firstCity: {
      type: SFAirportCityType,
      resolve(post) {
        if (!post.meta.first_city_sfid) return null;
        if (post.firstCity) return post.firstCity;
        return SFAirportCity.findOne({
          where: {
            sfid: post.meta.first_city_sfid
          }
        });
      }
    },
    secondCity: {
      type: SFAirportCityType,
      resolve(post) {
        if (!post.meta.second_city_sfid) return null;
        if (post.secondCity) return post.secondCity;
        return SFAirportCity.findOne({
          where: {
            sfid: post.meta.second_city_sfid
          }
        });
      }
    }
  }),
  isTypeOf: data => data.type === "page",
});
