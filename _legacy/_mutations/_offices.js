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
import { Office } from '../models';
import OfficeType from '../types/OfficeType';


const createOffice = {
  type: OfficeType,
  description: 'creates a office contact',
  args: {
    name: {
      type: (StringType)
    },
    address: {
      type: new NonNull(StringType)
    },
    postal_code: {
      type: new NonNull(StringType)
    },
    location: {
      type: (StringType)
    },
    country: {
      type: new NonNull(StringType)
    },
    phone: {
      type: new NonNull(StringType)
    },
    alt_phone: {
      type: new NonNull(StringType)
    },
    fax: {
      type: new NonNull(StringType)
    },
    email: {
      type: (StringType)
    },
    coordinates: {
      type: GraphQLJSON
    },
    primary: {
      type: BooleanType
    }
  },
  resolve({ transporter }, args) {
    return new Promise( async (resolve, reject) => {
      try {
          const newContact = await Office.create({
            name: args.name,
            address: args.address,
            postal_code: args.postal_code,
            location: args.location,
            country: args.country,
            phone: args.phone,
            alt_phone: args.alt_phone,
            fax: args.fax,
            email: args.email,
            coordinates: args.coordinates,
            primary: args.primary
          });
          resolve(newContact);     
      } catch(e) {
        reject(e);
      }
      
    });

  },
};

const updateOffice = {
  type: OfficeType,
  description: 'updates a office contact',
  args: {
    id: {
      type: new NonNull(ID)
    },
    name: {
      type: (StringType)
    },
    address: {
      type: (StringType)
    },
    postal_code: {
      type: (StringType)
    },
    location: {
      type: (StringType)
    },
    country: {
      type: (StringType)
    },
    phone: {
      type: (StringType)
    },
    alt_phone: {
      type: (StringType)
    },
    fax: {
      type: (StringType)
    },
    email: {
      type: (StringType)
    },
    coordinates: {
      type: GraphQLJSON
    },
    primary: {
      type: BooleanType
    },
    order: {
      type: Integer
    }
  },
  resolve({ transporter }, args) {
    console.log(args);
    return new Promise( async (resolve, reject) => {

      try {

          const office = await Office.findById(args.id);

          const updatedOffice = await office.update(args);

          resolve(updatedOffice);     

      } catch(e) {
        reject(e);
      }
      
    });
  }
}

const removeOffice = {
  type: OfficeType,
  description: 'remove an office',
  args: {
  id: {
    type: new NonNull(ID)
  },
},
resolve({ transporter }, args) {
  return new Promise( async (resolve, reject) => {
    try {
      await Office.destroy({  
        where: { id: args.id }
      }); 
      resolve({id: args.id});
    } 
    catch(e) {
      console.log('error in mutation');
      reject(e);
      }
    });
  },
};


export { createOffice, removeOffice, updateOffice };
