import {
  GraphQLString as StringType,
  GraphQLID as ID,
  GraphQLList as List,
  GraphQLBoolean as BooleanType,
} from 'graphql';

import { Template } from '../models';
import TemplateType from '../types/TemplateType';
import gql from 'graphql-tag';


const ArgsType = {
  id: {
    type: ID,
  },
  name: {
    type: StringType
  },
};

export const getTemplates = {
  type: new List(TemplateType),
  args: ArgsType,
  resolve (root, args) {
    try {
      return Template.findAll({ where: args });
    } catch (e) {
      console.error(e);
      return e;
    }
    
  }
}

export const getTemplate = {
  type: TemplateType,
  args: ArgsType,
  async resolve(root, args) {
    try {
      const template = await Template.findOne({ where: args });
      return template;
    } catch (e) {
      console.error(e);
      return e;
    }

    
  }
}
