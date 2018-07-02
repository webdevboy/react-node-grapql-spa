import {
  GraphQLString as StringType,
  GraphQLID as ID,
  GraphQLList as List,
  GraphQLNonNull as NonNull,
  GraphQLInt as Integer,
  GraphQLObjectType as ObjectType,
  GraphQLBoolean as BooleanType,
  GraphQLEnumType as EnumType,
} from 'graphql';
import GraphQLDate from 'graphql-date';
import GraphQLJSON from 'graphql-type-json';
import ArticleStateType from '../../types/auxiliary/ArticleState';

export default {
  id: {
    type: ID
  },
  title: {
    type: StringType
  },
  summary: {
    type: StringType
  },
  slug: {
    type: StringType
  },
  article_id: {
    type: StringType
  },
  source: {
    type: StringType
  },
  body: {
    type: GraphQLJSON
  },
  publish_at: {
    type: GraphQLDate
  },
  tags: {
    type: new List(StringType)
  },
  state: {
    type: ArticleStateType
  },
  category_id: {
    type: ID
  },
  language_id: {
    type: ID
  },
  media_id: {
    type: ID
  },
  featured: {
    type: BooleanType
  },
  duplicate: {
    type: BooleanType
  }
}
