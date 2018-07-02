import {
  GraphQLString as StringType,
  GraphQLID as ID,
  GraphQLList as List,
  GraphQLNonNull as NonNull,
  GraphQLInt as Integer,
  GraphQLObjectType as ObjectType,
  GraphQLBoolean as BooleanType,
  GraphQLEnumType as EnumType,
} from "graphql";
import GraphQLJSON from "graphql-type-json";
import PostType from "../../types/PostType";
import { Post, Language, MediaLibrary } from '../../models';

export default {
  type: new List(GraphQLJSON),
  name: 'getHeroShotPhotoIds',
  args: {
    ids: {
      type: new List(StringType),
    },
  },
  async resolve(_, { ids }) {
    try {
      let result = [];
      if (!ids || ids.length === 0){
        return result;
      }
      const lang = await Language.findOne({ where: {
        locale: 'en',
        enabled: true,
      }});
      await Promise.all(
        ids.map(async id => {
          const where = {
            type: 'aircraft',
            language_id: lang.id,
            meta:{
              aircraft_sfid: id,
            }
          };
          const aPost = await Post.findOne({ where });
          if (aPost){
            let heroShotId = "";
            if (aPost.media_id){
              const aMedia = await MediaLibrary.findById(aPost.media_id);
              const listPath = aMedia.filename.split(".");
              heroShotId = listPath[0];
            }
            result.push({
              id: id,
              heroshotphoto_id: heroShotId,
            });
          }
        })
      );
      return result;
    } catch (e) {
      console.error(e);
      return e;
    }
  },
};
