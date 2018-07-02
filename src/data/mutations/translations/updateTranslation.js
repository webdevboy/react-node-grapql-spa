import Promise from 'bluebird';
import {
  GraphQLID as ID,
  GraphQLList as List,
  GraphQLNonNull as NonNull,
  GraphQLString as StringType,
} from 'graphql';
import { StringTranslation, Language } from '../../models';
import StringTranslationType from '../../types/StringTranslationType';

export default {
  type: StringTranslationType,
  description: 'Update translation string',
  args: {
    message_id: {
      type: new NonNull(StringType)
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
      type: StringType
    }
  },
  resolve({ user }, { message_id, locale, translation, defaultMessage, url }) {
    return new Promise( async (resolve, reject) => {
      try {
        if (!user || !user.is_admin) {
          throw new Error('No access level');
        }
        const lang = await Language.findOne({ where: {
          locale,
          enabled: true,
        }});

        if (!url) url = '';

        const [string, created] = await StringTranslation.model.findOrCreate({
          where: {
            message_id,
            language_id: lang.id,
            defaultMessage,
          },
        });

        await string.update({ translation, url });
        
        resolve(string);
      } catch(e) {
        reject(e);
      }
    });
  },
};