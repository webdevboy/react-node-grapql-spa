import Promise from 'bluebird';

import {
  GraphQLString as StringType,
  GraphQLID as ID,
  GraphQLList as List,
  GraphQLNonNull as NonNull,
  GraphQLInt as Integer,
  GraphQLObjectType as ObjectType,
  GraphQLBoolean as BooleanType
} from 'graphql';

import GraphQLJSON from 'graphql-type-json';
import { User, Page, PageMeta } from '../models';
import PageType from '../types/PageType';
import PageMetaType from '../types/PageMetaType';


const createPage = {
  type: PageType,
  description: 'creates a new page',
  args: {
    title: {
      type: new NonNull(StringType)
    },
    path: {
      type: new NonNull(StringType)
    },
    template: {
      type: new NonNull(StringType)
    },
    body: {
      type: GraphQLJSON
    },
    query: {
      type: StringType
    },
    owner: {
      type: new NonNull(ID)
    },
    childrens: {
      type: new List(ID)
    }
  },
  resolve({ transporter }, args) {
    return new Promise( async (resolve, reject) => {
      try {
          const owner = await User.findById(args.owner);
          const sanitizedSlug = args.title.replace(/[^a-zA-Z0-9 ]/g,'').replace(/ /g, '-').toLowerCase().replace(/-{2,}/g, '').replace(/[-]$/g, '');

          const newPage = await Page.create({
            title: args.title,
            slug: sanitizedSlug,
            path: args.path || '/' + sanitizedSlug,
            template: args.template.toLowerCase(),
            body: args.body,
            query: args.query,
            state: false,
          });
          // associate to user as owner
          newPage.setOwner(owner);
          resolve(newPage);     

      } catch(e) {
        reject(e);
      }
      
    });

  },
};

const updatePage = {
  type: PageType,
  description: 'updates a page',
  args: {
    id: {
      type: ID,
    },
    path:{
      type: StringType
    },
    body: {
      type: GraphQLJSON
    },
    title: {
      type: StringType
    },
    query: {
      type: StringType
    },
    external_scripts: {
      type: new List(StringType)
    },
    custom_script: {
      type: StringType
    },
    state: {
      type: BooleanType
    }
  }, 
  resolve({ transporter }, args) {
    return new Promise( async (resolve, reject) => {

      try {

          const page = await Page.findById(args.id);

          const updatedPage = await page.update({
            body: args.body,
            query: args.query,
            path: args.path,
            title: args.title,
            external_scripts: args.external_scripts,
            custom_script: args.custom_script,
            state: args.state,
          });

          resolve(updatedPage);     

      } catch(e) {
        reject(e);
      }
      
    });
  }
}

const updateOrCreateMeta = {
  type: PageMetaType,
  description: 'updates page meta',
  args: {
    page_id:{
      type: ID
    },
    language_id: {
      type: ID,
    },
    meta: {
      type: GraphQLJSON
    }
  }, 
  resolve(_, args) {
    return new Promise( async (resolve, reject) => {
      try {

        const pageMeta = await PageMeta.findOrCreate({ limit: 1, where: { $and: { page_id: args.page_id, language_id: args.language_id } }, defaults: args}).then(res => {
          if (!res[0].isNewRecord)
            return res[0].update({meta: args.meta }, {fields: ['meta']})
          return res[0]
        });
        
        resolve(pageMeta)
      } catch(e) {
        reject(e);
      }
      
    });
  }
}
export { createPage, updatePage, updateOrCreateMeta };
