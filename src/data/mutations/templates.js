import Promise from 'bluebird';

import {
  GraphQLString as StringType,
  GraphQLID as ID,
  GraphQLList as List,
  GraphQLNonNull as NonNull,
  GraphQLInt as Integer,
  GraphQLObjectType as ObjectType,
} from 'graphql';

import GraphQLJSON from 'graphql-type-json';
import { Template } from '../models';
import TemplateType from '../types/TemplateType';


const createTemplate = {
  type: TemplateType,
  description: 'creates a new template',
  args: {
    name: {
      type: new NonNull(StringType)
    },
    body: {
      type: GraphQLJSON
    },
  },
  resolve({ transporter }, args) {
    // console.log('======================+>>>>>>>', args)
    return new Promise( async (resolve, reject) => {
      try {
      
          const newTemplate = await Template.create({
            name: args.name,
            body: args.body,
          });
          // associate to user as owner

          resolve(newTemplate);     

      } catch(e) {
        reject(e);
      }
      
    });

  },
};

const updateTemplate = {
  type: TemplateType,
  description: 'updates a template',
  args: {
    id: {
      type: ID,
    },
    body: {
      type: GraphQLJSON
    },
    name: {
      type: StringType
    },
  }, 
  resolve({ transporter }, args) {
    return new Promise( async (resolve, reject) => {

      try {

          const template = await Template.findById(args.id);

          const updatedTemplate = await template.update({
            body: args.body,
          });

          resolve(updatedTemplate);     

      } catch(e) {
        reject(e);
      }
      
    });
  }
}


export { createTemplate, updateTemplate };
