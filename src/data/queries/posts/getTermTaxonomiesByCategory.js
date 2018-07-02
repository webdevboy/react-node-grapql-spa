import { GraphQLList as List, GraphQLString as StringType, GraphQLNonNull as NonNull, GraphQLID as ID } from "graphql";
import { Post, TermTaxonomy, Term } from "../../models";
import PostType from "../../types/PostType";
import TaxonomyType from "../../types/TaxonomyType";
import TermType from "../../types/TermType";

export default {
  type: new List(TaxonomyType),
  description: "Get Taxonomies",
  args: {
    taxonomy: {
      type: StringType,
    },
    language_id: {
      type: ID
    }
  },
  resolve(_, args) {
    try {
      const where = {};
      if (args.taxonomy) {
        where.taxonomy = args.taxonomy;
      }

      const termWhere = {};
      if (args.language_id) {
        termWhere.language_id = args.language_id;
      }

      return TermTaxonomy.model.findAll({
        where,
        include: [
          {
            model: Term.model,
            as: "term",
            where: termWhere
          },
        ],
      });
    } catch (e) {
      console.error(e);
      return e;
    }
  },
};
