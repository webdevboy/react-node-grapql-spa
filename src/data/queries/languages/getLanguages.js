import {
  GraphQLBoolean as BooleanType,
  GraphQLList as List,
  GraphQLString as StringType,
} from 'graphql';
import { generateCacheKey } from '../../cache';
import { Language } from '../../models';
import LanguageType from '../../types/LanguageType';

export default {
  type: new List(LanguageType),
  description: 'Get All defined Languages',
  args: {
    enabled: {
      type: BooleanType,
      defaultValue: true,
    },
    rtl: {
      type: BooleanType,
    },
    locales: {
      type: new List(StringType),
    },
    all: {
      type: BooleanType,
    },
  },
  async resolve(root, { enabled, locales, rtl, all }) {
    try {
      
      if (locales) {
        const langsLocales = await Language.findAll({
          locale: {
            $in: locales,
          },
        });

        return langsLocales;
      }

      const where = {};

      if (!all) {
        where.enabled = enabled;
      }

      if (rtl) {
        where.rtl = rtl;
      }

      const langs = await Language.findAll({
        where,
      });

      return langs; 
    } catch (e) {
      console.error(e);
      return e;
    }
    
  }
}