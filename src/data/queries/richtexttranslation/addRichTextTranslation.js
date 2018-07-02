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
  type: RichTextTranslationType,
  description: 'Add a translation',
  args: {
    message_id: {
      type: new NonNull(StringType),
    },
    locale: {
      type: new NonNull(StringType),
    },
    translation: {
      type: new NonNull(StringType),
    },
  },
	resolve(_, args) {
    return new Promise( async (resolve, reject) => {
      try {
        const language = await Language.findOne({ where: { locale: args.locale, enabled: true }});
  
        if (!language) {
          throw new Error(`Locale '${args.locale}' not supported`);
        }

        let string = await RichTextTranslation.findOne({
          where: {
            language_id: language.id,
            message_id: args.message_id
          }
        });

		    if (string) {
		      await string.update({ translation : args.translation });
        } else {
          string = await RichTextTranslation.model.create(
            Object.assign({},
              {'message_id' : args.message_id},
              {translation: args.translation},
              {'language_id': language.id})
          );
        }		

        return resolve(string);
      } catch (e) {
        console.error(e);
        return e;
      }
      
    });
  }
}
