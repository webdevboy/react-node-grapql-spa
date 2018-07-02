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
    parent_id: {
      type: ID,
    },
  },
  resolve(_, args) {
    try {
      const where = {};
      if (args.taxonomy) {
        where.taxonomy = args.taxonomy;
      }
      if (args.parent_id) {
        where.parent_id = args.parent_id;
      }

      return TermTaxonomy.model.findAll({
        where,
        include: [
          {
            model: Term.model,
            as: "term",
          },
        ],
      });
    } catch (e) {
      console.error(e);
      return e;
    }
  },
};
