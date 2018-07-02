import {
  GraphQLList as List,
} from 'graphql';
import { Sitemap } from '../../models';
import SitemapType from '../../types/SitemapType';

export default {
  type: new List(SitemapType),
  resolve() {
    try {
      return Sitemap.findAll();
    } catch (e) {
      console.error(e);
      return e;
    }
  },
};
