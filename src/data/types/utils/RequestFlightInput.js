import {
  GraphQLString as StringType,
  GraphQLList as List,
  GraphQLNonNull as NonNull,
  GraphQLInt as Integer,
  GraphQLObjectType as ObjectType,
  GraphQLBoolean as BooleanType,
  GraphQLInputObjectType as InputObjectType,
} from 'graphql';
import GraphQLDate from 'graphql-date';
import GraphQLJSON from 'graphql-type-json';

export default {
  legs: {
    type: new NonNull(
      new List(
        new InputObjectType({
          name: 'legArg',
          fields: {
            from: {
              type: GraphQLJSON,
            },
            to: {
              type: GraphQLJSON,
            },
            date: {
              type: GraphQLDate,
            },
            pax: {
              type: Integer,
            },
          },
        }),
      ),
    ),
  },
  flightOptions: {
    type: new InputObjectType({
      name: 'flightOptionsArg',
      fields: {
        luggage: {
          type: Integer,
        },
        pets: {
          type: Integer,
        },
        wifi: {
          type: BooleanType,
        },
        sports_equipment: {
          type: BooleanType,
        },
        sports_weapons: {
          type: BooleanType,
        },
        special_assistance: {
          type: BooleanType,
        },
        smokers: {
          type: BooleanType,
        },
        special_catering: {
          type: BooleanType,
        },
      },
    }),
  },
  contactInfo: {
    type: new InputObjectType({
      name: 'contactInfoArg',
      fields: {
        title: {
          type: StringType,
        },
        firstName: {
          type: StringType,
        },
        lastName: {
          type: StringType,
        },
        email: {
          type: StringType,
        },
        phone: {
          type: StringType,
        },
        additionalNotes: {
          type: StringType,
        },
      },
    }),
  },
};
