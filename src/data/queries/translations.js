import {
  GraphQLString as StringType,
  GraphQLID as ID,
  GraphQLList as List,
  GraphQLNonNull as NonNull,
} from 'graphql';

import {
  StringTranslation,
  Language,
} from '../models';

import StringTranslationType from '../types/StringTranslationType';
import MediaTranslationType from '../types/MediaTranslationType';

export default {
  getTranslations: {
    type: new List(StringTranslationType),
    args: {
      locale: {
        type: new NonNull(StringType),
      },
    },
    async resolve(root, args) {
      try {
        const language = await Language.findOne({ where: { locale: args.locale, enabled: true } });
  
        if (!language) {
          throw new Error(`Locale '${args.locale}' not supported`);
        }
  
        return StringTranslation.findAll({ where: { language_id: language.id }, order: ['message_id'] } );
  
      } catch (e) {
        console.error(e);
        return e;
      }
      
    }
  }
}