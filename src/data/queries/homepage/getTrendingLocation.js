import {
  GraphQLString as StringType,
  GraphQLID as ID,
  GraphQLList as List,
  GraphQLObjectType as ObjectType,
  GraphQLNonNull as NonNull,
  GraphQLBoolean as BooleanType,
  GraphQLInt as Integer,
  GraphQLInputObjectType as InputType
} from "graphql";

import { Post, SFAirportCity } from "../../models";

import TrendingLocation from "../../types/utils/TrendingLocation";
import getUrlFromPost from "utils/getUrlFromPost";

export default {
  type: new List(TrendingLocation),
  name: "TrendingLocation",
  description: "Find all trending location",
  args: {
    language_id: {
      type: ID
    },
    locale: {
      type: StringType
    }
  },
  resolve(_, args) {
    return new Promise(async (resolve, reject) => {
      try {
        const where = {};

        if (args.language_id) {
          where.language_id = args.language_id;
        }
        where.meta = {
          featured_homepage: true,
          template: "private-jet-charter-destination"
        };
        const posts = await Post.model.findAll({ where, limit: 3, raw: true });

        let result = [];
        if (posts && posts.length > 0) {
          await Promise.all(
            posts.map(async post => {
              const where = {};

              if (args.language_id) {
                where.language_id = args.language_id;
              }
              where.meta = {
                city_sfid: post.meta.city_sfid,
                template: "event-details"
              };
              const city = await SFAirportCity.findOne({ where: { sfid: post.meta.city_sfid }, raw: true });
              const eventsOrignal = await Post.model.findAll({ where, limit: 3, raw: true });
              const events = eventsOrignal.filter(event => {
                const today = new Date();
                const fromDate = new Date(event.meta.from_date);
                return fromDate > today;
              });
              let meta = {};

              if (events && events.length > 0) {
                events.forEach(event => {
                  if (event.meta.from_date) {
                    const pathUrl = getUrlFromPost(args.locale,event);
                    const d = new Date(event.meta.from_date);
                    if (meta[d.getMonth()]) {
                      meta[d.getMonth()] = [
                        ...meta[d.getMonth()],
                        {
                          title: event.title,
                          date: event.meta.from_date,
                          pathUrl: pathUrl
                        }
                      ];
                    } else {
                      meta[d.getMonth()] = [{ title: event.title, date: event.meta.from_date, pathUrl: pathUrl }];
                    }
                  }
                });
              }
              const pathUrl = getUrlFromPost(args.locale,post);
              result.push({
                cityName: city.name,
                pathUrl: pathUrl,
                teaser: post.meta ? post.meta.teaser_text : null,
                image_id: (post.meta && post.meta.teaser_image) ? post.meta.teaser_image.id : null,
                image_src: (post.meta && post.meta.teaser_image) ? post.meta.teaser_image.src : null,
                events: meta
              });
            })
          );
        }
        
        resolve(result);
      } catch (e) {
        reject(e);
      }
    });
  }
};
