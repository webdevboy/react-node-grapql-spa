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

import { User, UserRole } from '../../models';
import OutputRemove from "../../types/utils/OutputRemove";

export default {
  type: OutputRemove,
  args: {
    id: {
      type: new NonNull(new List(ID)),
    },
  },
  async resolve(_, args) {
    // return new Promise(async (resolve, reject) => {

      // console.log(args);

      try {

        const god = await UserRole.model.findOne({ where: { name: "God" }, attributes: ["id"] });        
        const rows = await User.model.destroy({ where: { id: { $in: args.id }, role_id: { $not: god.id } } });

        return {
          ids: args.id,
          rows,
        }

      } catch (e) {
        console.error(e);
        return e;
      }
    // });
  },
};
