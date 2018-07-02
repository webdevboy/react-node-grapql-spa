import {
  GraphQLString as StringType,
  GraphQLID as ID,
  GraphQLList as List,
} from 'graphql';

import { Settings } from '../models';
import SettingsType from '../types/SettingsType';

export const getAllSettings = {
  type: new List(SettingsType),
  args: {
    id: {
      type: ID,
    },
    option: {
      type: StringType
    },
  },
  resolve(root, args) {
    try {
      return Settings.findAll({ where: args });
    } catch (e) {
      console.error(e);
      return e;
    }
    
  }
}

export const getSingleSettings = {
  type: SettingsType,
  args: {
    id: {
      type: ID,
    },
    option: {
      type: StringType
    },
  },
  resolve(root, args) {
    try {
      return Settings.findOne({ where: args });
    } catch (e) {
      console.error(e);
      return e;
    }
  }
}