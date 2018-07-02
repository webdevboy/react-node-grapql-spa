import {
  GraphQLID as ID,
  GraphQLList as List,
  GraphQLNonNull as NonNull,
} from "graphql";

import SFAircraftModelType from "../../types/SFAircraftModelType";

import { SFAircraftModel } from '../../models';

export default {
  type: new List(SFAircraftModelType),
  name: "getSFAircraftModels",
  args: {
    sfid: {
      type: new List(ID),
    },
  },
  resolve(_, args) {
    try {
      return SFAircraftModel.findAll({ where: { sfid: {$in: args.sfid }} });
    } catch (e) {
      console.error(e);
      return e;
    }
  },
};
