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
import { Component } from '../models';
import ComponentType from '../types/ComponentType';

const createComponent = {
  type: ComponentType,
  description: 'creates a new component',
  args: {
    name: {
      type: new NonNull(StringType)
    },
    category: {
      type: StringType
    },
    body: {
      type: GraphQLJSON
    },
    dependencies: {
      type: StringType
    }
  },
  resolve({ transporter }, args) {

    return new Promise( async (resolve, reject) => {
      try {
          const newComponent = await Component.create({
            name: args.name,
            category: args.category,
            body: args.body,
            dependencies: args.dependencies,
          });
          resolve(newComponent);     

      } catch(e) {
        reject(e);
      }
      
    });

  },
};

const updateComponent = {
  type: ComponentType,
  description: 'updates a component',
  args: {
    id: {
      type: ID,
    },
    body: {
      type: GraphQLJSON
    }
  }, 
  resolve({ transporter }, args) {
    return new Promise( async (resolve, reject) => {

      try {

          const component = await Component.findById(args.id);

          const updateComponent = await component.update({
            body: args.body,
          });

          resolve(updateComponent);     

      } catch(e) {
        reject(e);
      }
      
    });
  }
}

export { createComponent, updateComponent };
