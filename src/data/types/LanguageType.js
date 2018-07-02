import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
  GraphQLBoolean as BooleanType,
  GraphQLList as List,
  GraphQLInt as Integer,
  GraphQLID as ID,
} from 'graphql';

import StringTranslationType from './StringTranslationType';

const LanguageType = new ObjectType({
  name: 'Language',
  fields: {
    id: {
      type: new NonNull(ID)
    },
    enabled: { 
      type: new NonNull(BooleanType)
    },
    locale: { 
      type: new NonNull(StringType)
    },
    language: { 
      type: StringType
    },
    native: { 
      type: StringType
    },
    rtl: { 
      type: BooleanType
    },
    total_strings: {
      type: Integer,
      resolve(language) {
        return language.countTranslations()
      }
    },
    missing_translations: {
      type: Integer,
      resolve(language) {
        return language.countTranslations({ where: { translation: null } })
      }
    },
    strings: {
      type: new List(StringTranslationType),
      resolve(language) {
        return language.getTranslations()
      }
    }
  },
});

export default LanguageType;