import {
  GraphQLString as StringType,
  GraphQLBoolean as BooleanType,
  GraphQLID as ID,
  GraphQLList as List,
  GraphQLNonNull as NonNull,
} from 'graphql';

import { Language } from '../models';
import LanguageType from '../types/LanguageType';

export const getLanguages = {
  type: new List(LanguageType),
  name: 'Get Languages',
  description: 'Find All Languages',
  args: {
    id: {
      type: ID,
    },
    enabled: { 
      type: BooleanType
    },
  },
  resolve(root, args) {
    try {
      return Language.findAll({ where: args });
    } catch (e) {
      console.error(e);
      return e;
    }
    
  }
}

export const getLanguage = {
  type: LanguageType,
  name: 'Get Language',
  description: 'Find a Single Language',
  args: {
    id: {
      type: new NonNull(ID),
    },
  },
  resolve(root, args) {
    try {
      return Language.findOne({ where: args });
    } catch (e) {
      console.error(e);
      return e;
    }

  }
}