import Promise from "bluebird";
import { Term, TermTaxonomy, Language } from "../../models";
import TermType from "../../types/TermType";
import TaxonomyType from "../../types/TaxonomyType";
import termArgsType from "./termArgsType";
import { auth } from "../../../config";
import jwt from "jsonwebtoken";
import slugify from "slugify";
import { GraphQLList as List } from "graphql";
import { randomBytes } from "crypto";

export default {
  type: TermType,
  description: "Update display name of term",
  args: termArgsType,
  resolve({ user }, { id, meta }, context) {
    return new Promise(async (resolve, reject) => {
      try {

		const termToUpdate = await Term.findById(id);
        if (!termToUpdate) {
          throw new Error("Term not found!");
        }
		
        const term = await termToUpdate.update({ meta });

        resolve(term);

      } catch (e) {
        reject(e);
      }
    });
  },
};
