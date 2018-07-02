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
    list_from_airport_id: {
      type: new List(StringType),
    },
    list_to_airport_id: {
      type: new List(StringType),
    },
    empty_leg_ids: {
      type: new List(ID),
    },
    price_range: {
      type: new List(Integer),
    },
    date: {
      type: new List(DateType),
    },
    pagination: {
      type: PaginationInput,
      defaultValue: {
        offset: 0,
        limit: 20,
      },
    },
    sort: {
      type: Integer,
    },
    name: {
      type: StringType
    }
    // sort: {
    //   type: new List(new List(StringType)),
    //   defaultValue: [['from_date', 'until_date']],
    // },
  },
  async resolve(_, {
    list_from_airport_id,
    list_to_airport_id,
    price_range,
    date,
    pagination,
    empty_leg_ids,
    sort,
    name
    // sort,
  }) {
    const where = {};
    const cityWhere = {};
    if (empty_leg_ids) {
      where.id = empty_leg_ids;
    }
    if (list_from_airport_id && (list_from_airport_id !== null) && (list_from_airport_id.length > 0)) {
      where.from_airport_sfid = { $in: list_from_airport_id };
    }
    if (list_to_airport_id && (list_to_airport_id !== null) && (list_to_airport_id.length > 0)) {
      where.to_airport_sfid = { $in: list_to_airport_id };
    }
    if (price_range) {
      where.price = { $between: price_range };
    }
    if (date) {
      if (date.length === 1) {
        where.from_date = { $lte: date[0] };
        where.until_date = { $gte: date[0] };
      } else if (date.length === 2) {
        where.from_date = { $lte: date[1] };
        where.until_date = { $gte: date[0] };
      }
    }
    if (name) {
      cityWhere.name__c = {$iLike: `${name}%`};
    }

    let sortCriteria = ['from_date', 'until_date'];
    if (sort) {
      switch (sort) {
        case 1:
          sortCriteria = ['from_date', 'until_date'];
          break;
        case 2:
          sortCriteria = [['from_date', 'DESC'], ['until_date', 'DESC']];
          break;
        case 3:
          sortCriteria = ['price'];
          break;
        case 4:
          sortCriteria = [['price', 'DESC']];
           break;
        default:
          break;
      }
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
            required: true,
            where: cityWhere,
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
      order: sortCriteria,
      ...pagination,
      include,
    });

    return legs;

  },
}
