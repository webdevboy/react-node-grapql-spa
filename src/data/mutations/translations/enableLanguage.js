import Promise from 'bluebird';
import {
  GraphQLID as ID,
  GraphQLString as StringType,
} from 'graphql';

import { Language } from '../../models';
import StringTranslationType from '../../types/StringTranslationType';
import LanguageType from '../../types/LanguageType';

export default {
  type: LanguageType,
  description: 'Disable a language',
  args: {
    id: {
      type: ID
    },
    locale: {
      type: StringType
    },
  },
  resolve({ user }, { id, locale }) {
    return new Promise( async (resolve, reject) => {
      try {
        if (!user || !user.is_admin) {
          throw new Error('No access level');
        }
        if (!id && !locale) {
          throw new Error('Id or Locale must be provided');
        }

        if (id) {
          const languageById = await Language.findById(id);
          if (languageById.enabled) {
            throw new Error('Language already enabled!')
          }
          await languageById.update({
            enabled: true
          });
          return resolve(languageById);
        }

        const language = await Language.findOne({
          where: {
            enabled: false,
            locale,
          },
        });
        if (!language) {
          throw new Error('Language already enabled!')
        }
        await language.update({
          enabled: true
        });
        return resolve(language);
        
      } catch(e) {
        console.error(e);
        reject(e);
      }
      
    });

  },
};
