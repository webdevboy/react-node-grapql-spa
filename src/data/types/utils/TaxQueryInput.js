import {
  GraphQLList as List,
  GraphQLString as StringType,
  GraphQLInt as Int,
  GraphQLInputObjectType as InputObjectType,
  GraphQLInputFieldMap as InputFieldMap,
} from "graphql";

export const TaxonomyInput = new InputObjectType({
  name: 'TaxonomyInput',
  fields: {
    taxonomy: {
      type: StringType,
    },
    terms: {
      type: new List(StringType),
    },
    field: {
      type: StringType,
      defaultValue: 'slug',
    },
  }
});

export default new InputObjectType({
  name: 'TaxQuery',
  fields: {
    relation: {
      type: StringType,
      defaultValue: 'AND',
    },
    taxonomies: {
      type: new List(TaxonomyInput)
    },
  }
});

/*
 * EXAMPLE:
 * 

tax_query: {
  relation: "AND",
  taxonomies: [
    {
      taxonomy: "aircraft_category",
      terms: ["light-jet", "midsize-jet"]
    },
    {
      taxonomy: "aircraft_manufacturer",
      terms: ["Bombardier"]
      field: "name",
    },
  ]
}
*/