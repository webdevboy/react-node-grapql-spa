import {
  GraphQLID as ID,
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
} from 'graphql';
import LanguageType from './LanguageType';
// import { Language } from '../models';

export default new ObjectType({
  name: 'MediaTranslation',
  fields: {
    id: {
      type: ID,
      resolve(media) {
        return media.id;
      },
    },
    alt: {
      type: StringType,
      resolve(media) {
        return media.alt;
      },
    },
    language_id: {
      type: ID,
      resolve(media) {
        return media.language_id;
      },
    },
    language: {
      type: LanguageType,
      resolve(media) {
        if (media.language) {
          return media.language;
        }
        return media.getLanguage();
      },
    },
  },
});
