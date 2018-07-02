import {
  GraphQLString as StringType,
  GraphQLID as ID,
  GraphQLList as List,
  GraphQLNonNull as NonNull,
} from 'graphql';

import { 
  RichTextTranslation,
  Language,
} from '../../models';

import RichTextTranslationType from '../../types/RichTextTranslationType';

export default {
    type: new List(RichTextTranslationType),
    args: {
      locale: {
        type: new NonNull(StringType),
      },
    },
    async resolve(_, args) {
      try {
        const language = await Language.findOne({ where: { locale: args.locale, enabled: true }});
  
        if (!language) {
          throw new Error(`Locale '${args.locale}' not supported`);
        }
  
        return RichTextTranslation.findAll({ where: { language_id: language.id } , order: ['message_id'] } );
  
      } catch (e) {
        console.error(e);
        return e;
      }
      
    }
}