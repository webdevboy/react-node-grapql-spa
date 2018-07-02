import {
  GraphQLString as StringType,
  GraphQLID as ID,
  GraphQLList as List,
} from 'graphql';

import { Locale } from '../models';
import LocaleType from '../types/LocaleType';

export const getLocales = {
  type: new List(LocaleType),
  args: {
    id: {
      type: ID,
    },
    locale: { 
      type: StringType
    },
    language: { 
      type: StringType
    },
    country: { 
      type: StringType
    },
  },
  resolve(root, args) {
    try {
      return Locale.findAll({ where: args, order:['locale'] });
    } catch (e) {
      console.error(e);
      return e;
    }
    
  }
}

export const getLocale = {
  type: LocaleType,
  args: {
    id: {
      type: ID,
    },
    locale: { 
      type: StringType
    },
    language: { 
      type: StringType
    },
    country: { 
      type: StringType
    },
  },
  resolve(root, args) {
    try {
      return Locale.findOne({ where:args, order:['locale'] });
    } catch (e) {
      console.error(e);
      return e;
    }

  }
}