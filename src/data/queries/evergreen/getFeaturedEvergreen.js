import {
  GraphQLString as StringType,
  GraphQLID as ID,
  GraphQLList as List,
  GraphQLObjectType as ObjectType,
  GraphQLNonNull as NonNull,
  GraphQLBoolean as BooleanType,
  GraphQLInt as Integer,
  GraphQLInputObjectType as InputType
} from "graphql";
import DateType from "graphql-date";
import sequelize from "sequelize";
import { Post, Language, TermTaxonomy, Term } from "../../models";

import PostType from "../../types/PostType";

export default {
  type: new List(PostType),
  description: "Find all featured for evergreen",
  args: {
    language_id: {
      type: ID
    }
  },
  resolve(_, { language_id }) {
    return new Promise(async (resolve, reject) => {
      try {
        const where = {};
        where.language_id = language_id;
        where.meta = {
          featured_evergreen: true
        };
        where.type = "event";
        where.state = "published";
        const events = await Post.findAll({
          where,
          limit: 3
        });
        const taxomony = await TermTaxonomy.findOne({
          include: [
            {
              model: Term.model,
              as: "term",
              where: {
                name: "News"
              }
            }
          ],
          where: {
            taxonomy: "article_category"
          }
        });
        const articles = await taxomony.getPosts({
          include: [
            {
              model: Language.model,
              as: "translation",
              where: {
                id: language_id
              }
            }
          ],
          where: {
            type: "article",
            state: "published",
            meta: {
              featured_evergreen: true
            }
          },
          limit: 3,
          order: ["publish_at"]
        });
        const result = [...articles, ...events];
        resolve(result);
      } catch (e) {
        reject(e);
      }
    });
  }
};
