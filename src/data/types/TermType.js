import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
  GraphQLBoolean as BooleanType,
  GraphQLInt as Integer,
} from 'graphql';
import GrahQLJSON from 'graphql-type-json';

import LanguageType from './LanguageType';
import TaxonomyType from './TaxonomyType';

export default new ObjectType({
  name: 'Term',
  description: 'Represents a Term',
  fields: () => ({
    id: {
      type: ID,
      resolve(term) {
        return term.id;
      },
    },
    name: {
      type: StringType,
      resolve(term) {
        return term.name;
      },
    },
    slug: {
      type: StringType,
      resolve(term) {
        return term.slug;
      },
    },
    meta: {
      type: GrahQLJSON,
      resolve(term) {
        return term.meta;
      },
    },
    language_id: {
      type: ID,
      resolve(term) {
        return term.language_id;
      },
    },
    language: {
      type: LanguageType,
      resolve(term) {
        return term.getLanguage();
      },
    },
    taxonomy: {
      type: TaxonomyType,
      resolve(term) {
        return term.getTaxonomy();
      },
    },
  }),
});
