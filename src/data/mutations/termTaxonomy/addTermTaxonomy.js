import Promise from "bluebird";
import { Term, TermTaxonomy, Language } from "../../models";
import TermType from "../../types/TermType";
import TaxonomyType from "../../types/TaxonomyType";
import termTaxonomyArgsType from "./termTaxonomyArgsType";
import { auth } from "../../../config";
import jwt from "jsonwebtoken";
import slugify from "slugify";
import { GraphQLList as List } from "graphql";
import { randomBytes } from "crypto";

export default {
  type: TaxonomyType,
  description: "Creates a new term taxonomy",
  args: termTaxonomyArgsType,
  resolve({ user }, args, context) {
    return new Promise(async (resolve, reject) => {
      try {

        const lang = await Language.findById(args.language_id);
        if (!lang) {
          throw new Error("Language not found!");
        }
        const originalLang = lang.id;

        const slug = slugify(args.name, { lower: true, remove: /[$*^`´|_§#€?&$+~.%=()'"!,\\/\:@]/i });
        const newTerm = await Term.model.create(
          Object.assign({}, {
			name: args.name,
            slug: slug,
			meta: args.meta,
			language_id: args.language_id,
          }),
        );
		const newTaxonomy = await TermTaxonomy.model.create(
		  Object.assign({}, {
			term_id: newTerm.id,
            taxonomy: args.taxonomy,
			description: "",
			parent_id: args.parent_id ? args.parent_id : null,
          }),
		);
		newTaxonomy.term = newTerm;
        resolve(newTaxonomy);
      } catch (e) {
        reject(e);
      }
    });
  },
};
