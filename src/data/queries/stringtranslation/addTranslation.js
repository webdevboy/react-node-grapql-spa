import {
  GraphQLString as StringType,
  GraphQLID as ID,
  GraphQLList as List,
  GraphQLNonNull as NonNull,
} from 'graphql';

import { 
  StringTranslation,
  Language,
} from '../../models';

import StringTranslationType from '../../types/StringTranslationType';

export default {
  type: StringTranslationType,
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
	  defaultMessage: {
		  type: new NonNull(StringType),
    },
    url: {
      type: new NonNull(StringType),
    },
  },
	resolve({ user }, args) {
    return new Promise( async (resolve, reject) => {
      try {
        if (!user || !user.is_admin) {
          throw new Error('No access level');
        }
        const language = await Language.model.findOne({ where: { locale: args.locale, enabled: true }});
  
        if (!language) {
          throw new Error(`Locale '${args.locale}' not supported`);
        }
  
        let string = await StringTranslation.model.findOne({ where: { language_id: language.id, message_id: args.message_id }} );
        if (string) {
          await string.update({ translation : args.translation, url: args.url });
        } else {
          string = await StringTranslation.model.create(Object.assign({},
              {'message_id' : args.message_id},
              {description : args.message_id},
              {defaultMessage : args.defaultMessage},
              {translation: args.translation},
              {url: args.url},
              {'language_id': language.id}));
        }			
		    return resolve(string);
      } catch (e) {
        console.error(e);
        return e;
      }
      
    });
  }
}
