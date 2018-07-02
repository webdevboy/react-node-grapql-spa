import Promise from "bluebird";
import { EmptyLeg, User, Currency} from "../../models";
import EmptyLegType from "../../types/EmptyLegType";
import emptyLegArgsType from "./emptyLegArgsType";
import { auth } from "../../../config";
import jwt from "jsonwebtoken";
import slugify from "slugify";
import { GraphQLList as List } from "graphql";
import { randomBytes } from "crypto";

export default {
  type: EmptyLegType,
  description: "Creates a new empty leg",
  args: emptyLegArgsType,
  resolve({ user }, args, context) {
    return new Promise(async (resolve, reject) => {
      try {
        // console.log('BEFORE SAVING ',args);

        const users = await User.findAll();

        const emptyLeg = Object.assign({}, args, {
          user_id: users[0].id,
        });

        let newEmptyLeg;
        if (emptyLeg.id) {
          newEmptyLeg = await EmptyLeg.findById(emptyLeg.id);
          await newEmptyLeg.update(emptyLeg);
        } else {
          newEmptyLeg = await EmptyLeg.model.create(emptyLeg);
        }

        // console.log('DEBUG NEW EMPTY LEG: ', newEmptyLeg);
        resolve(newEmptyLeg);
      } catch (e) {
        reject(e);
      }
    });
  },
};
