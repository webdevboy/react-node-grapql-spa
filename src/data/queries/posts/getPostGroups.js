import {
  GraphQLList as List,
  GraphQLString as StringType,
  GraphQLID as ID,
  GraphQLInt as Int
} from "graphql";
import _ from "lodash";
import { Post, Language, SFAirportCity } from "../../models";
import PostGroupType from "../../types/PostGroupType";

export default {
  type: new List(PostGroupType),
  description: "Get all post groups",
  args: {
    type: {
      type: StringType,
    },
  },
  async resolve(obj, { type }, { defaultLocale }) {
    try {
      const [availableLanguages, cities, posts] = await Promise.all([
        Language.findAll(), 
        SFAirportCity.findAll({
          attributes: ["sfid", "name"]
        }),
        Post.findAll({
          where: {
            type
          }
        })
      ]);
      const languagesById = _.keyBy(availableLanguages, "id");
      const citiesById = _.keyBy(cities, "sfid");
      posts.forEach(post => { 
        post.language = languagesById[post.language_id];
        post.firstCity = citiesById[post.meta.first_city_sfid];
        post.secondCity = citiesById[post.meta.second_city_sfid];
      });
      let groups = _.groupBy(posts, post => post.post_id);
      groups = Object.entries(groups).map(([post_id, group]) => {
        let master;
        const masterIndex = group.findIndex(post => post.language.locale === defaultLocale);
        if (masterIndex !== -1) {
          [master] = group.splice(masterIndex, 1);
          group.sort((post0, post1) => post0.language.locale > post1.language.locale);
          group.unshift(master);
        }
        return {
          post_id,
          posts: group,
          master
        }
      });
      groups = groups.filter(group => group.master);
      return groups;
    } catch (e) {
      console.error(e);
      return e;
    }
  },
};