import {
  GraphQLString as StringType,
  GraphQLID as ID,
  GraphQLList as List,
  GraphQLBoolean as BooleanType,
  GraphQLInputObjectType as InputType,
} from 'graphql';
import GraphQLJSON from 'graphql-type-json';

const OfficeQueryType = new InputType({
  name: 'OfficeQueryType',
  fields: {

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
    },
  }

});

export default OfficeQueryType;