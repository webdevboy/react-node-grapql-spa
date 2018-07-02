import Promise from "bluebird";
import {
  GraphQLString as StringType,
  GraphQLID as ID,
  GraphQLList as List,
  GraphQLNonNull as NonNull,
  GraphQLInt as Integer,
  GraphQLObjectType as ObjectType,
  GraphQLOutputType as OutputType,
} from "graphql";
import DateType from "graphql-date";

import { UserRole } from '../../models';
import OutputRemove from "../../types/utils/OutputRemove";

export default {
  type: OutputRemove,
  args: {
    id: {
      type: new NonNull(new List(ID)),
    },
  },
  async resolve(_, args) {

    try {

      const rows = await UserRole.model.destroy({ where: { id: { $in: args.id }, protected: { $not: true } } });

      return {
        ids: args.id,
        rows,
      }

    } catch (e) {
      console.error(e);
      return e;
    }

  },
};
