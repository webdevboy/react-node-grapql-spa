import {
  GraphQLString as StringType,
  GraphQLID as ID,
  GraphQLList as List,
  GraphQLBoolean as BooleanType,
  GraphQLInputObjectType as InputType,  
} from 'graphql';

const PageQueryType = new InputType({
  name: 'PageQueryType',
  fields: {
    title: {
      type: StringType
    },
    path: {
      type: new List(StringType)
    },
    slug: {
      type: StringType
    },
    state:{
      type: BooleanType
    },
  }
});

export default PageQueryType;