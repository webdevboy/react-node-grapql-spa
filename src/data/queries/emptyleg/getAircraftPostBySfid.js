import {
  GraphQLID as ID,
  GraphQLList as List,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
} from "graphql";

import PostType from "../../types/PostType";
import { Post } from '../../models';

export default {
  type: new List(PostType),
  name: 'getAircraftPostBySfid',
  args: {
    aircraft_sfid: {
      type: StringType,
    },
	manu_sfid: {
      type: StringType,
    },
	language_id: {
	  type: ID,
	},
  },
  async resolve(_, args) {
    try {
    const where = {};
	  if (args.aircraft_sfid){
	    where.meta = { "aircraft_sfid" : args.aircraft_sfid };
	  }
	  if (args.manu_sfid){
	    where.meta = { "manufacturer" : args.manu_sfid };
	  }
	  if (args.language_id){
	    where.language_id = args.language_id;
	  }

      return Post.findAll({
	    where,
	  });
    } catch (e) {
      console.error(e);
      return e;
    }
  },
};
