import {
  GraphQLString as StringType,
  GraphQLBoolean as BooleanType,
  GraphQLID as ID,
  GraphQLNonNull as NonNull,
} from 'graphql';

import { Language } from '../../models';
import LanguageType from '../../types/LanguageType';

export default {
  type: LanguageType,
  description: 'Get a Single Language',
  args: {
    id: {
      type: ID,
    },
    locale: {
      type: StringType,
    },
    enabled: {
      type: BooleanType,
      defaultValue: true,
    }
  },
  async resolve(root, { id, locale, enabled }) {
    try {

      if (id) {
        return Language.findById(id);
      }

      if (!locale) {
        throw new Error('Missing argument locale');
      }

      const where = { enabled, locale };

      return Language.findOne({ where });
    } catch (e) {
      console.error(e);
      return e;
    }

  }
}