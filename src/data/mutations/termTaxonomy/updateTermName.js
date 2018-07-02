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
import OutputRemove from "../../types/utils/OutputRemove";

export default {
  type: OutputRemove,
  description: "Update name of term",
  args: termArgsType,
  resolve({ user }, { oldName, name }, context) {
    return new Promise(async (resolve, reject) => {
      try {

		const ids = await Term.findAll({ attributes: ['id'], where: { name: oldName }, raw: true });
        const idList = ids.map(id => id.id);
        const rowsTerm = await Term.model.update({ name: name },{ where: { id: { $in: idList } }});
        resolve({
          id: ids[0],
          ids: ids.map(({id}) => id),
          rows: rowsTerm
        });

      } catch (e) {
        reject(e);
      }
    });
  },
};
