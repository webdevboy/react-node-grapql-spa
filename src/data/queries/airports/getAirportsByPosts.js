import {
  GraphQLString as StringType,
  GraphQLID as ID,
  GraphQLList as List,
  GraphQLObjectType as ObjectType,
  GraphQLNonNull as NonNull,
  GraphQLBoolean as BooleanType,
  GraphQLInt as Integer,
  GraphQLInputObjectType as InputType,
  GraphQLFloat as FloatType,
} from "graphql";
import { find } from 'lodash';

import { SFAirport, Post, Language, MediaLibrary } from '../../models';
import AirportType from "../../types/SFAirportType";

export default {
  type: new List(AirportType),
  name: "GetAirportsByPosts",
  description: "Search for airports",
  args: {
    post_ids: {
      type: new List(ID),
    },
  },
  async resolve(_, args, context, info) {
    try {
      const posts = await Post.findAll({
        where: {
          id: { $in: args.post_ids },
          type: "airport",
        },
        include: [
          {
            model: Language.model,
            as: 'translation',
            required: true,
          },
          {
            model: MediaLibrary.model,
            as: 'image',
            required: true,
          },
        ]
      });

      const sfids = posts.map(p => p.meta.airport_sfid);
      const airports = await SFAirport.findAll({
        where: { sfid: { $in: sfids } },
      });

      // If slug is queried
      if (!info.fieldNodes[0].selectionSet.selections.every(field => field.name.value !== 'post')) {
        airports.forEach(airport => {
          const post = find(posts, post => post.meta.airport_sfid === airport.sfid);
          airport.post = JSON.stringify({
            slug: post.slug,
            body: post.body,
            meta: post.meta,
            image: post.image.src,
            summary: post.summary,
            locale: post.translation.locale,
          });
        });
      }

      return airports || [];
    } catch (e) {
      console.error(e);
      return e;
    }
  },
};
