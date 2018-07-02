import {
  GraphQLString as StringType,
  GraphQLID as ID,
  GraphQLList as List,
  GraphQLObjectType as ObjectType,
  GraphQLNonNull as NonNull,
  GraphQLBoolean as BooleanType,
  GraphQLInt as Integer,
  GraphQLInputObjectType as InputType,
  GraphQLEnumType as EnumType,
} from "graphql";
import DateType from "graphql-date";
import sequelize from "sequelize";
import PostType from "../../types/PostType";
import PaginationType from "../../types/utils/PaginationInput";

import { Post, Language, TermTaxonomy, Term } from "../../models";

//Get the current date to get the article published before today
var date = new Date();

export default {
  type: new List(PostType),
  name: "Articles",
  description: "Find all articles",
  args: {
    locale: {
      type: StringType,
    },
    pagination: {
      type: PaginationType,
    },
  },
  async resolve(_, { locale, pagination }) {
    
    const taxomony = await TermTaxonomy.findOne({
      include: [
        {
          model: Term.model,
          as: "term",
          where: {
            name: "News",
          },
        },
      ],
      where: {
        taxonomy: "article_category",
      },
    });
    return taxomony.getPosts({
      include: [
        {
          model: Language.model,
          as: "translation",
          where: {
            locale: locale,
          },
        },
      ],
      where: {
        type: "article",
        state: "published",
      },
      ...pagination,
      order: ["publish_at"],
    });
  },
};
