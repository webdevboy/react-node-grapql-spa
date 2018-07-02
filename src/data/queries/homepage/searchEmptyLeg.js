import {
  GraphQLString as StringType,
  GraphQLID as ID,
  GraphQLList as List,
  GraphQLObjectType as ObjectType,
  GraphQLNonNull as NonNull,
  GraphQLBoolean as BooleanType,
  GraphQLInt as Integer,
  GraphQLInputObjectType as InputType,
} from 'graphql';
import DateType from 'graphql-date';
import sequelize from 'sequelize';

import {
  EmptyLeg,
  SFAirport,
  SFAirportCity,
  SFCountry,
  SFAircraftModel,
  SFAircraftCategory,
  SFAircraftManufacturer,
  Currency,
} from '../../models';

import EmptyLegType from '../../types/EmptyLegType';
import PaginationInput from '../../types/utils/PaginationInput';

export default {
  type: new List(EmptyLegType),
  name: 'EmptyLegs',
  description: 'Find all emptylegs',
  args: {
    search: {
      type: StringType,
    },
  },
  async resolve(_, {
    search,
  }) {
    const where = {};
    if (search) {
      where.details = { search_content : {$iLike: `%${search.toLowerCase()}%`}};
    }

    const include = [
      {
        model: Currency.model,
        as: 'currency',
        required: true,
      },
      {
        model: SFAirport.model,
        as: 'fromAirport',
        required: true,
        include: [
          {
            model: SFAirportCity.model,
            as: 'city',
            include: [{
              model: SFCountry.model,
              as: 'country',
            }],
          },
        ],
      },
      {
        model: SFAirport.model,
        as: 'toAirport',
        required: true,
        include: [
          {
            model: SFAirportCity.model,
            as: 'city',
            include: [{
              model: SFCountry.model,
              as: 'country',
            }],
          },
        ],
      },
      {
        model: SFAircraftModel.model,
        as: 'aircraft',
        required: true,
        include: [
          {
            model: SFAircraftCategory.model,
            as: 'category',
          },
          {
            model: SFAircraftManufacturer.model,
            as: 'manufacturer',
          },
        ],
      },
    ];

    const legs = await EmptyLeg.model.findAll({
      where,
      include,
    });

    return legs;

  },
}
