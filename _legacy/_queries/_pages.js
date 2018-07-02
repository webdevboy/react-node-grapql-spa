import {
  GraphQLString as StringType,
  GraphQLID as ID,
  GraphQLList as List,
  GraphQLBoolean as BooleanType,
} from 'graphql';
import sequelize from 'sequelize';
import { Page, PageChildren } from '../models';
import PageType from '../types/PageType';
import gql from 'graphql-tag';


const ArgsType = {
  id: {
    type: ID,
  },
  title: {
    type: StringType
  },
  path: {
    type: StringType
  },
  slug: {
    type: StringType
  },
  query:{
    type: StringType
  },
  state:{
    type: BooleanType
  },
};

export const getPages = {
  type: new List(PageType),
  args: ArgsType,
  async resolve (root, args) {
    try {

      return Page.findAll({ where: args });

    } catch (e) {
      console.error(e);
      return e;
    }
    
  }
}

export const getRootLevel = {
  type: PageType,
  async resolve(root, args) {
    try {
      return Page.findAll({where: { parent_id: { $eq: null } }})
    } catch (e) {
      console.error(e);
      return e;
    }
  }
}



export const getPage = {
  type: PageType,
  args: ArgsType,
  async resolve(root, args) {
    try {
      const page = await Page.findOne({ where: args });
      return page;
    } catch (e) {
      console.error(e);
      return e;
    }
  }
}

export const getHomepage = {
  type: PageType,
  resolve(root, args) {
    try {
      return Page.findOne({ where: { $and: { path: '/', slug: 'home' } } });
    } catch (e) {
      console.error(e);
      return e;
    }
    
  }
}
