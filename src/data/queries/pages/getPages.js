import { GraphQLList as List } from 'graphql';
import { Page } from '../../models';
import types from '../../types';
import PageQueryType from './PageQueryType';

export default {
  type: new List(types.PageType),
  description: "Get All Pages",
  args: {
    query: {
      type: PageQueryType,
    }
  },
  async resolve (_, { query, pagination }) {
    try {

      const pages = await Page.findAll({ where: query });

      return pages;
    } catch (e) {
      console.error(e);
      return e;
    }
  }
}