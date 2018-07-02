import {
  GraphQLID as ID,
  GraphQLNonNull as NonNull,
} from "graphql";

import { SFAircraftCategory } from '../../models';
import SFAircraftCategoryType from "../../types/SFAircraftCategoryType";

export default {
  type: SFAircraftCategoryType,
  name: "GetSFAircraftCategory",
  args: {
    id: {
      type: new NonNull(ID),
    },
  },
  resolve(_, args) {
    try {
      return SFAircraftCategory.findOne({ where: { sfid: args.id } });
    } catch (e) {
      console.error(e);
      return e;
    }
  },
};
