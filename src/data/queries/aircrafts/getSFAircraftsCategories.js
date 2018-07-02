import {
  GraphQLList as List,
  GraphQLString as StringType
} from "graphql";

import { SFAircraftCategory } from '../../models';
import AircraftCategoryType from "../../types/SFAircraftCategoryType";

export default {
  type: new List(AircraftCategoryType),
  name: 'getAircraftCategories',
  args: {
    search: {
      type: StringType,
    },
  },
  resolve(_, { search }) {
    try {
      if (search) {
        return SFAircraftCategory.findAll({
          where: {
            $iLike: {
              name: `%${search}%`,
            },
          },
        });
      }
      return SFAircraftCategory.findAll();
    } catch (e) {
      console.error(e);
      return e;
    }
  },
};
