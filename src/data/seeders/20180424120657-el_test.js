import Promise from 'bluebird';
import path from 'path';
import moment from 'moment';
import { randomBytes } from 'crypto';
import slugify from '../../core/generateSlug';
import {
  SFAircraftModel,
  SFAircraftManufacturer,
  SFAircraftCategory,
  SFAirport,
  SFAirportCity,
  Post,
  Term,
  TermTaxonomy,
  MediaLibrary,
  Language,
  User,
  Currency,
  EmptyLeg
} from '../models';

export default {
  up: async () => {

    const el = await EmptyLeg.findOne({
      include: [
        {
          model: SFAircraftModel,
          as: 'aircraft',
          include: [
            {
              model: SFAircraftCategory,
              as: 'category',
            },
            {
              model: SFAircraftManufacturer,
              as: 'manufacturer',
            },
          ]
        },
        {
          model: SFAirport,
          as: 'fromAirport',
          include: [{
            model: SFAirportCity,
            as: 'city',
          }]
        },
        {
          model: SFAirport,
          as: 'toAirport',
          include: [{
            model: SFAirportCity,
            as: 'city',
          }]
        },
        {
          model: Currency,
          as: 'currency'
        }
      ],
      raw: true,
    });
    console.log(el);

    // const fromAirport = await el.getFromAirport();
    // const toAirport = await el.getToAirport();
    // const aircraft = await el.getAircraft();

    // console.log(el);

  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
