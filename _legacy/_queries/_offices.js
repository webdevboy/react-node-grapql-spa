import {
  GraphQLString as StringType,
  GraphQLID as ID,
  GraphQLList as List,
  GraphQLBoolean as BooleanType,
} from 'graphql';

import GraphQLJSON from 'graphql-type-json';
import { Office } from '../models';
import OfficeType from '../types/OfficeType';



const ArgsType = {
  id: {
     type: ID,
  },

  name: {
    type: StringType
  },

  address: {
    type: StringType
  },

  postal_code: {
    type: StringType
  },

  location: {
    type: StringType
  },

  country: {
    type: StringType
  },

  phone: {
    type: StringType
  },

  alt_phone: {
    type: StringType
  },

  fax: {
    type: StringType
  },

  email: {
    type: StringType
  },
 
  cordinates: {
   type: GraphQLJSON
  },

  primary: {
    type: BooleanType,
  }
};

export const getOffices = {
  type: new List(OfficeType),
  args: ArgsType,
  resolve(root, args) {
    try {
      return Office.findAll({ where: args , order: [['order', 'ASC']]});
    } catch (e) {
      console.error(e);
      return e;
    }
    
  }
}

export const getOffice = {
  type: OfficeType,
  args: ArgsType,
  resolve(root, args) {
    try {
      return Office.findOne({ where: args });
    } catch (e) {
      console.error(e);
      return e;
    }

    
  }
}

