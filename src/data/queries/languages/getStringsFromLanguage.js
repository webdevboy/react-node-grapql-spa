import {
  GraphQLBoolean as BooleanType,
  GraphQLList as List,
  GraphQLID as ID,
  GraphQLNonNull as NonNull,
  GraphQLString as StringType,
} from 'graphql';

import { Language } from '../../models';
import StringTranslationType from '../../types/StringTranslationType';

export default {
  type: new List(StringTranslationType),
  description: 'Get All strings from the Language',
  args: {
    id: {
      type: ID,
    },
    locale: {
      type: StringType,
    },
  },
  async resolve(_, { id, locale }) {
    try {

      if (!id && !locale) {
        throw new Error('Missing arguments, id and locale must be provided');
      }

      const lang = (id)
        ? await Language.findById(id)
        : await Language.findOne({ where: { locale } });

      const translations = await lang.getTranslations();
      return translations;
    } catch (e) {
      console.error(e);
      return e;
    }
    
  }
}