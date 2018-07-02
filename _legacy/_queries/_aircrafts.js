import {
  GraphQLString as StringType,
  GraphQLID as ID,
  GraphQLList as List,
  GraphQLObjectType as ObjectType,
  GraphQLNonNull as NonNull,
  GraphQLBoolean as BooleanType,
  GraphQLInt as Integer,
  GraphQLInputObjectType as InputType,
} from "graphql";

import ErrorType from "../types/ErrorType";
import AircraftType from "../types/AircraftType";
import PaginationType from "../types/PaginationType";

import sequelize from "../sequelize";
import { SF_AircraftModel } from "../models/salesforce";

export const getAllAircrafts = {
  type: new List(AircraftType),
  name: "Aircrafts",
  description: "Find All Aircrafts",
  args: {
    query: {
      type: new InputType({
        name: "AircraftsArguments",
        fields: {
          name: {
            type: StringType,
          },
          category: {
            type: BooleanType,
          },
          manufacturer: {
            type: BooleanType,
          },
        },
      }),
    },
    pagination: {
      type: PaginationType,
    },
  },
  resolve(_, { query, pagination }) {
    try {
      return SF_Aircraft.findAll({ where: query, ...pagination });
    } catch (e) {
      console.error(e);
      return e;
    }
  },
};


export const getSingleAircraft = {
  type: AircraftType,
  name: "Aircraft",
  description: "Find Single Aircrafts",
  args: {
    query: {
      type: new InputType({
        name: "AircraftArguments",
        fields: {
          sfid: {
            type: StringType,
          },
          name: {
            type: StringType,
          },
          category: {
            type: BooleanType,
          },
          manufacturer: {
            type: BooleanType,
          },
        },
      }),
    },
    pagination: {
      type: PaginationType,
    },
  },
  resolve(_, { query, pagination }) {
    try {
      return SF_Aircraft.findOne({ where: query, ...pagination });
    } catch (e) {
      console.error(e);
      return e;
    }
  },
};
